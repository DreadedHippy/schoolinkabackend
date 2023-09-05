import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { ErrorHandler } from './errorHandler';
import { Post } from '../interface/post';
dotenv.config();

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASS,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	port: 5432
})

export function getAllPostsFromDB(): Promise<QueryResult>{
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
			if (error) {
				reject(error)
			}
	
			resolve(results)
		})

	})
}

export function getSpecificPostFromDB(id: number): Promise<QueryResult>{
	return new Promise((resolve, reject) => {	
		pool.query('SELECT * FROM posts where id = $1',[id], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results)
		})

	})
}

export function createPostInDB(post: Post): Promise<QueryResult>{
	let {title, content, author, id} = post;
	return new Promise((resolve, reject) => {	
		pool.query('INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *', [title, content, author], (error, results) => {
			if (error) {      
				reject(error)
			}
			resolve(results)
		})

	})
}


export function editPostInDB(post: Post): Promise<QueryResult>{
	let {title, content, author, id} = post;
	return new Promise((resolve, reject) => {	
		pool.query(
			'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), author = COALESCE($3, author) WHERE id = $4',
			[title, content, author, id],
			(error, results) => {
				if (error) {      
					reject(error)
				}
				resolve(results)
			}
		)

	})
}

export function deletePostFromDB(id: number): Promise<QueryResult>{
	return new Promise((resolve, reject) => {	
		pool.query(
			'DELETE FROM posts WHERE id = $1',
			[id],
			(error, results) => {
				if (error) {      
					reject(error)
				}
				resolve(results)
			}
		)
	})
}

export default pool;