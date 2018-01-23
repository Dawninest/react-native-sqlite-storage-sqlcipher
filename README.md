react-native-sqlite-storage-sqlcipher
=====
如何在iOS平台下使用react-native-sqlite-storage进行数据库加密的踩坑和问题解决过程

需求：使用react-native-sqlite-storage使用sqlcipher加密组件进行数据库加密
-----


组件介绍
-----
1.react-native-sqlite-storage RN数据库插件，由Cordova的同名插件改造而来<br>
https://github.com/andpor/react-native-sqlite-storage<br>
2.sqlcipher 一款数据库加密工具，不多做评价<br>
https://github.com/sqlcipher/sqlcipher<br>

# 关于插件使用讨论及踩坑流程
1.https://github.com/andpor/react-native-sqlite-storage/issues/40<br>
<img width="480" height="210" src="https://github.com/Dawninest/react-native-sqlite-storage-sqlcipher/blob/master/ImgForRead/屏幕快照%202018-01-23%20上午10.23.27.png"/><br>
原作者好像在插件中留了这个功能，但是用 #ifdef / #endif 屏蔽了，插件的使用说明中并没有留下直接使用的加密功能的使用说明，让我很困扰<br>
2.https://github.com/andpor/react-native-sqlite-storage/issues/217<br>
另外一个小伙问了同样的问题，被建议使用fork的分支<br>
3.https://github.com/dryganets/react-native-sqlite-storage<br>
上述描述的被建议使用的改动分支，iOS分支中被加入了Pods集成的sqlcipher，然后...<br>
<img width="773" height="210" src="https://github.com/Dawninest/react-native-sqlite-storage-sqlcipher/blob/master/ImgForRead/屏幕快照%202018-01-23%20上午10.44.58.png"/><br>
exm?pods？自从开始用RN开发都感觉都不认识这个了，嫌麻烦没有使用这种方案（说不定这个会比我接下来使用的简单）<br>
4.https://www.zetetic.net/sqlcipher/ios-tutorial/<br>
当时我就不乐意了，用不了你这个插件我还不能自己写个自定义插件咯？于是，自己按照OC原生开发导入sqlcipher的方式写了个demo，<br>
5.http://blog.csdn.net/u010731949/article/details/78180850?locationnum=5&fps=1<br>
然后按照上述文档在解决了 Implicit declaration of function 'sqlite3_key' is invalid in C99 这个问题<br>
6.发现demo可用而且贼好用，但是要自己封装成RN的自定义组件真的好麻烦啊，所以又看回了react-native-sqlite-storage插件<br>
7.然后玩 塞尔达传说 的时候，(不吹不黑，塞尔达天下无敌，任天堂万物起源)<br>
忽然想到，按写原生sqlcipherDemo的思路集成sqlcipher到插件里面应该可行，<br>
8.于是一顿操作解决问题<br>
将sqlcipher引入项目，放到Library和RN的三方库放一起，参考 https://www.zetetic.net/sqlcipher/ios-tutorial/<br>
<img width="278" height="340" src="https://github.com/Dawninest/react-native-sqlite-storage-sqlcipher/blob/master/ImgForRead/屏幕快照%202018-01-23%20上午10.48.57.png"/><br>
去掉 SQLite.xcodeproj/SQLite.m 用 #ifdef / #endif 的屏蔽<br>
<img width="420" height="173" src="https://github.com/Dawninest/react-native-sqlite-storage-sqlcipher/blob/master/ImgForRead/屏幕快照%202018-01-23%20上午10.47.43.png"/><br>
顶上加上处理c99问题的代码
<img width="666" height="114" src="https://github.com/Dawninest/react-native-sqlite-storage-sqlcipher/blob/master/ImgForRead/屏幕快照%202018-01-23%20上午10.48.01.png"/><br>

工程文件考虑后续做个demo放上来<br> 
つづく



