const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Evil123Genius@timescale.4biz.tech:5432/test_db');
const jwtsecret = "Evil123@genius"
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
}

class User extends Sequelize.Model {}
User.init({
    username: Sequelize.STRING,
    status: Sequelize.STRING,
    createdAt: Sequelize.STRING,
    updatedAt: Sequelize.STRING,
    password: Sequelize.STRING,
}, { sequelize, modelName: 'users' });


module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({ where: {id: payload.userId} })
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }

        })
    )
}