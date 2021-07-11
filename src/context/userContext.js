import React, { useEffect, createContext, useState } from "react";

// const transactions = [
//   {
//     id: 1,
//     type: "despesa",
//     title: "fone de ouvido",
//     date: "01/01/2000",
//     value: -80,
//     category: "compras",
//   },
// ];

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );
  const transactions =
    localStorage.getItem("transactions") !== null
      ? localStorageTransactions
      : [];

  const [currentTransactions, setCurrentTransactions] = useState(transactions);

  function newTransaction(transaction) {
    setCurrentTransactions([...currentTransactions, transaction]);
  }

  function removeTransaction(transactionID) {
    const transactions = currentTransactions.filter(
      (transaction) => transaction.id !== transactionID
    );
    setCurrentTransactions(transactions);
  }
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(currentTransactions));
  }, [currentTransactions]);

  return (
    <UserContext.Provider
      value={{
        newTransaction,
        currentTransactions,
        removeTransaction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
