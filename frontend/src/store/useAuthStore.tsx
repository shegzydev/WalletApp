import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io, Socket } from 'socket.io-client';
import { useAcctStore } from './useAcctStore';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://192.168.0.146:3000' : '/';

interface loginData {
  phone: string;
  password: string;
}

interface regData {
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
}

interface profilePicData {
  profilePic: string | ArrayBuffer | null;
}

interface authState {
  isRegistering: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;

  authUser: authUserData | null;
  socket: Socket | null;

  register: (data: regData) => Promise<void>;
  login: (data: loginData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  updateProfile: (data: profilePicData) => Promise<void>;
}

interface authUserData {
  id: string;
  profilePic: string;
  name: string;
  phone: string;
  accountNumber: Array<string>;
}

export const useAuthStore = create<authState>((set, get) => ({
  isRegistering: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isUpdatingProfile: false,

  authUser: null,
  socket: null,

  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post('/auth/register', data);
      set({ authUser: res.data.user });
      get().connectSocket();
      console.log(res.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data.user });
      get().connectSocket();
      console.log(res.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      set({ authUser: null });
      get().disconnectSocket();
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/updateprofile', data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    console.log(authUser.id);
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on('receiveTransfer', (newTransaction) => {
      useAcctStore.getState().updateHistory(newTransaction);
      console.log(newTransaction);
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
