import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import FormTransaction from "../../components/formTransaction/index";
import Modal from "../../components/modal/index";
import "./index.css";
function Home() {
  const {
    loadTransactions,
    transactions,
    newTransaction,
    removeTransaction,
    updateTransaction,
  } = useContext(UserContext);
  const [currentRecipes, setCurrentRecipes] = useState(0);
  const [currentExpenses, setCurrentExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentFilterCategory, setCurrentFilterCategory] = useState(0);
  const [currentFilterType, setCurrentFilterType] = useState(0);
  const [transactionsData, setTransactionsData] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const categories = [
    { id: 1, value: "ALIMENTAÇÂO" },
    { id: 2, value: "ANIMAL DE ESTIMAÇÃO" },
    { id: 3, value: "CASA" },
    { id: 4, value: "EDUCAÇÃO" },
    { id: 5, value: "GASTOS ESPORÁDICOS" },
    { id: 6, value: "GASTOS PESSOAIS" },
    { id: 7, value: "IMPOSTOS" },
    { id: 8, value: "LAZER" },
    { id: 9, value: "OUTROS GASTOS" },
    { id: 10, value: "RECEITA" },
    { id: 11, value: "SAÚDE" },
    { id: 12, value: "SEGUROS" },
    { id: 13, value: "SEVIÇOS FINANCEIROS" },
    { id: 14, value: "TRANSPORTE" },
  ];
  useEffect(() => {
    const transactions = localStorage.getItem("transactions")
      ? JSON.parse(localStorage.getItem("transactions"))
      : [];
    localStorage.setItem("categories", JSON.stringify(categories));
    loadTransactions(transactions);
  }, []);
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    setTransactionsData(transactions);
    const transactionsValue = transactions?.map(
      (transaction) => transaction.value
    );
    const currentValue = transactionsValue
      .reduce((acumulator, number) => acumulator + number, 0)
      .toFixed(2);
    setCurrentBalance(currentValue);
    const recipies = transactionsValue
      .filter((value) => value > 0)
      .reduce((acumulator, value) => acumulator + value, 0)
      .toFixed(2);
    setCurrentRecipes(recipies);
    const expenses = transactionsValue
      .filter((value) => value < 0)
      .reduce((acumulator, value) => acumulator + value, 0)
      .toFixed(2);
    setCurrentExpenses(Math.abs(expenses));
  }, [transactions]);
  const onSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };
  const handleNewTransaction = () => {
    setSelectedTransaction(null);
    setShowModal(true);
  };
  useEffect(() => {
    handleChangeFilter(
      Number(currentFilterCategory),
      Number(currentFilterType)
    );
  }, [currentFilterCategory, currentFilterType]);
  const handleChangeFilter = (filterCategory, filterType) => {
    let transactionsFilter = [];
    if (filterType === 0 && filterCategory === 0) {
      transactionsFilter = transactions;
    }
    if (filterType === 0 && filterCategory !== 0) {
      transactionsFilter = transactions.filter(
        (transaction) => Number(transaction.category.id) === filterCategory
      );
    }
    if (filterType !== 0 && filterCategory !== 0) {
      transactionsFilter = transactions.filter(
        (transaction) =>
          Number(transaction.type) === filterType &&
          Number(transaction.category.id) === filterCategory
      );
    }
    if (filterType !== 0 && filterCategory === 0) {
      transactionsFilter = transactions.filter(
        (transaction) => Number(transaction.type) === filterType
      );
    }
    setTransactionsData(transactionsFilter);
  };
  return (
    <div className="container">
      <h4>Saldo atual</h4>

      <h1 id="balance" className="balance">
        R$ {currentBalance}
      </h1>

      <div className="inc-exp-container">
        <div>
          <h4>Receitas</h4>
          <p id="money-plus" className="money plus">
            R${currentRecipes}
          </p>
        </div>

        <div>
          <h4>Despesas</h4>
          <p id="money-minus" className="money minus">
            R${currentExpenses}
          </p>
        </div>
      </div>

      <h3>Transações</h3>
      <div className="filters">
        <span>Filtrar Por :</span>
        <select
          name="filter"
          id="filter"
          data-testid="filter_type"
          onChange={(e) => setCurrentFilterType(e.target.value)}
        >
          <option value={0}>Todas</option>
          <option value={1}>Entrada</option>
          <option value={2}>Saida</option>
        </select>
        <select
          name="filter"
          id="filter"
          data-testid="filter_Category"
          onChange={(e) => setCurrentFilterCategory(e.target.value)}
        >
          <option value={0}>Todas</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.value}
            </option>
          ))}
        </select>
      </div>

      <ul id="transactions" className="transactions">
        {transactionsData?.map((transaction) => {
          return (
            <li
              key={transaction.id}
              className={transaction.value < 0 ? "minus" : "plus"}
              onClick={() => onSelectTransaction(transaction)}
            >
              <div>
                <div>
                  <span>{transaction.title}</span>
                  <span className="date">{transaction.date}</span>
                </div>
                <div>
                  <span>
                    {Number(transaction.type) === 1 ? "Entrada" : "Saida"}
                  </span>
                  <span>{transaction.category.value}</span>
                </div>
              </div>
              <span className="value">
                {transaction.value < 0 ? "-" : "+"} R${" "}
                {Math.abs(transaction.value)}
              </span>
            </li>
          );
        })}
      </ul>

      <Modal onClose={() => setShowModal(false)} show={showmodal}>
        <FormTransaction
          transaction={selectedTransaction}
          newTransaction={newTransaction}
          removeTransaction={removeTransaction}
          setShowModal={setShowModal}
          updateTransaction={updateTransaction}
          categories={categories}
        />
      </Modal>
      <div className="new_transaction">
        <button
          data-testid="ButtonNewTransaction"
          onClick={() => handleNewTransaction()}
        >
          Nova Transação
        </button>
      </div>
    </div>
  );
}

export default Home;
