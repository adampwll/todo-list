import { useEffect, useState } from "react";
import TodoItem, { TodoItemData } from "./todoItem";

export function TodoList() {
 
  const [greeting, setGreeting] = useState('');
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [itemsToUpdate, setItemsToUpdate] = useState<Map<string, TodoItemData>>(new Map());
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);

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

  function putTodos() {
    let updateables: TodoItemData[] = [];
    itemsToUpdate.forEach(item => updateables.push(item))

    if (updateables.length < 1)
      throw new Error("List of updatable items is empty.");

    fetch('http://localhost:8080/todos/',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateables)
      }
    );
    setItemsToUpdate(new Map());
    setUpdateButtonDisabled(true);
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
        const toggledTodo = {...todo, completed: !todo.completed };
        const updateCopy: Map<string, TodoItemData> = itemsToUpdate;
        updateCopy.set(todo.id, toggledTodo);
        setItemsToUpdate(updateCopy);
        setUpdateButtonDisabled(false);
        return toggledTodo;
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
      <button 
        disabled={updateButtonDisabled} 
        onClick={() => putTodos()}
        className='justify-end'
      > Update </button>
    </div>
  );
}
export default TodoList;