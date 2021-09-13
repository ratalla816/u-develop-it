const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

// const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

  // GET all the candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    
db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });


  // Delete a candidate
//   The endpoint used here also includes a route parameter to uniquely identify the candidate to remove. 
  app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
//   we're using a prepared SQL statement with a placeholder. We'll assign the req.params.id to params 
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
// What if the user tries to delete a candidate that doesn't exist? That's where the else if statement comes in. 
// If there are no affectedRows as a result of the delete query, that means that there was no candidate by that id. 
// Therefore, we should return an appropriate message to the client, such as "Candidate not found".        
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
//   The JSON object route response will be the message "deleted", with the changes property set to result.affectedRows. Again, this will verify whether any rows were changed.          
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  // Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name',
      'industry_connected'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

//   Database call
// there is no column for the id. MySQL will autogenerate the id and relieve us of the responsibility to know which id is available to populate.
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
//  The params assignment contains three elements in its array that contains the user data collected in req.body.
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
   });
  });
});
    
  
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});