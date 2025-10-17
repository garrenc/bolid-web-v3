import React from "react";

const Reglament: React.FC = () => (
  <div className="container" style={{ padding: "4rem 0" }}>
    <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
      Регламент
    </h1>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">1. Общие положения</h2>
      <ul className="legal-list">
        <li>
          Сайт bolidfm.ru принадлежит ООО «Пермская радиовещательная компания».
        </li>
        <li>
          Соглашение регулирует отношения между Администрацией и Пользователем.
        </li>
        <li>Администрация может вносить изменения без уведомления.</li>
        <li>
          Продолжая использование сайта, Пользователь соглашается с Соглашением.
        </li>
        <li>Пользователь сам проверяет актуальность условий.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">2. Термины</h2>
      <ul className="legal-list">
        <li>
          <strong>Администрация сайта</strong> — сотрудники ООО «Пермская
          радиовещательная компания», управляющие сайтом.
        </li>
        <li>
          <strong>Пользователь</strong> — лицо, использующее сайт через
          интернет.
        </li>
        <li>
          <strong>Содержание сайта</strong> — все охраняемые материалы и
          интерфейсы сайта.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">3. Предмет соглашения</h2>
      <p>
        Доступ к информации и сервисам сайта предоставляется на условиях
        публичной оферты.
      </p>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">4. Права и обязанности сторон</h2>

      <h3 className="subsection-title">Администрация вправе:</h3>
      <ul className="legal-list">
        <li>Изменять правила и содержание сайта.</li>
        <li>Ограничить доступ при нарушении условий.</li>
      </ul>

      <h3 className="subsection-title">Пользователь вправе:</h3>
      <ul className="legal-list">
        <li>Пользоваться услугами сайта.</li>
        <li>Обращаться с вопросами к Администрации.</li>
      </ul>

      <h3 className="subsection-title">Пользователь обязуется:</h3>
      <ul className="legal-list">
        <li>Соблюдать авторские и имущественные права.</li>
        <li>Не нарушать работу сайта.</li>
        <li>Не распространять конфиденциальную информацию.</li>
        <li>Не использовать сайт в незаконных целях.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">5. Запрещено</h2>
      <ul className="legal-list">
        <li>Использование ботов и автоматических средств сбора данных.</li>
        <li>Обход систем безопасности сайта.</li>
        <li>Несанкционированный доступ к данным других пользователей.</li>
        <li>Любая деятельность, нарушающая законодательство РФ.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">6. Использование сайта</h2>
      <ul className="legal-list">
        <li>
          Содержание сайта охраняется законом и не подлежит копированию без
          согласия.
        </li>
        <li>Администрация может менять перечень услуг без уведомления.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">7. Ответственность</h2>
      <ul className="legal-list">
        <li>Убытки в результате нарушений Пользователем не возмещаются.</li>
        <li>
          Не несётся ответственность за сбои и задержки, вызванные внешними
          факторами.
        </li>
        <li>
          Администрация не обязана обеспечивать Пользователя техническими
          средствами.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">8. Нарушение условий</h2>
      <ul className="legal-list">
        <li>
          Администрация может раскрыть данные Пользователя при нарушениях.
        </li>
        <li>Доступ может быть заблокирован без уведомления.</li>
        <li>Не несётся ответственность за последствия блокировки доступа.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">9. Разрешение споров</h2>
      <ul className="legal-list">
        <li>До суда обязателен претензионный порядок (30 дней на ответ).</li>
        <li>Иски подаются в установленные законом сроки.</li>
      </ul>
    </section>

    <section>
      <h2 className="section-title">10. Дополнительные условия</h2>
      <ul className="legal-list">
        <li>Отзывы пользователей не считаются конфиденциальной информацией.</li>
        <li>
          Администрация не принимает предложения по изменению условий
          соглашения.
        </li>
      </ul>
    </section>
  </div>
);

export default Reglament;
