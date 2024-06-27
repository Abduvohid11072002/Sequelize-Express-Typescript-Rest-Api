import express, { Application, NextFunction, Request, Response } from "express";
import { connectDB } from "./config/database.config";
import ToDoValidator from "./validator/index.validator";
import Middleware from "./middlewares/index";
import ToDoController from "./controller";


const app: Application = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create",
    ToDoValidator.checkCreateToDo(),
    Middleware.handleValidationError,
    ToDoController.create
);

app.get("/read",
    ToDoValidator.checkReadToDo(),
    Middleware.handleValidationError,
    ToDoController.read
);

app.get("/read/:id",
    ToDoValidator.checkidParam(),
    Middleware.handleValidationError,
    ToDoController.readById
);

app.put("/update/:id",
    ToDoValidator.checkidParam(),
    Middleware.handleValidationError,
    ToDoController.update
);

app.delete("/delete/:id",
    ToDoValidator.checkidParam(),
    Middleware.handleValidationError,
    ToDoController.delete
);

app.listen(5000, () => {
    console.log("Server is listening on port : 5000");
});

