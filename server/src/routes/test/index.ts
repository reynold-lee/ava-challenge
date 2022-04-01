import { Router } from "express";

import { info, ping } from "../../controllers/test";

const router: Router = Router();

router.get("/ping", ping);

router.get("/info", info);

export default router;
