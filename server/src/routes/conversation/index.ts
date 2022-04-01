import { Router } from "express";

import {
  getConversations,
  addConversation,
} from "../../controllers/conversations";

const router: Router = Router();

router.post("/conversations", getConversations);

router.post("/addConversation", addConversation);

export default router;
