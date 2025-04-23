import { create } from 'zustand';

interface pageData {
  current: number;
  setPage: (page: number) => void;
}

export const usePageStore = create<pageData>((set) => ({
  current: 0,
  setPage: (page: number) => {
    set({ current: page });
    console.log('current page:', page);
  },
}));
