import { createStore, produce } from "solid-js/store";
import { createEffect } from "solid-js";
import type { CartProduct } from "../env.d.ts";

const LOCAL_STORAGE_KEY = "cart";
const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
export const [cart, setCart] = createStore<CartProduct[]>(
  stored ? JSON.parse(stored) : []
);

createEffect(() =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
);

export function addItemToCart(item: CartProduct) {
  const existing = cart.some((i) => i.id === item.id);
  if (existing) {
    setCart(
      (product) => product.id === item.id,
      produce(
        (product) => (product.quantity = product.quantity + item.quantity)
      )
    );
  } else {
    setCart(
      produce((product) => {
        product.push(item);
      })
    );
  }
}

export function removeItemFromCart(itemId: string) {
  const newCart = cart.filter((product) => product.id !== itemId);
  setCart(newCart);
}

export function getItemSubTotal(itemId: string) {
  const item = cart.find((item) => item.id === itemId)!;
  return item.price * item.quantity;
}

export function getCartTotal() {
  return cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  setCart(
    (product) => product.id === itemId,
    produce((product) => (product.quantity = quantity))
  );
}

export function getCartNumberOfItems() {
  return cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
}