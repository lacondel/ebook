import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookReducer from "../books/bookSlice";
import BookList from "../../pages/BookList";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Перенаправление неавторизованного пользователя", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("Перенаправление на страницу входа при отсутствии авторизации", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        books: bookReducer
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookList />
        </BrowserRouter>
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
}); 