import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './DisciplinesPage.module.scss';

export const DisciplinesPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
      
      {/* Фото баскетболиста - вне контейнера */}
      <div className={styles.basketballPlayer}>
        <img 
          src="/src/shared/assets/images/basketball-player.png" 
          alt="Basketball Player" 
        />
      </div>
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Заголовок */}
          <h1 className={styles.title}>ФИДЖИТАЛ БАСКЕТБОЛ</h1>
          
          {/* Описание под заголовком */}
          <p className={styles.description}>
            Фиджитал-баскетбол — это уникальный гибридный формат, объединяющий реальный спорт и киберспорт.<br />
            Команды проходят два этапа: физические испытания на баскетбольной площадке и виртуальный матч в NBA<br />
            2K. Победитель определяется суммой очков, заработанных на обоих этапах.
          </p>

          {/* Правила и геймплей - заголовок по центру */}
          <h2 className={styles.sectionHeader}>Правила и геймплей</h2>

          {/* Этап 1 - заголовок вне блока, левее */}
          <h3 className={styles.stageHeader}>Этап 1: Реальная баскетбольная игра</h3>

          {/* Блок 1.1 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>1.1. Формат матча</h4>
            <ul className={styles.list}>
              <li>Составы: 3×3</li>
              <li>Продолжительность: либо 21 очко, либо 10 минут чистого времени</li>
              <li>Площадка: Стандартная баскетбольная площадка</li>
              <li>Составы команд: 3 основных игроков + не более 2 запасных</li>
            </ul>
          </div>

          {/* Блок 1.2 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>1.2. Правила игры</h4>
            <p className={styles.blockSubtitle}>Основные правила:</p>
            <ul className={styles.list}>
              <li>Бросок из зоны ближе 6.75 м: 2 очка</li>
              <li>Бросок из-за трёхочковой линии (6.75 м): 3 очка</li>
              <li>Штрафной бросок: 1 очко</li>
            </ul>
            <p className={styles.blockSubtitle}>Фолы и нарушения:</p>
            <ul className={styles.list}>
              <li>5 персональных фолов на игрока → удаление до конца игры</li>
              <li>Командные фолы: после 5-го фола за тайм — штрафные броски</li>
              <li>Технический фол: 2 штрафных броска + владение</li>
              <li>Неспортивный фол: 2 штрафных броска + владение</li>
            </ul>
            <p className={styles.blockSubtitle}>Тайм-ауты:</p>
            <ul className={styles.list}>
              <li>3 тайм-аута в первой половине игры</li>
              <li>Длительность: 60 секунд</li>
            </ul>
            <p className={styles.blockSubtitle}>Замены:</p>
            <ul className={styles.list}>
              <li>Неограниченное количество замен</li>
              <li>Замена только при остановке игры</li>
              <li>Игрок может вернуться в игру неограниченно</li>
            </ul>
          </div>

          {/* Блок 1.3 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>1.3. Система начисления баллов за реальный матч</h4>
            <p className={styles.blockSubtitle}>Базовые баллы за результат матча (максимум 40 баллов):</p>
            <ul className={styles.list}>
              <li>Победа: 35 баллов</li>
              <li>Поражение с разницей до 5 очков: 15 баллов</li>
              <li>Поражение с разницей 6-15 очков: 10 баллов</li>
              <li>Поражение с разницей более 15 очков: 5 баллов</li>
              <li>За каждый выигранный тайм: +3 балла (максимум +12)</li>
            </ul>
          </div>

          {/* Фото джойстиков на блоках 2.2 и 2.3 */}
          <div className={styles.joystickImage}>
            <img 
              src="/src/shared/assets/images/joystick.png" 
              alt="Joystick" 
              className={styles.joystickImg}
            />
          </div>

          {/* Этап 2 - заголовок вне блока, левее */}
          <h3 className={styles.stageHeader}>Этап 2: Виртуальный матч в баскетбольном симуляторе</h3>

          {/* Блок 2.1 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>2.1. Формат матча</h4>
            <ul className={styles.list}>
              <li>Игра: Актуальный баскетбольный симулятор (NBA 2K)</li>
              <li>Режим: Экспресс-матч</li>
              <li>Продолжительность: 4 квартала по 6 минут</li>
              <li>Сложность: Профессиональная</li>
              <li>Платформа: Единая для всех участников (PS5/Xbox/PC)</li>
            </ul>
          </div>

          {/* Блок 2.2 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>2.2. Основные правила виртуального матча</h4>
            <ul className={styles.list}>
              <li>Выбор команд из доступного списка</li>
              <li>Запрещены пользовательские сборные</li>
              <li>Настройки по умолчанию (реалистичные)</li>
            </ul>
          </div>

          {/* Блок 2.3 */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>2.3. Система начисления очков за виртуальный матч</h4>
            <p className={styles.blockSubtitle}>Базовые баллы:</p>
            <ul className={styles.list}>
              <li>Победа в матче: 40 баллов</li>
              <li>Разница очков: до 10 дополнительных баллов</li>
              <li>Победа 1–5 очков: +2 балла</li>
              <li>Победа 6–10 очков: +5 баллов</li>
              <li>Победа 11+ очков: +10 баллов</li>
            </ul>
          </div>

          {/* Отдельный блок для Штрафных санкций и Требований */}
          <div className={styles.blockCard}>
            <h4 className={styles.blockTitle}>Штрафные санкции</h4>
            <ul className={styles.list}>
              <li>Грубые нарушения игровой этики: дисквалификация</li>
            </ul>
            
            <h4 className={styles.blockTitle}>Требования к участникам</h4>
            <ul className={styles.list}>
              <li>Спортивная форма для реальной игры</li>
              <li>Базовые навыки игры в баскетбол</li>
              <li>Опыт в баскетбольных симуляторах</li>
              <li>Медицинский допуск</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};