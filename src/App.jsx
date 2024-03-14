import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const inpref = useRef();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://localhost:3000/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.title && content.description) {
      if (editIndex !== null) {
        axios
          .put(`http://localhost:3000/notes/${notes[editIndex]._id}`, content)
          .then((response) => {
            const updatedNotes = [...notes];
            updatedNotes[editIndex] = response.data;
            setNotes(updatedNotes);
            setEditIndex(null);
            setContent({ title: "", description: "" });
            toast.success("Note updated successfully!");
          })
          .catch((error) => console.error("Error updating note:", error));
      } else {
        axios
          .post("http://localhost:3000/notes", content)
          .then((response) => {
            setNotes([...notes, response.data]);
            setContent({ title: "", description: "" });
            toast.success("Note added successfully!");
          })
          .catch((error) => console.error("Error adding note:", error));
      }
    }
  };

  const handleEdit = (index) => {
    inpref.current.focus();
    setContent(notes[index]);
    setEditIndex(index);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/notes/${id}`)
      .then(() => {
        const filteredNotes = notes.filter((note) => note._id !== id);
        setNotes(filteredNotes);
        toast.success("Note deleted successfully!");
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="container">
      <div
        id="addnote"
        className="mt-5 container rounded-3 d-flex flex-column mx-auto p-4 bg-light"
      >
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {editIndex !== null ? "Edit Note" : "Add a Note"}
          </h1>
          <input
            type="text"
            placeholder="Title"
            className="form-control m-2"
            ref={inpref}
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
          />
          <textarea
            type="text"
            placeholder="Take a note..."
            rows={4}
            className="form-control m-2"
            value={content.description}
            onChange={(e) =>
              setContent({ ...content, description: e.target.value })
            }
          />
          <button
            id="btn"
            className={`btn btn-${
              editIndex !== null ? "secondary" : "success"
            } rounded-2 mx-auto mt-3`}
          >
            {editIndex !== null ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>

      <div
        className={`d-flex flex-wrap mt-5 ${
          notes.length > 2 ? "justify-content-around" : "mx-3"
        }`}
      >
        {notes.map((note, index) => (
          <div
            key={note._id}
            id="mynotes"
            className="m-4 container rounded-3 p-4 bg-light"
          >
            <div className="title-container d-flex justify-content-between align-items-center">
              <h2 className="mt-3">{note.title}</h2>
              <div className="icons-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2"
                  onClick={() => handleEdit(index)}
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022"
                    />
                    <path d="m14.5 6.5l3 3" />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2"
                  onClick={() => handleDelete(note._id)}
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78zm3.345-2.853A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6zM2 6h20m-12 5v5m4-5v5"
                  />
                </svg>
              </div>
            </div>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
