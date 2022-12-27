import React, { useState } from "react";
import { Column, Row, Container} from "react-bootstrap"


function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [hover, setHover] = useState(-1);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  return (
    <Container>
      <Row>
        <div className="title mt-5">
          <p>todos</p>
        </div>
      </Row>
      <Row className="box mx-5 p-5">

      <Row className="justify-content-center">
        <input
          type="text"
          className="input"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Row>
      <Row>
        {tasks.length === 0 ? (
          <p>No tasks, add a task</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li
                className="items d-flex justify-content-start px-3 py-1"
                key={index}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(-1)}
              >
                {task}
                {hover === index && (
                  <span onClick={() => handleTaskDelete(index)}>
                    <i className="icon fa fa-times px-5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Row>
      <Row>
        <div className="todosLength">{tasks.length} items left</div>
      </Row>
      </Row>
    </Container>
  );
}

export default ToDoList;
