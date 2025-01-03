import React, { useState, useEffect } from 'react';
import s from './sartirovka.module.scss';

const Sartirovka = ({ repos, userData }) => {
  const [sortField, setSortField] = useState("");
  const [sortedRepos, setSortedRepos] = useState([]);
  
  // Функция для случайного перемешивания репозиториев
  const shuffleRepos = (repos) => {
    return repos.sort(() => Math.random() - 0.5);
  };

  // Сортировка данных
  const sortData = (field) => {
    setSortField(field);
    const sortedData = [...repos].sort((a, b) => {
      if (field === "name") {
        return a.name.localeCompare(b.name);  // Сортировка по имени (алфавитный порядок)
      } else if (field === "stars") {
        return b.stargazers_count - a.stargazers_count;  // Сортировка по количеству звезд (по убыванию)
      } else if (field === "date") {
        return new Date(b.created_at) - new Date(a.created_at);  // Сортировка по дате создания (по убыванию)
      }
      return 0;
    });
    setSortedRepos(sortedData);
  };

  // Используем эффект, чтобы установить случайный порядок при первом рендере
  useEffect(() => {
    setSortedRepos(shuffleRepos([...repos]));
  }, [repos]);

  if (!userData) {
    return <div className={s.df}>Пожалуйста, найдите пользователя для отображения информации о репозиториях.</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.sortButtons}>
        <button
          onClick={() => sortData("name")}
          className={sortField === "name" ? s.activeButton : ""}
          aria-pressed={sortField === "name"}
        >
          Имя
        </button>
        <button
          onClick={() => sortData("stars")}
          className={sortField === "stars" ? s.activeButton : ""}
          aria-pressed={sortField === "stars"}
        >
          Звёзды
        </button>
        <button
          onClick={() => sortData("date")}
          className={sortField === "date" ? s.activeButton : ""}
          aria-pressed={sortField === "date"}
        >
          Дата
        </button>
      </div>

      <div className={s.list}>
        {sortedRepos.map((item) => (
          <div key={item.name} className={s.item}>
            <h3>{item.name}</h3>
            <p>Кол-во звёзд: {item.stargazers_count}</p>
            <p>Дата добавления: {new Date(item.created_at).toLocaleDateString()}</p>
            {/* Добавляем ссылки и кнопки для перехода на репозиторий */}
            <a href={`https://github.com/${userData.login}/${item.name}`} target="_blank" rel="noopener noreferrer">
              <button className={s.visitButton}>Посетить</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sartirovka;
