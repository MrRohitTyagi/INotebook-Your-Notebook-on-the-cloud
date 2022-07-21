const connectToMongo = require('./db')
const express = require('express')
const Authrouter = require('./routes/auth')
const Notesrouter = require('./routes/notes')
const cors = require('cors')

connectToMongo()

const app = express()
app.use(cors())
const port = 5000;
app.use(express.json())

//available routes
app.use('/api/auth', Authrouter)
app.use('/api/notes', Notesrouter)




app.listen(port, () => {

  console.log(`example app running at http://localhost:${port}`);
})    