const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;
const secretKey = 'password';

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));

app.use(express.json())
app.use(cookieParser());


app.post('/login', (req, res) => {
  const { email, password } = req.body.loginInfo;
  console.log(email,password);

  if (!email || !password) { return res.status(400).json({ error: 'Email and password are required' })}
  const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });
  
  res.cookie('logged_in', token, { maxAge: 900000 });
  res.json({ email, password, token });
});

// app.get('/login', (req, res) => {
//   res.cookie('cookieName', 'cookieValue')
//   res.send('cookie set');
// });

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  const token = req.cookies.logged_in;
  console.log(token);

  if (token == null) return res.status(401).send('No token found. Failed to load page.')
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    req.user = decoded

    const responseText = 'Successfully loaded protected content! The decoded token value is: ';
    const combinedResponse = responseText + JSON.stringify(decoded);

    res.send(combinedResponse);
  })
});

app.get('/clearcookie', function(req,res){
  res.clearCookie('logged_in');
  res.send('You have been logged out.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
