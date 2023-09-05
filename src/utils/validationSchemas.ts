import Joi from "joi";

let postSchema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	author: Joi.string().required()
})

export {postSchema}