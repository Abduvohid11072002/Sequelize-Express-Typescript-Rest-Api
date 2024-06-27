import { body, query } from "express-validator";

class ToDoValidator {
    checkCreateToDo() {
        return [
            body('id').optional().isUUID(4).withMessage('UUID is optional'),
            body('title').isString().notEmpty().withMessage("Title is required"),
            body('completed').optional().isBoolean().withMessage('comleted is optional')
        ]
    }

    checkReadToDo() {
        return [
            query('limit').optional().isInt({ min: 1, max: 10 }).withMessage('Limit value should be number and between 1-10'),
            query('offset').optional().isInt({ min: 1, max: 100 }).withMessage('Offset value should be number and between 1-100')
        ]
    }
}

export default new ToDoValidator; import { } from "express";