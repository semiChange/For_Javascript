  //js 获取GET 2016-05-26
  function getParam(name){
    var href = window.location.href.split("?");
    //alert(href);
    var param = href[1];  //取得Get参数
    //alert(param);
    if(!param){return;}
    var arrParam = param.split("&");
    //alert(arrParam);
    for(var i=0;i<arrParam.length; i++){
      var temp = arrParam[i].split("=");  //分离key与Value
      if(temp[0]==name){
        return temp[1];
      }
    }   
    return false;
  }
  
  //js 操作cookie
  function setCookie(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}
  
