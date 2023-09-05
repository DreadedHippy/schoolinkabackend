import { NextFunction, Request, Response } from "express";
import { postSchema } from "../utils/validationSchemas";
import { ErrorHandler } from "../utils/errorHandler";

export async function postValidator(req: Request, res: Response, next: NextFunction) {
	let postValidation = postSchema.validate(req.body);

	if (postValidation.error) {
		console.log(postValidation.error.details);
		new ErrorHandler().badRequest(res, {
			status: false,
			message: `Could not create post, ${postValidation.error.message ? postValidation.error.message : postValidation.error.details[0].message}`
		})
		return
	}
	

	next();
}