//require("dotnv").config():
const express = require("express");
const {
    updateBio,
    insertRegistration,
    findUserByEmail,
    authenticateUser,
    findUserById,
    addProfilePic,
} = require("./db");
const app = express();
const compression = require("compression");
const path = require("path");
const fs = require("fs");
//3000 wil proxy on 3001
const { PORT = 3001 } = process.env;
const { SECRET } = process.env;
//ses-creds not working
const ses = require("./ses");
const { uploader } = require("./multer");
const { s3 } = require("./s3");
const { AppIntegrations } = require("aws-sdk");

// console.log("s3", s3);

//COOKIES
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(cookieParser());
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
    res.json({
        userId: req.session.userId,
    });
    // res.status.json(401);
});

// +++ registration +++

app.post("/register", (req, res) => {
    console.log("register POST", req.body);
    const { firstName, lastName, email, password } = req.body;

    insertRegistration({
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

// +++ reset password +++
app.post("/resetpassword", (req, res) => {
    console.log("resetpassword POST:", req.body);
    const { email } = req.body;
    console.log("email", email);
    findUserByEmail(email)
        .then((res) => {
            if (res) {
                //find a good if condition for this
                console.log("resetpwd res", res);
                //ses-creds not working!
                // ses.sendResetCode().then(() => {
                console.log("reset code", ses.cryptoRandomString);
                // });
                //res.json({ display: naechster state? })?
            } else {
                console.log("something wrong");
            }
            console.log("postrsetpwd res", res);
        })
        .catch((err) => {
            console.log("pwd reset err", err);
            // res.json({ success: false });
        });
});

// +++ login +++

app.post("/login", (req, res) => {
    console.log("login POST:", req.body);
    const { email, password } = req.body;
    authenticateUser({ email: email, password: password })
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

// +++ user +++
app.get("/user", (req, res) => {
    //  const { firstName, lastName, email, password, profilepicurl } = req.body;
    const id = req.session.userId;
    console.log("get req in /user");
    findUserById(id).then((user) => {
        console.log(user);
        res.json(user);
    });
});

// +++ uplode profPic +++
app.post("/profilepic", uploader.single("file"), (req, res) => {
    //req.file comes via multer. multer saves the pics in /uploads
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            return addProfilePic({
                url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                // is it .id?
                id: req.session.userId,
            }).then((user) => {
                res.json({ success: true, image: user.profilepic_url });
            });
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
});

// +++ edit bio +++
app.post("/editbio", (req, res) => {
    console.log("req.body", req.body);
    updateBio({ bio: req.body.inputBio, id: req.session.userId })
        .then((user) => {
            res.json({ success: true });
        })
        .catch((err) => {
            // uh oh
            console.log(err);
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
