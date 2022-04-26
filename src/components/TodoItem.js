import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../config/firebase";
import Spinner from "./Spinner";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(true);

 // updating the todo  
  const update = (id, value) => {
    if (inputRef.current.disabled) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    } else {
      setIsLoading(true);
      const todoDocRef = doc(db, "todo-list", id);
      try {
        updateDoc(todoDocRef, {
          item: value,
        })
          .then(() => {
            updateTodo({ id, item: value });
          })
          .catch((err) => alert(err));
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }

      inputRef.current.disabled = true;
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    const taskDocRef = doc(db, "todo-list", id);
    try {
      await deleteDoc(taskDocRef)
        .then(() => {
          removeTodo(item.id);
        })
        .catch((err) => alert(err));
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <li key={item.id} className="card">
      {item.completed && <span className="completed">done</span>}
      <textarea
        className="w-full min-h-[200px] text-lg outline-none text-ascent font-bold px-2 resize-none"
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
      />
      <div className="btns w-full">
        <button
          className="text-blue-600"
          onClick={() => update(item.id, inputRef.current.value)}
        >
          Edit
        </button>
        {item.completed === false && (
          <button
            className="text-green-600"
            onClick={() => completeTodo(item.id)}
          >
            Complete
          </button>
        )}
        <button className="text-red-600" onClick={() => deleteTodo(item.id)}>
          Delete
        </button>
        {isLoading && (
          <div className="absolute bottom-1 right-1">
            <Spinner />
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
