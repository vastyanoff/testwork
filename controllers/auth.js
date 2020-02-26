const uuidv3 = require('uuid/v3');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Evil123Genius@timescale.4biz.tech:5432/test_db');
const errorHandler = require('../utils/errorHandler')
const jwtsecret = "Evil123@genius"
const timestamp = require('time-stamp');

class User extends Sequelize.Model {}
User.init({
    username: Sequelize.STRING,
    status: Sequelize.STRING,
    userid: Sequelize.STRING,
    password: Sequelize.STRING,
}, { sequelize, modelName: 'users' });

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({where: {username: req.body.username} })
    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate.id,
                userid: candidate.id,
            }, jwtsecret, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`,
                username: candidate.username
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async function(req, res) {
    try {
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const candidate = await User.findOne({where: {username: req.body.username}})

        if (candidate) {
            // Пользователь существует, нужно отправить ошибку
            res.status(409).json({
                message: 'Such email is already occupied. Try another.'
            })
        } else {



            const salt = bcrypt.genSaltSync(10)
            const password = req.body.password

            const user =    sequelize.sync()
                .then(() => User.create({
                    username: req.body.username,
                    createdAt: timestamp.utc('YYYY/MM/DD:mm:ss'),
                    password: bcrypt.hashSync(password, salt),
                    status: 'Active',
                    userid: uuidv3(req.body.username, MY_NAMESPACE)
                }))
            res.status(201).json(user)
        }
    } catch (e) {
        errorHandler(res, e)
    }
}




