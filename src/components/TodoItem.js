import React, { useRef } from "react";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <li key={item.id} className="card">
      <textarea
        className="w-full min-h-[70px] text-lg outline-none text-ascent font-bold px-2"
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns w-full">
        <button className="text-blue-600" onClick={() => changeFocus()}>
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
        <button className="text-red-600" onClick={() => removeTodo(item.id)}>
          Delete
        </button>
      </div>
      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TodoItem;
