const Jimp = require('jimp');
const async = require('async');
const wechatAPI = require('../config/wechatAPI');

function combineMissionCard(mission, background) {
  //
  // Jimp.read(background, (err, image) => {
  //   image.
  //     // Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
  //     // image.print(font, 10, 10, "Hello world!");
  //     // });
  //
  // });
}
function combineGiftCard(user, background) {
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
    ], (err, image) => {
      if (err) reject(err);
      image.write(`tmp/${user.openid}.png`, (err1, result) => {
        if (err1) reject(err1);
        resolve(`tmp/${user.openid}.png`);
      });
    });
  });
  // async.waterfall([
  //   cb => {
  //     Jimp.read(background, (err, image) => {
  //       if (err) console.log(err);
  //       cb(null, image);
  //     });
  //   },
  //   (image, cb) => {
  //     Jimp.read(user.headimgurl, (err, head) => {
  //       if (err) console.log(err);
  //       head.resize(120, 120);
  //       image.composite(head, 20, 20);
  //       cb(null, image);
  //     });
  //   },
  //   (image, cb) => {
  //     Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
  //       image.print(font, 210, 40, user.level);
  //       cb(null, image);
  //     });
  //   },
  //   (image, cb) => {
  //     Jimp.loadFont(Jimp.FONT_SANS_8_WHITE).then(font => {
  //       image.print(font, 2, 2, user.nickname);
  //       cb(null, image);
  //     });
  //   },
  //   (image, cb) => {
  //     Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
  //       image.print(font, 195, 160, `${user.keepdays} 天`);
  //       image.print(font, 287, 160, `${user.max_keepdays} 天`);
  //       image.print(font, 375, 160, `${user.score} 分`);
  //       cb(null, image);
  //     });
  //   },
  // ], (err, image) => {
  //   if (err) console.log(err);
  //   image.write('123.png');
  // });

  // Jimp.read(background)
  // .then((image) => {
  //   Jimp.read(user.headimgurl)
  //   .then((head) => {
  //     head.resize(130, 130);
  //     image.composite(head, 20, 20);
  //   })
  //   .then(() => {
  //     Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  //   })
  //   .then(font => {
  //     image.print(font, 210, 40, 'R1');
  //   })
  //   // .then(() => {
  //   //   Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
  //   //     image.print(font, 160, 45, user.nickname);
  //   //   });
  //   // })
  //   // .then(() => {
  //   //   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
  //   //     image.print(font, 160, 192, user.keepdays);
  //   //     image.print(font, 285, 192, user.max_keepdays);
  //   //     image.print(font, 375, 192, user.level);
  //   //   });
  //   // })
  //   .then(() => {
  //     image.write('./123.png');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // })
  // .catch(err => {
  //     console.log(err);
  // });
}
function uploadImg(file){
  return new Promise((resolve, reject) => {
    wechatAPI.uploadMedia(file, 'image', (err, result) => {
      if (err) {
        reject(err);
      } else {
        // fs.unlink(req.files.material.path, function(err){
        // });
        resolve(result.media_id);
      }
    });
  });
}
  //   wechatAPI.uploadMaterial(file, 'image', (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // fs.unlink(req.files.material.path, function(err){
  //     // });
  //
  // });


module.exports = {
  combineMissionCard,
  combineGiftCard,
  uploadImg,
};
