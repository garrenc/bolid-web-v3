import { useEffect, useMemo, useState } from "react";

const STREAM_URL = "https://icecast-bulteam.cdnvideo.ru/bolid128";
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "http://localhost:3000";
  }

  return window.location.origin;
};

interface TrackResponse {
  artist?: string;
  title?: string;
  raw?: string;
  error?: string;
}

export interface CurrentTrack {
  artist: string;
  title: string;
  raw: string;
  isLoading: boolean;
  error: string | null;
}

const fallbackTrack = {
  artist: "Радио Болид",
  title: "Прямая трансляция",
  raw: "Прямая трансляция",
};

const splitTrack = (rawTitle?: string) => {
  const raw = rawTitle?.trim();
  if (!raw) return fallbackTrack;

  const separatorIndex = raw.indexOf(" - ");
  if (separatorIndex === -1) {
    return {
      artist: "Радио Болид",
      title: raw,
      raw,
    };
  }

  return {
    artist: raw.slice(0, separatorIndex).trim() || fallbackTrack.artist,
    title: raw.slice(separatorIndex + 3).trim() || fallbackTrack.title,
    raw,
  };
};

const readTrackFromApi = async () => {
  const response = await fetch(`${getApiBaseUrl()}/api/current-track`, {
    cache: "no-store",
  });
  const data = (await response.json()) as TrackResponse;

  if (!response.ok) {
    throw new Error(data.error || `Track API returned ${response.status}`);
  }

  return {
    artist: data.artist || fallbackTrack.artist,
    title: data.title || fallbackTrack.title,
    raw: data.raw || data.title || fallbackTrack.raw,
  };
};

const readTrackFromIcyStream = async () => {
  const response = await fetch(STREAM_URL, {
    headers: { "Icy-MetaData": "1" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Stream returned ${response.status}`);
  }

  const metaint = Number(response.headers.get("icy-metaint"));
  if (!metaint || !response.body) {
    throw new Error("Stream did not expose ICY metadata to the browser");
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalLength = 0;
  const requiredLength = metaint + 4081;

  while (totalLength < requiredLength) {
    const { value, done } = await reader.read();
    if (done || !value) break;
    chunks.push(value);
    totalLength += value.length;
  }

  await reader.cancel();

  const buffer = new Uint8Array(totalLength);
  let offset = 0;
  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.length;
  });

  const metadataLength = buffer[metaint] * 16;
  const metadataBytes = buffer.slice(metaint + 1, metaint + 1 + metadataLength);
  const metadata = new TextDecoder()
    .decode(metadataBytes)
    .replace(/\0/g, "");
  const match = metadata.match(/StreamTitle='([^']*)';/);

  return splitTrack(match?.[1]);
};

export const useCurrentTrack = (refreshMs = 30000): CurrentTrack => {
  const [track, setTrack] = useState(fallbackTrack);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let timeoutId: number | undefined;

    const loadTrack = async () => {
      try {
        const nextTrack = await readTrackFromApi().catch(async (apiError) => {
          try {
            return await readTrackFromIcyStream();
          } catch (streamError) {
            throw new Error(
              `API: ${
                apiError instanceof Error ? apiError.message : "unknown error"
              }; stream: ${
                streamError instanceof Error
                  ? streamError.message
                  : "unknown error"
              }`
            );
          }
        });

        if (isActive) {
          setTrack(nextTrack);
          setError(null);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Unknown track error");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
          timeoutId = window.setTimeout(loadTrack, refreshMs);
        }
      }
    };

    loadTrack();

    return () => {
      isActive = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [refreshMs]);

  return useMemo(
    () => ({
      ...track,
      isLoading,
      error,
    }),
    [track, isLoading, error]
  );
};
