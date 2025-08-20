export interface TodoItemData {
  id: string, 
  text: string, 
  completed: boolean
}

export interface TodoItemProps {
  todo: TodoItemData;
  deleteTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

function TodoItem( { todo: todoItem, deleteTodo: deleteTodo, toggleCompleted }: TodoItemProps) {
  function handleChange() {
    toggleCompleted(todoItem.id);
  }

  return(
    <div className='flex justify-between'>
      <input
        type='checkbox'
        checked={todoItem.completed}
        onChange={handleChange}
      />
      <p>{todoItem.text}</p>
      <button onClick={() => deleteTodo(todoItem.id)}>
        X
      </button>
    </div>
  )
}

export default TodoItem;