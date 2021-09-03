import React, { useState, useEffect, useContext } from "react";
import TodoItem from "./TodoItem";
import TodoService from "../Services/TodoService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const Todos = (props) => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setTodo({ name: e.target.value });
  };

  const resetForm = () => {
    setTodo({ name: "" });
  };

  return (
    <section className="fdb-block">
      <div className="container">
        <div className="row justify-content-center" id="todoRow">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <h1>Enter Todos</h1>
            <form onSubmit={onSubmit}>
              <div className="input-group mt-4 mb-4">
                <input
                  type="text"
                  name="todo"
                  value={todo.name}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Enter your Todo"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            {message ? <Message message={message} /> : null}
          </div>
          <ul className="list-group list-group-flush" id="todolist">
            {todos.map((todo) => {
              return <TodoItem key={todo._id} todo={todo} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Todos;
