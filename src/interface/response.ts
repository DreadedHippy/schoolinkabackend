import { Post } from "./post";

export interface httpResponse {
	status: boolean;
	message?: string;
	data?: Object | Post[]
	error?: Error
}