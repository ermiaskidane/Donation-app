// import { create } from 'zustand';

// interface ExpenseModalStore {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// } 

// const useExpenseModal = create<ExpenseModalStore>((set) => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false })
// }));

 
// export default useExpenseModal;
// Create a Zustand store for YearlyExpenseSum values
import create from 'zustand';

const useYearlyExpenseStore = create((set) => ({
  yearlyExpenseSums: [],
  addYearlyExpenseSum: (sum) => set((state) => ({ yearlyExpenseSums: [...state.yearlyExpenseSums, sum] })),
}));

export default useYearlyExpenseStore;