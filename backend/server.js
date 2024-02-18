const cookieParser = require('cookie-parser');
const express = require('express')
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs').promises
const session = require('express-session');
const path = require('path');
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET","POST"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUnitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    } //set the session cookie properties
}))


app.post('/signout', (req, res) => {
  // Destroy the session on the server
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Clear the session cookie on the client
    res.clearCookie('connect.sid');
    return res.status(200).send('OK');
  });
});



// Function to generate a random 6-digit code
const generateRandomCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// Function to create a directory with a random name
const createRandomDirectory = () => {
  const randomCode = generateRandomCode();
  const directoryName = `./uploads/${randomCode}`;
  return directoryName;
};

// Multer configuration
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "signup"
})



// Handle file upload
app.post('/upload', upload.array('files'), async(req, res) => {
  try {
    // Access uploaded files in req.files array
    const files = req.files;

    // Create a random directory
    const randomDirectory = createRandomDirectory();
    await fs.mkdir(randomDirectory);

    // Process and save files to the random directory
    const uploadedFiles = [];
    for (const file of files) {
      const filename = `${file.originalname}`;
      const filePath = path.join(randomDirectory, filename);

      // Save file to disk
      await fs.writeFile(filePath, file.buffer);

      uploadedFiles.push({
        originalname: file.originalname,
        filename: filename,
        filePath: filePath,
      });
    }
    const randomCode = path.basename(randomDirectory);
    
    // Send a response with information about the uploaded files and directory
    res.status(200).json({ message: 'Files uploaded successfully', randomCode: randomCode});
  } catch (error) {
    // Handle errors
    console.error('An error occurred during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }});

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO signup(`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]

    db.query(sql,[values],(err,data) => {
      if(err){
        return res.json({error: err.message});
      }  
      return res.json(data);
    })

})

app.get('/',(req,res)=>{
  if(req.session.username ) {
   return res.json({valid: true,username: req.session.username,cookie: req.cookies});
  }else{
    return res.json({valid: false});
  }

})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data) => {
      if(err){
        return res.json({error: err.message});
      }  
      if(data.length > 0){
        req.session.username = data[0].name;
        console.log(req.session.username);
        return res.json({message: true});
      }else{
        return res.json({message: false}); 
      }
    })
  })



app.listen(8081,()=>{
    console.log('listening');
})