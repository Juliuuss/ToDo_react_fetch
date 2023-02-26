import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/julio93"
        );
        if (!response.ok) {
          throw new Error(response.status);
        }
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  const addTask = async (e) => {
    if (e.key === "Enter") {
      //const newTask = { label: inputTodo, done: false };
	  const obj = [ ...tasks,{"label": e.target.value, "done": false}]
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/julio93",
        {
          method: "PUT",
          body: JSON.stringify([...tasks, newTask]),
		  mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
		setNewTask(current => [...current, inputTodo])
        setTasks(current=> [...obj])
        e.target.value = "";
		setInputTodo("")
    }
  };

  const deleteTask = async (index) => {
	const tmp = tasks
    tmp.splice(index, 1)
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/julio93",
      {
        method: "PUT",
        body: JSON.stringify(tmp),
		mode:"cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTasks([...tmp])
	 setNewTask(current =>[
        ...current.slice(0, index),
        ...current.slice(index + 1, current.length)
        ]);
  };



  return (
    <>
      <div className="container-sm mt-2 text-center">
        <h1>My ToDos</h1>
        <ul className="list-group mt-5">
          <li className="list-group-item">
            <input
              type="text"
              className="form-control border border-0"
              placeholder="ToDos"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setInputTodo(e.target.value)}
              value={inputTodo}
              onKeyDown={(e) => addTask(e)}
            />
          </li>
          {tasks.map((task, index) => (
            <li className="list-group-item d-flex justify-content-between" key={index}>
              {task.label}
              <i
                className="fas fa-trash-alt"
                onClick={() => deleteTask(index)}
              ></i>
            </li>
          ))}
          <li className="list-group-item">{tasks.length} Tareas Faltantes</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
