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
	fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });





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
