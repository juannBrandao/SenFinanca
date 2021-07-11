import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import FormTransaction from "../../components/formTransaction/index";
import Modal from "../../components/modal/index";
import "./index.css";
function Home() {
  const { currentTransactions } = useContext(UserContext);
  const { newTransaction } = useContext(UserContext);
  const { removeTransaction } = useContext(UserContext);
  const [currentRecipes, setCurrentRecipes] = useState(0);
  const [currentExpenses, setCurrentExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showmodal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  useEffect(() => {
    const transactionsValue = currentTransactions.map(
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
  }, [currentTransactions]);
  const onSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };
  const handleNewTransaction = ()=>{
    setSelectedTransaction(null);
    setShowModal(true);
  }
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
      <ul id="transactions" className="transactions">
        {currentTransactions.map((transaction) => {
          return (
            <li
              key={transaction.id}
              className={transaction.value < 0 ? "minus" : "plus"}
              onClick={() => onSelectTransaction(transaction)}
            >
              <div>
                <span>{transaction.title}</span>
                <span className="date">{transaction.date}</span>
              </div>
              <span className="value">
                {transaction.value < 0 ? "-" : "+"} R${" "}
                {Math.abs(transaction.value)}
              </span>
              {/* <button
                className="delete-btn"
                onClick={() => removeTransaction(transaction.id)}
              >
                x
              </button> */}
            </li>
          );
        })}
      </ul>

      <h3>Adicionar transação</h3>

      <Modal onClose={() => setShowModal(false)} show={showmodal}>
        <FormTransaction
          transaction={selectedTransaction}
          newTransaction={newTransaction}
          removeTransaction={removeTransaction}
        />
      </Modal>
      <button onClick={() => handleNewTransaction()}>Nova Transação</button>
    </div>
  );
}

export default Home;
