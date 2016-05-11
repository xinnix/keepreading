const WechatAPI = require('wechat-api');
const config  = require('../../config/config');

const api = new WechatAPI(config.appid_test, config.appsecret_test);

// api.getMaterialCount(function (err, result, res) {
//     console.log(result);
// });

api.uploadMaterial('../../material/p1.jpg', 'image', function(err,result){
  console.log(result);
});
