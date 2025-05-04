import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { getBooks, bookSlice } from "./bookSlice";
import axios from "axios";

vi.mock("axios");

describe("Тест производительности запросов к книгам", () => {
  let store;
  let mockBooks;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        books: bookReducer
      }
    });

    store.dispatch(bookSlice.actions.reset());

    mockBooks = Array.from({ length: 100 }, (_, i) => ({
      _id: `book${i}`,
      title: `Book ${i}`,
      genre: i % 2 === 0 ? 'фантастика' : 'детектив'
    }));
  });

  it("Поиск", async () => {
    axios.get.mockResolvedValue({ data: mockBooks });
    const startTime = performance.now();
    await store.dispatch(getBooks({ search: "Book 1" }));
    const searchTime = performance.now() - startTime;
    expect(searchTime).toBeLessThan(100);
  });

  it("Фильтрация", async () => {
    axios.get.mockResolvedValue({ data: mockBooks });
    const startTime = performance.now();
    await store.dispatch(getBooks({ genre: "фантастика" }));
    const filterTime = performance.now() - startTime;
    expect(filterTime).toBeLessThan(100);
  });

  it("Сортировка", async () => {
    axios.get.mockResolvedValue({ data: mockBooks });
    const startTime = performance.now();
    await store.dispatch(getBooks({ sort: "asc" }));
    const sortTime = performance.now() - startTime;
    expect(sortTime).toBeLessThan(100);
  });

  it("Комбинированный", async () => {
    axios.get.mockResolvedValue({ data: mockBooks });
    const startTime = performance.now();
    await store.dispatch(getBooks({ 
      search: "Book", 
      genre: "фантастика", 
      sort: "asc" 
    }));
    const combinedTime = performance.now() - startTime;
    expect(combinedTime).toBeLessThan(200);
  });
}); 