import styles from "../styles/addtocart.module.css";
import { createSignal } from "solid-js";
import { createLocalStore } from "../scripts/store";
import type { ProductProps } from "../env.d.ts";

const [count, setCount] = createSignal(1);
const { addItemToCart } = createLocalStore();

function AddToCartButton({ product }: { product: ProductProps }) {
  return (
    <button
      class={styles.add_button}
      onclick={() => addItemToCart({ ...product, quantity: count() })}
    >
      Add to cart
    </button>
  );
}

function Counter() {
  return (
    <div>
      <div class={styles.container}>
        <button
          class={styles.counter__button}
          disabled={count() <= 1}
          onClick={() => setCount((c) => c - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={styles.svg_icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15"
            ></path>
          </svg>
        </button>
        <p class={styles.counter_text}>{count()}</p>
        <button
          class={styles.counter__button}
          onClick={() => setCount((c) => c + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={styles.svg_icon}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AddToCart({ product }: { product: ProductProps }) {
  return (
    <>
      <Counter />
      <AddToCartButton product={product} />
    </>
  );
}
