const jwt = require('jsonwebtoken')
const mysql = require('mysql')

function auth(db) {
    return (req, res, next) => {
        try {
            let token
            let id = req.body.userId
            let sql = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1"
            let inserts = ['Users', 'id', id]
            sql = mysql.format(sql, inserts)
            db.query(sql, function (err, data) {
                token = data[0].token
                const decodedToken = jwt.verify(token, `${process.env.token}`)
                const userId = decodedToken.userId
                if (req.body.userId && req.body.userId !== userId) {
                    throw 'Invalid user ID'
                } else {
                    next()
                }
            })
        } catch {
            res.status(401).json({
                error: new Error('Invalid request!')
            })
        }
    }
}

module.exports = auth