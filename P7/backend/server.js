const http = require('http')
const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path')
const mysql = require('mysql')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const User = require('./controllers/user')
const bodyParser = require('body-parser')
//appExpress.use(express.static(path.join(__dirname, 'build')))
const app = express()
const cors = require('cors')

// A random key for signing the cookie
app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));


app.use(cors())

app.use(bodyParser.json({limit: '50mb'}))

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mopomo91',
    database: 'p7'
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
    key: 'defefefzfe',
    secret: 'tzrzrtzrt',
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

const port = normalizePort(process.env.PORT || '3000')
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
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port' + port
    console.log("Listening on " + bind)
})


server.listen(process.env.PORT || 3000)
