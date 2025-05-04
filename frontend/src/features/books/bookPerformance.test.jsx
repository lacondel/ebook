import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { getBooks, bookSlice } from "./bookSlice";
import authReducer from "../auth/authSlice";
import axios from "axios";

// Мокаем axios
vi.mock("axios");

describe("Тест производительности запросов к книгам", () => {
  let store;
  let mockBooks;

  beforeEach(() => {
    // Создаем тестовый store
    store = configureStore({
      reducer: {
        books: bookReducer,
        auth: authReducer
      }
    });

    // Создаем массив тестовых книг
    mockBooks = Array.from({ length: 100 }, (_, i) => ({
      _id: `book${i}`,
      title: `Book ${i}`,
      author: `Author ${i}`,
      genre: i % 2 === 0 ? 'фантастика' : 'детектив',
      description: `Description ${i}`,
      coverImage: `image${i}.jpg`
    }));

    // Мокаем ответ от API
    axios.get.mockResolvedValue({ data: mockBooks });
  });

  it("Измерение времени поиска по названию", async () => {
    const startTime = performance.now();
    
    await store.dispatch(bookSlice.actions.setSearch("Book 1"));
    await store.dispatch(getBooks({ search: "Book 1" }));
    
    const endTime = performance.now();
    const searchTime = endTime - startTime;

    console.log(`Время поиска по названию: ${searchTime}ms`);
    expect(searchTime).toBeLessThan(100); // Ожидаемое время выполнения
  });

  it("Измерение времени фильтрации по жанру", async () => {
    const startTime = performance.now();
    
    await store.dispatch(bookSlice.actions.setGenre("фантастика"));
    await store.dispatch(getBooks({ genre: "фантастика" }));
    
    const endTime = performance.now();
    const filterTime = endTime - startTime;

    console.log(`Время фильтрации по жанру: ${filterTime}ms`);
    expect(filterTime).toBeLessThan(100); // Ожидаемое время выполнения
  });

  it("Измерение времени сортировки", async () => {
    const startTime = performance.now();
    
    await store.dispatch(bookSlice.actions.setSort("asc"));
    await store.dispatch(getBooks({ sort: "asc" }));
    
    const endTime = performance.now();
    const sortTime = endTime - startTime;

    console.log(`Время сортировки: ${sortTime}ms`);
    expect(sortTime).toBeLessThan(100); // Ожидаемое время выполнения
  });

  it("Измерение времени комбинированного запроса", async () => {
    const startTime = performance.now();
    
    await store.dispatch(bookSlice.actions.setSearch("Book"));
    await store.dispatch(bookSlice.actions.setGenre("фантастика"));
    await store.dispatch(bookSlice.actions.setSort("asc"));
    await store.dispatch(getBooks({ 
      search: "Book", 
      genre: "фантастика", 
      sort: "asc" 
    }));
    
    const endTime = performance.now();
    const combinedTime = endTime - startTime;

    console.log(`Время комбинированного запроса: ${combinedTime}ms`);
    expect(combinedTime).toBeLessThan(200); // Ожидаемое время выполнения
  });
}); 