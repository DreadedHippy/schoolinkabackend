import { Request, Response } from "express";
import pool from "../utils/database";
import { ErrorHandler } from "../utils/errorHandler";

export async function getAllPosts(req: Request, res: Response) {
	pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
    if (error) {

      new ErrorHandler().internalServerError(res, {
        status: false,
        error: error
      })
      return
    }
    res.status(200).json({
      status: true,
      data: results.rows
    })
  })
}

export async function getSpecificPost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
	pool.query('SELECT * FROM posts where id = $1',[id], (error, results) => {
    if (error) {
      
      new ErrorHandler().internalServerError(res, {
        status: false,
        error: error
      })
      return
    }
    res.status(200).json({
      status: true,
      data: results.rows[0]
    })
  })
}

export async function createPost(req: Request, res: Response) {
  const {title, content, author} = req.body;

  pool.query('INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *', [title, content, author], (error, results) => {
    if (error) {      
      new ErrorHandler().internalServerError(res, {
        status: false,
        error: error
      })
      return
    }

    res.status(201).json({
      status: true,
      message: `Added post with ID: ${results.rows[0].id}`
    })
  })
}

export async function editPost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  pool.query(
    'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), author = COALESCE($3, author) WHERE id = $4',
    [title, content, author, id],
    (error, results) => {
      if (error) {      
        new ErrorHandler().internalServerError(res, {
          status: false,
          error: error
        });
        return
      }
      res.status(200).json({
        status: true,
        message: `Modified post with ID: ${id}`
      });
    }
  )
}

export async function deletePost(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  pool.query(
    'DELETE FROM posts WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {      
        new ErrorHandler().internalServerError(res, {
          status: false,
          error: error
        })
        return
      }
      res.status(200).json({
        status: true,
        message: `Deleted post with ID: ${id}`
      });
    }
  )
}