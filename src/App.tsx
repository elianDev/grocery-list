import React from "react";
import Form from "./components/Form";
import List from "./components/List";

declare global {
  interface Item {
    id: string;
    title: string;
  }
  interface Alert {
    show: boolean;
    msg: string;
    type: string;
  }
}

function getStorage() {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {
  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "",
  });
  const [list, setList] = React.useState<Item[]>(getStorage);
  const [value, setValue] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!value) {
      showAlert(true, "danger", "please enter value");
    } else if (value && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: value };
          }
          return item;
        }),
      );
      setValue("");
      setEditID("");
      setIsEditing(false);
      showAlert(true, "success", "item edited");
    } else {
      showAlert(true, "success", "item added do the list");
      const newItem = { id: new Date().getTime().toString(), title: value };
      console.log(newItem);
      setList([...list, newItem]);
      setValue("");
    }
  }

  function showAlert(show = false, type = "", msg = "") {
    setAlert({ show, type, msg });
  }

  function clearList() {
    showAlert(true, "danger", "empty list");
    setList([]);
  }

  function removeItem(id: string) {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  }

  function editItem(id: string) {
    const item = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    if (item) setValue(item.title);
  }

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <Form
        list={list}
        alert={alert}
        showAlert={showAlert}
        isEditing={isEditing}
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
