import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export async function validateId(req: Request, res: Response, next: NextFunction) {
	let id = parseInt(req.params.id);

	if (Number.isNaN(id)) {
		new ErrorHandler().badRequest(res, {
			status: false,
			message: "Invalid id passed, please input a number"
		});

		return
	}

	next();
}