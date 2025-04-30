// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as GitHubStrategy } from "passport-github2";
// import User from "../models/user.model";

// // Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({
//           email: profile.emails?.[0].value,
//         });

//         if (existingUser) return done(null, existingUser);

//         const newUser = await User.create({
//           username: profile.displayName,
//           email: profile.emails?.[0].value,
//           password: "", // not needed for OAuth
//           avatar: profile.photos?.[0].value,
//         });

//         return done(null, newUser);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// // GitHub Strategy
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//       callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0].value;

//         let user = await User.findOne({ email });

//         if (!user) {
//           user = await User.create({
//             username: profile.username,
//             email,
//             password: "",
//             avatar: profile.photos?.[0].value,
//           });
//         }

//         return done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// // Serialization
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });
