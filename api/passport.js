const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');



const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token
}


// authorization protection ie protecting endpoints admin panel and todos
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "Ravi"
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err) return done(err, false);
        if(user) return done(null, user);
        else return done(null, false);
    });
}));



//authenticate middleware local strategy using username & password
passport.use(new LocalStrategy((username, password,done) => {
    User.findOne({username}, (err, user) => {
        //something went wrong with database
        if(err) return done(err);
        //no user exists
        if(!user) return done (null, false);
        // check if password is correct
        user.comparePassword(password, done);
    });
}));