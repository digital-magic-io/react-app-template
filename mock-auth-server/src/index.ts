import * as http from 'http'

type ContentType = 'text/plain' | 'application/json'

const writeResponse =
  (resp: http.ServerResponse) =>
  (status: number, text: string, contentType: ContentType = 'text/plain'): void => {
    resp.writeHead(status, { 'Content-Type': contentType })
    resp.end(text)
  }

const writeJsonResponse =
  (resp: http.ServerResponse) =>
  (status: number, response: Record<string, unknown>): void =>
    writeResponse(resp)(status, JSON.stringify(response), 'application/json')

type RequestHandler = (req: http.IncomingMessage, resp: http.ServerResponse) => void

type AuthRequest = {
  username: string
  password: string
}

type AuthInfo = {
  username: string
  displayName: string
  role: string
}

const users: Array<AuthInfo & AuthRequest> = [
  {
    username: 'test@test.com',
    password: 'test1234',
    displayName: 'Test User',
    role: 'User'
  }
]

const login: RequestHandler = (req, resp) => {
  const respWriter = writeJsonResponse(resp)
  let data = ''
  req.on('data', (chunk: any) => {
    data += chunk.toString()
  })
  req.on('end', () => {
    const user: AuthRequest = JSON.parse(data)
    if (users.some((u) => u.username === user.username && u.password === user.password)) {
      return respWriter(200, { success: true })
    } else {
      return respWriter(401, { error: `User not found: ${user.username}` })
    }
  })
}

const logout: RequestHandler = (req, resp) => {
  const respWriter = writeJsonResponse(resp)
  return respWriter(200, { success: true })
}

const getAuth: RequestHandler = (req, resp) => {
  const respWriter = writeJsonResponse(resp)
  const user = users[0]
  return respWriter(200, {
    username: user['username'],
    displayName: user['displayName'],
    role: user['role']
  })
}

const server = http.createServer((req, resp) => {
  const respWriter = writeResponse(resp)
  if (req.url === '/api/v1/auth') {
    switch (req.method) {
      case 'GET':
        return getAuth(req, resp)
      case 'POST':
        return login(req, resp)
      case 'DELETE':
        return logout(req, resp)
      default:
        return respWriter(405, 'Method not allowed for resource!')
    }
  } else {
    return respWriter(404, 'Requested resource not found!')
  }
})

const port = 8080
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
