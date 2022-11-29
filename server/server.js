//require("dotnv").config():
const express = require("express");
const db = require("./db");
const app = express();
const compression = require("compression");
const path = require("path");
const fs = require("fs");
//3000 wil proxy on 3001
const { PORT = 3001 } = process.env;
const { SECRET } = process.env;

//COOKIES
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

//MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// causes session-object to be stringified, base64 encoded , and written to a cookie,
// then decode, parse and attach to req-obj
//Tampering is prevented because of a second cookie that is auto added.
app.use(
    cookieSession({
        secret: `${SECRET}`,
        maxAge: 1000 * 60 ** 24 * 14,
        name: "socialnetwork-cookie",
    })
);

app.use(compression());
app.use(express.urlencoded({ extended: false }));
// json parser
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("req.session.userId:", req.session.userId);
    console.log("---------------------");
    next();
});

////ROUTES

app.get("/user/id.json", (req, res) => {
    // ..
    //respond with json-format!
    //{userId: xy }
    // res.json({ userId: 99 });
    res.json({
        userId: req.session.userId,
    });
    // res.status.json(401);
});

// +++ registration +++

app.post("/register", (req, res) => {
    console.log("register POST", req.body);
    const { firstName, lastName, email, password } = req.body;

    db.insertRegistration({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    })
        .then((userData) => {
            console.log("user data insertReg", userData);
            req.session.userId = userData.id;
            //check if userdata is empty
            //res.redirect("/Welcome");

            res.json({ success: true });
            //res.redirect("/Welcome"); happens in the component
        })
        .catch((err) => {
            console.log("error in register post: ", err);
            res.json({ success: false });
        });
});

// +++ login +++

app.post("/login", (req, res) => {
    console.log("login POST:", req.body);
    const { email, password } = req.body;
    db.authenticateUser({ email: email, password: password })
        .then((user) => {
            req.session.userId = user.id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("pwd mail", err.message);
            res.json({ success: false });
        });
});

// +++ logout +++

app.post("/logout", (req, res) => {
    console
        .log("login POST:", req.body)
        .then((user) => {
            req.session = null;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("logout", err.message);
            res.json({ success: false });
        });
});

// +++ all routes +++

app.get("*", function (req, res) {
    //was ist "..", "client"?
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
