import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { UserContext } from "../../context/userContext";
import Home from "./index";
const newTransaction = jest.fn();
const removeTransaction = jest.fn();
const updateTransaction = jest.fn();
const loadTransactions = jest.fn();
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const mockTransaction = [
  {
    id: 966,
    type: "1",
    title: "salário",
    date: "12/07/2021",
    value: 1200,
    category: {
      id: "10",
      value: "RECEITA",
    },
  },
];
const wrapper = (
  <UserContext.Provider
    value={{
      newTransaction,
      removeTransaction,
      updateTransaction,
      loadTransactions,
      transactions: mockTransaction,
    }}
  >
    <Home />
  </UserContext.Provider>
);
jest.spyOn(window, 'alert').mockImplementation(() => {});
describe("Home Componnent", () => {
  beforeEach(() => {
    localStorage.setItem("transactions", JSON.stringify(mockTransaction));
  })
  it("should renders component", () => {
    render(wrapper);
    expect(screen).toBeTruthy();
  });
  it("should open modal", () => {
    render(wrapper);
    fireEvent.click(screen.getByText('salário'))
    const Modal =  document.getElementById('modalTransaction')
    fireEvent.click(Modal.querySelector(".modal-content"))
    expect(Modal).toHaveClass("show");
  });
  it("should close modal", () => {
    render(wrapper);
    fireEvent.click(screen.getByText('salário'))
    const Modal =  document.getElementById('modalTransaction')
    fireEvent.click(Modal.querySelector(".modal-content"))
    expect(Modal).toHaveClass("show");
    fireEvent.click(screen.getByTestId("close_modal"))
    expect(Modal).not.toHaveClass("show");
  });
  it("should open modal, wen new transaction", () => {
    render(wrapper);
    fireEvent.click(screen.getByTestId('ButtonNewTransaction'))
    const Modal =  document.getElementById('modalTransaction')
    expect(Modal).toHaveClass("show");
  });
  it("should add new transaction", () => {
    render(wrapper);
    fireEvent.click(screen.getByTestId('ButtonNewTransaction'))
    fireEvent.input(screen.getByTestId('transaction_title'),{target:{value:'transaction teste'}})
    fireEvent.click(screen.getByTestId('transaction_type'))
    fireEvent.input(screen.getByTestId('transaction_value'),{target:{value:89}})
    fireEvent.click(screen.getByTestId('transaction_category'))
    fireEvent.click(screen.getAllByText('CASA')[0])
    fireEvent.click(screen.getByTestId('transaction_add'))
    expect(newTransaction).toBeCalled();

  });
  it("should show alert to validate form", () => {
    render(wrapper);
    fireEvent.click(screen.getByTestId('ButtonNewTransaction'))
    fireEvent.click(screen.getByTestId('transaction_add'))
    expect(window.alert).toBeCalled();

  });
  it("should update transaction", () => {
    render(wrapper);
    fireEvent.click(screen.getByText('salário'))
    fireEvent.input(screen.getByTestId('transaction_title'),{target:{value:'transaction teste'}})
    fireEvent.click(screen.getByTestId("transaction_update"))
    expect(updateTransaction).toBeCalled();
  });
  it("should delete transaction", () => {
    render(wrapper);
    fireEvent.click(screen.getByText('salário'))
    fireEvent.click(screen.getByTestId("transaction_delete"))
    expect(removeTransaction).toBeCalled();
  });
  it("should change filter", () => {
    render(wrapper);
    fireEvent.click(screen.getByTestId('filter_type'))
    fireEvent.click(screen.getAllByText('Entrada')[0])
    expect(screen.getAllByText('salário')[0]).toBeInTheDocument();
  });
  it("should change filter category", () => {
    render(wrapper);
    fireEvent.click(screen.getByTestId('filter_type'))
    fireEvent.click(screen.getByTestId('filter_Category'))
    fireEvent.click(screen.getAllByText('Todas')[0])
    fireEvent.click(screen.getAllByText('RECEITA')[0])
    expect(screen.getAllByText('salário')[0]).toBeInTheDocument();
  });
});
