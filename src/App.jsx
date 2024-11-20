import "./App.css";
import TransactionForm from "./Components/TransactionForm";
import { TrackerProvider } from "./Contexts/TrackerContext";
import Balance from "./Components/Balance";
import TransactionList from "./Components/Transactionlist";
import DebugClearStorage from "./Components/DebugClearStorage";

function App() {
  return (
    <TrackerProvider>
    <DebugClearStorage />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Expense Tracker</h1>
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
          <Balance />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TransactionForm />
            <TransactionList />
          </div>
        </div>
      </div>
    </TrackerProvider>
  );
}

export default App;
