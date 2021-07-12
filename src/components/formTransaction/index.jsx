import React, { useEffect, useState } from "react";
import "./index.css";
const FormTransaction = (props) => {
  const [typeTransaction, setTypeTransaction] = useState(0);
  const [titleTransaction, setTitleTransaction] = useState("");
  const [transactionValue, setTransactionValue] = useState();
  const [categoryTransaction, setCategoryTransaction] = useState({});
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
      value:
        typeTransaction == 1
          ? +Number(transactionValue)
          : -Number(transactionValue),
      category: categoryTransaction,
    };
    if (
      typeTransaction === "" ||
      titleTransaction === "" ||
      transactionValue === "" ||
      categoryTransaction === {}
    ) {
      alert("É necessário preencher todos os campos !");
    } else {
      props.newTransaction(transaction);
      props.setShowModal(false);
      resetForm();
    }
  };
  const resetForm = () => {
    setTypeTransaction(0);
    setTitleTransaction("");
    setTransactionValue('');
    setCategoryTransaction({});
  };
  useEffect(() => {
    if (props.transaction !== null) {
      setTypeTransaction(props.transaction.type);
      setTitleTransaction(props.transaction.title);
      setTransactionValue(props.transaction.value);
      setCategoryTransaction(props.transaction.category);
    } else {
      resetForm();
    }
  }, [props.transaction]);
  const handleRemoveTransaction = () => {
    props.removeTransaction(props.transaction.id);
    props.setShowModal(false);
  };
  const handleUpdateTransaction = () => {
    const transaction = {
      id: props.transaction.id,
      type: typeTransaction,
      title: titleTransaction,
      date: FormatData(),
      value: Number(transactionValue),
      category: categoryTransaction,
    };
    props.updateTransaction(transaction);
    props.setShowModal(false);
  };
  return (
    <form id="form" onSubmit={handleNewTransaction}>
      <div className="form-control">
        <label htmlFor="text">Titulo da transação</label>
        <input
          autoFocus
          type="text"
          id="text"
          data-testid="transaction_title"
          placeholder="Titulo da transação"
          onChange={(e) => setTitleTransaction(e.target.value)}
          value={titleTransaction}
        />
      </div>
      <div className="form-control">
        <label htmlFor="entrada">Tipo de Transação</label>
        <br />
        <label htmlFor="entrada">Entrada</label>
        <input
          type="radio"
          name="type"
          id="entrada"
          data-testid="transaction_type"
          onChange={(e) => setTypeTransaction(e.target.value)}
          value={1}
          checked={typeTransaction == 1}
        />
        <label htmlFor="saida">Saida</label>
        <input
          type="radio"
          name="type"
          id="saida"
          onChange={(e) => setTypeTransaction(e.target.value)}
          value={2}
          checked={typeTransaction == 2}
        />
      </div>

      <div className="form-control">
        <label htmlFor="amount">Valor &nbsp;</label>
        <input
          type="text"
          id="amount"
          data-testid="transaction_value"
          placeholder="Valor da transação"
          onChange={(e) => setTransactionValue(e.target.value)}
          value={transactionValue}
        />
      </div>
      <div className="form-control">
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          id="category"
          data-testid="transaction_category"
          onChange={(e) =>
            setCategoryTransaction({
              id: e.target.selectedOptions[0].id,
              value: e.target.selectedOptions[0].value,
            })
          }
          value={categoryTransaction.value}
        >
          <option key={0} value=""></option>
          {props.categories.map((category) => (
            <option key={category.id} id={category.id} value={category.value}>
              {category.value}
            </option>
          ))}
        </select>
      </div >
      {props.transaction === null ? (
        <button className="btn" type="submit" data-testid="transaction_add">
          Adicionar
        </button>
      ) : (
        <div className="group-actionButtons">
          <button
            type="button"
            className="delete-btn"
            data-testid="transaction_delete"
            onClick={() => handleRemoveTransaction()}
          >
            Excluir
          </button>
          <button
            type="button"
            className="delete-btn"
            data-testid="transaction_update"
            onClick={() => handleUpdateTransaction()}
          >
            Alterar
          </button>
        </div>
      )}
    </form>
  );
};
export default FormTransaction;
