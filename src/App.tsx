import React, {FC,ChangeEvent, useState} from 'react';
import './App.css';
import {ITask} from './interfaces';
import TodoTask from './Components/TodoTask';

const App: FC=()=> {
  const [task, setTask] = useState<string>("");
  const [day, setDay] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);
  const handleChange =(event:ChangeEvent<HTMLInputElement>): void=>{
    if(event.target.name === "task"){
      setTask(event.target.value)
    }else{
      setDay(Number(event.target.value));
    }
  }

  const addTask =(): void =>{
    const newTask = {
      taskName:task, dat:day
    };
    setTodo([...todo, newTask]);
    setDay(0);
    setTask("");
  }
  const completeTask = (taskNameToDelete : string):void=>{
    setTodo(todo.filter((task)=>{
      return task.taskName != taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
      <input type="text" placeholder="Task...." value={task} name= "task"onChange={handleChange}></input>
      <input type="number" placeholder="Deadline (for days)...." name= "day" value={day} onChange={handleChange}  ></input>
      </div>
      <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
      {todo.map((task:ITask, key:number)=>{
        return <TodoTask key={key} task={task} completeTask={completeTask} />
      })}
      </div>
    </div>
  );
}

export default App;
