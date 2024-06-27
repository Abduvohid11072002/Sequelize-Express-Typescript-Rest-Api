import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { ToDoInstance } from "../models/index.model";


class ToDoController {
    async create(req: Request, res: Response){
        try {
            const id = uuidv4();

            const todo = await ToDoInstance.create({ ...req.body, id });

            return res.json({ todo, message: "Successfully created" });
        } catch (error) {
            console.log(error);

            return res.json({ message: "Server error" })
        }

    }

    async read (req: Request, res: Response) {
        try {
            const limit = req.query?.limit as number | undefined;
            const offset = req.query?.offset as number | undefined;

            const todos = await ToDoInstance.findAll({ where: {}, limit, offset });
            return res.json(todos);

        } catch (error) {
            console.log(error);

            res.json({ message: "Server error" })
        }
    }

    async readById (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const todo = await ToDoInstance.findOne({ where: { id }, });
            return res.json(todo);

        } catch (error) {
            console.log(error);

            res.json({ message: "Server error" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const todo = await ToDoInstance.findOne({ where: { id } });

            if (!todo) {
                return res.json({ message: "Not Found" });
            }

            const { title, completed } = req.body;

            const updatedToDo = await todo.update({ title, completed });

            return res.json(updatedToDo);
        } catch (error) {
            console.log(error);
            res.json({ message: "Server error" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const todo = await ToDoInstance.findOne({ where: { id } });

            if (!todo) {
                return res.json({ message: "Not Found" });
            }

            await todo.destroy();

            return res.json({message: "Succesfully Deleted"});
        } catch (error) {
            console.log(error);
            res.json({ message: "Server error" });
        }
    }
}

export default new ToDoController;