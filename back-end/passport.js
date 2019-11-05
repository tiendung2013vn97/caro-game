const accountRepo=require('./repo/account-repo')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return accountRepo.getAccountByUsernameAndPassword(username,password)
           .then(users => {
               if (users.length===0) {
                   return cb(null, false, {message: 'Incorrect username or password.'});
               }
               return cb(null, users[0], {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {

    //find the user in db if needed
    return accountRepo.getAccountByUsername(jwtPayload.username)
        .then(users => {
            return cb(null, users[0]);
        })
        .catch(err => {
            return cb(err);
        });
}
));