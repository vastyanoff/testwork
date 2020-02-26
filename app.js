const express = require('express')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const authRoutes = require('./route/auth')
const companyRoutes = require('./route/company')
const app = express()


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/company', companyRoutes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client',  'index.html'
            )
        )
    })
}


module.exports = app