const admin = require('../controllers/admin.server.controllers.js');
const express = require('express');

const router = express.Router();

router.route('/')
.get(admin.list)
.post(admin.create);

export default router;
