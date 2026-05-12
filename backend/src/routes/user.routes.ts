import { Router } from "express";
import { getUsers } from "../controllers/user.controller"
import { getUserById } from "../controllers/user.controller";
import { createUser } from "../controllers/user.controller";
import { updateUser } from "../controllers/user.controller";
import { deleteUser } from "../controllers/user.controller"


const router: Router = Router();

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router;