
import { createContext, useContext, useEffect, useState } from "react";


const TrackerContext = createContext()

export const TrackerProvider = ({children}) =>{
    const [transactions, setTransactions] = useState(() => {
        // Load transactions from local storage on initialization
        const storedTransactions = localStorage.getItem("transactions");
        return storedTransactions ? JSON.parse(storedTransactions) : [];
      });
    
      useEffect(() => {
        // Save transactions to local storage whenever they change
        localStorage.setItem("transactions", JSON.stringify(transactions));
      }, [transactions]);


    const addTransaction = (transaction)=>{
        setTransactions((prev)=>[...prev,{...transaction,id:Date.now()}]);
    }

    const removeTransaction = (id)=>{
        setTransactions(transactions.filter((transaction)=>transaction.id!==id))
    }
    const editTransaction = (id, updatedTransaction) => {
        setTransactions((prev) =>
          prev.map((transaction) =>
            transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
          )
        );
      };
      
      


    const calculateBalance = (netbalance)=>{
        let income = 0
        let expense = 0

        transactions.forEach((transaction) => {
            if(transaction.type === "income"){
                income+=transaction.amount
            }
            if(transaction.type==="expense"){
                expense+=transaction.amount
            }
        });

        return netbalance = income - expense
    }

    return (
        <TrackerContext.Provider value={{transactions,addTransaction,calculateBalance,editTransaction,removeTransaction}}>
            {children}
        </TrackerContext.Provider>
    )
}

export const useTracker = () => useContext(TrackerContext)





