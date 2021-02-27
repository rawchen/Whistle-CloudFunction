const fetch = require("./node-fetch/lib");

// 全局变量，存储用户信息
//如果你在厦门，则在以下“位置”后新增:   "厦门":社区名称及社区电话
let info = {
  "学号": "xxxxxxxxxx",
  "密码": "xxxxxxxxxxx",
  "位置": "xx省xx市xxxxx"
}

// 全局变量，存储云函数执行返回结果
var result;

// 模拟登录
async function login () {
  console.log("提交登录表单");
  let res = await fetch("https://api.weishao.com.cn/login?source=%2Foauth%2Fauthorize%3Fclient_id%3DpqZ3wGM07i8R9mR3%26redirect_uri%3Dhttps%253A%252F%252Fyq.weishao.com.cn%252Fcheck%252Fquestionnaire%26response_type%3Dcode%26scope%3Dbase_api%26state%3Druijie", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    "referrerPolicy": "no-referrer",
    "body": `schoolcode=xmut&username=${info['学号']}&password=${info['密码']}&verifyValue=&verifyKey=${info['学号']}_xmut&ssokey=`,
    "method": "POST",
    "mode": "cors",
    redirect: 'manual' // 手动重定向，才可以拿到location
  });

  // 返回oauth2cookie
  let oauth2cookie = res.headers.get("set-cookie").split(";")[0];
  // console.log(oauth2cookie);
  let url = res.headers.get("location"); // 获得重定向地址
  console.log("\n第1次重定向");
  // console.log(url);


  // 第一次 重定向
  res = await fetch(url, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    "referrerPolicy": "no-referrer",
    "body": null,
    "method": "GET",
    "mode": "cors",
    redirect: 'manual'
  })
  url = res.headers.get("location")
  console.log("\n第2次重定向");
  // console.log(url);


  // 第二次 重定向
  res = await fetch(url, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": oauth2cookie
    },
    "referrerPolicy": "no-referrer",
    "body": null,
    "method": "GET",
    "mode": "cors",
    redirect: 'manual'
  })
  url = res.headers.get("location")
  console.log("\n第3次重定向");
  // console.log(url);


  // 第三次 重定向
  res = await fetch(url, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "no-referrer",
    "body": null,
    "method": "GET",
    "mode": "cors",
    redirect: 'manual'
  })

  let cookie = res.headers.get("set-cookie").split(";")[0];
  // console.log("真正的登录cookie:", cookie);
  if(cookie) console.log('\n登录成功');
  result = '登录成功';
  return cookie;
}


// 获取用户信息
async function getUserInfo (cookie) {
  let userInfo = await fetch("https://yq.weishao.com.cn/userInfo", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": cookie
    },
    "referrer": "https://yq.weishao.com.cn/questionnaire",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }).then(res => {
    return res.json(); 
  }).then(json => {
    return json.data;
  })
  // console.log(userInfo);
  if(userInfo) console.log('\n获取用户信息成功');
  result = '获取用户信息成功';
  return userInfo;
}


// 模拟提交
async function submit (cookie, body) {
  return await fetch("https://yq.weishao.com.cn/api/questionnaire/questionnaire/addMyAnswer", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": cookie
    },
    "referrer": "https://yq.weishao.com.cn/questionnaire/addanswer?page_from=onpublic&activityid=5446&can_repeat=1",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": body,
    "method": "POST",
    "mode": "cors"
  })

  .then(res => { return res.json(); })
  .then(json => {console.log('\n提交结果： ', json['errmsg']); return json['errmsg']; })
}


// 执行
exports.main = async function main () {
  if(!(info['学号'] && info['密码'] && info['位置'])){
    console.error('GitHub Secrets信息不完整，请按文档说明填写，程序中止');
    result = '信息不完整';
    return result;
  }
  let r = 0;
  let cookie = await login().catch(error => {console.error('登录失败：'+error.message);r = 1});
  if(r === 1) {
    main()
    return
  }
  let userInfo = await getUserInfo(cookie);
  if(!userInfo) {
    console.error('\n获取用户信息失败，程序中止');
    result = '获取用户信息失败，程序中止';
    return result;
  }
  info['姓名'] =  userInfo['username'];
  info['path'] = userInfo['path'];
  info['组织'] =  userInfo['organization'];
  info['性别'] =  userInfo['gender'];
  info['电话'] = userInfo['cellphone'];
  if(!(info['姓名'] && info['path'] && info['组织'] && info['性别'] && info['电话'])) {
    console.error('\n用户信息不完整，请检查手机微哨【个人资料】的完成度');
    result = '用户信息不完整，请检查手机微哨【个人资料】的完成度';
    return result;
  }
  
  // 默认数据 改变位置和电话
  let body = {"sch_code":"xmut","stu_code":info['学号'],"stu_name":info['姓名'],"identity":"student","path":info['path'],"organization":info['组织'],"gender":info['性别'],"activityid":"5446","anonymous":0,"canrepeat":1,"repeat_range":1,"question_data":[{"questionid":58641,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":7,"option_sort":0,"range_value":"","content":info['位置'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58642,"optionid":"97559","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58644,"optionid":"97561","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58650,"optionid":"97570","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58656,"optionid":"97581","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58662,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":info['电话'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true}],"totalArr":[{"questionid":58641,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":7,"option_sort":0,"range_value":"","content":info['位置'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58642,"optionid":"97559","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58643,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58644,"optionid":"97561","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58645,"optionid":"","optiontitle":"","question_sort":0,"question_type":2,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58646,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58647,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58648,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58649,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58650,"optionid":"97570","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58651,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58652,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58653,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58654,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58655,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58656,"optionid":"97581","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58657,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":8,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58658,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58659,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58660,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58661,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58662,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":info['电话'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true}],"private_id":0};

  // 如果厦门属性存在，则填写社区名称及社区电话
  // 改变位置和电话及社区
  if(info['厦门']){
    body = {"sch_code":"xmut","stu_code":info['学号'],"stu_name":info['姓名'],"identity":"student","path":info['path'],"organization":info['组织'],"gender":info['性别'],"activityid":"5446","anonymous":0,"canrepeat":1,"repeat_range":1,"question_data":[{"questionid":58641,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":7,"option_sort":0,"range_value":"","content":info['位置'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58642,"optionid":"97559","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58644,"optionid":"97561","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58650,"optionid":97569,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58651,"optionid":97572,"optiontitle":"自家房产","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58652,"optionid":97574,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58653,"optionid":97576,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58655,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":info['厦门'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58656,"optionid":97581,"optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58662,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":info['电话'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true}],"totalArr":[{"questionid":58641,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":7,"option_sort":0,"range_value":"","content":info['位置'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58642,"optionid":"97559","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58643,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58644,"optionid":"97561","optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58645,"optionid":"","optiontitle":"","question_sort":0,"question_type":2,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58646,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58647,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58648,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58649,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58650,"optionid":97569,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"answered":true},{"questionid":58651,"optionid":97572,"optiontitle":"自家房产","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58652,"optionid":97574,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58653,"optionid":97576,"optiontitle":"是","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58654,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58655,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":4,"option_sort":0,"range_value":"","content":info['厦门'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58656,"optionid":97581,"optiontitle":"否","question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true},{"questionid":58657,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":8,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58658,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58659,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58660,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":1,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58661,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":"","isotheroption":0,"otheroption_content":"","isanswered":"","answerid":0,"hide":true,"answered":false},{"questionid":58662,"optionid":0,"optiontitle":0,"question_sort":0,"question_type":3,"option_sort":0,"range_value":"","content":info['电话'],"isotheroption":0,"otheroption_content":"","isanswered":true,"answerid":0,"hide":false,"answered":true}],"private_id":0}
  }
  // 提交表单
  result = await submit(cookie, JSON.stringify(body))
  return result;
}