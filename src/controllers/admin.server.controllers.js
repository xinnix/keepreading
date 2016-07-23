const getErrorMessage = require('./core/errors.server.controllers').getErrorMessage;
const mongoose = require('mongoose');
const Material = mongoose.model('Task');
const Card = mongoose.model('Card');
const path = require('path');
const wechatAPI = require('../config/wechatAPI').api;
const webapi = require('../config/wechatAPI').webapi;

const fs = require('fs');
const co = require('co');
const userHelper = require('../helper/userHelper.server');

function materialAdd(req, res) {
  const material = new Material(req.body);
  wechatAPI.uploadMaterial(req.files.material.path, 'voice', (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      fs.unlink(req.files.material.path, err1 => {
        if (err1) {
          res.status(400).send({
            message: getErrorMessage(err1),
          });
        }
      });
      material.media_id = result.media_id;
      material.url = result.url;
      material.save((err1) => {
        if (err1) {
          res.status(400).send({
            message: getErrorMessage(err1),
          });
        } else {
          res.redirect('/admin/material');
        }
      });
    }
  });
  // material.save((err) => {
  //   if (err) {
  //     res.status(400).send({
  //       message: getErrorMessage(err),
  //     });
  //   } else {
  //     res.redirect('/admin/material');
  //   }
  // });
}

function materialList(req, res) {
  Material.find({})
  .sort('-created')
  .exec((err, materials) => {
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.render('./material/material-list', { materials });
    }
  });
}

function materialDel(req, res) {
  const materialId = req.query.material_id;
  const materialMediaId = req.query.material_mediaid;
  wechatAPI.removeMaterial(materialMediaId, (err) => {
    if (err) console.log(err);
    Material.remove({ _id: materialId }, (err1) => {
      if (err1) {
        res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.redirect('/admin/material');
      }
    });
  });
}

function getUserOpenIdByWeb(code) {
  return new Promise((resolve, reject) => {
    webapi.getAccessToken(code, (err, result) => {
      if (err) reject(err);
      resolve(result.data.openid);
      // var accessToken = result.data.access_token;
      // var openid = result.data.openid;
    });
  });
}


function ranklist(req, res) {
  co(function * () {
    try {
      const users = yield userHelper.getAllUserRank();
      res.jsonp({ users });
    } catch (err) {
      console.log(err);
    }
  });
}

function rankRender(req, res) {
  co(function * () {
    try {
      const openid = yield getUserOpenIdByWeb(req.query.code);
      const user = yield userHelper.getUserInfoByOpenId(openid);
      const rank = yield userHelper.getAllUserRank();
      res.render('./rank', { rank, user });
    } catch (err) {
      console.log(err);
    }
  });
}

function materialRender(req, res) {
  res.render('./material/material-add');
}

function cardAdd(req, res) {
  const card = new Card(req.body);
  card.filepath = req.files.card.path;
  card.filename = path.basename(card.filepath);
  card.save((err1) => {
    if (err1) {
      res.status(400).send({
        message: getErrorMessage(err1),
      });
    } else {
      res.redirect('/admin/card');
    }
  });
}

function cardDel(req, res) {
  const cardId = req.query.card_id;
  const cardPath = req.query.card_path;
  fs.unlink(cardPath, (err) => {
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      Card.remove({ _id: cardId }, (err1) => {
        if (err) {
          res.status(400).send({
            message: getErrorMessage(err1),
          });
        } else {
          res.redirect('/admin/card');
        }
      });
    }
  });
}

function cardList(req, res) {
  Card.find({})
  .sort('-created')
  .exec((err, cards) => {
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.render('./card/card-list', { cards });
    }
  });
}

function cardRender(req, res) {
  res.render('./card/card-add');
}


module.exports = {
  materialAdd,
  materialList,
  materialRender,
  materialDel,
  ranklist,
  rankRender,
  cardAdd,
  cardDel,
  cardList,
  cardRender,
};


// export function read(req, res) {
//   // convert mongoose document to JSON
//   const student = req.student ? req.student.toJSON() : {};
//   res.json(student);
// }
//
// export function del(req, res) {
//   const student = req.student;
//
//   student.remove(err => {
//     if (err) {
//       res.status(400).send({
//         message: getErrorMessage(err),
//       });
//     } else {
//       res.json(student);
//     }
//   });
// }
//
// export function update(req, res) {
//   let student = req.student;
//   student = _.extend(student,req.body);
//   student.save(err => {
//     if (err) {
//       res.status(400).send({
//         message: getErrorMessage(err),
//       });
//     } else {
//       res.json(student);
//     }
//   });
// }
// export function studentByID(req, res, next, id) {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).send({
//       message: 'Studentid is invalid',
//     });
//   }
//   Student.findById(id).exec((err, student) => {
//     if (err) {
//       next(err);
//     } else if (!student) {
//       res.status(404).send({
//         message: 'No student with that identifier has been found',
//       });
//     }
//     req.student = student; //eslint-disable-line
//     next();
//   });
