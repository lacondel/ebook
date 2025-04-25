import React, { memo } from 'react';
import BookItem from './BookItem';
import Spinner from './Spinner';

const BookListContent = memo(({ books, isLoading, user }) => {
  if (isLoading) {
    return (
      <div className="books">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="books">
        <h3 className="text-center text-gray-500 mt-8">
          {user?.role === 'admin' 
            ? 'Список книг пуст. Добавьте первую книгу!' 
            : 'База книг пуста'}
        </h3>
      </div>
    );
  }

  return (
    <div className="books">
      {books.map((book) => (
        <BookItem key={book._id} book={book} user={user} />
      ))}
    </div>
  );
});

BookListContent.displayName = 'BookListContent';

export default BookListContent; 