import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../config/firebase";
import { addTodos, initialTodos } from "../store/reducer";
import Spinner from "./Spinner";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialTodos: (todo) => dispatch(initialTodos(todo)),
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
//load data on initial load 
  const initialLoad = async () => {
    setIsLoading(true);
    const dbRef = collection(db, "todo-list");
    const q = query(dbRef, orderBy("created"));

    const data = (await getDocs(q)).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    props.initialTodos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
// add a todo
  const add = async () => {
    setIsLoading(true);
    if (todo === "") {
      alert("Input is Empty");
    } else {
      try {
        await addDoc(collection(db, "todo-list"), {
          item: todo,
          completed: false,
          created: Timestamp.now(),
        }).then(function (docRef) {
          props.addTodo({
            id: docRef.id,
            item: todo,
            completed: false,
          });
        });

        setTodo("");
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />

      <button
        className="add-btn"
        onClick={() => add()}
        disabled={!todo || isLoading}
      >
        {!isLoading ? "+" : <Spinner color="ascent-light" />}
      </button>
      <br />
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
