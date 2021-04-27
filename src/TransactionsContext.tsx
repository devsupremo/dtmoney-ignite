import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from './services/api';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

// type transactionInput = Omit<Transaction, 'id | 'createdAt'>; alternativa 
// type transactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>; outra alternativa

interface TransactionsProviderProps {
  children: ReactNode;
}

//toda função assincrona retorna um promise

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction:(transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
  );

export function TransactionsProvider({ children } :TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, []);


 async function createTransaction(transactionInput: TransactionInput) {
  const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()})
  const {transaction} = response.data;

     

  //conceito de imutabilidade, ...transactions pega todos os transactions
  // que ja existe.
     setTransactions([
     ...transactions,
     transaction,
   ])
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
       {children}
    </TransactionsContext.Provider>
  );
}