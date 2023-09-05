import { Response } from "express";
import { httpResponse } from "../interface/response";

export class ErrorHandler {
	constructor(){}

	// Specify the server error
	internalServerError(res: Response, data: httpResponse) {
		res.status(500).json(data);
	}

	// Respond with a generic message: "Something went wrong on the server"
	genericInternalServerError(res: Response) {
		res.status(500).json({
			status: false,
			message: "Something went wrong on the server"
		});
	}

	// Bad request passed to the server
	badRequest(res: Response, data: httpResponse) {
		res.status(400).json(data);
	}

	// The requested resource could not be found
	notFound(res: Response, data: httpResponse) {
		res.status(404).json(data);
	}
}