import React, { Suspense } from "react";
import { atom, useAtom } from "jotai";

const countAtom = atom(0);
const squaredAtom = atom((get) => get(countAtom) ** 2);
const sumAtom = atom((get) =>
  [countAtom, squaredAtom].map(get).reduce((s, c) => s + c, 0)
);

const urlAtom = atom("https://pokeapi.co/api/v2/pokemon/eevee");
const fetchUrlAtom = atom(async (get) => {
  const response = await fetch(get(urlAtom));
  return await response.json();
});

function App() {
  const [count, setCount] = useAtom(countAtom);
  const [squaredCount] = useAtom(squaredAtom);
  const [sum] = useAtom(sumAtom);
  const [eevee] = useAtom(fetchUrlAtom);

  const inc = () => setCount(count + 1);

  return (
      <main>
        <h2>Current count {count}</h2>
        <button onClick={() => inc()}>Add up</button>
        <h2>Squared count {squaredCount}</h2>
        <h2>sum of the squared and the current {sum}</h2>

        <h2>Eevee</h2>
        <pre>
          <code>{JSON.stringify(eevee, null, 2)}</code>
        </pre>
      </main>
  );
}

export default App;
