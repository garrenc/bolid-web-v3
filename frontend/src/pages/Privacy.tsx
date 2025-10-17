import React from "react";

const Privacy: React.FC = () => (
  <div className="container" style={{ padding: "4rem 0" }}>
    <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
      Политика конфиденциальности
    </h1>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">1. Общие положения</h2>
      <ul className="legal-list">
        <li>
          Политика составлена в соответствии с Федеральным законом №152-ФЗ «О
          персональных данных».
        </li>
        <li>
          Оператор — ООО «Пермская радиовещательная компания» — обеспечивает
          защиту персональных данных пользователей сайта.
        </li>
        <li>
          Политика применяется ко всей информации, полученной через сайт
          https://bolidfm.ru.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">2. Термины</h2>
      <ul className="legal-list">
        <li>
          Автоматизированная обработка — с помощью вычислительной техники.
        </li>
        <li>Блокирование — временное прекращение обработки.</li>
        <li>
          Обезличивание — исключение возможности идентификации пользователя.
        </li>
        <li>Трансграничная передача — передача за пределы РФ.</li>
        <li>Уничтожение — безвозвратное удаление данных.</li>
        <li>Пользователь — посетитель сайта bolidfm.ru.</li>
        <li>Оператор — ООО «Пермская радиовещательная компания».</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">3. Обрабатываемые данные</h2>
      <ul className="legal-list">
        <li>Фамилия, имя, отчество</li>
        <li>Email</li>
        <li>Телефон</li>
        <li>Дата и место рождения</li>
        <li>
          Обезличенные данные (cookie, Яндекс Метрика, Google Analytics и др.)
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">4. Цели обработки</h2>
      <ul className="legal-list">
        <li>Предоставление доступа к сервисам сайта.</li>
        <li>Рассылка новостей и уведомлений (по желанию пользователя).</li>
        <li>Анализ поведения пользователей для улучшения сайта.</li>
      </ul>
      <p>
        Отказаться от рассылки можно, отправив письмо на{" "}
        <a href="mailto:office@bolidfm.ru" className="contact-link">
          office@bolidfm.ru
        </a>{" "}
        с темой «Отказ от уведомлений».
      </p>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">5. Правовые основания</h2>
      <ul className="legal-list">
        <li>Данные обрабатываются при заполнении форм на сайте.</li>
        <li>
          Сбор обезличенных данных — если это разрешено настройками браузера.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">6. Порядок обработки</h2>
      <ul className="legal-list">
        <li>Оператор применяет все необходимые меры защиты данных.</li>
        <li>Передача третьим лицам возможна только в рамках закона.</li>
        <li>
          Пользователь может обновить или отозвать данные по email:{" "}
          <a href="mailto:office@bolidfm.ru" className="contact-link">
            office@bolidfm.ru
          </a>
          .
        </li>
        <li>Срок обработки данных не ограничен.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">7. Трансграничная передача</h2>
      <ul className="legal-list">
        <li>
          Передача возможна при наличии адекватной защиты персональных данных в
          другой стране.
        </li>
        <li>Или при наличии письменного согласия пользователя.</li>
      </ul>
    </section>

    <section>
      <h2 className="section-title">8. Заключительные положения</h2>
      <ul className="legal-list">
        <li>
          Вопросы по обработке персональных данных — на{" "}
          <a href="mailto:office@bolidfm.ru" className="contact-link">
            office@bolidfm.ru
          </a>
          .
        </li>
        <li>
          Актуальная версия Политики размещена на{" "}
          <a href="https://bolidfm.ru/privacy" className="contact-link">
            bolidfm.ru/privacy
          </a>
          .
        </li>
        <li>Политика действует бессрочно до публикации новой версии.</li>
      </ul>
    </section>
  </div>
);

export default Privacy;
