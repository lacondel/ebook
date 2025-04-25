import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch, setGenre, setSort } from '../features/books/bookSlice';

const BookFilters = () => {
  const dispatch = useDispatch();

  const genres = [
    'Все жанры',
    'комедия',
    'драма',
    'фантастика',
    'ужасы',
    'детектив',
    'приключения',
    'мистика',
    'фэнтези',
    'психология',
    'история',
    'трагедия',
    'роман',
    'роман-эпопея',
    'повесть',
    'рассказ',
    'триллер',
    'научная литература',
    'биография',
    'поэзия',
    'лирическое стихотворение',
    'элегия',
    'послание',
    'эпиграмма',
    'ода',
    'сонет',
    'поэма',
    'баллада',
    'сказка',
    'публицистика',
    'художественная литература',
    'литература',
    'классика',
    'современная проза',
    'антиутопия',
    'боевик',
    'военная проза',
    'детская литература',
    'исторический роман',
    'криминальный роман',
    'любовный роман',
    'мемуары',
    'научная фантастика',
    'политический роман',
    'притча',
    'реализм',
    'сатира',
    'сентиментальный роман',
    'социальная проза',
    'философская проза',
    'философия',
    'эпистолярный роман',
    'эссе',
    'научно-популярная литература',
    'философская сказка',
    'программирование'
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  };

  const handleGenreChange = (e) => {
    e.preventDefault();
    const value = e.target.value === 'Все жанры' ? '' : e.target.value;
    dispatch(setGenre(value));
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    dispatch(setSort(e.target.value));
  };

  return (
    <div className="filters-container">
      <div className="search-input">
        <input
          type="text"
          placeholder="Поиск по названию..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="filters">
        <select
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          onChange={handleSortChange}
        >
          <option value="">Сортировка</option>
          <option value="asc">По названию (А-Я)</option>
          <option value="desc">По названию (Я-А)</option>
        </select>
      </div>
    </div>
  );
};

export default BookFilters; 