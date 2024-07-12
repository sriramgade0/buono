const express = require('express');
const router = express.Router();
const BuonoController = require("../controllers/Buono");
const { authenticate } = require("../middleware/authMiddle");

router.get('/', authenticate, BuonoController.getAllBuonos);
router.post('/', authenticate, BuonoController.createBuono);
router.patch('/:id', authenticate, BuonoController.updateBuono);
router.delete('/:id', authenticate, BuonoController.deleteBuono);

module.exports = router;
