require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const Task = require('./models/task');

const app = express();
const port = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://draut0510:UF2i6dMHzuEMvStX@cluster0.pkeo0a2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('Tasks from the database:', tasks);

    res.render('task', { tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/task', async (req, res) => {
  const { title, description, due_date, priority } = req.body;

  const newTask = new Task({
    title,
    description,
    due_date,
    priority,
    user_id: 'user_id_placeholder'
  });

  try {
    await newTask.save();
    console.log('Task saved successfully:', newTask);

    // Redirect to the compose page after task creation
    res.redirect('/task');
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('Tasks from the database:', tasks);

    res.render('/task', { tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//listing on port

// app.listen(process.env.PORT || port,() => console.log('Listening on port${port}'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



