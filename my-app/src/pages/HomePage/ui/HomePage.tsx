import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { FAQSection } from '../../../features/faq';
import styles from './HomePage.module.scss';

// Массив фото для слайдера
const disciplineImages = [
  '/src/shared/assets/images/basketball.png',
  '/src/shared/assets/images/media1.png',
  '/src/shared/assets/images/basketball2.png',
  '/src/shared/assets/images/basketball3.png'
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null); // Исправлено: number вместо NodeJS.Timeout
  const pauseTimeoutRef = useRef<number | null>(null); // Исправлено: number вместо NodeJS.Timeout

  const handleDetailClick = () => {
    navigate('/disciplines');
  };

  const handleLearnMoreClick = () => {
    navigate('/faq');
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Остановка автоматического слайдера
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Запуск автоматического слайдера
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 4000);
  };

  // Пауза на 5 секунд при ручном переключении
  const pauseAutoSlide = () => {
    stopAutoSlide();
    
    // Очищаем предыдущий таймер паузы
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Запускаем таймер на 5 секунд, после чего возобновляем автопереключение
    pauseTimeoutRef.current = window.setTimeout(() => {
      startAutoSlide();
    }, 5000);
  };

  // Следующее фото
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % disciplineImages.length);
  };

  // Предыдущее фото
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + disciplineImages.length) % disciplineImages.length);
  };

  // Переход к определенному фото по точке
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Обработчик ручного переключения (с паузой)
  const handlePrevSlide = () => {
    prevSlide();
    pauseAutoSlide();
  };

  const handleNextSlide = () => {
    nextSlide();
    pauseAutoSlide();
  };

  const handleGoToSlide = (index: number) => {
    goToSlide(index);
    pauseAutoSlide();
  };

  // Запуск автопереключения при монтировании
  useEffect(() => {
    startAutoSlide();
    
    // Очистка при размонтировании
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.gradientBg}>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse2}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
      </div>
      
      <Header />
      
      <main className={styles.main}>
        <div className={styles.handLeft}>
          <img 
            src="/src/shared/assets/images/hand-left.png" 
            alt="Hand" 
            className={styles.handImage}
          />
        </div>

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
            
            {/* Кнопка "Назад" */}
            <button className={styles.sliderPrev} onClick={handlePrevSlide} aria-label="Предыдущее фото">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Фото */}
            <div className={styles.sliderContainer}>
              <img 
                src={disciplineImages[currentIndex]} 
                alt="Фиджитал Баскетбол" 
                className={styles.disciplineImage}
              />
            </div>
            
            {/* Кнопка "Вперед" */}
            <button className={styles.sliderNext} onClick={handleNextSlide} aria-label="Следующее фото">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
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
          
          {/* Индикаторы (точки) */}
          <div className={styles.sliderDots}>
            {disciplineImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => handleGoToSlide(index)}
              />
            ))}
          </div>
        </div>

        <FAQSection onButtonClick={handleLearnMoreClick} />
      </main>

      <Footer />
    </div>
  );
};