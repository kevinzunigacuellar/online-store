import styles from "../styles/cartlist.module.css";
import { createLocalStore } from "../scripts/store";
import { For, createMemo, createSignal, Show } from "solid-js";
import type { CartProduct } from "../env.d.ts";
import { Counter } from "./Counter";

const {
  cart,
  increaseQuantityOfItem,
  decreaseQuantityFromItem,
  removeItemFromCart,
  getCartTotal,
} = createLocalStore();
export function CartList() {
  return (
    <Show when={cart.length > 0} fallback={<p class={styles.empty_cart}>Your cart is empty</p>}>
    <div class={styles.cards_container}>
      <p class={styles.table_header}>
        <span>Subtotal</span>
      </p>
      <For each={cart}>{(item) => <Card {...item} />}</For>
      <p class={styles.total_footer}>
        <span>Total: </span>
        ${getCartTotal().toFixed(2)}
      </p>
    </div>
    </Show>
  );
}

function Card({ name, price, quantity, image, id }: CartProduct) {
  const [count, setCount] = createSignal(quantity);

  const subtotal = createMemo(() => count() * price);

  const incrementCounter = () => {
    setCount((c) => c + 1);
    increaseQuantityOfItem(id);
  };

  const decreaseCounter = () => {
    setCount((c) => c - 1);
    decreaseQuantityFromItem(id);
  };

  return (
    <article class={styles.card_container}>
      <img src={image} alt={name} />
      <div class={styles.details_container}>
        <h2>{name}</h2>
        <p>{price.toFixed(2)}</p>
        <Counter
          count={count}
          increaseCounter={incrementCounter}
          decreaseCounter={decreaseCounter}
        />
        <div>
          <button
            class={styles.remove_button}
            onClick={() => removeItemFromCart(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <p class={styles.last_item}>${subtotal().toFixed(2)}</p>
    </article>
  );
}
