import { useState } from "react";

let count = 0;

export default function Counter() {

    const [counter, setCounter] = useState(0)

    const addCount = () => {
        count += 1
        setCounter(count);
    }

    const remCount = () => {
        count -= 1;
        setCounter(count);
    }

    return (
        <div>
            <p>
                <label>Add: </label>
                <button onClick={addCount}>Add</button>
            </p>
            <label>Counter value: {counter}</label>
            <p>
                <label>Sub: </label>
                <button onClick={remCount}>Sub</button>
            </p>
        </div>
    )
}