import React, { useState } from 'react';
import s from './search.module.scss';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query); // Передаем запрос в родительский компонент
    } else {
      alert('Введите имя пользователя!'); // Если поле пустое, выводим сообщение
    }
  };

  return (
    <div className={s.container}>
      <form className={s.search__form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={s.search__input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите имя пользователя"
        />
        <button type="submit" className={s.search__button}>
          НАЙТИ
        </button>
      </form>
    </div>
  );
};

export default Search;
