const Jimp = require('jimp');
const async = require('async');
const wechatAPI = require('../config/wechatAPI');
const fs = require('fs');
const moment = require('moment');

// function combineMissionCard(mission, background) {
//
// }

// 根据用户信息合成keep卡
function combineKeepCard(user, background) {
  return new Promise((resolve, reject) => {
    async.waterfall([
      cb => {
        Jimp.read(background, (err, image) => {
          if (err) reject(err);
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.read(user.headimgurl, (err, head) => {
          if (err) reject(err);
          head.resize(120, 120);
          image.composite(head, 20, 20);
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
          image.print(font, 210, 40, user.level);
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_8_WHITE).then(font => {
          image.print(font, 2, 2, user.nickname);
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
          image.print(font, 190, 155, `${user.keepdays} Days`);
          image.print(font, 283, 155, `${user.max_keepdays} Days`);
          image.print(font, 375, 155, `${user.score}`);
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(font => {
          image.print(font, 65, 245, moment().format('hh:mm'));
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
          image.print(font, 145, 370, moment().format('YYYY/MM/DD'));
          cb(null, image);
        });
      },
      (image, cb) => {
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
          image.print(font, 165, 410, 'Never Give UP!');
          cb(null, image);
        });
      },
    ], (err, image) => {
      if (err) reject(err);
      image.write(`tmp/${user.openid}.png`, (err1, result) => {
        if (err1) reject(err1);
        resolve(`tmp/${user.openid}.png`);
      });
    });
  });
}

// 上传keep卡素材到微信服务器用于发送给用户
function uploadImg(file) {
  return new Promise((resolve, reject) => {
    wechatAPI.uploadMedia(file, 'image', (err, result) => {
      if (err) {
        reject(err);
      } else {
        fs.unlink(file, err1 => {
          if (err1) reject(err1);
        });
        resolve(result.media_id);
      }
    });
  });
}

module.exports = {
  combineKeepCard,
  uploadImg,
};
