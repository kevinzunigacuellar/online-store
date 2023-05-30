import { Accessor, createSignal } from "solid-js";
import { Counter } from "./Counter";
import { addItemToCart } from "../scripts/store";
import type { ProductProps } from "../env.d.ts";

const INITIAL_COUNT = 1;

interface AddToCartButtonProps {
  product: ProductProps;
  count: Accessor<number>;
}

function AddToCartButton({ product, count }: AddToCartButtonProps) {
  const handleClick = (product: ProductProps) => {
    addItemToCart({ ...product, quantity: count() });
  };
  return (
    <button
      class="rounded-md bg-yellow-400 py-2"
      onclick={() => handleClick(product)}
    >
      Add to cart
    </button>
  );
}

export function AddToCart({ product }: { product: ProductProps }) {
  const [count, setCount] = createSignal(INITIAL_COUNT);

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
