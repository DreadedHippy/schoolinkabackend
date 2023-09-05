import { post } from "./post";

export interface httpResponse {
	status: boolean;
	message?: string;
	data?: Object | post[]
	error?: Error
}