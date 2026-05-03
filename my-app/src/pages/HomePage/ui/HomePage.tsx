import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { FAQSection } from '../../../features/faq';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate('/disciplines');
  };

  const handleLearnMoreClick = () => {
    navigate('/faq');
    // Прокрутка в начало страницы после перехода
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className={styles.page}>
      {/* Градиентный фон */}
      <div className={styles.gradientBg}>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
      </div>
      
      <Header />
      
      <main className={styles.main}>
        {/* Левая рука - справа */}
        <div className={styles.handLeft}>
          <img 
            src="/src/shared/assets/images/hand-left.png" 
            alt="Hand" 
            className={styles.handImage}
          />
        </div>

        {/* Правая рука - слева */}
        <div className={styles.handRight}>
          <img 
            src="/src/shared/assets/images/hand-right.png" 
            alt="Hand" 
            className={styles.handImage}
          />
        </div>

        <div className={styles.topSection}>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <h1 className={styles.titleSmall}>ЧТО ТАКОЕ</h1>
              <h1 className={styles.titleLarge}>ФИДЖИТАЛ?</h1>
              <p className={styles.description}>
                Турнир нового поколения: соревнуйтесь<br />
                в спорте и его киберспортивной версии.<br />
                Наш формат стирает границы: стратегия<br />
                начинается в спортзале и завершается<br />
                на виртуальной арене. Добейтесь<br />
                абсолютной победы!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.disciplinesTitleWrapper}>
          <h2 className={styles.disciplinesTitle}>НАШИ ДИСЦИПЛИНЫ</h2>
        </div>

        <div className={styles.disciplinesSection}>
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

        <FAQSection onButtonClick={handleLearnMoreClick} />
      </main>

      <Footer />
    </div>
  );
};