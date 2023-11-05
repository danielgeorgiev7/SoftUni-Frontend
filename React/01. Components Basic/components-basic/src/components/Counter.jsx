import { useState } from "react";

export default function Counter(props) {
  const [count, setCount] = useState(0);

  const incrementClickHandler = () => {
    setCount((oldValue) => oldValue + 1);
  };

  const clearCounterHandler = (event) => {
    console.log(event);
    setCount(0);
  };

  let message = null;

  switch (count) {
    case 1:
      message = "First blood";
      break;
    case 2:
      message = "Double kill";
      break;
    case 3:
      message = "Tripple kill";
      break;
    case 4:
      message = "Quadra kill";
      break;
    case 5:
      message = "Pentakill";
      break;
    case 6:
      message = "Hexakill";
      break;
    default:
      message = "30 seconds until minions spawn";
  }

  return (
    <div>
      <h3>Counter</h3>

      {count < 0 ? <p>Invalid count!</p> : <p>Valid count!</p>}

      {count == 0 && <p>Please start incrementing</p>}

      <h4>{message}</h4>

      <p>Count: {count}</p>

      <button disabled={count < 0} onClick={() => setCount(count - 1)}>
        -
      </button>
      <button onClick={clearCounterHandler}>clear</button>
      <button onClick={incrementClickHandler}>+</button>
    </div>
  );
}
