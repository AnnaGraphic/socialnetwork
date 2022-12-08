//   1 Setup a db module, and connect it to your database
//   2 Add a function that INSERTs all the given user's info into the users table!

const e = require("express");

const bcrypt = require("bcryptjs");
const spicedPg = require("spiced-pg");
const { POSTGRES_PWD, POSTGRES_USER } = process.env;
const database = "socialnetwork";
//5432 = standardport
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/${database}`
);

function insertRegistration({ first_name, last_name, email, password }) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return db
        .query(
            `INSERT INTO users (first_name, last_name, email, pwd_hash)
    VALUES($1, $2, $3, $4)
    RETURNING *`,
            [first_name, last_name, email, hash]
        )
        .then((result) => {
            console.log(
                "result insertRegistration",
                result,
                "result.rows[0]",
                result.rows[0]
            );
            return result.rows[0];
        })
        .catch((err) => console.log(err));
}

function findUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email=$1", [email])
        .then((results) => {
            console.log("query finduserbymail: ", results.rows);
            if (results.rows.length == 0) {
                throw new Error("email does not exist");
            }
            return results.rows[0];
        })
        .catch((err) => console.log(err));
}

function findUserById(userId) {
    return db
        .query("SELECT * FROM users WHERE id=$1", [userId])
        .then((results) => {
            console.log("query finduserbyid: ", results.rows);
            if (results.rows.length == 0) {
                throw new Error("upsi");
            }
            return results.rows[0];
        })
        .catch((err) => console.log(err));
}

function authenticateUser({ email, password }) {
    return findUserByEmail(email).then((user) => {
        if (!bcrypt.compareSync(password, user.pwd_hash)) {
            throw new Error("password incorrect");
        }
        return user;
    });
}

function addProfilePic({ url, id }) {
    return db
        .query(
            `UPDATE users 
            SET profilepic_url=$1 WHERE id=$2
    RETURNING *`,
            [url, id]
        )
        .then((result) => {
            return result.rows[0];
        });
}

function updateBio({ bio, id }) {
    return db
        .query(
            `UPDATE users 
            SET bio=$1 WHERE id=$2
    RETURNING *`,
            [bio, id]
        )
        .then((result) => {
            return result.rows[0];
        });
}

function findUsersByName(name) {
    // console.log("name", name);
    return db
        .query(
            "SELECT * FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1",
            [name + "%"]
        )
        .then((results) => {
            console.log("query findUserbyName: ", results.rows);
            if (results.rows.length == 0) {
                throw new Error("upsi");
            }
            return results.rows;
        })
        .catch((err) => console.log(err));
}

function getConnectionStatus(user1, user2) {
    console.log("db getConnectionStatus user 1 user2", user1, user2);
    return db
        .query(
            `SELECT * FROM connections
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
            [user1, user2]
        )
        .then((results) => {
            // console.log("db getConnectionStatus result", results);

            return results.rows;
        })
        .catch((err) => console.log(err));
}

function addConnectionRequest(sender, recipient) {
    return db
        .query(
            `INSERT INTO connections (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`,
            [sender, recipient]
        )
        .then((result) => {
            console.log(
                "addConnectionRequest",
                result,
                "result.rows[0]",
                result.rows[0]
            );
            return result.rows[0];
        })
        .catch((err) => console.log(err));
}

function deleteConnection(user1, user2) {
    return db.query(
        `DELETE FROM connections WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
        [user1, user2]
    );
}

function acceptConnection(sender, recipient) {
    return db.query(
        `UPDATE connections 
            SET accepted=true WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)
    RETURNING *`,
        [sender, recipient]
    );
}

module.exports = {
    findUsersByName,
    updateBio,
    findUserById,
    insertRegistration,
    findUserByEmail,
    authenticateUser,
    addProfilePic,
    getConnectionStatus,
    addConnectionRequest,
    deleteConnection,
    acceptConnection,
};
