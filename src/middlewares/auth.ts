import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== "Bearer") {
		return res.status(401).send({
			status: 401,
			message: "Unauthorised"
		});
	}

	try {
		const token_contents = verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET as string);

		if (!token_contents) return res.status(401).send({
			status: 401,
			message: "Unauthorised"
		});

		req.authentication = token_contents as JwtPayload;

		return next();
	} catch (error) {
		return res.status(401).send({
			status: 401,
			message: "something went wrong or Unauthorised"
		});
	}
}