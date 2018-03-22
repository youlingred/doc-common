"use strict";
const _ = require('lodash');

//通过key value查找所在的对象,获取第一个匹配的对象,
// type=node 返回节点对象
// type=index 返回节点索引
function findCall(type,collection, key, value,index,brothers) {
    //声明出参变量
    let result = null;    //如果当前collection是数组那么直接遍历,进入下一层查找操作
    if (_.isArray(collection)) {
        _.each(collection, (v,k) => {
            //调用回调函数进行内层查找
            result = findCall(type,v, key, value,k,collection);
            //如果结果不为空,终端循环返回结果
            if (result!==null) {
                return false;
            }
        });
    } else {
        //如果当前collection不是数组是对象,遍历元素
        _.each(collection, (v, k) => {
            //console.log(type,v, key, value)
            if (_.isArray(v)) {
                result = findCall(type,v, key, value,k,v);
            } else {
                //如果找到匹配值赋值给result
                result=null;
                if (k === key && v === value) {
                    switch(type){
                        case 'node':
                            result = collection;
                            break;
                        case 'index':
                            result = index;
                            break;
                        case 'brothers':
                            result = brothers;
                            break;
                    }
                }
            }
            //如果结果不为空,终端循环返回结果
            if (result||result===0) {
                return false;
            }
        });
    }
    //返回结果数据
    return result;
};
module.exports = {
    find: {
        node: (collection, key, value) => {
            return findCall('node',collection, key, value);
        },
        index: (collection, key, value) => {
            return findCall('index',collection, key, value);
        },
        brothers:(collection, key, value) => {
            return findCall('brothers',collection, key, value);
        },
    }
}
exports.default = exports;