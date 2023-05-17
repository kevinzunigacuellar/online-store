import type { Accessor } from "solid-js";

interface CounterProps {
  count: Accessor<number>;
  increaseCounter: () => void;
  decreaseCounter: () => void;
}

export function Counter({
  count,
  decreaseCounter,
  increaseCounter,
}: CounterProps) {
  return (
    <div>
      <div class="border border-gray-900 inline-flex rounded-md items-center overflow-hidden">
        <button
          class="p-2 border-r border-gray-900 disabled:text-gray-300"
          disabled={count() <= 1}
          onClick={decreaseCounter}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15"
            ></path>
          </svg>
        </button>
        <p class="font-mono w-10 text-center">{count()}</p>
        <button class="p-2 border-l border-gray-900" onClick={increaseCounter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            class="h-5 w-auto"
            stroke="currentColor"
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
