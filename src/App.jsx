import { useState } from 'react';
import './App.css';

function App() {
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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
        <h5 className='inline mx-3 mt-4'>My Todos</h5>
        <div className="d-flex align-items-center">
          <h5 className='inline right mx-3 mt-4'>Status Filter:</h5>
          <div className="custom-dropdown inline right mt-4">
            <select
              className={`form-control ${
                filter === 'All'
                  ? 'bg-danger text-white'
                  : filter === 'Completed'
                  ? 'bg-success text-white'
                  : 'bg-danger'
              }`}
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="All" className="bg-danger">
                All
              </option>
              <option value="Completed" className="bg-success">
                Completed
              </option>
              <option value="Not Completed" className="bg-danger">
                Not Completed
              </option>
            </select>
          </div>
        </div>
      </div>

      <div>
        {filteredTodos.map((todo, index) => (
          <div className="card" id='card' key={index}>
            <div className="card-body">
              <h5 className="card-title">Name: {todo.name}</h5>
              <p className="card-text">Description: {todo.description}</p>
              <div className="form-group">
                {editIndex === index ? (
                  <select
                    className={`form-control ${
                      todo.status === 'Not Completed'
                        ? 'bg-danger'
                        : 'bg-success'
                    }`}
                    value={todo.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <div>
                    <label>Status:</label>
                    <span
                      className={`badge ${
                        todo.status === 'Not Completed'
                          ? 'bg-danger'
                          : 'bg-success'
                      } mx-2`}
                    >
                      {todo.status}
                    </span>
                  </div>
                )}
                <div>
                  {editIndex === index ? (
                    <button
                      className="btn btn-success mt-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success mx-4 mt-4"
                        onClick={() => handleEditStatus(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
