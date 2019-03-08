import axios from 'axios';
/*
*method：请求方式
*url：请求地址
*data：请求入参
*cb:成功回调
*/
export function Post(url, data, cb) {
  // if (data) {
  //   data = `pathname=${window.location.pathname}&${data}`;
  // } else {
  //   data = `pathname=${window.location.pathname}`;
  // }
  // let form = new FormData();
  // if (typeof data !== 'string') {
  //   for (let key in data) {
  //     form.append(key, data[key])
  //   }
  // } else {
  //   form = data
  // }
  //发起请求
  return new Promise((resolve, reject) => {
    let _option = {
      headers: {
        // 'token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
      },
      method: 'post',
      url,
      baseUrl: 'http://localhost:3000',
      data: data
    };
    axios.request(_option)
      .then((Res) => {
        if (Res.data.code * 1 !== 10001) {
          resolve(Res);
          cb && cb(Res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
export default function server(method, url, data, cb) {
  data.pathname = window.location.pathname;
  //数据转为formdata
  let form = new FormData();
  if (typeof data !== 'string') {
    for (let key in data) {
      form.append(key, data[key])
    }
  } else {
    form = data
  }

  //发起请求
  return new Promise((resolve, reject) => {

    let _option = {
      headers: {
        'token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
      },
      method,
      url,
      baseUrl: 'http://localhost:3000',
      data: form
    };
    axios.request(_option)
      .then((Res) => {
        if (Res.data.code * 1 !== 10001) {
          resolve(Res);
          cb && cb(Res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
