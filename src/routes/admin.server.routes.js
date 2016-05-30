const admin = require('../controllers/admin.server.controllers.js');
const express = require('express');


const router = express.Router();

router.route('/material')
    .post(admin.materialAdd)
    .get(admin.materialList);

router.route('/material/add')
    .get(admin.materialRender);


router.route('/card')
      .post(admin.cardAdd)
      .get(admin.cardList);

router.route('/card/add')
        .get(admin.cardRender);

router.get('/ranklist', admin.ranklist);


module.exports = router;
