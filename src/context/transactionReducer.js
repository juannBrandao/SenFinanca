export default function (state, action) {
  if (action.type === "ADD_TRANSACTION") {
    return {
      ...state,
      transactions: [...state.transactions, action.payload],
    };
  }
  if (action.type === "UPDATE_TRANSACTION") {
    const transactionsUpdated = state.transactions.map((transaction) =>
      transaction.id === action.payload.id ? action.payload : transaction
    );
    return {
      ...state,
      transactions: transactionsUpdated,
    };
  }
  if(action.type === "REMOVE_TRANSACTION"){
    const transactionsUpdated = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      return{
        ...state,
        transactions: transactionsUpdated,
      }
  }
  if(action.type === "LOAD_TRANSACTIONS"){
    console.log(action.payload)
    return{
      ...state,
      transactions: action.payload
    }
  }
}
