import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { FRONTEND_URL, MONGODB_URL, PORT, SECRET } from "./config.js";
import passportConfig from "./config/passport-config.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: SECRET,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URL
  })
}))

passportConfig();

// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

app.get("/", (req, res) => {
  res.send("Hello from express!!");
});

app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/posts", PostRoutes);

app.listen(PORT, () =>
  console.log(`Listening to requests on http://localhost:${PORT}`)
);
