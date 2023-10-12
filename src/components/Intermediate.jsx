import  { useState } from "react";
import { LuTrash2 } from 'react-icons/lu'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(true);

  const addTask = (task) => {
    if (inputValue !== "") {
      setTasks([...tasks, {
        id: Math.random().toString(36).substring(7),
        text: task,
        completed: false,
      }]);
    }
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const markTaskAsCompleted = (task) => {
    task.completed = true;
    setTasks(tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    }));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.completed);
  };

  const getPendingTasks = (tasks) => {
    return tasks.filter((task) => !task.completed);
  };


  return (
    <>
        <input 
            className="mx-auto block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 mb-4"
            type="text" 
            placeholder="Añadir tarea" 
            value={inputValue} 
            onChange={handleInputChange} 
            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                    if (inputValue !== "") {
                                        addTask(inputValue);
                                    }
                                    setInputValue("");
                                }
                    }}
        />
        <div style={{display:'flex',flexDirection:'row-reverse',gap:'5rem',justifyContent:'center'}}>
            <div style={{border:'1px solid gray',padding:'1rem',borderRadius:'5px',boxShadow:'10px 10px 5px 0px rgba(170,164,164,0.75)'}}>
                <h2>Tareas completadas</h2>
                <ul>
                    {isCompletedTasksVisible && getCompletedTasks(tasks).map((task) => (
                        <li 
                            key={task.id} 
                            className='flex justify-between mb-1' 
                        >
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => {
                                    task.completed = !task.completed;
                                    setTasks(tasks.map((t) => {
                                    if (t.id === task.id) {
                                        return task;
                                    } else {
                                        return t;
                                    }
                                    }));
                                }} 
                            />
                            <span 
                                style={task.completed 
                                        ? { textDecoration: "line-through" } 
                                        : { textDecoration: "none" }}>
                                {task.text}
                            </span>
                            <button
                                    className='bg-red-500 hover:bg-red-700 text-white 
                                                font-bold py-1 px-2 ms-2 rounded-md'
                                    onClick={ () => removeTask(task) }
                                >
                                    <LuTrash2/>
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className='px-2  rounded bg-blue-500 hover:bg-blue-700 text-white' 
                    onClick={() => setIsCompletedTasksVisible(!isCompletedTasksVisible)}>
                    {isCompletedTasksVisible ? "Ocultar" : "Ver"}
                </button>
            </div>
            <div style={{border:'1px solid gray',padding:'1rem',borderRadius:'5px',boxShadow:'10px 10px 5px 0px rgba(170,164,164,0.75)'}}>
                <h2>Tareas pendientes</h2>
                <ul>
                    {getPendingTasks(tasks).map((task) => (
                        <li 
                            key={task.id} 
                            className='flex justify-between mb-1' >
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => markTaskAsCompleted(task)} 
                            />
                            <span style={task.completed 
                                            ? { textDecoration: "line-through" } 
                                            : { textDecoration: "none" }}>{task.text}
                            </span>
                            <button
                                className='bg-red-500 hover:bg-red-700 text-white 
                                            font-bold py-1 px-2 ms-2 rounded-md'
                                onClick={ () => removeTask(task) }
                            >
                                <LuTrash2/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  );
};

export default TodoList