"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  size?: string;
  notes?: string;
  image?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: string; size?: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; size?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

function cartKey(id: string, size?: string) {
  return size ? `${id}__${size}` : id;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = cartKey(action.payload.id, action.payload.size);
      const existing = state.items.findIndex(
        (i) => cartKey(i.id, i.size) === key
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + 1,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM": {
      const key = cartKey(action.payload.id, action.payload.size);
      return {
        ...state,
        items: state.items.filter((i) => cartKey(i.id, i.size) !== key),
      };
    }
    case "UPDATE_QTY": {
      const key = cartKey(action.payload.id, action.payload.size);
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => cartKey(i.id, i.size) !== key),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          cartKey(i.id, i.size) === key
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size?: string) => void;
  updateQty: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bariis-cart");
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        parsed.forEach((item) =>
          dispatch({
            type: "ADD_ITEM",
            payload: { ...item, quantity: undefined as unknown as never } as Omit<CartItem, "quantity">,
          })
        );
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bariis-cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    setLastAdded(item.name);
    setTimeout(() => setLastAdded(null), 2200);
  }, []);

  const removeItem = useCallback((id: string, size?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
  }, []);

  const updateQty = useCallback((id: string, quantity: number, size?: string) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, size, quantity } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
