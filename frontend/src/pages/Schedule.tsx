import React, { useState } from "react";
import { Calendar, Clock, Radio, Users } from "lucide-react";

interface Show {
  time: string;
  title: string;
  host?: string;
  duration?: string;
}

interface ScheduleData {
  [key: number]: Show[]; // 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
}

const Schedule: React.FC = () => {
  // Convert JavaScript day (0=Sunday, 1=Monday, ..., 6=Saturday) to our format (0=Monday, 1=Tuesday, ..., 6=Sunday)
  const getCurrentDayIndex = () => {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1; // Sunday becomes 6, Monday becomes 0, etc.
  };

  const [selectedDay, setSelectedDay] = useState<number>(getCurrentDayIndex());

  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const shortDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  // Schedule data where 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
  const scheduleData: ScheduleData = {
    0: [
      // Monday
      {
        time: "07:00",
        title: "Утреннее шоу 'В постели с врагами'",
        duration: "07:00-10:00",
      },
      {
        time: "23:00",
        title: "РЕГРЕСОЛОГ ШОУ С ЯНОЙ СОЛАР",
        host: "Яна Солар",
      },
    ],
    1: [
      // Tuesday
      {
        time: "07:00",
        title: "Утреннее шоу 'В постели с врагами'",
        duration: "07:00-10:00",
      },
    ],
    2: [
      // Wednesday
      {
        time: "07:00",
        title: "Утреннее шоу 'В постели с врагами'",
        duration: "07:00-10:00",
      },
      { time: "19:00", title: "БОЛИД ТЕСТ ДРАЙВ" },
    ],
    3: [
      // Thursday
      {
        time: "07:00",
        title: "Утреннее шоу 'В постели с врагами'",
        duration: "07:00-10:00",
      },
      {
        time: "23:00",
        title: "РЕГРЕСОЛОГ ШОУ С ЯНОЙ СОЛАР",
        host: "Яна Солар",
      },
    ],
    4: [
      // Friday
      { time: "19:00", title: "ПЯТНИЧНЫЙ ПОДКАСТ" },
    ],
    5: [
      // Saturday
      { time: "20:00", title: "GLOBAL DANCE" },
    ],
    6: [
      // Sunday
      { time: "14:00", title: "GLOBAL DANCE" },
      { time: "18:00", title: "АРТИСТ ИЗ НАРОДА" },
    ],
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // "HH:MM"
  };

  const isCurrentShow = (showTime: string, duration?: string) => {
    if (selectedDay !== getCurrentDayIndex()) return false;

    const currentTime = getCurrentTimeString();
    const [showHour, showMinute] = showTime.split(":").map(Number);
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);

    const showTimeMinutes = showHour * 60 + showMinute;
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    if (duration) {
      const endTime = duration.split("-")[1];
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const endTimeMinutes = endHour * 60 + endMinute;

      return (
        currentTimeMinutes >= showTimeMinutes &&
        currentTimeMinutes < endTimeMinutes
      );
    }

    // For shows without duration, assume 1 hour
    return (
      currentTimeMinutes >= showTimeMinutes &&
      currentTimeMinutes < showTimeMinutes + 60
    );
  };

  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("ru-RU", options);
  };

  const getProgramWord = (count: number) => {
    if (count === 1) return "программа";
    if (count >= 2 && count <= 4) return "программы";
    return "программ";
  };

  return (
    <div className="schedule-page">
      {/* Hero Section */}
      <section className="schedule-hero">
        <div className="container">
          <div className="schedule-hero-content">
            <h1>Программа передач</h1>
            <p>Узнайте расписание ваших любимых программ на Радио Болид</p>
            <div className="current-date">
              <Calendar size={20} />
              <span>Сегодня: {getTodayDate()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="schedule-content">
        <div className="container">
          {/* Day Selector */}
          <div className="day-selector">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`day-button ${
                  selectedDay === index ? "active" : ""
                } ${index === getCurrentDayIndex() ? "today" : ""}`}
              >
                <span className="day-short">{shortDays[index]}</span>
                <span className="day-full">{day}</span>
              </button>
            ))}
          </div>

          {/* Selected Day Schedule */}
          <div className="schedule-section">
            <div className="schedule-header">
              <h2>
                <Radio size={24} />
                {days[selectedDay]}
                {selectedDay === getCurrentDayIndex() && (
                  <span className="today-badge">Сегодня</span>
                )}
              </h2>
              <p>
                {scheduleData[selectedDay]?.length || 0}{" "}
                {getProgramWord(scheduleData[selectedDay]?.length || 0)} в эфире
              </p>
            </div>

            <div className="shows-grid">
              {scheduleData[selectedDay]?.length > 0 ? (
                scheduleData[selectedDay].map((show, index) => (
                  <div
                    key={index}
                    className={`show-card ${
                      isCurrentShow(show.time, show.duration) ? "current" : ""
                    }`}
                  >
                    {isCurrentShow(show.time, show.duration) && (
                      <div className="live-indicator-show">
                        <div className="live-dot"></div>
                        <span>В ЭФИРЕ</span>
                      </div>
                    )}
                    <div className="show-time">
                      <Clock size={18} />
                      <span>{show.duration || show.time}</span>
                    </div>
                    <div className="show-details">
                      <h3>{show.title}</h3>
                      {show.host && (
                        <p className="show-host">
                          <Users size={16} />
                          {show.host}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-shows">
                  <Radio size={48} />
                  <h3>Нет программ</h3>
                  <p>
                    В этот день специальных программ не запланировано.
                    <br />
                    Слушайте нашу музыку 24/7!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
