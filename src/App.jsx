import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [Todo, setTodo] = useState([]);
  const [selectedValue, setSelectedValue] = useState('ALL'); // Added initial value for selected status

  const handleAddTodo = () => {
    const newTodo = {
      Name: name,
      Description: description,
      Status: 'Not Completed',
    };
    setTodo([...Todo, newTodo]);
    setName('');
    setDescription('');
  };

  const handleSelectChange = (index, value) => {
    const updatedTodoList = [...Todo];
    updatedTodoList[index].Status = value;
    setTodo(updatedTodoList);
  };

  const filteredTodo = Todo.filter((todo) => {
    if (selectedValue === 'ALL') {
      return true;
    }
    return todo.Status === selectedValue;
  });

  return (
    <div>
      <h1 className='text-center m-5'>My TODO</h1>
      <div>
        <input
          placeholder='Enter name'
          name='inpName'
          id='nameInp'
          style={{ marginLeft: '10px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder='Enter Description'
          name='inpDescription'
          id='inpDescription'
          style={{ marginLeft: '10px' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={{ marginLeft: '10px' }} onClick={handleAddTodo}>
          Add Todo
        </button>
        <select
          style={{ marginLeft: '10px' }}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className={selectedValue==='Completed'?'bg-success':'bg-danger'}
        >
          <option value='ALL'>ALL</option>
          <option value='Completed'>Completed</option>
          <option value='Not Completed'>Not Completed</option>
        </select>
      </div>

      <h1 className='mx-3 mt-3 mb-4'>Status</h1>
      <div className='row mx-3'>
        {filteredTodo.map((todo, index) => (
          <div className='col-lg-4 col-md-2 col-sm-5' key={index}>
            <div className='card'>
              <h3><b>Name: </b>{todo.Name}</h3>
              <h3><b>Description: </b>{todo.Description}</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Status</h3>
                <select
                  style={{ marginLeft: '10px' }}
                  className={todo.Status === 'Not Completed' ? 'bg-danger' : 'bg-success'}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  value={todo.Status}
                >
                  <option>Not Completed</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
