import { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'

const TodoComponent = () => {
    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState('')

    const addTask = (task) => {
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(7),
            text: task,
            completed: false,
        }])
    }
    const removeTask = (task) => {
        setTasks(tasks.filter((t) => t !== task))}

    const markTaskCompleted = (task) => {
        task.completed = true;
        setTasks(tasks.map((t) => t.id === task.id ? task : t))}

    const handleInputChange = (e) => {
        setInputValue(e.target.value)}

    const getCompletedTasks = () => {
        return tasks.filter((task) => task.completed === true)}

    const getPendingTasks = () => {
        return tasks.filter((task) => task.completed === false)}

    /* console.log(tasks) */
  return (
    <div>
        <input
            className='task-input'
            type="text"  
            placeholder='Add task'
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    if(inputValue !== ''){
                    addTask(e.target.value)
                }
                setInputValue('')
                }}}
        />
        <div className='flex justify-center gap-8'>
            <div className='
                        border 
                        border-slate-300 
                        p-9 shadow-2xl
                        rounded'>
                <h2>Completed Tasks</h2>
                <ul>
                    {getCompletedTasks().map((task) => (
                        <li
                        className='flex justify-between mb-1' 
                        key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={ ()=> markTaskCompleted(task)}
                         />
                    <span style={ task.completed 
                                    ? {textDecoration:"line-through"} 
                                    : {textDecoration:"none"} }>
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
            </div>
            <div className='border border-slate-300 p-9 shadow-2xl rounded'>
                <h2>Pending Tasks</h2>
                <ul>
                    {getPendingTasks().map((task) => (
                        <li
                            className='flex justify-between mb-1' 
                            key={task.id}>
                    <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={ ()=> markTaskCompleted(task)}
                         />
                    <span style={ task.completed 
                                    ? {textDecoration:"line-through"} 
                                    : {textDecoration:"none"} }>
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
            </div>
        </div>
{/*         <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={ ()=> markTaskCompleted(task)}
                         />
                    <span style={ task.completed 
                                    ? {textDecoration:"line-through"} 
                                    : {textDecoration:"none"} }>
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
            )
            )}
        </ul> */}
    </div>
  )
}

export default TodoComponent