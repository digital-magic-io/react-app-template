import express from 'express'
import * as bodyParser from 'body-parser'
import { users } from './users'
import { AuthInfo, AuthRequest } from './types'

const app = express()
const port = 8080
let authInfo: AuthInfo | undefined = undefined

app.use(bodyParser.json())

app.get('/api/v1/auth', (req, res, next) => {
  if (authInfo) {
    res.status(200).json(authInfo)
    next()
  } else {
    res.sendStatus(401)
    next()
  }
})

app.post('/api/v1/auth', (req, res, next) => {
  const authReq: AuthRequest = req.body
  const user = users.find((u) => u.username === authReq.username && u.password === authReq.password)
  if (user) {
    authInfo = {
      username: user['username'],
      displayName: user['displayName'],
      role: user['role']
    }
    res.sendStatus(200)
    next()
  } else {
    authInfo = undefined
    res.sendStatus(401)
    next()
  }
})

app.delete('/api/v1/auth', (req, res, next) => {
  if (authInfo) {
    authInfo = undefined
    res.sendStatus(200)
    next()
  } else {
    res.sendStatus(401)
    next()
  }
})

app.listen(port)
console.log(`Server is running on port ${port}.`)
