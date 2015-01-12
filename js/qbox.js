/**
 * Created by aboc on 2015/1/12.
 */
function qbox(){
    this.param = {
        title :"系统消息",
        value:"确定",
        cancel:"取消"
    };
    this.callback = null;
    this.submit = function(click){
        if(typeof click=="undefined"){
            click = "box.close(true)";
        }
        if(click == ""){
            return '';
        }
        return '<span class="szxbutton szxsubmit" onclick="'+click+'">'+this.param.value+'</span>';
    }
    this.cancel = function(click){
        if(typeof click=="undefined"){
            click = "box.close(false)";
        }
        if(click == ""){
            return '';
        }
        return '<span class="szxbutton" onclick="'+click+'">'+this.param.cancel+'</span>';
    }
    this.alert = function(str,callback,param){
        if(typeof param == "undefined"){
            param = {};
        }
        if(typeof callback == "function"){
            this.callback = callback;
        }
        this.param = this.extend(this.param,param,true);
        this.box(str,this.submit(),callback);
    }
    this.confirm = function(str,callback,param){
        if(typeof param == "undefined"){
            param = {};
        }
        if(typeof callback == "function"){
            this.callback = callback;
        }
        this.param = this.extend(this.param,param,true);
        this.box(str,this.submit()+this.cancel(),callback);
    }
    this.box = function(str,bottom){
        var szxbox = document.getElementById("szxbox");
        if(szxbox!=null){
            this.close();
        }
        if(typeof bottom== "undefined" || bottom==""){
            bottom = '<span class="szxbutton" onclick="box.close()">确定</span>';
        }
        html = '<style>#szxbox{color:#fff;font-size: 14px;}#szxbox h1.szxheader{font-size: 15px;padding:0;line-height: 2;border-bottom: 1px solid #aaa;width: 98%;margin:0 auto;}#szxbox .szxcontent{line-height: 1.8;font-size: 13px;margin-top:10px;}#szxbox .szxbottom{margin:10px 0px 8px;}#szxbox .szxbutton{font-size:12px;display: inline-block;padding: 2px 5px;background: #999;color: #333;cursor: pointer;margin-left:3px;margin-right:3px;}#szxbox .szxbutton.szxsubmit{background: #afafaf}</style>';
        html += '<div style="text-align: center;line-height: 1.5;min-height: 60px;"><h1 class="szxheader">'+this.param.title+'</h1><div class="szxcontent">'+str+'</div><div class="szxbottom">'+bottom+'</div></div>';
        var client_width = document.body.clientWidth;
        var szxbox = document.createElement("div");
        szxbox.setAttribute("id","szxbox");
        szxbox.style.position = "absolute";
        szxbox.style.margin = "0 auto;";
        szxbox.style.top = "32%";
        szxbox.style.width= (client_width-20)+"px";
        szxbox.style.background="#666";
        szxbox.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=90";
        szxbox.style.opacity="0.90";
        szxbox.style.left = "10px";
        szxbox.style.zIndex = "999999";
        szxbox.innerHTML = html;
        //szxbox.style.display = "none";
        document.body.appendChild(szxbox);
        szxbox = document.getElementById("szxbox");
//                alert(szxbox.style.width);
        var boxwidth = parseInt(szxbox.style.width);

    }

    /**
     * 关闭
     *
     **/
    this.close = function(submit){
        var szxbox = document.getElementById("szxbox");
        if(szxbox!=null){
            szxbox.remove();
        }
        if(typeof submit=="undefined"){
            submit = false;
        }
        if(this.callback != null){
            this.callback.call(this,submit)
        }
        return true;
    }
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
    }
}