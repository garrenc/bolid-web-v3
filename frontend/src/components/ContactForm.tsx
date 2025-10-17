import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Hidden field for spam protection
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Hidden field for spam protection
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно быть не менее 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely spam
    if (formData.honeypot) {
      console.log("Spam detected - honeypot field filled");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <User size={18} />
              Имя *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Введите ваше имя"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={18} />
              Email адрес *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Введите ваш email"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            <MessageSquare size={18} />
            Тема
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Выберите тему</option>
            <option value="Общий вопрос">Общий вопрос</option>
            <option value="Реклама">Реклама</option>
            <option value="Партнерство">Партнерство</option>
            <option value="Отзыв">Отзыв</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        {/* Honeypot field - hidden from users */}
        <div style={{ display: "none" }}>
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            <MessageSquare size={18} />
            Сообщение *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`form-textarea ${errors.message ? "error" : ""}`}
            placeholder="Расскажите, что вас интересует..."
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button ${
            submitStatus === "success" ? "success" : ""
          }`}
        >
          {isSubmitting ? (
            <div className="loading-spinner"></div>
          ) : submitStatus === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <Send size={20} />
          )}
          <span>
            {isSubmitting
              ? "Отправляем..."
              : submitStatus === "success"
              ? "Отправлено!"
              : "Отправить сообщение"}
          </span>
        </button>

        {submitStatus === "success" && (
          <div className="success-message">
            <CheckCircle size={20} />
            <span>
              Спасибо! Ваше сообщение успешно отправлено. Мы скоро вам ответим!
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>
              Извините, произошла ошибка при отправке сообщения. Попробуйте еще
              раз или свяжитесь с нами напрямую.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
