

const arr = [
  {
      "level": 1,
      "roleId": 10,
      "roleName": "测试角色1"
  },
  {
      "level": 2,
      "roleId": 11,
      "roleName": "测试角色1-1"
  },
  {
      "level": 2,
      "roleId": 13,
      "roleName": "测试角色1-1"
  },
  {
      "level": 3,
      "roleId": 14,
      "roleName": "测试角色1-1"
  },
  {
      "level": 1,
      "roleId": 1,
      "roleName": "123"
  },
  {
      "level": 2,
      "roleId": 12,
      "roleName": "测试角色123-1"
  }
]

function MakeChain(arr){
  var result = {};
  var chains = {};
  var parent = null;
  for(var i=0;i<arr.length;i++){
    parent = chains[arr[i].level-1] || result;
    parent.children = parent.children || [];
    parent.children.push(arr[i]);
    chains[arr[i].level] = arr[i];
  }

  return result;
  }

console.log(MakeChain(arr));
const sortByArrayChain = array => {
  const result = {}
  const chains = {}
  let parent = {}
  for (let i = 0; i < array.length; i++) {
    parent = chains[arr[i].level -1] || result
    parent.children = parent.children = []
    parent.children.push(arr[i])
    chains[arr[i].level] = arr[i]
  }
}
