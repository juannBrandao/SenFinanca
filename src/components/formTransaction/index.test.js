import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserContext } from "../../context/userContext";
import FormTransaction from "./index";
const newTransaction = jest.fn();
const removeTransaction = jest.fn();
const updateTransaction = jest.fn();
const setShowModal = jest.fn();
const selectedTransaction = jest.fn();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const mockCategories= [
  [
    {
      id: 1,
      value: "ALIMENTAÇÂO",
    },
    {
      id: 2,
      value: "ANIMAL DE ESTIMAÇÃO",
    },
    {
      id: 3,
      value: "CASA",
    },
    {
      id: 4,
      value: "EDUCAÇÃO",
    },

  ],
];
const wrapper = (
  <FormTransaction
    transaction={selectedTransaction}
    newTransaction={newTransaction}
    removeTransaction={removeTransaction}
    setShowModal={setShowModal}
    updateTransaction={updateTransaction}
    categories={mockCategories}
  />
);
describe("Form Componnent", () => {

  it("should renders component", () => {
    render(wrapper);
    expect(screen).toBeTruthy();
  });
});
