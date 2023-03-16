import React from "react";
import Alert from "./Alert";

interface Props {
  list: Item[];
  alert: Alert;
  showAlert: () => void;
  isEditing: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

const Form = ({
  list,
  alert,
  showAlert,
  isEditing,
  value,
  setValue,
  handleSubmit,
}: Props) => {
  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
      <h3>Grocery List</h3>
      <div className="form-control">
        <input
          className="grocery"
          placeholder="apples, oranges..."
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
        <button className="submit-btn">
          {isEditing ? "edit" : "add item"}
        </button>
      </div>
    </form>
  );
};

export default Form;
