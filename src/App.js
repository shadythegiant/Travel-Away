import { useState } from "react";
import { initialItems } from "./initialItems";
// components
// logo

function Logo() {
  return <h1>✈️ Far Away 👜</h1>;
}

// form

function Form({ onAddItems }) {
  // state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // creating array to dynamically genrate option values
  const arr = Array.from({ length: 20 }, (_, i) => i + 1);

  //  handle submit function

  function handleSubmit(e) {
    e.preventDefault();
    //
    if (!description) return;
    //
    const newItem = {
      description,
      quantity,
      packed: false,
      id: new Date().getTime(),
    };

    console.log(newItem);
    onAddItems(newItem);

    // initiallizing input values
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select
        name="select-item-num"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      >
        {arr.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text "
        placeholder="item ...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// Packing list

function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

// item

function Item({ item, onDelete }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>X</button>
    </li>
  );
}

//Stats

function Stats() {
  return (
    <footer className="stats">
      <em> you have selected X and already packed X</em>
    </footer>
  );
}

// ---------- APP ---------------------------------

export function App() {
  const [items, setItems] = useState([]);
  // adding items to the array

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  // delete item

  function handleItemDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onDelete={handleItemDelete} />
      <Stats />
    </div>
  );
}
