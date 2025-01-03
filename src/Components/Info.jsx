import React from 'react';
import s from './info.module.scss';

const Info = ({ userData }) => {
  if (!userData) {
    return <p style={{ textAlign: 'center' }}>Данные пользователя будут отображены здесь...</p>;
  }

  return (
    <section className={s.info__section}>
      <div className={s.info__section1}>
        <img src={userData.avatar_url} alt={userData.login} className={s.info__section1_img} />
        <div className={s.info__BUTT}>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            <button className={s.info__section1_but}>ПОСЕТИТЬ</button>
          </a>
        </div>
      </div>
      <div className={s.info__section2}>
        <h2 className={s.info__section2_h2}>{userData.login}</h2>
        <h2 className={s.info__section2_h2}>Репозиториев: {userData.public_repos}</h2>
        <h2 className={s.info__section2_h2}>
          Создан: {new Date(userData.created_at).toLocaleDateString()}
        </h2>
        <h2 className={s.info__section2_h2}>Подписчиков: {userData.followers}</h2>
        <h2 className={s.info__section2_h2}>Подписок: {userData.following}</h2>
      </div>
    </section>
  );
};

export default Info;
