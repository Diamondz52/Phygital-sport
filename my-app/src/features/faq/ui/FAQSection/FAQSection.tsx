import React from 'react';
import styles from './FAQSection.module.scss';

interface FAQSectionProps {
  onButtonClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onButtonClick }) => {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

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
            <div className={styles.faqAnswer}>
              <div className={styles.answerText}>
                Турнир проходит в<br />
                спортивном зале колледжа<br />
                для реального этапа и в<br />
                компьютерном классе для<br />
                киберспортивного, точное<br />
                расписание с указанием<br />
                времени и места<br />
                публикуется в личном<br />
                кабинете каждой команды.
              </div>
            </div>
          </div>

          {/* Вопрос 2 - Что нужно для участия? */}
          <div className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>
              Что нужно<br />
              для участия?
            </h3>
            <div className={styles.faqAnswer}>
              <div className={styles.answerText}>
                Для участия необходима<br />
                команда из 5–8 человек,<br />
                спортивная форма,<br />
                действующий аккаунт в<br />
                игре (Steam/PSN/Xbox) и<br />
                медицинский допуск к<br />
                физкультуре.
              </div>
            </div>
          </div>

          {/* Вопрос 3 - Как создать команду? */}
          <div className={styles.faqCard}>
            <h3 className={styles.faqQuestion}>
              Как создать<br />
              команду?
            </h3>
            <div className={styles.faqAnswer}>
              <div className={styles.answerText}>
                Команда создаётся<br />
                капитаном в личном<br />
                кабинете через раздел<br />
                «Мои команды» путём<br />
                заполнения названия и<br />
                отправки приглашений<br />
                участникам, которые<br />
                должны подтвердить<br />
                своё вступление.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.faqButtonWrapper}>
          <button 
            className={styles.learnMoreButton}
            onClick={handleClick}
          >
            УЗНАТЬ БОЛЬШЕ
          </button>
        </div>
      </div>
    </div>
  );
};