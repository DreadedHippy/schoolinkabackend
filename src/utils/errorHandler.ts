import { Response } from "express";
import { httpResponse } from "../models/response";

export class ErrorHandler {
	constructor(){}

	// Something went wrong on the server
	internalServerError(res: Response, data: httpResponse) {
		res.status(500).json(data);
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