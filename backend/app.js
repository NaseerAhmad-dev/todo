const express = require('express');
const todoRouter = require('./routes/todo');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());// Enable CORS for all requests
app.use('/v1', todoRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
