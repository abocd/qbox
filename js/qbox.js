/**
 * Created by aboc on 2015/1/12.
 * @version 1.0.5
 */
function qbox(config){
    this.param = {
        //标题
        title :"系统消息",
        //确定按钮
        value:"确定",
        //取消按钮
        cancel:"取消",
        //皮肤
        themes:"default_box",
        //遮罩,
        mask:true,
        //透明度
        opacity:0.9,
        //是否显示标题
        show_title:true
    };
    //皮肤
    this.themes = {
        //小型
        default_box:'#qbmask{position:absolute;background:#ddd;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5; opacity: 0.5;height:100%;width:100%;z-index:999998;top:0;}#qbbox{color:#fff;font-size: 14px;min-width: 350px;}#qbbox h1.qbheader{font-size: 15px;padding:0;line-height: 2;border-bottom: 1px solid #aaa;margin:0 auto;}#qbbox .qbcontent{line-height: 1.8;font-size: 13px;margin:10px 0;}#qbbox .qbbottom{margin:10px 0px 8px;}#qbbox .qbbutton{font-size:12px;display: inline-block;padding: 2px 5px;background: #999;color: #333;cursor: pointer;margin-left:3px;margin-right:3px;}#qbbox .qbbutton.qbsubmit{background: #afafaf}'
    };
    /**
     * 合并对象
     * @param des
     * @param src
     * @param override
     * @returns {*}
     */
    this.extend = function(des, src, override){
        if(src instanceof Array){
            for(var i = 0, len = src.length; i < len; i++)
                this.extend(des, src[i], override);
        }
        for( var i in src){
            if(override || !(i in des)){
                des[i] = src[i];
            }
        }
        return des;
    };
    if(typeof config=='object'){
        //全局初始化了
        this.param = this.extend(this.param,config,true);
    }
    //是否显示标题
    this.show_title = this.param.show_title;


    //确定按钮
    this.submit = function(click){
        click = click ||  "qbox.close(true)";
        if(click == ""){
            return '';
        }
        if(this.param.value == ""){
            return '';
        }
        return '<span class="qbbutton qbsubmit" onclick="'+click+'">'+this.param.value+'</span>';
    };
    //取消按钮
    this.cancel = function(click){
        click = click ||  "qbox.close(false)";
        if(click == ""){
            return '';
        }
        if(this.param.cancel == ""){
            return '';
        }
        return '<span class="qbbutton" onclick="'+click+'">'+this.param.cancel+'</span>';
    };

    /**
     * 警告框
     * @param str
     * @param callback
     * @param param
     */
    this.alert = function(str,callback,param){
        param = param || {};
        qbox.callback = callback;

        this.param = this.extend(this.param,param,true);
        this.box(str,this.submit());
    };

    /**
     * 确认框
     * @param str
     * @param callback
     * @param param
     */
    this.confirm = function(str,callback,param){
        param = param || {};
        qbox.callback = callback;
        this.param = this.extend(this.param,param,true);
        this.box(str,this.submit()+this.cancel());
    };

    /**
     * 提示框
     * @param str
     * @param callback
     * @param param
     */
    this.prompt = function(str,callback,param){
        if(typeof callback == 'object'){
            param = callback ||{};
        } else {
            param = param || {};
            qbox.callback = callback;
        }
        var second = param.second || 3;
        this.param.mask = param.mask || false;
        this.param = this.extend(this.param,param,true);
        this.show_title = false;
        this.box(str,'');
        setTimeout(function(){
            qbox.close();
        },second*1000);
    };
    this.box = function(str,bottom){
        var qbbox = document.getElementById("qbbox");
        if(qbbox!=null){
            this.close();
        }
        if(typeof bottom == 'string' && bottom == ''){
            bottom = '';
        } else {
            bottom = bottom || this.submit();
        }
        var html = '<style>'+this.themes[this.param.themes]+'</style>';
        html += '<div style="text-align: center;line-height: 1.5;">'
        if(this.show_title) {
            html += '<h1 class="qbheader">' + this.param.title + '</h1>';
        }
        html += '<div class="qbcontent">'+str+'</div>';
        if(bottom) {
            html += '<div class="qbbottom">' + bottom + '</div>';
        }
        html += '</div>';
        var client_width = document.body.clientWidth;
        var qbbox = document.createElement("div");
        qbbox.setAttribute("id","qbbox");
        qbbox.style.position = "fixed";
        qbbox.style.margin = "0 auto;";
        qbbox.style.top = "32%";
        qbbox.style.background="#666";
        qbbox.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity="+this.param.opacity*100+")";
        qbbox.style.opacity=this.param.opacity;
        qbbox.style.left = "10px";
        qbbox.style.zIndex = "999999";
        qbbox.innerHTML = html;
        //qbbox.style.display = "none";
        document.body.appendChild(qbbox);
        if(this.param.mask){
            //有遮罩
            html += '<div class="qbmask"></div>';
            var qbmask = document.createElement("div");
            qbmask.setAttribute("id","qbmask");
            document.body.appendChild(qbmask);
            qbmask = document.getElementById("qbmask");
            qbmask.style.height = document.body.offsetHeight+"px";
        }
        qbbox = document.getElementById("qbbox");
//                alert(qbbox.style.width);
        var boxwidth = parseInt(qbbox.offsetWidth);
        qbbox.style.left = ((client_width-boxwidth)/2)+"px";
    };





};
//回调函数
qbox.callback = null;
/**
 * 关闭
 * @param submit true 确定  false 取消
 * @returns {boolean}
 */
qbox.close = function(submit){
    submit = submit || false;
    if(qbox.callback != null){
        if(qbox.callback.call(qbox,submit)){
            //回调函数内返回真,则不关闭弹窗
           return;
        }
    }
    qbox.hide();
    return true;
};
qbox.hide = function(){
    var qbbox = document.getElementById("qbbox");
    if(qbbox!=null){
        qbbox.remove();
    }
    var qbmask = document.getElementById("qbmask");
    if (qbmask != null) {
        qbmask.remove();
    }
};