import { useEffect, useState } from "react";
import TodoItem, { TodoItemData } from "./todoItem";

export function TodoList() {
 
  const [greeting, setGreeting] = useState('');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<TodoItemData[]>([]);

  const fetchData = async () => {
    let greetingText;
    let todoJsons;

    try { 
      greetingText = await (await fetch('http://localhost:8080/')).text();
    } catch(error) {
      console.log(error);
    }
    try {
      todoJsons = await (await fetch('http://localhost:8080/todos/')).json();
    } catch(error) {
      console.log(error);
    }
    
    if(todoJsons === undefined){
      throw new Error("Todos undefined");
    }

    let newTodos: { id: string; text: string; completed: boolean; }[] = [];
    
    todoJsons.forEach((todo: { id: string; text: string; completed: boolean; }) => {
      const newTodo = { id: todo.id, text: todo.text, completed: todo.completed }; 
      newTodos.push(newTodo);
    });

    setGreeting(greetingText || 'Greeting Missing!');
    setTodos([...todos, ...newTodos]); 
  }

  const postTodo = (newTodo: TodoItemData) => {
    fetch('http://localhost:8080/todos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: newTodo.id,
            text: newTodo.text,
            completed: newTodo.completed
          })
        })
        .then(response => response.json)
        .then(data => console.log('Success: ', data))
        .catch(error => console.error('Error: ', error)) 
  }

  const deleteTodo = (id: string) => {
    fetch('http://localhost:8080/todos/', {
      method: 'DELETE',
      body: id
    })
    .then(response => response.json)
    .then(data => console.log('Success: ', data))
    .catch(error => console.error('Error: ', error)) 
  }

  function addTodo(text:string) {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);

    postTodo(newTodo);

    setText('');
  }

  function removeTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
    deleteTodo(id);
  }

  function toggleCompleted(id: string) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      else {
        return todo;
      }
    }));
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  return(
    <div className='space-x-4'>
      {greeting}
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          deleteTodo={removeTodo}
          toggleCompleted={toggleCompleted}  
        />
      ))}
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        className='outline-(--foreground) outline-solid outline-1'
      />
      <button onClick={() => addTodo(text)}>Add</button>
    </div>
  );
}
export default TodoList;