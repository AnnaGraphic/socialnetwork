//require("dotnv").config():
const express = require("express");
const {
    findUsersByName,
    updateBio,
    insertRegistration,
    findUserByEmail,
    authenticateUser,
    findUserById,
    addProfilePic,
    getConnectionStatus,
    addConnectionRequest,
    deleteConnection,
    acceptConnection,
    getRequestsAndContactList,
    getTenLatestMessages,
} = require("./db");
const app = express();
const compression = require("compression");
const path = require("path");
const fs = require("fs");
//3000 will proxy on 3001
const { PORT = 3001 } = process.env;
const { SECRET } = process.env;
//ses-creds not working
const ses = require("./ses");
const { uploader } = require("./multer");
const { s3 } = require("./s3");
const { AppIntegrations } = require("aws-sdk");

// +++ socket.io config +++
const server = require("http").Server(app);
//holds socket functionality
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
// cookie session
// +++ end socket.io +++ instead of using addlisten = server.listen

//COOKIES
const cookieSession = require("cookie-session");

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// causes session-object to be stringified, base64 encoded , and written to a cookie,
// then decode, parse and attach to req-obj
//Tampering is prevented because of a second cookie that is auto added.
const cookieSessionMid = cookieSession({
    secret: `${SECRET}`,
    maxAge: 1000 * 60 ** 24 * 14,
    name: "socialnetwork-cookie",
});
app.use(cookieSessionMid);

io.use(function (socket, next) {
    cookieSessionMid(socket.request, socket.request.res, next);
});
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
            console.log("login ", err);
            res.json({ success: false });
        });
});

// +++ logout +++

app.get("/logout", (req, res) => {
    console.log("logout");
    req.session = null;
    res.json({ success: true });
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

// +++ search pandas +++
app.get("/searchpanda/:q?", (req, res) => {
    const searchQuery = req.params.q || "";
    //console.log("searchQuery", searchQuery);
    findUsersByName(searchQuery).then((users) => {
        //console.log("searchpandas users", users);
        res.json({ users, success: true });
    });
});

// +++ fetch other panda's profile +++
app.get("/api/userprofile/:id", (req, res) => {
    const searchQuery = req.params.id;
    //console.log("params searchQuery", req.params);
    findUserById(searchQuery).then((user) => {
        // console.log("searchpandas users", user);
        res.json({ user, success: true });
    });
});

// +++ MultiButton routes +++

// +++ MultiButton checking state of connection +++
app.get("/api/connectionstatus/:user2", (req, res) => {
    // console.log("freundschaftsstatus erfragen", req.params.user2);
    getConnectionStatus(req.session.userId, req.params.user2).then((result) => {
        let connectionstatus, buttonText;
        console.log("/connectionStatus ", result);
        if (result.length === 0) {
            //button text: anfrage
            //console.log("connectionstat: rows.length === 0");
            connectionstatus = "noconnection";
            buttonText = "add contact";
        } else {
            if (result[0].accepted) {
                //   connectionStatus "connected";
                connectionstatus = "connected";
                buttonText = "end connection";
            } else {
                if (result[0].sender_id === req.session.userId) {
                    //connectionStatus "gestellt"
                    connectionstatus = "pending";
                    buttonText = "pending";
                } else {
                    //  connectionStatus "recieved";
                    connectionstatus = "recieved";
                    buttonText = "accept request";
                }
            }
        }
        console.log(
            "connectionstatus in get req",
            connectionstatus,
            buttonText
        );
        res.json({ connectionstatus, buttonText });
    });
});

// +++ add connection request INSERT +++
app.post("/api/contacts/:user2", (req, res) => {
    addConnectionRequest(req.session.userId, req.params.user2).then(
        (response) => {
            console.log("post /contacts/request", response);
        }
    );
});

// +++ delete connection +++
app.delete("/api/contacts/:user2", (req, res) => {
    deleteConnection(req.session.userId, req.params.user2).then((response) => {
        console.log("delete /contacts/:user2", response);
    });
});

// +++ accept request +++
//put route - update? false to true
app.put("/api/contacts/:user2", (req, res) => {
    acceptConnection(req.session.userId, req.params.user2).then((response) => {
        console.log(" put /contacts/:user2", response);
    });
});

// +++ contact list +++
app.get("/api/contactlist/", (req, res) => {
    getRequestsAndContactList(req.session.userId).then((data) => {
        console.log("/api/contactlist/ response", data);
        res.json(data.rows);
    });
});

// +++ all routes +++

app.get("*", function (req, res) {
    //was ist "..", "client"?
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    console.log(
        `socket with the id ${socket.id} is now connected to ${userId}`
    );

    //make the db call to get the last 10 messages, .then
    //emit an event with this data >> getTenLatestMessages
    app.get("api/latestmessages/", (req, res) => {
        getTenLatestMessages(10).then((data) => {
            console.log("api/latestmessages/", data);
            // emit an event with this data
        });
    });

    //events instead of route! emmit an event to the server
    //server saves mess in db, get message back, pushs to the last10mess arr

    socket.on("disconnect", () => {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    // socket.on("thanks", function (data) {
    //     console.log(data);
    // });

    socket.emit("welcome", {
        message: "Welome. It is nice to see you",
    });
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
