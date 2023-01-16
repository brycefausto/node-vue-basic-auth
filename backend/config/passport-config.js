import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/UserModel.js";

export default function passportConfig() {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
    },
    function(email, password, done) {
      // look for the user data
      User.findOne({ email: email }, function (err, user) {
        // if there is an error
        if (err) { return done(err); }
        // if user doesn't exist
        if (!user) { return done(null, false, { message: 'User not found.' }); }
        // if the password isn't correct
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, {   
        message: 'Invalid password.' }); }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
  );
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
