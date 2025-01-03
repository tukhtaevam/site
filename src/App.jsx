import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Search from './Components/Search';
import Info from './Components/Info';
import Sartirovka from './Components/Sartirovka';

function App() {
  const [userData, setUserData] = useState(null); // Состояние для данных пользователя
  const [repos, setRepos] = useState([]); // Состояние для репозиториев пользователя
  const [error, setError] = useState(null); // Состояние для ошибки
  const [loading, setLoading] = useState(false); // Состояние для загрузки

  // Функция для обработки поиска
  const handleSearch = async (query) => {
    if (!query.trim()) {
      alert('Введите имя пользователя!');
      return;
    }

    setLoading(true); // Начинаем загрузку
    setError(null); // Сбрасываем ошибку при новом поиске

    try {
      // Запрос данных пользователя
      const userResponse = await fetch(`https://api.github.com/users/${query}`);
      if (!userResponse.ok) {
        throw new Error('Пользователь не найден');
      }
      const userData = await userResponse.json();

      // Запрос данных репозиториев пользователя
      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();

      // Сохранение данных в состояние
      setUserData(userData);
      setRepos(reposData);
    } catch (error) {
      console.error(error.message);
      setUserData(null);
      setRepos([]);
      setError(error.message); // Устанавливаем ошибку
    } finally {
      setLoading(false); // Окончание загрузки
    }
  };

  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="search">
        <Search onSearch={handleSearch} />
      </div>

      {loading && <div>Загрузка...</div>} {/* Показываем сообщение, если идёт загрузка */}

      {error && <div className="error">{error}</div>} {/* Показываем ошибку, если она есть */}

      <div className="info">
        <Info userData={userData} />
      </div>

      <div className="sortirovka">
        {/* Передаем userData в Sartirovka */}
        <Sartirovka repos={repos} userData={userData} />
      </div>
    </div>
  );
}

export default App;
