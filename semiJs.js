//==================================
// semi简化版js库 (后期建议放到semi框架中) 主要分为 get/set[css]cre add....
// 2015-03-14
// semi
// alert('already!!');
//==================================

(function(){
	var semi = {
		//功能:创建ajax 对象
		//参数:无
		creAjax:function(){
			if(window.ActiveXObject){
				var XHR= new ActiveXObject("Msxml2.XMLHTTP");//ie
			}else{
				var XHR= new XMLHttpRequest();//ff
			}
			return XHR;
		},
		// 功能: post方式 ajax提交请求
		// 参数: 允许回调函数function(res){alert(res)}
		// 数据可以编码 encodeURIComponent(str)
		ajaxPOST:function(url,data,callback){
			//alert(url+'\n'+data);return;
			var len = arguments.length;
			var XHR = this.creAjax();
			XHR.open("post",url,true);
			XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			XHR.send(data+'&r='+Math.random());	
			XHR.onreadystatechange=function(){
		      if(XHR.readyState==4){
					if(XHR.status==200){
						if(len==3){
							//oJson = JSON.parse(XHR.responseText);//
							callback(XHR.responseText);
						}		
					}
		        }
		    }		
		},
		// get方式ajax
		// @param 地址,数据,处理
		// 无
		ajaxGET:function(url,data,callback){
			var len = arguments.length;
			var XHR = this.creAjax();
			XHR.open("get",url+data);// quest = guyumi
			XHR.send(null);	
			XHR.onreadystatechange=function(){
		      if(XHR.readyState==4){
					if(XHR.status==200){
						if(len==3){
							callback(XHR.responseText);
						}
					}
		        }
		    }
		},

		// 功能:判断ie浏览器版本 ==
		// 参数:无
		// 返回:版本号
		getIeVer:function(){
			var arr = /MSIE (.*?);/g.exec(navigator.userAgent);
			if(arr && arr.length>1){
				return arr[1];
			}else{
				return false;//非ie
			}
			
		},
		//文档加载完成事件
		DOMLoaded:function(fn){
			if(this.getIeVer()){//ie
				var at = setInterval(function(){
				try{
					document.documentElement.doScroll();//尝试滚动
					clearInterval(at);
					fn();
				}catch(e){}			
				},100);
			}else{//w3c
				window.addEventListener('DOMContentLoaded',fn,false);
			}
		},
		// 功能:绑定事件函数
		// 参数:对象,事件,函数
		addEvent:function (obj,evt,fn){
			if(obj.addEventListener){//ECMA 顺序运行
				obj.addEventListener(evt,fn);
			}else{// ie 如果绑定2个 将倒序运行
				obj.attachEvent('on'+evt,fn);
			}
		},
			
		/**
		*功能：获取随机数
		*参数：最小 到 最大
		*返回：整数
		*/
		getRandom:function (min,max){
		    return Math.floor( min+Math.random()*(max-min+1) );
		},
			
		/**
		*功能：为一个对象设置高度为另一对象的高度
		*参数：要设置对象的1 ，获取对象的2
		*返回：null
		*/
		setSameHeight:function(o1,o2){
			if(o1 && o2){//先判断有无
				var h1 = o1.offsetHeight,h2 = o2.offsetHeight;
				//alert(h1+'\r'+h2);
				if(h1<h2){
					this.css(o1,'height',h2+'px');
				}else{
					this.css(o2,'height',h1+'px');
				}				
			}
		},		
		
		/**
		 * 功能:得到长度为6位字符串
		 * 参数:[数组]
		 * 返回:string 111111
		 */
		creColor:function (colors){//返回一个颜色字符串#000000
			var str='';
			return (function (x){
				if(x>0){
					var i = semi.getRandom(0,colors.length-1 );
					str += colors[i];
					arguments.callee(--x);//重复调用该函数
				}
				return str;//返回颜色值document.write
			})(6);
		},
			
		// 功能: 设置/获取 指定键值的 cookie
		// 参数: 键 [值 有效期]
		cookie:function(){
			if(arguments.length==1){//获取
				if (document.cookie.length>0){
					var c_start=document.cookie.indexOf(arguments[0] + "=");
					if (c_start!=-1){ 
						c_start=c_start + arguments[0].length+1;
						c_end=document.cookie.indexOf(";",c_start);
						if(c_end==-1){c_end=document.cookie.length;}
						return unescape(document.cookie.substring(c_start,c_end));
					} 
				}
				return "";
			}
			
			if(arguments.length>1){//设置
				var exdate = new Date();
				exdate.setDate(exdate.getDate()+arguments[2]);
				document.cookie=arguments[0]+'='+escape(arguments[1])+((arguments[2]==null) ?'':';expires='+exdate.toGMTString())+';path=/';
			}

		},

		/**
		 * 清除所有cookie清除所有cookie
		 */
		clearCookie:function (){
			var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
			if (keys) {
				for (var i = keys.length; i--;)
				document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
			}
		},

		// 设置/获取 css样式
		// 参数: 对象,属性,[值]
		css:function(){
			if(arguments.length==3){//set
				arguments[0].style[arguments[1]]=arguments[2];
			}
			if(arguments.length==2){//get
				if(!-[1,] == false){//w3c
					return document.defaultView.getComputedStyle(arguments[0],null)[arguments[1]];
				}else{//ie
					return arguments[0].currentStyle[arguments[1]];
				}
			}
		},
		// 设置元素属性
		// 参数: 对象, {对象参数}
		// {属性:值,属性:值}
		attr:function(){
			var obj = arguments[1];
			for(attr in obj){
				//采用hash方式赋值
				arguments[0][attr]=obj[attr];
			}

		},
		// 功能:得到指定url GET 传值
		// 参数:键
		getURL:function(key) {
			//alert(location.search);//地址栏传参数获取类似 ?key=abc&name=def&age=jkl
			//先去掉第一个
			var reg = new RegExp("(^|&)"+key+"=.*?(&|$)","gi");
			//location.search //获取参数部分
			//substr() //获取字符串一部分
			//match() //查找指定的值
			var r = location.search.substr(1).match(reg);
			//alert('r是:\n'+r);
			if(r){
				var v =r[0].replace('&','').split('=');
				//alert(v);
				if (v[1] != null) return decodeURIComponent(v[1]); //url解码
				return null;
			}
			
		},
		// 功能:设置/获取 innerText
		// 参数:obj,value
		inner:function(){
			if(arguments.length==1){//获取
				if(arguments[0].innerText==undefined){//FF
					return arguments[0].textContent;
				}else{//ECMA
					return arguments[0].innerText;
				}
			}

			if(arguments.length==2){//设置
				if(arguments[0].innerText==undefined){//FF
					arguments[0].textContent=arguments[1];
				}else{//ECMA
					arguments[0].innerText=arguments[1];
				}
			}
		},
		//功能: 为每个数组对象添加事件函数 有index值
		//参数: (集合,事件名,事件函数)
		eachEvent:function (coll,event,fn){
			for(var i=0;i<coll.length;i++){
				//this 是某一个对象
				//coll[i].addEventListener(event,fn,false);//不兼容ie
				//默认添加index值
				coll[i]['on'+event] = fn;//hash 表方式
			}
		},
		//除去首尾空格
		//(字符串)
		trim:function (str) {
	        return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	    },
			
	    //这个方法可以限制长度,字符,空白
	    //(待判断的str,限定的长度,限定的字符[中/英])
	    check:function(str,len){
			//alert('this是:'+this);
	    	var s=this.trim(str);
	    	if(s.length>len||s.length==0){
	    		alert('长度不符合...');
	    		return;
	    	}		    	
			var regStr = "([a-zA-Z\u4e00-\u9fa5]{1,"+len+"})";
			var reg = RegExp(regStr,'g');
			//alert(reg);
			if(reg.test(s)){
				return s; 
			 }else{
				alert('只支持中英文...');
				return;
			 }
		},
		 
		//反转字符串
		strReverse:function(str){
			return str.split('').reverse().join('');
		},

		//通过类名获取对象集合 返回arr
		getByClass:function(obj,cname){  
			var aArray=[];   
			var aAll = obj.getElementsByTagName('*');//获取obj对象下面所有的节点 
			for(var i=j=0;i<aAll.length;i++){  
				if(aAll[i].className == cname){
					aAll[i].index=j++;//添加index索引  
					aArray.push(aAll[i]); 
				}  
			}  
			return aArray; 
		},
		//通过标签对象集合 返回arr 对象包含index
		getByTag:function(o,tag){
			var aArray = [];
			var aAll = o.getElementsByTagName(tag);
			for(var i=0;i<aAll.length;i++){  
				aAll[i].index=i;//添加index索引 
				aArray.push(aAll[i]); 
			} 
			//this.foreach(aArray);return; 
			return aArray; 
		},

		//first last next previous 4个参数
		//分别获取第一个子节点 最后一个 下一个兄弟 上一个兄弟
		getNode:function(obj,opt){
			var o = null;
			if(opt=='first'){
				return obj.firstElementChild||obj.firstChild;
			}

			if(opt=='last'){
				return obj.lastElementChild||obj.lastChild;
			}	

			if(opt=='next'){
				o = obj.nextElementSibling||obj.nextSibling;
				if(o){
					while( o.nodeType !=1){
						o = o.nextElementSibling||o.nextSibling;
						if(o==null)return;
					}					
				}
				return o;				
			}			

			if(opt=='previous'){
				o = obj.previousElementSibling||obj.previousSibling;
				if(o){
					while(o.nodeType!=1){
						o=o.previousElementSibling||o.previousSibling;
						if(o==null)return;
					}					
				}

				return o;				
			}
		},
		//获取滚动条高度
		getScrollTop:function(){
		    var scrollTop=0;
		    if(document.documentElement&&document.documentElement.scrollTop){
		        scrollTop=document.documentElement.scrollTop;
		    }
		    else if(document.body){
		        scrollTop=document.body.scrollTop;
		    }
		    return scrollTop;
		},
		//一个opacity 提示框
		//(在哪个obj对象位置中间,显示的str)
		opacityMsg:function(obj,str){
			if(!str)return;//str必须存在
			//为一个节点添加新对象并返回该新对象
			var oDiv=document.createElement('div');//创建对象	
			oDiv.innerHTML=str;
			var x= document.documentElement.clientWidth/2-200;//左右居中
			//var y= document.documentElement.clientHeight/4 + document.body.scrollTop;//获取的是html的高度+滚掉的top 垂直居中 
			$('container').appendChild(oDiv);
			oDiv.setAttribute('style','z-index:9999;opacity:1.0;text-align:center;'+
				'font-size:14px;width:400px;height:80px;line-height:80px;color:green;'+
				'left:'+x+'px;top:350px;position:absolute;'+
				'background:#333;border-radius:8px;border:1px solid green;float:left;');
			//document.body.insertBefore(oDiv,y[3]);
		
			setTimeout(function(){
				var t=setInterval(function(){
					oDiv.style['opacity'] =oDiv.style['opacity']*1-0.05;
					if(oDiv.style['opacity']=='0'){
						clearInterval(t);
						//oDiv.parentNode.removeChild(oDiv);
					}						
				},100);
			},2000);//延时				
		},
			
		/*
		//args: 参数主要为选项卡条
		//(选项卡对象obj,选项卡总width,选项卡总height,默认色,高亮色,默认选中)
		*/
		selCard1:function(obj,W,H,defColor,higColor,defSel){//横向
			obj.parentNode.style['width']=W+'px';
			var sels = obj.getElementsByTagName('li');//获取每一个选项卡
			var cards = semi.getNode(obj,'next').getElementsByTagName('li');//每个内容
			var len=sels.length;//个数

			for (var i=0;i<len;i++) {
				//初始内容样式//当前内容样式
				cards[i].setAttribute('style','width:'+W+'px;display:none;float:left;');
				cards[defSel].style['display']='block';				
				//指定每一个选项卡的初始样式//初始选项卡样式
				sels[i].setAttribute('style','width:'+W/len+'px;height:'+H+'px;line-height:'+H+'px;float:left;text-align:center;cursor:default;background:'+defColor);
				sels[defSel].style['background']=higColor;

				//cards[0].style['background']='lightblue';//可注释
				sels[i].index = i;//当前
				semi.addEvent(sels[sels[i].index],'click',function(){
					for (var j=0;j<len;j++) {//移入(所有初始化)			
						cards[j].style['display']='none';
						sels[j].style['background']=defColor;
					}
					sels[this.index].style['background']=higColor;			
					cards[this.index].style['display']='block';
				});
			}
		},

		selCard2:function(obj,W,H,defColor,higColor,defSel){//纵向
			obj.style['float']='left';
			var sels = semi.filterEle(obj);//获取每一个选项卡
			var cards = semi.filterEle(obj.nextElementSibling);//每个内容
			var len=sels.length;//个数

			for (var i=0;i<len;i++) {
				//指定每一个选项卡的初始样式//初始选项卡样式
				sels[i].setAttribute('style','width:'+W+'px;height:'+H/len+'px;line-height:'+H/len+'px;text-align:center;cursor:default;background:'+defColor);
				sels[defSel].style['background']=higColor;

				//初始内容样式//当前内容样式
				cards[i].setAttribute('style','width:auto;display:none;float:left;');
				cards[defSel].style['display']='block';
				//cards[0].style['background']='lightblue';//可注释
				sels[i].index = i;//当前
				sels[sels[i].index].onclick=function(){
					for (var j=0;j<len;j++) {//移入(所有初始化)			
						cards[j].style['display']='none';
						sels[j].style['background']=defColor;
					}
					sels[this.index].style['background']=higColor;			
					cards[this.index].style['display']='block';
				};	
			}
		},

		//**方便调试的功能 
		//body体加载完成后
		debug:function(str){
			var debugH = document.createElement('textarea');
			//debugH.setAttribute('id','debug');
			debugH.setAttribute('style','width:800px;height:auto;background:lightblue;font-size:18px;'+
			'position:fixed;top:0;padding:10px;z-index:9999;border-radius:8px;border:8px solid #f00;');
			var inner = '<pre>'+str+'</pre>';
			debugH.innerHTML += str;
			document.body.appendChild(debugH);
		},


		//** 遍历一个 对象/数组 便于查看 (集合不能看)
		foreach:function(obj,prop){//第二个参数指定查看属性属性
			str = '';
			if(arguments.length==1){
				for( x in obj ){str +=x+' => '+obj[x]+'\n';}				
			}
			if(arguments.length==2){
				for( x in obj ){str +=x+' => '+obj[x][prop]+'\n';}				
			}
			return str;
		},
		
		//** 替换一个str中包含的[mh]等特殊含义
		//obj = {'mh':':','xg':'\\'}
		s_replace:function(str,obj){//要替换的str 替换的键值对象obj
			// x为替换前  obj[x]为替换后
			// 定义的规则是 [mh]  ==> :  类似的格式
			for(x in obj){
				var pattern = new RegExp('\\['+x+'\\]','g');
				str = str.replace(pattern,obj[x]);
			}
			return str;
		},
		//创建html5标签 用于兼容ie8以下版本
		creHtml5:function(){
			var ele = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(',');
			var i= ele.length;
			while (i--){
				document.createElement(ele[i])
			}			
		}
	};//semi对象 end
	window.semi = semi;
	window.$ = function (id){return document.getElementById(id);};
	//初始化运行 包括ie判断和创建html5标签
	if(semi.getIeVer()<9){
		semi.creHtml5();
	}
	//引入public.js
	semi.DOMLoaded(function(){
		var script = document.createElement('script');
		script.setAttribute('src','/public/js/public.js');
		var head = document.head || document.getElementsByTagName('head')[0];
		head.appendChild(script);	
	});
})();
