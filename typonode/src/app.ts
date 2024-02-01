import express from "express";

import todoRouter from "./routes/todos.route";

const app = express();

app.use(express.json());

app.use("/api/todo", todoRouter);

app.listen(3000, () => {
  console.log("Server is listening...");
});
