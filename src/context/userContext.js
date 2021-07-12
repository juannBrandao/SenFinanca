import React, { createContext,  useReducer } from "react";
import TransactionReducer from "./transactionReducer";
const initialStateTransaction = { transactions: [] };
export const UserContext = createContext({ ...initialStateTransaction });

export function UserContextProvider({ children }) {
  const [stateTransaction, dispatchTransaction] = useReducer(
    TransactionReducer,
    initialStateTransaction
  );
  function newTransaction(transaction) {
    dispatchTransaction({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function removeTransaction(transactionID) {
    dispatchTransaction({
      type: "REMOVE_TRANSACTION",
      payload: transactionID,
    });
  }
  function updateTransaction(transaction) {
    dispatchTransaction({
      type: "UPDATE_TRANSACTION",
      payload: transaction,
    });
  }
  function loadTransactions(transaction) {
    dispatchTransaction({
      type: "LOAD_TRANSACTIONS",
      payload: transaction,
    });
  }
  return (
    <UserContext.Provider
      value={{
        newTransaction,
        removeTransaction,
        updateTransaction,
        loadTransactions,
        ...stateTransaction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
