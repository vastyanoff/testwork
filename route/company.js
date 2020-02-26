const express = require('express')
const controller = require('../controllers/company')
const upload = require ('../middleware/upload')
const router = express.Router()
const passport = require('passport')

router.get('/get', passport.authenticate('jwt', {session: false}), controller.get)
router.get('/getbyid/:id',  passport.authenticate('jwt', {session: false}), controller.getbyid)
router.post('/gid/:id', passport.authenticate('jwt', {session: false}),  controller.update)
router.post('/create',  upload.single('image'), passport.authenticate('jwt', {session: false}), controller.create)
router.post('/del/:id', passport.authenticate('jwt', {session: false}), controller.remove)
module.exports = router

