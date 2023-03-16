import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  list: Item[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
}

const List = ({ list, removeItem, editItem }: Props) => {
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
