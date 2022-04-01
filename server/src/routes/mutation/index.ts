import { Router } from "express";

import { mutation } from "../../controllers/mutation";

const router: Router = Router();

router.post("/mutation", mutation);

export default router;
