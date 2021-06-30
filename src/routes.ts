import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { CreateTagController } from "./controller/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateComplimentController } from "./controller/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controller/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controller/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controller/ListTagsController";
import { ListUsersController } from "./controller/ListUsersController";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

const listTagsController = new ListTagsController();
const listUserController = new ListUsersController();

router.post("/users", createUserController.handle)
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)


router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

router.get("/tags", listTagsController.handle)

router.get("/users", ensureAuthenticated, listUserController.handle)

export { router };