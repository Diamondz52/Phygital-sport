import React, { useState } from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './MediaPage.module.scss';

interface ImageItem {
  id: number;
  src: string;
  modalSrc: string;
  alt: string;
}

export const MediaPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images: ImageItem[] = [
    { id: 1, src: '/src/shared/assets/images/media1.png', modalSrc: '/src/shared/assets/images/modal1.png', alt: 'Media 1' },
    { id: 2, src: '/src/shared/assets/images/media2.png', modalSrc: '/src/shared/assets/images/modal2.png', alt: 'Media 2' },
    { id: 3, src: '/src/shared/assets/images/media3.png', modalSrc: '/src/shared/assets/images/modal3.png', alt: 'Media 3' },
    { id: 4, src: '/src/shared/assets/images/media4.png', modalSrc: '/src/shared/assets/images/modal4.png', alt: 'Media 4' },
    { id: 5, src: '/src/shared/assets/images/media5.png', modalSrc: '/src/shared/assets/images/modal5.png', alt: 'Media 5' },
    { id: 6, src: '/src/shared/assets/images/media6.png', modalSrc: '/src/shared/assets/images/modal6.png', alt: 'Media 6' },
    { id: 7, src: '/src/shared/assets/images/media1.png', modalSrc: '/src/shared/assets/images/modal1.png', alt: 'Media 7' },
    { id: 8, src: '/src/shared/assets/images/media2.png', modalSrc: '/src/shared/assets/images/modal2.png', alt: 'Media 8' },
    { id: 9, src: '/src/shared/assets/images/media3.png', modalSrc: '/src/shared/assets/images/modal3.png', alt: 'Media 9' },
    { id: 10, src: '/src/shared/assets/images/media4.png', modalSrc: '/src/shared/assets/images/modal4.png', alt: 'Media 10' },
    { id: 11, src: '/src/shared/assets/images/media5.png', modalSrc: '/src/shared/assets/images/modal5.png', alt: 'Media 11' },
    { id: 12, src: '/src/shared/assets/images/media6.png', modalSrc: '/src/shared/assets/images/modal6.png', alt: 'Media 12' },
  ];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextImage();
    }
    if (touchStart - touchEnd < -50) {
      prevImage();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'Escape') {
      closeModal();
    }
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
        <div className={styles.container}>
          <h1 className={styles.title}>МЕДИАЦЕНТР</h1>
          <p className={styles.subtitle}>
            Смотрите, как это было: фото с лучших турниров, портреты игроков и атмосфера закулисья.
          </p>

          <div className={styles.gallery}>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.alt}
                className={styles.image}
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {selectedImageIndex !== null && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <button className={styles.prevButton} onClick={prevImage} disabled={selectedImageIndex === 0}>‹</button>
            <button className={styles.nextButton} onClick={nextImage} disabled={selectedImageIndex === images.length - 1}>›</button>
            <img src={images[selectedImageIndex].modalSrc} alt={images[selectedImageIndex].alt} className={styles.modalImage} />
            <div className={styles.counter}>
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};