

var Base = {
  
 
    //秘钥
  
    /**
     * create 薛松田
     * date 2019-6-20
     * @param1 {Number} 是否带token：1带，0不带
     * @param2 {Object} 需要加密传递给后端的额外参数
     * desc 生成ajax交互headers对象
     */
    getPostStr :function(type,obj) {
        var _data = Base.data;
        //如果不带token则移除o.token
        if(type == 1) {
            _data.token = localStorage.getItem('_token') ? localStorage.getItem('_token') : '';
        };
        //判断有没有加密方法
        if (typeof CryptoJS.HmacSHA256 == 'function' && typeof CryptoJS.enc.Base64.stringify == 'function') {
            var timeStamp = _data.timeStamp,
                keyArr = [],
                o = obj,
                signStr = '';
            if (o) {
                for (var n in _data) {
                    o[n] = _data[n];
                };
            } else {
                o = _data;
            }
            for (var k in o) keyArr.push(k);
            keyArr.sort();
            for (var i = 0, l = keyArr.length; i < l; i++) signStr += keyArr[i] + '=' + o[keyArr[i]] + '&';
            signStr = signStr.substr(0, signStr.length - 1);
            signStr = CryptoJS.HmacSHA256(signStr, Base.secretKey);
            return CryptoJS.enc.Base64.stringify(signStr);
        } else {
            throw new Error('参数错误');
        }
    },
      //判断客户端类型
   
    
};
module.exports = Base;