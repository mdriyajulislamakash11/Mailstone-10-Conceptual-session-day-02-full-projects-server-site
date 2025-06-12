const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000


//Midleware
app.use(cors())
app.use(express())

//Mongo DB conneted code: 




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
