import React, { useState, useEffect } from "react";
import { Column, Row, Container} from "react-bootstrap"


function ToDoList() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [hover, setHover] = useState(-1);
  const [input, setInput] = useState("");
	const [lista, setLista] = useState([]);

	useEffect(() => {});
	useEffect(() => {
		console.log("Renderizing");
		getTodo().then(lista => {
			setLista(lista.map(dato => dato.label));
		});
	}, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

const createTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/galdea",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([]),
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return { result: "Error al actualizar" };
	}
};
const getTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/galdea",
			{
				method: "GET",
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return [];
	}
};
const putTodo = async (data = []) => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/galdea",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return { result: "Error al actualizar" };
	}
};
const deleteTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/galdea",
			{
				method: "DELETE",
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return [];
	}
};

  return (
    <Container>
      <Row>
        <div className="title mt-5 d-flex justify-content-center">
          <p>todos</p>
        </div>
      </Row>
      <Row className="box mx-5 p-5">

      <Row className="justify-content-center">
      <input
					type="text"
          className="input"
					placeholder="write your tasks..."
					onChange={e => {
						setInput(e.target.value);
						console.log(input);
					}}
					value={input}
					onKeyUp={e => {
						if (e.keyCode === 13) {
							if (input !== "") {
								if (lista.length == 0) {
									createTodo().then(val => {
										let dato = [];
										[...lista, input].forEach(value => {
											dato.push({
												label: value,
												done: false
											});
										});
										putTodo(dato).then(val => {
											getTodo().then(lista => {
												setLista(
													lista.map(
														dato => dato.label
													)
												);
											});
										});
										setInput("");
									});
								} else {
									let dato = [];
									[...lista, input].forEach(value => {
										dato.push({
											label: value,
											done: false
										});
									});
									putTodo(dato).then(val => {
										getTodo().then(lista => {
											setLista(
												lista.map(dato => dato.label)
											);
										});
									});
									setInput("");
								}
							}
						}
					}}
				/>
        <ul>
					{lista.map((valorlista, key) => {
						return (
							<li className="items px-3 py-1" key={key}>
								{valorlista}
								<a
									onClick={() => {
										lista.splice(key, 1);
										//setLista([...lista]);
										let dato = [];
										[...lista].forEach(value => {
											dato.push({
												label: value,
												done: false
											});
										});
										if (dato.length > 0) {
											putTodo(dato).then(val => {
												getTodo().then(lista => {
													setLista(
														lista.map(
															dato => dato.label
														)
													);
												});
											});
										} else {
											deleteTodo().then(value => {
												setLista([]);
											});
										}
									}}>
									                    <i className="icon fa fa-times py-1" />
								</a>
							</li>
						);
					})}
				</ul>
        <div className="todosLength d-flex justify-content-center">{lista.length} items left</div>
      </Row>
      </Row>
    </Container>
  );
}

export default ToDoList;
