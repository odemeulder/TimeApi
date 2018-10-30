const express = require('express')

const app = express()

app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString()
  res.status(200).send(`Current time is ${time}`)
})

app.get('*', (req, res) => {
  res.status(403)
})

app.listen(8888, () => {
  console.log("Server listening on port 8888")
})
