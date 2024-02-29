
import pg from "pg";
import 'dotenv/config'

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// // CREATE DATABASE --------------------------
// const createDatabase = `CREATE DATABASE IF NOT EXISTS todoapp;`;

// db.query(createDatabase)
//   .then((response) => {
//     console.log("DATABASE Created ");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // CREATE TABLES --------------------------
// const createToDoTable = `CREATE TABLE IF NOT EXISTS todoapp.public.todos (
//   id VARCHAR(255) PRIMARY KEY,
//   user_email VARCHAR(255) UNIQUE NOT NULL,
//   title VARCHAR(30) UNIQUE NOT NULL,
//   progress INT,
//   date VARCHAR(300)
// );`;

// db.query(createToDoTable)
//   .then((response) => {
//     console.log("Todo Table Created ");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const createUserTable = `CREATE TABLE IF NOT EXISTS todoapp.public.users (
//     email VARCHAR(255) PRIMARY KEY,
//     hashed_password VARCHAR(255)
// );`;

// db.query(createUserTable)
//   .then((response) => {
//     console.log("User Table Created");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  // // INSERT TODO DATA --------------------------
// const date = new Date();
// console.log("date: " + date);

// const newTodo = `INSERT INTO todoapp.public.todos(user_email, title, progress,date) VALUES('john@email.com', 'Second todo', 10, $1);`;

// db.query(newTodo, [date])
//   .then((response) => {
//     console.log("DATA INSERTED");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default db;
