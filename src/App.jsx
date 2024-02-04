import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.title && content.description) {
      if (editIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = { Title: content.title, Description: content.description };
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        const newNote = { Title: content.title, Description: content.description };
        setNotes([...notes, newNote]);
      }
      setContent({ title: '', description: '' });
    }
  };

  const handleEdit = (index) => {
    setContent({
      title: notes[index].Title,
      description: notes[index].Description
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleUpdate = () => {
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className='container-f '>
      <div className='mt-5 container rounded-3 d-flex flex-column bg-light mx-auto'>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <h1 className='text-center mt-3'>{editIndex !== null ? 'Edit Note' : 'Add a Note'}</h1>
          <input
            type='text'
            placeholder='Title'
            className='m-2 outline'
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
          />
          <textarea
            type='text'
            placeholder='Take a note...'
            rows={4}
            className='m-2'
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
          />
          <button id='btn' onClick={handleSubmit} className='rounded-2 mx-auto mb-3 bg-success text-white mt-2'>
            {editIndex !== null ? 'Update Note' : 'Add Note'}
          </button>
        </form>
      </div>
      
      <div className={`d-flex flex-wrap mt-5 ${notes.length > 2 ? 'justify-content-around' : 'mx-3'}`}>
      {notes.map((note, index) => (
        <div key={index} id='mynotes' className='m-4 container rounded-3 d-flex flex-column bg-light'>
          <div className='title-container d-flex justify-content-between align-items-center'>
            <h2 className='mt-3'>{note.Title}</h2>
            <div className='icons-container'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-1'
                onClick={() => handleEdit(index)}
                width='1em'
                height='1em'
                viewBox='0 0 24 24'
              >
                <g fill='none' stroke='currentColor' stroke-width='2'>
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022'
                  />
                  <path d='m14.5 6.5l3 3' />
                </g>
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-1'
                onClick={() => handleDelete(index)}
                width='1em'
                height='1em'
                viewBox='0 0 24 24'
              >
                <path
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78zm3.345-2.853A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6zM2 6h20m-12 5v5m4-5v5'
                />
              </svg>
            </div>
          </div>
          {editIndex === index ? (
            <>
              <input
                type='text'
                placeholder='Title'
                className='m-2 outline'
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
              <textarea
                type='text'
                placeholder='Take a note...'
                rows={4}
                className='m-2'
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
              />
              <button id='btn' onClick={handleUpdate} className='rounded-2 mx-auto mb-3 bg-secondary text-white'>
                Update Note
              </button>
            </>
          ) : (
            <p>{note.Description}</p>
          )}
        </div>
      ))}
      </div>
      
    </div>
  );
}

export default App;
