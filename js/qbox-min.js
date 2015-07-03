function qbox(config){this.param={title:"系统消息",value:"确定",cancel:"取消",themes:"default_box",mask:false,opacity:0.9};this.themes={default_box:"#qbmask{position:absolute;background:#ddd;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5; opacity: 0.5;height:100%;width:100%;z-index:999998;top:0;}#qbbox{color:#fff;font-size: 14px;width:98%;}#qbbox h1.qbheader{font-size: 15px;padding:0;line-height: 2;border-bottom: 1px solid #aaa;width: 98%;margin:0 auto;}#qbbox .qbcontent{line-height: 1.8;font-size: 13px;margin-top:10px;}#qbbox .qbbottom{margin:10px 0px 8px;}#qbbox .qbbutton{font-size:12px;display: inline-block;padding: 2px 5px;background: #999;color: #333;cursor: pointer;margin-left:3px;margin-right:3px;}#qbbox .qbbutton.qbsubmit{background: #afafaf}",default_min:"#qbmask{position:absolute;background:#ddd;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5; opacity: 0.5;height:100%;width:100%;z-index:999998;top:0;}#qbbox{color:#fff;font-size: 14px;min-width: 350px;}#qbbox h1.qbheader{font-size: 15px;padding:0;line-height: 2;border-bottom: 1px solid #aaa;margin:0 auto;}#qbbox .qbcontent{line-height: 1.8;font-size: 13px;margin-top:10px;}#qbbox .qbbottom{margin:10px 0px 8px;}#qbbox .qbbutton{font-size:12px;display: inline-block;padding: 2px 5px;background: #999;color: #333;cursor: pointer;margin-left:3px;margin-right:3px;}#qbbox .qbbutton.qbsubmit{background: #afafaf}"};this.submit=function(click){click=click||"qbox.close(true)";if(click==""){return"";}if(this.param.value==""){return"";}return'<span class="qbbutton qbsubmit" onclick="'+click+'">'+this.param.value+"</span>";};this.cancel=function(click){click=click||"qbox.close(false)";if(click==""){return"";}if(this.param.cancel==""){return"";}return'<span class="qbbutton" onclick="'+click+'">'+this.param.cancel+"</span>";};this.alert=function(str,callback,param){param=param||{};qbox.callback=callback;this.param=this.extend(this.param,param,true);this.box(str,this.submit());};this.confirm=function(str,callback,param){param=param||{};qbox.callback=callback;this.param=this.extend(this.param,param,true);this.box(str,this.submit()+this.cancel());};this.box=function(str,bottom){var qbbox=document.getElementById("qbbox");if(qbbox!=null){this.close();}bottom=bottom||this.submit();var html="<style>"+this.themes[this.param.themes]+"</style>";html+='<div style="text-align: center;line-height: 1.5;min-height: 60px;"><h1 class="qbheader">'+this.param.title+'</h1><div class="qbcontent">'+str+'</div><div class="qbbottom">'+bottom+"</div></div>";var client_width=document.body.clientWidth;var qbbox=document.createElement("div");qbbox.setAttribute("id","qbbox");qbbox.style.position="fixed";qbbox.style.margin="0 auto;";qbbox.style.top="32%";qbbox.style.background="#666";qbbox.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity="+this.param.opacity*100+")";qbbox.style.opacity=this.param.opacity;qbbox.style.left="10px";qbbox.style.zIndex="999999";qbbox.innerHTML=html;document.body.appendChild(qbbox);if(this.param.mask){html+='<div class="qbmask"></div>';var qbmask=document.createElement("div");qbmask.setAttribute("id","qbmask");document.body.appendChild(qbmask);qbmask=document.getElementById("qbmask");qbmask.style.height=document.body.offsetHeight+"px";}qbbox=document.getElementById("qbbox");var boxwidth=parseInt(qbbox.offsetWidth);qbbox.style.left=((client_width-boxwidth)/2)+"px";};this.extend=function(des,src,override){if(src instanceof Array){for(var i=0,len=src.length;i<len;i++){this.extend(des,src[i],override);}}for(var i in src){if(override||!(i in des)){des[i]=src[i];}}return des;};if(typeof config=="object"){this.param=this.extend(this.param,config,true);}}qbox.callback=null;qbox.close=function(submit){submit=submit||false;if(qbox.callback!=null){if(qbox.callback.call(qbox,submit)){return;}}qbox.hide();return true;};qbox.hide=function(){var qbbox=document.getElementById("qbbox");if(qbbox!=null){qbbox.remove();}var qbmask=document.getElementById("qbmask");if(qbmask!=null){qbmask.remove();}};