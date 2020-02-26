const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Evil123Genius@timescale.4biz.tech:5432/test_db');
const errorHandler = require ('../utils/errorHandler')

class Profiles extends Sequelize.Model {}
Profiles.init({
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    hash: Sequelize.STRING,
    company: Sequelize.STRING,
    tags: Sequelize.STRING,
    profileid: Sequelize.STRING,
    Autor: Sequelize.STRING,
    imageSrc: Sequelize.STRING,
}, { sequelize, modelName: 'profiles' });




module.exports.get = async function  (req, res)  {
    try {
        const profiles = await Profiles.findAll({ where: {Autor: 'Admin'}
        })
        res.status(200).json(profiles)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getbyid = async function  (req, res)  {
    try {
        const profile = await Profiles.findOne({ where: {hash: req.params.id}})
        res.status(200).json({profile})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    Profiles.update(
        {
            first: req.body.first,
            last: req.body.last,
            company: req.body.company,
            tags: req.body.tags,
        },
        {where: {hash: req.params.id}}
    )
        .then(function(rowsUpdated) {
            res.status(200).json("Success")
        })
        .catch('Error!')
}

module.exports.remove = async function(req, res) {
    try {
        await Profiles.destroy({where: {hash: req.params.id}})
        res.status(200).json({
            message: 'Success'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        console.log(req.body)
        const shop = sequelize.sync()
            .then(() => Profiles.create({
                first: req.body.first,
                last: req.body.last,
                company: req.body.company,
                tags: req.body.tags,
                imageSrc: req.file ? req.file.path : ''
            }))
        res.status(201).json(shop)
    } catch (e) {
        errorHandler(res, e)
    }
}