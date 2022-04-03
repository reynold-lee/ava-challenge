import { Router } from "express";

import {
  getConversations,
  addConversation,
  deleteConversation,
} from "../../controllers/conversations";

const router: Router = Router();

router.post("/conversations", getConversations);

router.post("/addConversation", addConversation);

router.delete("/deleteConversation/:id", deleteConversation);

export default router;
