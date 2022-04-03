import { Router } from "express";

import { mutation } from "../../controllers/mutation";

const router: Router = Router();

router.put("/mutation", mutation);

export default router;
