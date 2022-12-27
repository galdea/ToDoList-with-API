import React from "react";
import ToDoList from "./ToDoList";
import { useEffect, useState } from 'react';

const Home = () => {

  const createTodoList = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
      const createList = async () => {
        try {
          const url = "https://assets.breatheco.de/apis/fake/todos/user/galdea";
          const data = {
            "todos": [
              { "label": "Make the bed", "done": false },
              { "label": "Walk the dog", "done": false },
              { "label": "Do the replits", "done": false }
            ]
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        } catch (error) {
          console.error(error);
        }
      }

      createList();
    }, []);

    return status;
  }

  const updateTodoList = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
      const updateList = async () => {
        try {
          const url = "https://assets.breatheco.de/apis/fake/todos/user/galdea";
          const data = {
            "todos": [
              { "label": "Make the bed", "done": true },
              { "label": "Walk the dog", "done": false },
              { "label": "Do the replits", "done": false }
            ]
          };

          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        } catch (error) {
          console.error(error);
        }
      }

      updateList();
    }, []);

    return status;
  }
  
  return (
    <div className="text-center">
      <ToDoList />
      {createTodoList()}
      {updateTodoList()}
    </div>
  );
};

export default Home;
