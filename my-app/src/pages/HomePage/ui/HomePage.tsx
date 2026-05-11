import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import { FAQSection } from '../../../features/faq';
import styles from './HomePage.module.scss';

// Массив фото для слайдера
const disciplineImages = [
  '/src/shared/assets/images/basketball.png',
  '/src/shared/assets/images/dis2.jpg',
  '/src/shared/assets/images/dis1.jpg',
  '/src/shared/assets/images/dis3.jpg'
];

// Массив названий для слайдера (соответствует фото)
const disciplineNames = [
  'Фиджитал Баскетбол',
  'Кибербаскетбол',
  'Виртуальный Спорт',
  'Цифровая Арена'
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

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

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const pauseAutoSlide = () => {
    stopAutoSlide();
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    pauseTimeoutRef.current = window.setTimeout(() => {
      startAutoSlide();
    }, 5000);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % disciplineImages.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + disciplineImages.length) % disciplineImages.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

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

  useEffect(() => {
    startAutoSlide();
    
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
          {/* Текст над карточкой */}
          <div className={styles.disciplineTitleWrapper}>
            <span className={`${styles.disciplineName} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
              {disciplineNames[currentIndex]}
            </span>
          </div>

          <div className={styles.sliderWrapper}>
            {/* Кнопка "Назад" */}
            <button className={styles.sliderPrev} onClick={handlePrevSlide} aria-label="Предыдущее фото">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow}></div>
              
              <div className={styles.sliderContainer}>
                <img 
                  key={currentIndex}
                  src={disciplineImages[currentIndex]} 
                  alt="Дисциплина" 
                  className={`${styles.disciplineImage} ${isTransitioning ? styles.imageFadeOut : styles.imageFadeIn}`}
                />
              </div>
              
              <div className={styles.imageContent}>
                <button 
                  className={styles.detailButton}
                  onClick={handleDetailClick}
                >
                  ПОДРОБНЕЕ
                </button>
              </div>
            </div>

            {/* Кнопка "Вперед" */}
            <button className={styles.sliderNext} onClick={handleNextSlide} aria-label="Следующее фото">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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