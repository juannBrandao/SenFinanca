import React, { useEffect, useState } from "react";

const FormTransaction = (props) => {
  const [typeTransaction, setTypeTransaction] = useState("");
  const [titleTransaction, setTitleTransaction] = useState("");
  const [transactionValue, setTransactionValue] = useState(0);
  const [categoryTransaction, setCategoryTransaction] = useState("");
  const generateID = () => Math.round(Math.random() * 1000);
  const FormatData = () => {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  const handleNewTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: generateID(),
      type: typeTransaction,
      title: titleTransaction,
      date: FormatData(),
      value: Number(transactionValue),
      category: categoryTransaction,
    };
    props.newTransaction(transaction);
  };
  useEffect(() => {
    if (props.transaction !== null) {
      setTypeTransaction(props.transaction.type);
      setTitleTransaction(props.transaction.title);
      setTransactionValue(props.transaction.value);
      setCategoryTransaction(props.transaction.category);
    } else {
      setTypeTransaction("");
      setTitleTransaction("");
      setTransactionValue(0);
      setCategoryTransaction("");
    }
  }, [props.transaction]);
  return (
    <form id="form" onSubmit={handleNewTransaction}>
      <div className="form-control">
        <label htmlFor="text">Titulo da transação</label>
        <input
          autoFocus
          type="text"
          id="text"
          placeholder="Titulo da transação"
          onChange={(e) => setTitleTransaction(e.target.value)}
          value={titleTransaction}
        />
      </div>
      <div className="form-control">
        <label htmlFor="text">Tipo da transação</label>
        <input
          autoFocus
          type="text"
          id="text"
          placeholder="Tipo da transação"
          onChange={(e) => setTypeTransaction(e.target.value)}
          value={typeTransaction}
        />
      </div>

      <div className="form-control">
        <label htmlFor="amount">
          Valor &nbsp;
          <small>(negativo - despesas, positivo - receitas)</small>
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Valor da transação"
          onChange={(e) => setTransactionValue(e.target.value)}
          value={transactionValue}
        />
      </div>
      <div className="form-control">
        <label htmlFor="category">Categoria</label>
        <input
          type="text"
          id="category"
          placeholder="Categoria"
          onChange={(e) => setCategoryTransaction(e.target.value)}
          value={categoryTransaction}
        />
      </div>

      <button className="btn" type="submit">
        Adicionar
      </button>
      <button
        type="button"
        className="delete-btn"
        onClick={() => props.removeTransaction(props.transaction.id)}
      >
        Excluir
      </button>
    </form>
  );
};
export default FormTransaction;
