import { useEffect, useState } from "react";
import TodoItem from "./todoItem";

export function TodoList() {
 
  const [greeting, setGreeting] = useState('');
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Appointment',
      completed: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      completed: false
    }
  ]);

// TODO, move fetches to "better" part of execution (not useEffect)
useEffect(() => {
  const fetchData = async () => {
    let greetingText;
    let todoJson;

    try { 
      greetingText = await (await fetch('http://localhost:8080/')).text();
    } catch(error) {
      console.log(error);
    }
    try {
      todoJson = await (await fetch('http://localhost:8080/todos/')).json();
    } catch(error) {
      console.log(error);
    }
    
    if(todoJson === undefined){
      throw new Error("Todo undefined");
    }
    const newTask = { id: todoJson.id, text: todoJson.text, completed: todoJson.completed };

    setGreeting(greetingText || 'Greeting Missing!');
    setTasks([...tasks, newTask]);
  }
  fetchData();
}, [])

  function addTask(text:string) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id: number) {
    setTasks(tasks.map(task => {
      if(task.id === id) {
        return {...task, completed: !task.completed};
      }
      else {
        return task;
      }
    }));
  }

  return(
    <div className='todo-list'>
      {greeting}
      {tasks.map(task => (
        <TodoItem 
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}  
        />
      ))}
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => addTask(text)}>Add</button>
    </div>
  );
}
export default TodoList;