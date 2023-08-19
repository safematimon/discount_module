import {create} from 'zustand';

const useCartStore = create((set) => ({
  
  cartItems: [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      return {
        cartItems: updatedCartItems.filter((item) => item.quantity > 0),
      };
    });
  },

  removeAllOfProduct: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    }));
  },
  
  updateCart: (productId, quantity) => {
    if (quantity < 1) {
      return useCartStore.getState().removeAllOfProduct(productId);
    }
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

}));

export default useCartStore;