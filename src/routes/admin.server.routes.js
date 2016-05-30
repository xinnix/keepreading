const admin = require('../controllers/admin.server.controllers.js');
const express = require('express');


const router = express.Router();

router.route('/material')
    .post(admin.materialAdd)
    .get(admin.materialList);

router.route('/material/add')
    .get(admin.materialRender);
router.route('/material/del')
    .get(admin.materialDel);

router.route('/card')
      .post(admin.cardAdd)
      .get(admin.cardList);

router.route('/card/add')
        .get(admin.cardRender);

router.route('/card/del')
        .get(admin.cardDel);

router.get('/ranklist', admin.ranklist);


module.exports = router;
