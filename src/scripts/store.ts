import { createStore, produce } from "solid-js/store";
import { createEffect } from "solid-js";
import type { CartProduct } from "../env.d.ts";
const LOCAL_STORAGE_KEY = "cart";

export function createLocalStore() {
  /* load cart from local storage */
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [cart, setCart] = createStore<CartProduct[]>(
    stored ? JSON.parse(stored) : []
  );

  /* subscribe cart changes to localstore */
  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
  );

  /* add to cart method */
  const addItemToCart = (item: CartProduct) => {
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
  };
  /* remove from cart method */
  const removeItemFromCart = (itemId: string) => {
    const newCart = cart.filter((product) => product.id !== itemId);
    setCart(newCart);
  };

  /* increase quantity to item method */
  const increaseQuantityToItem = (itemId: string) => {
    setCart(
      (product) => product.id === itemId,
      produce((product) => (product.quantity = product.quantity + 1))
    );
  };

  /* decrease quantity from item method */
  const decreaseQuantityFromItem = (itemId: string) => {
    setCart(
      (product) => product.id === itemId,
      produce((product) => (product.quantity = product.quantity - 1))
    );
  };
  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    decreaseQuantityFromItem,
    increaseQuantityToItem,
  };
}
