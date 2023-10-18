import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (todoName && todoDescription) {
      const newTodo = {
        name: todoName,
        description: todoDescription,
        status: 'Not Completed',
      };

      setTodos([...todos, newTodo]);
      setTodoName('');
      setTodoDescription('');
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = newStatus;
    setTodos(updatedTodos);
  };

  const handleEditStatus = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  return (
    <div>
      <div>
        <h3 className='text-center text-success'>My Todo</h3>
        <input
          id='name'
          className='mx-4 mt-4 border border-success'
          placeholder='Todo Name'
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <input
          id='description'
          className='mx-4 border border-success'
          placeholder='Todo Description'
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <button
          className='mb-2 mx-4 btn btn-success btn btn-primary btn-sm'
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="d-flex justify-content-between">
        <h5 className='inline'>My Todos</h5>
        <div className="d-flex align-items-center">
          <h5 className='inline right'>Status Filter:</h5>
          <div class="dropdown inline right">
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        {filteredTodos.map((todo, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">Name: {todo.name}</h5>
              <p className="card-text">Description: {todo.description}</p>
              <div className="form-group">
                <label>Status:</label>
                {editIndex === index ? (
                  <select
                    className="form-control"
                    value={todo.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <div>
                    {todo.status}
                    <br />
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => handleEditStatus(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mt-2 mx-2"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {editIndex === index && (
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;