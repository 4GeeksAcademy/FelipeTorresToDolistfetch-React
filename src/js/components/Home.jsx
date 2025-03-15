import React from "react";

import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  // se crean todos los useState//
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputUser, setInputUser] = useState("");
  const baseUrl = "https://playground.4geeks.com/todo"; //coloco la url de la api en una variable//


// creacion del usuario
  const getUser = async () => {
    try {
      // uso nuevamente del fetch, await  y basticks//
      const response = await fetch(`${baseUrl}/users/${inputUser}`, {
        //metodo POST, para crear el usuario//
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        return alert("Usuario Creado");
      }

      if (response.status == 400) {
        getListTodos();
        return alert("Usuario ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  };
      //creacion del tODo//
  const getListTodos = async () => {
    try {
          // uso nuevamente del fetch, await  y basticks//
      const response = await fetch(`${baseUrl}/users/${inputUser}`);
      if (response.status !== 200) {
        return alert("mision fallida...");
      }
      const data = await response.json();
      setList(data.todos);
    } catch (error) {
      console.log(error);
    }
  };
    // creacion de addicionar tarea//
  const addTask = async () => {
    try {
      const body = {
        label: inputValue,
        is_done: false,
      };
      const response = await fetch(`${baseUrl}/todos/${inputUser}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 201) {
        return alert("Algo salio mal, sorry...");
      }
      const newTask = await response.json();
      setList((prevState) => [...prevState, newTask]);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };
        //metodo DELETE, para eliminar  el usuario y todas las tareas//
  const deleteAllTasks = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${inputUser}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setList([]);
        return alert("se eliminaron todas las tareas y  el suario");
      }

      return alert("error al eliminar taraes");
    } catch (error) {
      console.log(error);
    }
  };
      //metodo DELETE, para eliminar una sola tarea del usuario//
  const deleteTask = async (todoId) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${todoId}`, {
        method: "DELETE",
      });
      setList(list.filter((list) => list.id !== todoId));
    } catch (error) {
      console.log(error);
    }
  };
// uso del useeffect, el cual hacer que solo cargue una vez//
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="container mx-auto text-center mt-5 p-4 ">
        <h1>YOUR USER ANDS TASK</h1>

        <div>

          <input
            className="inputuser mx-auto text-center mt-5 p-1 border-5 rounded-pill "
            type="text"
            placeholder="Add user"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
          
          <button
            className="createuser mx-auto text-center  p-1 rounded-4 "
            onClick={getUser}
          >
            Create User
          </button>
        </div>
        <div>
          <input
            className="inputask mx-auto text-center  p-1 rounded-4 border-5 "
            type="text"
            placeholder="Add Tasks"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

				<button
					className="createtask mx-auto text-center   rounded-4 "
					onClick={addTask}>
					Create Task
				</button>
          {list.map((task) => {
            return (
              <li
                className=" text-center text-light text-m-4 rounded-4 border-5 "
                key={task.id}>
                {task.label}

                <span onClick={() => deleteTask(task.id)}> 
                  <button className="bye task mx-auto text-center mt-5 rounded-4 m-4">
                    X
                  </button>
                </span>{" "}
              </li>
            );
          })}
          
          
          <br />
          <button
            className="deletealltasks mx-auto text-center mt-2 rounded-4"
            onClick={deleteAllTasks}>
            Delete All Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

//  Crear una funcion para crear el usuario.
// Crear una funcion para eliminar usuario y dentro de esa, una vez que recibimos la respuesta de que se elimino correctamente, ejecutamos la que crea el usuario
