const http = require('http')

const DEFAULT_USER = { username: 'admin', password: 'admin' }

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact page')
    return res.end()
  },
  '/login:post': async (req, res) => {
    for await (const data of req) {
      const user =  JSON.parse(data)
      if(
        DEFAULT_USER.username !== user.username ||
        DEFAULT_USER.password !== user.password
      ) {
        res.writeHead(401, { 'Content-Type': 'text/html' })
        res.write('Logging Failed')
      } else  {
        res.write('Logging has successed') 
      }
    } 

    return res.end()
  },
  default: (req, res) => {
    res.write('Wooow')
    return res.end()
  }
}

const handler = (req, res) => {
  const { url, method } = req
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return chosen(req, res)
}

const app = http.createServer(handler)
              .listen(3000, () => { console.log('app running  at ', 3000) })

module.exports = app