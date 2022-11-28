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

module.exports.insertRegistration = ({
    first_name,
    last_name,
    email,
    password,
}) => {
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
};
