const path = require("path");
const express = require("express");
const agenceRouters = require("./routers/agencerouters");
const stepsrouters = require("./routers/stepsrouters");
const AppError = require("./utils/appError");
const globalerrorhandler = require("./controllers/errorController");
const morgan = require("morgan");
const usersrouters = require("./routers/usersrouters");
const helmet = require("helmet");
const viewsrouters = require("./routers/viewsrouters");
const Session = require("cookie-session");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "views")));

app.use(
  Session({
    secret: process.env.COOKIES_SECRET,
    resave: true,
    cookie: {
      maxAge: null, //12h
      secure: false,
      httpOnly: true,
    },
    saveUninitialized: true,
  })
);
//Setting Security HTTP Headers
const cspDirectives = {
  defaultSrc: ["'self'"],
  connectSrc: ["'self'", "0.0.0.0"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
};

// Use Helmet middleware to set CSP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: cspDirectives,
  })
);


app.set("views", path.join(__dirname, "views"));
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");


app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", viewsrouters);
app.use("/api/v1/users", usersrouters);
app.use("/api/v1/agences", agenceRouters);
app.use("/api/steps", stepsrouters);
app.all("*", (req, res) => {
  res.render("Error404", { code: "404", title: "Page not Found" });
});

app.use(globalerrorhandler);

module.exports = app;
