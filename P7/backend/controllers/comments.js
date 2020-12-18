const mysql = require('mysql')

class Comments {
    constructor(app,db) {
        this.postComment(app, db)
        this.getComments(app, db)
        this.deleteComment(app, db)
    }

    postComment(app, db) {
        app.post('/postComment', (req, res) => {
            let id = 1
            let username = req.body.username
            let comment = req.body.comment
            comment = comment.replace(/'/g,"''")
            let publication_id = req.body.publication_id
            let date = new Date()
            date.setDate(date.getDate() + 1);
            let postdate = date.toJSON().slice(0, 10)

            const promise = new Promise ((resolve) => {
                let sql = "SELECT MAX(??) AS Id FROM ??"
                let inserts = ['id','Comments']
                sql = mysql.format(sql, inserts)
                db.query(sql, function (err, result) {
                    id = (result[0].Id + 1).toString() // Increment last index
                    resolve(id)
                })
            })
            promise.then(id => {
                // Save Gif in database
                let sql = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)"
                let inserts = ['Comments','id','publication_id','username','comment','postdate',id,publication_id,username,comment,postdate]
                sql = mysql.format(sql, inserts)
                db.query(sql, function (err, result) {
                    if (err) throw err
                    if (result) {
                        res.json({
                            success: true,
                        })
                        return result
                    }
                })
            })
        })
    }

    getComments(app, db) {
        app.post('/getComments', (req, res) => {
            let publication_id = req.body.publication_id
            const promise = new Promise ((resolve) => {
                let sql = "SELECT * FROM ?? WHERE ?? = ?"
                let inserts = ['Comments', 'publication_id', publication_id]
                sql = mysql.format(sql, inserts)
                db.query(sql, function (err, result) {
                    res.status(200).json({
                        listOfComments: result
                    })
                    resolve(result)
                })
            })
        })
    }

    deleteComment(app, db) {
        app.delete('/deleteComment', (req, res) => {
            let id = req.body.id
            let publication_id  = req.body.publication_id
            const promise = new Promise ((resolve) => {
                let sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?"
                let inserts = ['Comments', 'id', id, 'publication_id', publication_id]
                sql = mysql.format(sql, inserts)
                db.query(sql, function () {
                    resolve()
                })
            })
            promise.then(() => {
                res.json({
                    success: true
                })
                return true
            })
        })
    }
}

module.exports = Comments