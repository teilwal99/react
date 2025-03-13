// src/components/TODOList.jsx
import { useEffect, useState } from "react";

function Item({ item }) {
    return (
      <li id={item?.id} className="todo_item">
        <button className="todo_items_left">
          <svg>
            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
          </svg>
          <p>{item?.title}</p>
        </button>
        <div className="todo_items_right">
          <button>
            <span className="visually-hidden">Edit</span>
            <svg>
              <path d="" />
            </svg>
          </button>
          <button>
            <span className="visually-hidden">Delete</span>
            <svg>
              <path d="" />
            </svg>
          </button>
        </div>
      </li>
    );
}

export default function TODOList() {
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      fetch('/api/todos')
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }, []);
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
}