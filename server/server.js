const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
const app = express();
const secretKey = 'password';

const port = 5000;
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'module4-final-project',
});

app.use(async function(req, res, next) {
  try {
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await req.db.query(`SET time_zone = '-8:00'`);
    console.log('DB Connection Made');
    await next();
    req.db.release();

  } catch (err) {
    console.log(err);

    if (req.db) req.db.release();
    throw err;
  }
});

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));

app.use(express.json())
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  const token = req.cookies.logged_in;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  })
};

app.post('/login', (req, res) => {
  const { email, password } = req.body.loginInfo;
  console.log(email,password);

  if (!email || !password) { return res.status(400).json({ error: 'Email and password are required' })}
  const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });
  
  res.cookie('logged_in', token, { maxAge: 900000 });
  res.json({ email, password, token });
});

app.get('/alltickets', authMiddleware, async function(req, res) {
  try {
      const result = await req.db.query('SELECT * FROM support_tickets');
      const rows = result[0];
      res.json(rows );
  } catch (err) {
      console.log('Error fetching data from the database');
      res.json({ success: false, message: 'Internal Server Error'});
  }
});

app.get('/opentickets', authMiddleware, async function(req, res) {
  try {
      const result = await req.db.query('SELECT * FROM support_tickets WHERE status = "Open"');
      const rows = result[0];
      res.json(rows);
  } catch (err) {
      console.log('Error fetching data from the database');
      res.json({ success: false, message: 'Internal Server Error'});
  }
});

app.get('/highprioritytickets', authMiddleware, async function(req, res) {
  try {
      const result = await req.db.query('SELECT * FROM support_tickets WHERE priority = "High"');
      const rows = result[0];
      res.json(rows);
  } catch (err) {
      console.log('Error fetching data from the database');
      res.json({ success: false, message: 'Internal Server Error'});
  }
});

app.get('/closedtickets', authMiddleware, async function(req, res) {
  try {
      const result = await req.db.query('SELECT * FROM support_tickets WHERE status = "Closed"');
      const rows = result[0];
      res.json(rows );
  } catch (err) {
      console.log('Error fetching data from the database');
      res.json({ success: false, message: 'Internal Server Error'});
  }
});

app.get('/clearcookie', function(req,res){
  res.clearCookie('logged_in');
  res.send('You have been logged out.');
});

app.post('/createticket', async function(req, res) {
  try {
      const { issue_title, type, date, description, priority, status } = req.body;
      const query = await req.db.query(`INSERT INTO support_tickets (issue_title, type, date, description, priority, status) VALUES
      (:issue_title, :type, :date, :description, :priority, :status)`, {issue_title, type, date, description, priority, status});
      res.json({ success: true, message: 'Data successfully added'});
  } catch (err) {
      console.log('Error inserting data into the database', err);
      res.json({ success: false, message: err});
  }
});

app.put('/updateticket/:id', async function(req, res) {
  try {
      const id = Number(req.params.id);
      const { issue_title, type, date, description, priority, status } = req.body;
      console.log(req.params.id, req.body);
      const query = await req.db.query(`UPDATE support_tickets SET issue_title = :issue_title, type = :type, date = :date, description = :description, priority = :priority, status = :status WHERE ticket_id = :id`, {id, issue_title, type, date, description, priority, status});
      res.json({ success: true, message: 'Data successfully updated'});
  } catch (err) {
      console.log('Error updating data in the database');
      res.json({ success: false, message: err});
  }
});

app.delete('/deleteticket/:id', authMiddleware, async function(req, res) {
  try {
      const id = Number(req.params.id);
      const query = await req.db.query('UPDATE support_tickets SET status = "Closed" WHERE ticket_id = :id', {id});
      res.json({ success: true, message: 'Car successfully deleted'});
  } catch (err) {
      console.log('Error deleting data from the database');
      res.json({ success: false, message: 'Entry was NOT deleted'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});
