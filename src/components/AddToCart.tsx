import styles from "../styles/addtocart.module.css";
import { Accessor, createSignal } from "solid-js";
import { Counter } from "./Counter";
import { createLocalStore } from "../scripts/store";
import type { ProductProps } from "../env.d.ts";

const { addItemToCart } = createLocalStore();

interface AddToCartButtonProps {
  product: ProductProps;
  count: Accessor<number>;
}
function AddToCartButton({ product, count }: AddToCartButtonProps) {
  return (
    <button
      class={styles.add_button}
      onclick={() => addItemToCart({ ...product, quantity: count() })}
    >
      Add to cart
    </button>
  );
}

export function AddToCart({ product }: { product: ProductProps }) {
  const [count, setCount] = createSignal(1);

  const increaseCounter = () => {
    setCount((c) => c + 1);
  };
  const decreaseCounter = () => {
    setCount((c) => c - 1);
  };
  return (
    <>
      <Counter
        count={count}
        increaseCounter={increaseCounter}
        decreaseCounter={decreaseCounter}
      />
      <AddToCartButton count={count} product={product} />
    </>
  );
}
