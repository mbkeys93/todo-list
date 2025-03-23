   const express = require('express');
   const mysql = require('mysql2');
   const bodyParser = require('body-parser');
   const cors = require('cors');

   const app = express();
   const port = 3000;

   // MySQL connection configuration
   const connection = mysql.createConnection({
       host: 'localhost',
       user: 'mbkeys',
       password: 'U3^S*6QsP7U8Tpmf',
       database: 'todolist'
   });

   connection.connect((err) => {
       if (err) {
           console.error('Error connecting to MySQL:', err);
           return;
       }
       console.log('Connected to MySQL database');
   });

   app.use(bodyParser.json());
   app.use(cors());

  // Routes
app.get('/api/todo', (req, res) => {
  const query = 'SELECT idtodos id, datetime date, description, completedflag completed FROM todos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).send('Error fetching todos');
      return;
    }
    res.json(results);
  });
});

// Get a single todo by ID
app.get('/api/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT idtodos id, datetime date, description, completedflag completed FROM todos WHERE idtodos = ?';
  connection.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error fetching todo:', err);
          res.status(500).send('Error fetching todo');
          return;
      }
      if (!result || result.length === 0) {
          return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(result[0]);
  });
});

app.post('/api/todo', (req, res) => {
  const { date, description } = req.body;
  const query = 'INSERT INTO todos (date, description, completedflag) VALUES (?, ?, 0)';
  connection.query(query, [date, description], (err, results) => {
    if (err) {
      console.error('Error adding todo:', err);
      res.status(500).send('Error adding todo');
      return;
    }
    res.json({ id: results.insertId, date, description, completedflag: 0 });
  });
});

app.put('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  const { completedflag } = req.body;
  const query = 'UPDATE todos SET completedflag = ? WHERE idtodos = ?';
  connection.query(query, [completedflag, id], (err, results) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.status(500).send('Error updating todo');
      return;
    }
    res.json({ id, completedflag });
  });
});

app.delete('/api/todo/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM todos WHERE idtodos = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).send('Error deleting todo');
      return;
    }
    res.json({ message: 'Todo deleted' });
  });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});