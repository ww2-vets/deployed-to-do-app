const PORT = process.env.PORT ?? 8000;

import express from "express";
import bodyParser from "body-parser";
import db from "./database.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
// required when server recieves req with body data
app.use(bodyParser.urlencoded({ extended: true }));

// SCROLL DOWN TO SEE SERVER CONNECTIVITY TEST using Thunder =====================

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("@server POST signup: " + email + " " + password);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signup = await db.query(
      "INSERT INTO users(email, hashed_password) VALUES($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    console.log("Signedup pg user:" + JSON.stringify(signup));

    res.json({ email, token });
    
  } catch (error) {
    console.error(error);
    if(error){
      res.json({detail:error.detail});
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("@server POST Login: " + email + " " + password);

  try {
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if(!users.rows.length) return res.json({deatil: 'No such user!'});

    const success = await bcrypt.compare(password, users.rows[0].hashed_password);

    // token signifies a time limited verification of user identity
    // without need for checking credentials
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if(success){
      res.json({'email': users.rows[0].email, token})
    }
    
  } catch (error) {
    console.error(error);
    if(error){
      res.json({detail:"Login Failed"});
    }
  }
})

app.get("/todos/:userEmail", async (req, res) => {
  // destructure params to grab only userEmail
  const { userEmail } = req.params;
  console.log("@ server userEmail: " + userEmail);

  try {
    const todos = await db.query("SELECT * FROM todos WHERE user_email = $1", [
      userEmail,
    ]);

    console.log("Root todos.rows: " + JSON.stringify(todos.rows));
    res.json(todos.rows); // wrap in json to be browser friendly
  } catch (err) {
    console.error(err);
  }
});

app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(
    "@ POST new todo: " + user_email + " " + title + " " + progress + " " + date
  );

  const uuidId = uuidv4();
  console.log("uuidId: " + uuidId);

  try {
    const newTodo = await db.query(
      "INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [uuidId, user_email, title, 75, date]
    );

    console.log("Post pg newTodo:" + JSON.stringify(newTodo));

    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  console.log(
    "UPDATE id, user_email, title, progress, date" + id,
    user_email,
    title,
    progress,
    date
  );

  try {
    const editToDo = await db.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *;",
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete id: " + id);

  try {
    const deleteToDo = await db.query("DELETE FROM todos WHERE ID = $1;", [id]);
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
});

// SERVER CONNECTIVITY TEST using Thunder =====================
// app.get("/", (req, res) => {
//   res.send("hello there, Yo!");
// });
// app.post("/adduser", (req, res) => {
//   // use this when thunder sends form-encode
//   // but the JSON data returns as undefined, needs decoding
//   const username = req.body.user_name;
//   const password = req.body.pass_word;

//   // OR, also fine
//   // const username = req.body["user_name"];
//   // const password = req.body["pass_word"];

//   console.log("user_name, pass_word: " + username + ", " + password);

//   // FOR BASIC SERVER CONNECTIVITY TEST USING THUNDER CLIENT
//   res.send("Response Recieved: " + username + ", " + password);
// });

// // to test, call this in the browser ========================
// app.get("/todos", async (req, res) => {

//     // try {
//     //   const todos = await db.query("SELECT * FROM todos"); -----

//     //   console.log("todos.rows: " + JSON.stringify(todos.rows));
//     //   res.json(todos.rows); // wrap in json to be browser friendly
//     // } catch (err) {
//     //   console.error(err);
//     // }

//     // test in browser for a specific user  ------
//     const userEmail = 'jamesbond@email.com';
//       try {
//         const todos = await db.query("SELECT * FROM todos WHERE user_email = $1", [
//           userEmail,
//         ]);

//         console.log("todos.rows: " + JSON.stringify(todos.rows));
//         res.json(todos.rows); // wrap in json to be browser friendly
//       } catch (err) {
//         console.error(err);
//       }
//   });

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
