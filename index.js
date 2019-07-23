function mergeConfig(defaults,...config) {
  config.forEach(item => {
    for (let key in item){
      if (typeof item[key] === 'object'){
        console.log('object')
        defaults[key] = mergeConfig({},item[key])
      }
      defaults[key] = item[key] ? item[key] :defaults[key]
    }
  })

  return defaults
}
var defaults = {
  url: 'http://baidu.com',
  timeout: 0,
  data:{
    title: 'defaults'
  },
  baseUrl: 'BaseUrl'
}
var o = {
  url: 'http://sina.com',
  data:{
    title: 'this is a sina title',
    content:[
      {name:'Ryan'}
    ]
  },
  header:{
    'Content-Type': 'application/json;charset=utf-8'
  }
}

var c = {
  data:{
    content:[
      {name:'Carter',salary:[{
        Jan:20000
      },{Feb:20000}]}
    ]
  },
  header:{
    'Content-Type':'对象C'
  }
}

console.log(mergeConfig(defaults,o,c))
