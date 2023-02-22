import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputTodo, setInputTodo] = useState("");
	const [task, setTask] = useState([]);
	function addTask (){
		setTask(task.concat(inputTodo));
		setInputTodo("");


	}
	return (
		<>
			<div className="container-sm mt-2 text-center">
				<h1>My ToDos</h1>
				<ul class="list-group mt-5">
					<li class="list-group-item">
						<input type="text"
							className="form-control border border-0"
							placeholder="ToDos"
							aria-label="Username"
							aria-describedby="basic-addon1"
							onChange={(e) => setInputTodo(e.target.value)}
							value={inputTodo}
							onKeyDown={(e) => e.key === "Enter" ? addTask() : null}
						/>
					</li>
					{task.map((t, index) => (
						<li className="list-group-item d-flex justify-content-between">{t}{" "}
							<i class="fas fa-trash-alt" onClick={() => setTask(task.filter((t, currentIndex) => index != currentIndex))}></i>
						</li>
					))}
					<li className="list-group-item">{task.length} Tareas Faltantes</li>
				</ul>
			</div>
		</>
	);
};

export default Home;
