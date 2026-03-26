import React from 'react';
import styles from './FAQSection.module.scss';

interface FAQSectionProps {
  onButtonClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onButtonClick }) => {
  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.faqTitle}>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
        
        <div className={styles.faqGrid}>
          {/* Вопрос 1 - Где проходит мероприятие? */}
          <div className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>
              Где проходит<br />
              мероприятие?
            </h3>
            <p className={styles.faqAnswer}>
              Турнир проходит в<br />
              спортивном зале колледжа<br />
              для реального этапа и в<br />
              компьютерном классе для<br />
              киберспортивного, точное<br />
              расписание с указанием<br />
              времени и места<br />
              публикуется в личном<br />
              кабинете каждой команды.
            </p>
          </div>

          {/* Вопрос 2 - Что нужно для участия? */}
          <div className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>
              Что нужно<br />
              для участия?
            </h3>
            <p className={styles.faqAnswer}>
              Для участия необходима<br />
              команда из 5–8 человек,<br />
              спортивная форма,<br />
              действующий аккаунт в<br />
              игре (Steam/PSN/Xbox) и<br />
              медицинский допуск к<br />
              физкультуре.
            </p>
          </div>

          {/* Вопрос 3 - Как создать команду? */}
          <div className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>
              Как создать<br />
              команду?
            </h3>
            <p className={styles.faqAnswer}>
              Команда создаётся<br />
              капитаном в личном<br />
              кабинете через раздел<br />
              «Мои команды» путём<br />
              заполнения названия и<br />
              отправки приглашений<br />
              участникам, которые<br />
              должны подтвердить<br />
              своё вступление.
            </p>
          </div>
        </div>

        <div className={styles.faqButtonWrapper}>
          <button 
            className={styles.learnMoreButton}
            onClick={onButtonClick}
          >
            УЗНАТЬ БОЛЬШЕ
          </button>
        </div>
      </div>
    </div>
  );
};