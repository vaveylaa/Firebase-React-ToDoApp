import { useState } from 'react';

function TodoItem(props) {
  const [completed, setCompleted] = useState(props.todo.completed);

  const handleComplete = () => {
    fetch(`/api/todos/${props.todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(response => response.json())
      .then(data => setCompleted(data.completed));
  };

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={handleComplete} />
      <span>{props.todo.title}</span>
    </div>
  );
}

export default TodoItem;
