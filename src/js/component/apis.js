import React, { useState, useEffect } from "react";

const Apifunctions = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername('some-valid-username');
  }, []);

  function callApi() {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // handle the data received from the API here
        console.log(data);
      })
      .catch(error => {
        // handle any errors that may occur
        console.log(error);
      });
  }

  function createTodoList() {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([]) // pass an empty array as the request body
    })
      .then(response => response.json())
      .then(data => {
        // handle the response data here
        console.log(data);
      })
      .catch(error => {
        // handle any errors that may occur
        console.log(error);
      });
  }

  function updateTodoList(todoList) {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoList) // pass the updated list of todo's as the request body
    })
      .then(response => response.json())
      .then(data => {
        // handle the response data here
        console.log(data);
      })
      .catch(error => {
        // handle any errors that may occur
        console.log(error);
    });
}

  function deleteTodoList() {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // handle the response data here
        console.log(data);
      })
      .catch(error => {
        // handle any errors that may occur
        console.log(error);
      });
  }

  return (
    <div>
      <form>
        <label>
          username:
          <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
      </form>
      <button onClick={callApi}>Get tasks</button>
      <button onClick={createTodoList}>Create tasks</button>
      <button onClick={() => updateTodoList(/* pass the updated todo list as an argument here */)}>Update tasks</button>
      <button onClick={deleteTodoList}>Delete tasks</button>
    </div>
  );
};

export default Apifunctions;
