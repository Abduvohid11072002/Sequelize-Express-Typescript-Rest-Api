import express, { Application, Request, Response } from "express";
import sequelize from "./config/database.config";
const app: Application = express();

(async () => {
    try {
        await sequelize.sync()
        console.log(`Postgres connected`)
    } catch (error) {
        console.log(error);

        process.exit(1);
    }
})()


app.get("/", (req: Request, res: Response) => {
    return res.send("Hello world");
});

app.listen(4000, () => {
    console.log("Server is listening on port : 4000");
});

