  //获取GET 2016-05-26
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
  
