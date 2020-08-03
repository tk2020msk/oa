var QQV = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("输入QQ号"));
  } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
    callback();
  } else {
    callback(new Error("输入正确的QQ号"));
  }
};

// 类似金钱,首位不为0,最多2位小数
export function checkNumPot2(rule, value, callback) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  if (!value) {
    return callback(new Error("请填写数字"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写数字,最多2位小数"));
  } else {
    callback();
  }
}

//验证身份证正确性
function validateID(num){
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
  //下面分别分析出生日期和校验位 
  var len, re;
  len = num.length;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确 
    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
        console.log('输入的身份证号里出生日期不对！');
        return false;
    }else {
        //将15位身份证转成18位 
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, i;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (i = 0; i < 17; i++) {
            nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11];
        return true;
    }
  }
  if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);

      //检查生日日期是否正确 
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
          console.log('输入的身份证号里出生日期不对！');
          return false;
      }
      else {
          //检验18位身份证的校验码是否正确。 
          //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
          var valnum;
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var nTemp = 0, i;
          for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[nTemp % 11];
          if (valnum != num.substr(17, 1)) {
              console.log('18位身份证的校验码不正确！');
              return false;
          }
          return true;
      }
  }
}

// 身份证
export function checkIdNum(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!value) {
    return callback(new Error("证件号码不能为空"));
  } else if (!reg.test(value)) {
    return callback(new Error("证件号码不正确"));
  } else if(!validateID(value)){
    return callback(new Error("证件号码不正确"));
  } else {
    callback();
  }
}

// 整数
export function checkInterNum(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/;
  if (!value) {
    return callback(new Error("请填写整数"));
  } else if (!reg.test(value)) {
    return callback(new Error("请输入整数"));
  } else {
    callback();
  }
}

export default {
  QQ: { required: true, validator: QQV, trigger: "blur" },
  phone: {
    required: true,
    pattern: /^1\d{10}$/,
    message: "目前只支持中国大陆的手机号码",
    trigger: "blur"
  },
  numPot2: { required: true, validator: checkNumPot2, trigger: "blur" },
  InterNum: { required: true, validator: checkInterNum, trigger: "blur" },
  idNum:{ required: true, validator: checkIdNum, trigger: "blur" }
};
