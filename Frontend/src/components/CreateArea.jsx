import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Zoom } from '@mui/material';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpand, setExpand] = useState(false);

  function handleClick() {
    setExpand(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpand ? "3" : "1"}
        />
        <Zoom in={isExpand}>
          <Fab type="submit" color="warning" aria-label="add">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
