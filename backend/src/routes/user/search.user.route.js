import express from "express";
import { searchController } from "../../controllers/search.controller.js";

const searchUserRouter = express.Router();

searchUserRouter.get("/search", searchController);

export default searchUserRouter;
