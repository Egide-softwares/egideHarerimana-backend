import { config } from "dotenv";
import express, { Request, Response } from "express";
import { prisma } from "./db/prisma";
import { usersRouter } from "./routes/users";

const app = express()

config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("", (req: Request, res: Response)=> {
	return res.status(200).send({
		author: "Harerimana Egide <egideharerimana085@gmail.com>",
		status: "RUNNING",
		message: "SERVER IS RUNNING"
	})
});

app.use("/api/users", usersRouter);

app.listen(3000, ()=> console.log(`SERVER STARTED ON PORT ${3000}`));

app.on("close", async ()=> {
	await prisma.$disconnect()
})