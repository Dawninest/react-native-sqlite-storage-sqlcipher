/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  StyleSheet,
} from 'react-native';
import SQLite from './sqlite';
var sqLite = new SQLite();
var db;

export default class sqlTest extends Component {

  compennetDidUnmount(){
    sqLite.close();
  }
  componentWillMount(){
    //开启数据库
    if(!db){
      db = sqLite.open();
    }
    //建表
    sqLite.createTable();
    //删除数据
    sqLite.deleteData();
    //模拟一条数据
    var userData = [];
    var user = {};
    user.name = "张三";
    user.age = "28";
    user.sex = "男";
    user.phone = "18900001111";
    user.email = "2343242@qq.com";
    user.qq = "111222";
    userData.push(user);
    //插入数据
    sqLite.insertUserData(userData);
    //查询
    db.transaction((tx)=>{
      tx.executeSql("select * from user", [],(tx,results)=>{
        var len = results.rows.length;
        for(let i=0; i<len; i++){
          var u = results.rows.item(i);
          //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
          alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
        }
      });
    },(error)=>{//打印异常信息
      console.log(error);
    });
  }
  render(){
    return null;
  }
  
}

AppRegistry.registerComponent('sqlTest', () => sqlTest);
