import { useState } from "react";
// import { initialItems } from "./initialItems";
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

function PackingList({ items, onDelete, updateItem, deleteItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  // slice method uses since sorted mutetes the array
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  // JSX
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            updateItem={updateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sorting items"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order </option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort By packed Status </option>
        </select>
        <button onClick={deleteItems}>Clear List</button>
      </div>
    </div>
  );
}

// item

function Item({ item, onDelete, updateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => updateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>X</button>
    </li>
  );
}

//Stats

function Stats({ items }) {
  // conditional return
  if (!items.length)
    return <p className="stats"> Start adding items to your list - 🧳</p>;

  // Deriving state out of alrady existing props / state

  let packed = items.filter((item) => item.packed === true);
  let percentage = Math.round((packed.length / items.length) * 100);
  //

  //
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? ` 🧳 you have selected ${items.length} and already packed ${packed.length} (
          ${percentage}%)`
          : `You have everything to go ✈️`}
      </em>
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
  // delete all items

  function deleteItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items? "
    );
    if (confirmed) setItems((items) => (items = []));
  }

  // function update item

  function updateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDelete={handleItemDelete}
        updateItem={updateItem}
        deleteItems={deleteItems}
      />
      <Stats items={items} />
    </div>
  );
}
