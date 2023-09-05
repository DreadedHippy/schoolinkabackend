import { Request, Response } from "express";
import pool, { createPostInDB, deletePostFromDB, editPostInDB, getAllPostsFromDB, getSpecificPostFromDB } from "../utils/database";
import { ErrorHandler } from "../utils/errorHandler";
import { Post } from "../interface/post";

let errorHandler = new ErrorHandler();

export async function getAllPosts(req: Request, res: Response) {
  getAllPostsFromDB()
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result.rows
      })
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function getSpecificPost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  getSpecificPostFromDB(id)
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result.rows
      })
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function createPost(req: Request, res: Response) {
  let post: Post = req.body

  createPostInDB(post)
    .then((results) => {
      res.status(201).json({
        status: true,
        message: `Added post with ID: ${results.rows[0].id}`
      })
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function editPost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let post = req.body;
  post.id = id

  editPostInDB(post)
    .then((results) => {
      res.status(200).json({
        status: true,
        message: `Modified post with ID: ${id}`
      });
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function deletePost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  deletePostFromDB(id)
    .then((results) => {
      res.status(200).json({
        status: true,
        message: `Deleted post with ID: ${id}`
      });
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}