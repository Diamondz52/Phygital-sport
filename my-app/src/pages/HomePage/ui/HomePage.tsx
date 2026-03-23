import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { FAQSection } from '../../../entities/faq';
import styles from './HomePage.module.scss';

const faqItems = [
  {
    question: 'Где проходит мероприятие?',
    answer: 'Турнир проходит в спортивном зале колледжа для реального этапа и в компьютерном классе для киберспортивного, точное расписание с указанием времени и места публикуется в личном кабинете каждой команды.'
  },
  {
    question: 'Что нужно для участия?',
    answer: 'Для участия необходима команда из 5–8 человек, спортивная форма, действующий аккаунт в игре (Steam/PSN/Xbox) и медицинский допуск к физкультуре.'
  },
  {
    question: 'Как создать команду?',
    answer: 'Команда создаётся капитаном в личном кабинете через раздел «Мои команды» путём заполнения названия и отправки приглашений участникам, которые должны подтвердить своё вступление.'
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate('/disciplines');
  };

  const handleLearnMoreClick = () => {
    navigate('/faq');
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Первая рука (справа) */}
        <div className={styles.handLeft}>
          <img 
            src="/src/shared/assets/images/hand-left.png" 
            alt="Hand" 
            className={styles.handImage}
          />
        </div>

        <div className={styles.topSection}>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <h1 className={styles.title}>ЧТО ТАКОЕ ФИДЖИТАЛ?</h1>
              <p className={styles.description}>
                Турнир нового поколения: соревнуйтесь в спорте и его киберспортивной версии. 
                Наш формат стирает границы: стратегия начинается в спортзале и завершается 
                на виртуальной арене. Добейтесь абсолютной победы!
              </p>
            </div>
          </div>
        </div>

        {/* Вторая рука (слева) */}
        <div className={styles.handRight}>
          <img 
            src="/src/shared/assets/images/hand-right.png" 
            alt="Hand" 
            className={styles.handImage}
          />
        </div>

        <div className={styles.disciplinesSection}>
          <div className={styles.container}>
            <div className={styles.rightColumn}>
              <h2 className={styles.disciplinesTitle}>НАШИ ДИСЦИПЛИНЫ</h2>
              <div className={styles.imageWrapper}>
                <div className={styles.imageGlow}></div>
                <img 
                  src="/src/shared/assets/images/basketball.png" 
                  alt="Фиджитал Баскетбол" 
                  className={styles.disciplineImage}
                />
                <div className={styles.imageContent}>
                  <span className={styles.disciplineName}>Фиджитал Баскетбол</span>
                  <button 
                    className={styles.detailButton}
                    onClick={handleDetailClick}
                  >
                    ПОДРОБНЕЕ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FAQSection 
          items={faqItems} 
          onButtonClick={handleLearnMoreClick}
        />
      </main>

      <Footer />
    </div>
  );
};