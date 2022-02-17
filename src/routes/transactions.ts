import { config } from "dotenv";
import { Request, Response, Router } from "express";
import { prisma } from "../db/prisma";
import { isLoggedIn } from "../middlewares/auth";
import { newTransactionSchema } from "../validations/schemas";

config();

export const transactionsRouter = Router();

transactionsRouter.get("", isLoggedIn, async (req: Request, res: Response) => {
	const all = await prisma.transaction.findMany({
		where: {
			userId: req.authentication?.userId
		},
		include: {
			token: true
		}
	});
	return res.status(200).send({
		status: 200,
		message: "success",
		data: {
			transactions: all
		}
	})
});


transactionsRouter.post("/newtransaction", isLoggedIn, async (req: Request, res: Response) => {
	const validations = newTransactionSchema.validate(req.body);
	if (validations.error) return res.status(400).send({
		status: 400,
		message: validations.error.details[0].message
	});

	let token = Math.floor(10000000 + Math.random() * 90000000);

	const existingToken = await prisma.token.findFirst({
		where: {
			content: token
		}
	});

	if (existingToken) token = Math.floor(10000000 + Math.random() * 90000000);

	const newTokenRecord = await prisma.token.create({
		data: {
			content: token,
			isActivated: false,
			activatedOn: null,
			days: 1,
			userId: req.authentication?.userId,
			meterNumber: req.body.meterNumber,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		}
	});
});
