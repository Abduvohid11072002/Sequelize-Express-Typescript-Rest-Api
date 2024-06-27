import express, { Application, NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from "./config/database.config";
import { ToDoInstance } from "./models/index.model";
import ToDoValidator from "./validator/index.validator";
import Middleware from "./middlewares/index";

const app: Application = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create",
    ToDoValidator.checkCreateToDo(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
        try {
            const id = uuidv4();

            const todo = await ToDoInstance.create({ ...req.body, id });

            return res.json({ todo, message: "Successfully created" });
        } catch (error) {
            console.log(error);

            return res.json({ message: "Server error" })
        }

    });

app.get("/read",
    ToDoValidator.checkReadToDo(),
    Middleware.handleValidationError,
    async (req: Request, res: Response) => {
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;

        const todos = await ToDoInstance.findAll({ where: {}, limit, offset });
        return res.json(todos);

    } catch (error) {
        console.log(error);

        res.json({ message: "Server error" })
    }
})



app.listen(4000, () => {
    console.log("Server is listening on port : 4000");
});

