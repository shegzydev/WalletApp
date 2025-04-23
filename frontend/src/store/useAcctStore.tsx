import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

interface accountData {
  accountNumber: string;
  accountName: string;
  balance: number;
  KYCLevel: string;
  beneficiaries: [beneficiaryData];
}

interface beneficiaryData {
  accountNumber: string;
  accountName: string;
}

interface accountId {
  accountNumber: string | undefined;
}

interface transferData {
  receiverAccountNumber: string;
  amount: number;
  details: string;
}

interface transactionData {
  senderAccount: string;
  receiverAccount: string;
  transactionType: string;
  transactionAmount: number;
  transactionDetails: string;
  transactionStatus: string;
  createdAt: string;
}

interface transactionUpdate {
  transaction: transactionData;
  accountBal: number;
}

interface AcctState {
  userAcct: accountData | null;
  isRetrievingDetails: boolean;
  receiverName: string | null;
  isRunningTransaction: boolean;
  transactionHistory: Array<transactionData>;
  transferReport: null | transactionData;

  getAcct: (data: accountId | null) => Promise<void>;
  retrieveName: (data: accountId | null) => Promise<void>;
  makeTransfer: (data: transferData) => Promise<void>;
  getHistory: () => Promise<void>;
  updateHistory: (newTransaction: transactionUpdate) => void;
  resetTransfer: () => void;

  setBalance: (newBal: number) => void;
}

export const useAcctStore = create<AcctState>((set, get) => ({
  userAcct: null,
  isRetrievingDetails: false,
  receiverName: null,
  isRunningTransaction: false,
  transactionHistory: [],
  transferReport: null,

  getAcct: async (data) => {
    set({ isRetrievingDetails: true });
    try {
      const res = await axiosInstance.get('/account/getacct', { params: data });
      set({ userAcct: res.data.account });
      console.log(get().userAcct);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isRetrievingDetails: false });
    }
  },

  retrieveName: async (data) => {
    set({ isRetrievingDetails: true });
    try {
      const res = await axiosInstance.get('/account/getrecepient', {
        params: data,
      });
      set({ receiverName: res.data.name });
    } catch (error) {
      set({ receiverName: 'not found' });
      console.error(error);
    } finally {
      set({ isRetrievingDetails: false });
    }
  },

  makeTransfer: async (data) => {
    set({ isRunningTransaction: true, transferReport: null });
    try {
      const res = await axiosInstance.post('/transactions/transfer', data);
      console.log(res.data);
      set({
        userAcct: res.data.account,
        transactionHistory: [...get().transactionHistory, res.data.transaction],
        transferReport: res.data.transaction,
      });
    } catch (error) {
      set({
        transferReport: {
          receiverAccount: data.receiverAccountNumber,
          transactionStatus: '',
          transactionAmount: data.amount,
          transactionDetails: data.details,
          transactionType: 'transfer',
          senderAccount: '',
          createdAt: '',
        },
      });
      console.error(error);
    } finally {
      set({ isRunningTransaction: false });
    }
  },

  getHistory: async () => {
    set({ isRetrievingDetails: true });
    try {
      const res = await axiosInstance.get('/transactions/getall');
      set({ transactionHistory: res.data.transactions });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isRetrievingDetails: false });
    }
  },

  updateHistory: (newTransaction) => {
    set({
      transactionHistory: [
        ...get().transactionHistory,
        newTransaction.transaction,
      ],
    });
    get().setBalance(newTransaction.accountBal);
    console.log(get().transactionHistory);
  },

  setBalance: (newBal) => {
    const prev = get().userAcct;
    if (!prev) return;
    set({
      userAcct: {
        ...prev,
        balance: newBal,
      },
    });
  },

  resetTransfer: () => {
    set({ transferReport: null, receiverName: '' });
  },
}));
