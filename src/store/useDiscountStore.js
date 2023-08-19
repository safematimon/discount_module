import {create} from 'zustand';

const useDiscountStore = create((set) => ({
  tolalCost: 0,
  
  selectedCoupon: null,
  selectedOnTop: null,
  selectedSeasonal: null,

  // new
  setSelected: (type, item) => {
    set((state) => ({
      [`selected${type}`]: state[`selected${type}`] === item ? null : item,
    }));
  },
  setSelectNull: () => {
    set({
      selectedCoupon: null,
      selectedOnTop: null,
      selectedSeasonal: null,
    });
  },

}));

export default useDiscountStore;