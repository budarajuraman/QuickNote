const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://ramanrahul114:Brrece@2003@quicknotevercel.zsr73.mongodb.net/?retryWrites=true&w=majority&appName=QuickNotevercel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log("MongoDB connected")).catch((err)=> console.log("Error connecting with MongoDB",err));

// Route to get all notes
app.get('/notes', async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

// Route to add a note
app.post('/notes', async (req, res) => {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content
    });
    await newNote.save();
    res.json(newNote);
  });

// Route to delete a note
app.delete('/notes/:id', async (req, res) => {
    try {
      const result = await Note.findByIdAndDelete(req.params.id);
      if (result) {
        res.sendStatus(204); 
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
