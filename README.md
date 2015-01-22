# qbox 轻弹窗
[^简洁的轻弹窗,轻量,简单,也可以适用于手机哦]

#####作者:aboc Email:mayinhua@gmail.com

[我的php之旅](http://www.phpec.org)



##轻弹窗的使用说明

1. 引入JS文件

```javascript

   <script type="text/javascript" src="js/qbox.js"></script>
```

2. 初始化qbox

```javascript

   var box = new qbox();
```
或者
```javascript

   var box = new qbox({title:'一次声明,都有效',themes:'default_min'});
```

3. 使用

```javascript

//确认的

box.alert("我出来了,点击确定弹出alert",function(d){

            if(d){

                alert("弹出了一个alert");

            }
            //return true 将会阻止窗口关闭,可以手工调用qbox.hide()关闭窗口
            return true;

        },{

            title:'自定义的提示标题'

        });

//确认和取消的

box.confirm("确定和取消弹出的提示不一样哦",function(d){

            if(d){

                alert("yes");

            } else {

                alert("no")

            }

        },{

            title:'自定义的提示标题'

        });

```



就是这么使用



演示地址:[https://abocd.github.io/qbox/demo.html](https://abocd.github.io/qbox/demo.html)