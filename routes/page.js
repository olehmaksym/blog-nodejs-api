import express from 'express';

import PageController from '../controllers/page';

const router = express.Router();

router.post('/pages', PageController.create)
router.get('/pages', PageController.getAll);

export default router;