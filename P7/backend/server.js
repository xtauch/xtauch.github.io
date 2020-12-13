const http = require('http')
const cookieParser = require('cookie-parser');
const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const User = require('./controllers/user')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

// A random key for signing the cookie
app.use(cookieParser(`${process.env.COOKIE_SECRET}`));
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))

//Database
const db = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
})
    db.connect(function (err) {
        if (err) {
            console.log('DB error')
            throw err
        }
        console.log('Connexion à MySQL réussie !')
    })

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000), // 5 years
    endConnectionOnClose: false
}, db)

app.use(session ({
    key: `${process.env.KEY}`,
    secret: `${process.env.SECRET}`,
    store : sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly : false
    }
}))

new User(app, db)

const normalizePort = val => {
    const port = parseInt(val, 10)

    if(isNaN(port)){
        return val
    }
    if (port >= 0){
        return port
    }
    return false
}

const port = normalizePort(process.env.PORT || 3000)
app.set('port', port)

const errorHandler = error => {
    if (error.syscall !== 'listen'){
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port' + port
    switch (error.code) {
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE' :
            console.error(bind + ' is already in use.')
            process.exit(1)
            break
        default :
            throw error
    }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log("Listening on " + bind)
})


server.listen(process.env.PORT || 3000)
