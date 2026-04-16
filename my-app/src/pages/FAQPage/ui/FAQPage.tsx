import React from 'react';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import styles from './FAQPage.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPage: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: 'Где проходит мероприятие?',
      answer: 'Мы не публикуем адрес\nзаранее, чтобы сохранять\nгибкость в выборе\nплощадки под формат\nтурнира. Но не\nпереживайте — все\nучастники обязательно\nполучат информацию о\nместе проведения.'
    },
    {
      question: 'Что нужно\nдля участия?',
      answer: 'Для участия необходима\nзарегистрированная\nкоманда из 5–8 человек,\nспортивная форма,\nдействующий аккаунт в\nигре (Steam/PSN/Xbox) и\nмедицинский допуск к\nфизкультуре.'
    },
    {
      question: 'Как создать\nкоманду?',
      answer: 'Команды создаются через\nорганизаторов турниров.\nЧтобы создать команду,\nотправьте заявку на почту с\nназванием команды,\nсписком участников с\nуказанием капитана. После\nпроверки организатор\nзарегистрирует вашу\nкоманду.'
    },
    {
      question: 'Как принять\nучастие в турнире?',
      answer: 'Чтобы принять участие,\nнеобходимо\nзарегистрировать команду,\nподтвердить участие,\nполучить расписание и\nзатем пройти оба этапа\nсоревнований — в\nреальном спорте и в\nкиберспорте.'
    },
    {
      question: 'Как определяется\nпобедитель?',
      answer: 'По сумме очков за оба\nэтапа. Результаты\nреального спорта и\nкиберспорта складываются\n— побеждает команда с\nнаибольшим итоговым\nсчётом.'
    },
    {
      question: 'Остались вопросы?',
      answer: 'Не нашли ответ? Есть\nидея? Мы всегда на связи и\nоткрыты к диалогу!\nПереходите на\nстраницу «Контакты» —\nтам собраны все способы\nсвязи с нами. Напишите, и\nмы поможем!'
    }
  ];

  // Распределение по колонкам
  const leftColumnItems = [faqItems[0], faqItems[3]]; // Где проходит? и Как принять участие?
  const centerColumnItems = [faqItems[1], faqItems[4]]; // Что нужно? и Как определяется?
  const rightColumnItems = [faqItems[2], faqItems[5]]; // Как создать? и Остались вопросы?

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>FAQ</h1>
          
          <div className={styles.faqGrid}>
            {/* Левая колонка */}
            <div className={styles.column}>
              {leftColumnItems.map((item, index) => (
                <div key={index} className={styles.faqCard}>
                  <h2 className={styles.question}>{item.question}</h2>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Центральная колонка */}
            <div className={styles.column}>
              {centerColumnItems.map((item, index) => (
                <div key={index} className={styles.faqCard}>
                  <h2 className={styles.question}>{item.question}</h2>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Правая колонка */}
            <div className={styles.column}>
              {rightColumnItems.map((item, index) => (
                <div key={index} className={styles.faqCard}>
                  <h2 className={styles.question}>{item.question}</h2>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};