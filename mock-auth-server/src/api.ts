import express from 'express'
import * as bodyParser from 'body-parser'
import { users } from './users'
import { AuthInfo, AuthRequest } from './types'

const app = express()
const port = 8080
const basePath = '/api/v1'
const authPath = `${basePath}/auth`
const usersPath = `${basePath}/users`
const userPath = `${usersPath}/:username`

let authInfo: AuthInfo | undefined = undefined

app.use(bodyParser.json())

app.get(authPath, (req, res, next) => {
  if (authInfo) {
    res.status(200).json(authInfo)
    next()
  } else {
    res.sendStatus(401)
    next()
  }
})

app.post(authPath, (req, res, next) => {
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

app.delete(authPath, (req, res, next) => {
  if (authInfo) {
    authInfo = undefined
    res.sendStatus(200)
    next()
  } else {
    res.sendStatus(401)
    next()
  }
})

app.get(usersPath, (req, res, next) => {
  if (authInfo) {
    res.status(200).json(users)
    next()
  } else {
    res.sendStatus(401)
    next()
  }
})

app.post(usersPath, (req, res, next) => {
  if (authInfo) {
    const userReq: AuthRequest & AuthInfo = req.body
    if (userReq.username && userReq.displayName && userReq.role && userReq.password) {
      users.push(userReq)
      res.status(201).json({ username: userReq.username })
      next()
    } else {
      res.sendStatus(400)
      next()
    }
  } else {
    res.sendStatus(401)
    next()
  }
})

app.get(userPath, (req, res, next) => {
  if (authInfo) {
    const username = req.params.username
    if (username) {
      const index = users.findIndex((u) => u.username === username)
      if (~index) {
        res.status(200).json(users[index])
        next()
      } else {
        res.sendStatus(404)
        next()
      }
    } else {
      res.sendStatus(400)
      next()
    }
  } else {
    res.sendStatus(401)
    next()
  }
})

app.put(userPath, (req, res, next) => {
  if (authInfo) {
    const userReq: AuthRequest & AuthInfo = req.body
    const username = req.params.username
    if (
      userReq.username &&
      userReq.displayName &&
      userReq.role &&
      userReq.password &&
      username &&
      userReq.username === username
    ) {
      const index = users.findIndex((u) => u.username === username)
      if (~index) {
        users[index] = userReq
        res.sendStatus(200)
        next()
      } else {
        res.sendStatus(404)
        next()
      }
    } else {
      res.sendStatus(400)
      next()
    }
  } else {
    res.sendStatus(401)
    next()
  }
})

app.delete(`${usersPath}/:username`, (req, res, next) => {
  if (authInfo) {
    const username = req.params.username
    if (username) {
      const index = users.findIndex((u) => u.username === username)
      if (~index) {
        users.splice(index, 1)
        res.sendStatus(200)
        next()
      } else {
        res.sendStatus(404)
        next()
      }
    } else {
      res.sendStatus(400)
      next()
    }
  }
})

app.listen(port)
console.log(`Server is running on port ${port}.`)
