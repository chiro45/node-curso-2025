import { search } from "@controllers/search.controller";
import { Router } from "express";

export const routeSearch: Router = Router();

routeSearch.get("/:collection/:term", search);
