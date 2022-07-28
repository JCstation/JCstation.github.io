// Garden Gnome Software - Skin
// Object2VR 3.1.9/10783
// Filename: ??1.ggsk
// Generated 周四 7月 28 09:11:56 2022

function object2vrSkin(player,base) {
	var me=this;
	var flag=false;
	var nodeMarker=new Array();
	var activeNodeMarker=new Array();
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=new Array();
	this.elementMouseOver=new Array();
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	for(i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
			domTransition=prefixes[i] + 'Transition';
			domTransform=prefixes[i] + 'Transform';
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=new Array();
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=new Array();
		var stack=new Array();
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		this._loading=document.createElement('div');
		this._loading.ggId="loading";
		this._loading.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading.ggVisible=true;
		this._loading.className='ggskin ggskin_container';
		this._loading.ggType='container';
		this._loading.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-57 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-30 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -57px;';
		hs+='top:  -30px;';
		hs+='width: 210px;';
		hs+='height: 60px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading.setAttribute('style',hs);
		this._loading.onclick=function () {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this._loadingbg=document.createElement('div');
		this._loadingbg.ggId="loadingbg";
		this._loadingbg.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbg.ggVisible=true;
		this._loadingbg.className='ggskin ggskin_rectangle';
		this._loadingbg.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 210px;';
		hs+='height: 60px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='background: #000000;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._loadingbg.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbg);
		this._loadingbrd=document.createElement('div');
		this._loadingbrd.ggId="loadingbrd";
		this._loadingbrd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbrd.ggVisible=true;
		this._loadingbrd.className='ggskin ggskin_rectangle';
		this._loadingbrd.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 208px;';
		hs+='height: 58px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._loadingbrd.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbrd);
		this._loadingtext=document.createElement('div');
		this._loadingtext__text=document.createElement('div');
		this._loadingtext.className='ggskin ggskin_textdiv';
		this._loadingtext.ggTextDiv=this._loadingtext__text;
		this._loadingtext.ggId="loadingtext";
		this._loadingtext.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingtext.ggVisible=true;
		this._loadingtext.className='ggskin ggskin_text';
		this._loadingtext.ggType='text';
		this._loadingtext.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			this.ggTextDiv.style.left=Math.floor(0 + (176-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		hs ='position:absolute;';
		hs+='left: 16px;';
		hs+='top:  12px;';
		hs+='width: 176px;';
		hs+='height: 23px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loadingtext.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._loadingtext__text.setAttribute('style',hs);
		this._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
			}
		this.ggUpdatePosition();
		}
		this._loadingtext.ggUpdateText();
		this._loadingtext.appendChild(this._loadingtext__text);
		this._loading.appendChild(this._loadingtext);
		this._loadingbar=document.createElement('div');
		this._loadingbar.ggId="loadingbar";
		this._loadingbar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loadingbar.ggVisible=true;
		this._loadingbar.className='ggskin ggskin_rectangle';
		this._loadingbar.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 14px;';
		hs+='top:  35px;';
		hs+='width: 181px;';
		hs+='height: 12px;';
		hs+=cssPrefix + 'transform-origin: 0% 50%;';
		hs+='visibility: inherit;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #808080;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		this._loadingbar.setAttribute('style',hs);
		this._loading.appendChild(this._loadingbar);
		this.divSkin.appendChild(this._loading);
		this._userdata=document.createElement('div');
		this._userdata.ggId="userdata";
		this._userdata.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdata.ggVisible=false;
		this._userdata.className='ggskin ggskin_container';
		this._userdata.ggType='container';
		this._userdata.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-80 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  -80px;';
		hs+='width: 240px;';
		hs+='height: 140px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._userdata.setAttribute('style',hs);
		this._userdata.onclick=function () {
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
		}
		this._userdatabg=document.createElement('div');
		this._userdatabg.ggId="userdatabg";
		this._userdatabg.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdatabg.ggVisible=true;
		this._userdatabg.className='ggskin ggskin_rectangle';
		this._userdatabg.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 240px;';
		hs+='height: 140px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='background: #000000;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._userdatabg.setAttribute('style',hs);
		this._userdata.appendChild(this._userdatabg);
		this._userdatabrd=document.createElement('div');
		this._userdatabrd.ggId="userdatabrd";
		this._userdatabrd.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._userdatabrd.ggVisible=true;
		this._userdatabrd.className='ggskin ggskin_rectangle';
		this._userdatabrd.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 238px;';
		hs+='height: 138px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		this._userdatabrd.setAttribute('style',hs);
		this._userdata.appendChild(this._userdatabrd);
		this._title=document.createElement('div');
		this._title__text=document.createElement('div');
		this._title.className='ggskin ggskin_textdiv';
		this._title.ggTextDiv=this._title__text;
		this._title.ggId="title";
		this._title.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._title.ggVisible=true;
		this._title.className='ggskin ggskin_text';
		this._title.ggType='text';
		hs ='position:absolute;';
		hs+='left: 10px;';
		hs+='top:  10px;';
		hs+='width: 218px;';
		hs+='height: 118px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._title.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 218px;';
		hs+='height: 118px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._title__text.setAttribute('style',hs);
		this._title.ggTextDiv.innerHTML="\u8fd9\u662f\u4e00\u4e2a\u5e7b\u60f3\u7684\u5e03\u6599\u5c55<br\/>\u793a\u903b\u8f91\uff0c\u4e3a\u9762\u6599\u5355\u72ec\u63d0<br\/>\u4f9b\u4ea4\u4e92\u548c\u5c55\u793a\u903b\u8f91\uff0c\u76ee<br\/>\u524d\u6ca1\u6709\u5546\u4e1a\u6210\u529f\u6848\u4f8b\uff0c<br\/>\u53ea\u662f\u4e00\u4e2aDemo\u3002";
		this._title.appendChild(this._title__text);
		this._userdata.appendChild(this._title);
		this.divSkin.appendChild(this._userdata);
		this._container_1=document.createElement('div');
		this._container_1.ggId="Container 1";
		this._container_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._container_1.ggVisible=true;
		this._container_1.className='ggskin ggskin_container';
		this._container_1.ggType='container';
		this._container_1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-190 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-64 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -190px;';
		hs+='top:  -64px;';
		hs+='width: 349px;';
		hs+='height: 33px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._container_1.setAttribute('style',hs);
		this._left=document.createElement('div');
		this._left.ggId="left";
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_svg';
		this._left.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._left.setAttribute('style',hs);
		this._left__img=document.createElement('img');
		this._left__img.className='ggskin ggskin_svg';
		this._left__img.setAttribute('src',basePath + 'images/left.svg');
		this._left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._left__img['ondragstart']=function() { return false; };
		this._left.appendChild(this._left__img);
		this._left.onclick=function () {
			me.player.changePanLog(1,true);
		}
		this._left.onmouseover=function () {
			me._left.style[domTransition]='none';
			me._left.ggParameter.sx=1.2;me._left.ggParameter.sy=1.2;
			me._left.style[domTransform]=parameterToTransform(me._left.ggParameter);
		}
		this._left.onmouseout=function () {
			me._left.style[domTransition]='none';
			me._left.ggParameter.sx=1;me._left.ggParameter.sy=1;
			me._left.style[domTransform]=parameterToTransform(me._left.ggParameter);
		}
		this._container_1.appendChild(this._left);
		this._right=document.createElement('div');
		this._right.ggId="right";
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_svg';
		this._right.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 32px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._right.setAttribute('style',hs);
		this._right__img=document.createElement('img');
		this._right__img.className='ggskin ggskin_svg';
		this._right__img.setAttribute('src',basePath + 'images/right.svg');
		this._right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._right__img['ondragstart']=function() { return false; };
		this._right.appendChild(this._right__img);
		this._right.onclick=function () {
			me.player.changePanLog(-1,true);
		}
		this._right.onmouseover=function () {
			me._right.style[domTransition]='none';
			me._right.ggParameter.sx=1.2;me._right.ggParameter.sy=1.2;
			me._right.style[domTransform]=parameterToTransform(me._right.ggParameter);
		}
		this._right.onmouseout=function () {
			me._right.style[domTransition]='none';
			me._right.ggParameter.sx=1;me._right.ggParameter.sy=1;
			me._right.style[domTransform]=parameterToTransform(me._right.ggParameter);
		}
		this._container_1.appendChild(this._right);
		this._zoomin=document.createElement('div');
		this._zoomin.ggId="zoomin";
		this._zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin.ggVisible=true;
		this._zoomin.className='ggskin ggskin_svg';
		this._zoomin.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 64px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomin.setAttribute('style',hs);
		this._zoomin__img=document.createElement('img');
		this._zoomin__img.className='ggskin ggskin_svg';
		this._zoomin__img.setAttribute('src',basePath + 'images/zoomin.svg');
		this._zoomin__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomin__img['ondragstart']=function() { return false; };
		this._zoomin.appendChild(this._zoomin__img);
		this._zoomin.onmouseover=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='inherit';
			me._tt_zoomin.ggVisible=true;
			me._zoomin.style[domTransition]='none';
			me._zoomin.ggParameter.sx=1.2;me._zoomin.ggParameter.sy=1.2;
			me._zoomin.style[domTransform]=parameterToTransform(me._zoomin.ggParameter);
		}
		this._zoomin.onmouseout=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me._zoomin.style[domTransition]='none';
			me._zoomin.ggParameter.sx=1;me._zoomin.ggParameter.sy=1;
			me._zoomin.style[domTransform]=parameterToTransform(me._zoomin.ggParameter);
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.onmousedown=function () {
			me.elementMouseDown['zoomin']=true;
		}
		this._zoomin.onmouseup=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._zoomin.ontouchend=function () {
			me.elementMouseDown['zoomin']=false;
		}
		this._tt_zoomin=document.createElement('div');
		this._tt_zoomin__text=document.createElement('div');
		this._tt_zoomin.className='ggskin ggskin_textdiv';
		this._tt_zoomin.ggTextDiv=this._tt_zoomin__text;
		this._tt_zoomin.ggId="tt_zoomin";
		this._tt_zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomin.ggVisible=false;
		this._tt_zoomin.className='ggskin ggskin_text';
		this._tt_zoomin.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomin.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomin__text.setAttribute('style',hs);
		this._tt_zoomin.ggTextDiv.innerHTML="\u653e\u5927";
		this._tt_zoomin.appendChild(this._tt_zoomin__text);
		this._tt_zoomins=document.createElement('div');
		this._tt_zoomins__text=document.createElement('div');
		this._tt_zoomins.className='ggskin ggskin_textdiv';
		this._tt_zoomins.ggTextDiv=this._tt_zoomins__text;
		this._tt_zoomins.ggId="tt_zoomins";
		this._tt_zoomins.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomins.ggVisible=true;
		this._tt_zoomins.className='ggskin ggskin_text';
		this._tt_zoomins.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomins.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomins__text.setAttribute('style',hs);
		this._tt_zoomins.ggTextDiv.innerHTML="\u653e\u5927";
		this._tt_zoomins.appendChild(this._tt_zoomins__text);
		this._tt_zoomin.appendChild(this._tt_zoomins);
		this._zoomin.appendChild(this._tt_zoomin);
		this._container_1.appendChild(this._zoomin);
		this._zoomout=document.createElement('div');
		this._zoomout.ggId="zoomout";
		this._zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout.ggVisible=true;
		this._zoomout.className='ggskin ggskin_svg';
		this._zoomout.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 95px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._zoomout.setAttribute('style',hs);
		this._zoomout__img=document.createElement('img');
		this._zoomout__img.className='ggskin ggskin_svg';
		this._zoomout__img.setAttribute('src',basePath + 'images/zoomout.svg');
		this._zoomout__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._zoomout__img['ondragstart']=function() { return false; };
		this._zoomout.appendChild(this._zoomout__img);
		this._zoomout.onmouseover=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='inherit';
			me._tt_zoomout.ggVisible=true;
			me._zoomout.style[domTransition]='none';
			me._zoomout.ggParameter.sx=1.2;me._zoomout.ggParameter.sy=1.2;
			me._zoomout.style[domTransform]=parameterToTransform(me._zoomout.ggParameter);
		}
		this._zoomout.onmouseout=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me._zoomout.style[domTransition]='none';
			me._zoomout.ggParameter.sx=1;me._zoomout.ggParameter.sy=1;
			me._zoomout.style[domTransform]=parameterToTransform(me._zoomout.ggParameter);
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.onmousedown=function () {
			me.elementMouseDown['zoomout']=true;
		}
		this._zoomout.onmouseup=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._zoomout.ontouchend=function () {
			me.elementMouseDown['zoomout']=false;
		}
		this._tt_zoomout=document.createElement('div');
		this._tt_zoomout__text=document.createElement('div');
		this._tt_zoomout.className='ggskin ggskin_textdiv';
		this._tt_zoomout.ggTextDiv=this._tt_zoomout__text;
		this._tt_zoomout.ggId="tt_zoomout";
		this._tt_zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomout.ggVisible=false;
		this._tt_zoomout.className='ggskin ggskin_text';
		this._tt_zoomout.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomout.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomout__text.setAttribute('style',hs);
		this._tt_zoomout.ggTextDiv.innerHTML="\u7f29\u5c0f";
		this._tt_zoomout.appendChild(this._tt_zoomout__text);
		this._tt_zoomouts=document.createElement('div');
		this._tt_zoomouts__text=document.createElement('div');
		this._tt_zoomouts.className='ggskin ggskin_textdiv';
		this._tt_zoomouts.ggTextDiv=this._tt_zoomouts__text;
		this._tt_zoomouts.ggId="tt_zoomouts";
		this._tt_zoomouts.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_zoomouts.ggVisible=true;
		this._tt_zoomouts.className='ggskin ggskin_text';
		this._tt_zoomouts.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_zoomouts.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_zoomouts__text.setAttribute('style',hs);
		this._tt_zoomouts.ggTextDiv.innerHTML="\u7f29\u5c0f";
		this._tt_zoomouts.appendChild(this._tt_zoomouts__text);
		this._tt_zoomout.appendChild(this._tt_zoomouts);
		this._zoomout.appendChild(this._tt_zoomout);
		this._container_1.appendChild(this._zoomout);
		this._autorotate5=document.createElement('div');
		this._autorotate5.ggId="autorotate";
		this._autorotate5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate5.ggVisible=true;
		this._autorotate5.className='ggskin ggskin_svg';
		this._autorotate5.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 127px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate5.setAttribute('style',hs);
		this._autorotate5__img=document.createElement('img');
		this._autorotate5__img.className='ggskin ggskin_svg';
		this._autorotate5__img.setAttribute('src',basePath + 'images/autorotate5.svg');
		this._autorotate5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate5__img['ondragstart']=function() { return false; };
		this._autorotate5.appendChild(this._autorotate5__img);
		this._autorotate5.onclick=function () {
			me.player.startAutorotate("0.05");
		}
		this._autorotate5.ondblclick=function () {
			me.player.stopAutorotate();
		}
		this._autorotate5.onmouseover=function () {
			me._tt_autorotate6.style[domTransition]='none';
			me._tt_autorotate6.style.visibility='inherit';
			me._tt_autorotate6.ggVisible=true;
			me._autorotate5.style[domTransition]='none';
			me._autorotate5.ggParameter.sx=1.2;me._autorotate5.ggParameter.sy=1.2;
			me._autorotate5.style[domTransform]=parameterToTransform(me._autorotate5.ggParameter);
		}
		this._autorotate5.onmouseout=function () {
			me._tt_autorotate6.style[domTransition]='none';
			me._tt_autorotate6.style.visibility='hidden';
			me._tt_autorotate6.ggVisible=false;
			me._autorotate5.style[domTransition]='none';
			me._autorotate5.ggParameter.sx=1;me._autorotate5.ggParameter.sy=1;
			me._autorotate5.style[domTransform]=parameterToTransform(me._autorotate5.ggParameter);
		}
		this._tt_autorotate6=document.createElement('div');
		this._tt_autorotate6__text=document.createElement('div');
		this._tt_autorotate6.className='ggskin ggskin_textdiv';
		this._tt_autorotate6.ggTextDiv=this._tt_autorotate6__text;
		this._tt_autorotate6.ggId="tt_autorotate";
		this._tt_autorotate6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate6.ggVisible=false;
		this._tt_autorotate6.className='ggskin ggskin_text';
		this._tt_autorotate6.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  35px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate6.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate6__text.setAttribute('style',hs);
		this._tt_autorotate6.ggTextDiv.innerHTML="\u5f00\u59cb\/\u505c\u6b62 \u65cb\u8f6c";
		this._tt_autorotate6.appendChild(this._tt_autorotate6__text);
		this._tt_autorotates6=document.createElement('div');
		this._tt_autorotates6__text=document.createElement('div');
		this._tt_autorotates6.className='ggskin ggskin_textdiv';
		this._tt_autorotates6.ggTextDiv=this._tt_autorotates6__text;
		this._tt_autorotates6.ggId="tt_autorotates";
		this._tt_autorotates6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates6.ggVisible=true;
		this._tt_autorotates6.className='ggskin ggskin_text';
		this._tt_autorotates6.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates6.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates6__text.setAttribute('style',hs);
		this._tt_autorotates6.ggTextDiv.innerHTML="\u5f00\u59cb\/\u505c\u6b62 \u65cb\u8f6c";
		this._tt_autorotates6.appendChild(this._tt_autorotates6__text);
		this._tt_autorotate6.appendChild(this._tt_autorotates6);
		this._autorotate5.appendChild(this._tt_autorotate6);
		this._container_1.appendChild(this._autorotate5);
		this._info1=document.createElement('div');
		this._info1.ggId="info";
		this._info1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._info1.ggVisible=true;
		this._info1.className='ggskin ggskin_svg';
		this._info1.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 159px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._info1.setAttribute('style',hs);
		this._info1__img=document.createElement('img');
		this._info1__img.className='ggskin ggskin_svg';
		this._info1__img.setAttribute('src',basePath + 'images/info1.svg');
		this._info1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._info1__img['ondragstart']=function() { return false; };
		this._info1.appendChild(this._info1__img);
		this._info1.onclick=function () {
			flag=(me._userdata.style.visibility=='hidden');
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility=flag?'inherit':'hidden';
			me._userdata.ggVisible=flag;
		}
		this._info1.onmouseover=function () {
			me._tt_info1.style[domTransition]='none';
			me._tt_info1.style.visibility='inherit';
			me._tt_info1.ggVisible=true;
			me._info1.style[domTransition]='none';
			me._info1.ggParameter.sx=1.2;me._info1.ggParameter.sy=1.2;
			me._info1.style[domTransform]=parameterToTransform(me._info1.ggParameter);
		}
		this._info1.onmouseout=function () {
			me._tt_info1.style[domTransition]='none';
			me._tt_info1.style.visibility='hidden';
			me._tt_info1.ggVisible=false;
			me._info1.style[domTransition]='none';
			me._info1.ggParameter.sx=1;me._info1.ggParameter.sy=1;
			me._info1.style[domTransform]=parameterToTransform(me._info1.ggParameter);
		}
		this._tt_info1=document.createElement('div');
		this._tt_info1__text=document.createElement('div');
		this._tt_info1.className='ggskin ggskin_textdiv';
		this._tt_info1.ggTextDiv=this._tt_info1__text;
		this._tt_info1.ggId="tt_info";
		this._tt_info1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info1.ggVisible=false;
		this._tt_info1.className='ggskin ggskin_text';
		this._tt_info1.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_info1__text.setAttribute('style',hs);
		this._tt_info1.ggTextDiv.innerHTML="\u8bf4\u660e";
		this._tt_info1.appendChild(this._tt_info1__text);
		this._tt_infos1=document.createElement('div');
		this._tt_infos1__text=document.createElement('div');
		this._tt_infos1.className='ggskin ggskin_textdiv';
		this._tt_infos1.ggTextDiv=this._tt_infos1__text;
		this._tt_infos1.ggId="tt_infos";
		this._tt_infos1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_infos1.ggVisible=true;
		this._tt_infos1.className='ggskin ggskin_text';
		this._tt_infos1.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_infos1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_infos1__text.setAttribute('style',hs);
		this._tt_infos1.ggTextDiv.innerHTML="\u8bf4\u660e";
		this._tt_infos1.appendChild(this._tt_infos1__text);
		this._tt_info1.appendChild(this._tt_infos1);
		this._info1.appendChild(this._tt_info1);
		this._container_1.appendChild(this._info1);
		this._fullscreen0=document.createElement('div');
		this._fullscreen0.ggId="fullscreen";
		this._fullscreen0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen0.ggVisible=true;
		this._fullscreen0.className='ggskin ggskin_svg';
		this._fullscreen0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 317px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._fullscreen0.setAttribute('style',hs);
		this._fullscreen0__img=document.createElement('img');
		this._fullscreen0__img.className='ggskin ggskin_svg';
		this._fullscreen0__img.setAttribute('src',basePath + 'images/fullscreen0.svg');
		this._fullscreen0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._fullscreen0__img['ondragstart']=function() { return false; };
		this._fullscreen0.appendChild(this._fullscreen0__img);
		this._fullscreen0.onclick=function () {
			me.player.toggleFullscreen();
		}
		this._fullscreen0.onmouseover=function () {
			me._tt_fullscreen0.style[domTransition]='none';
			me._tt_fullscreen0.style.visibility='inherit';
			me._tt_fullscreen0.ggVisible=true;
			me._fullscreen0.style[domTransition]='none';
			me._fullscreen0.ggParameter.sx=1.2;me._fullscreen0.ggParameter.sy=1.2;
			me._fullscreen0.style[domTransform]=parameterToTransform(me._fullscreen0.ggParameter);
		}
		this._fullscreen0.onmouseout=function () {
			me._tt_fullscreen0.style[domTransition]='none';
			me._tt_fullscreen0.style.visibility='hidden';
			me._tt_fullscreen0.ggVisible=false;
			me._fullscreen0.style[domTransition]='none';
			me._fullscreen0.ggParameter.sx=1;me._fullscreen0.ggParameter.sy=1;
			me._fullscreen0.style[domTransform]=parameterToTransform(me._fullscreen0.ggParameter);
		}
		this._tt_fullscreen0=document.createElement('div');
		this._tt_fullscreen0__text=document.createElement('div');
		this._tt_fullscreen0.className='ggskin ggskin_textdiv';
		this._tt_fullscreen0.ggTextDiv=this._tt_fullscreen0__text;
		this._tt_fullscreen0.ggId="tt_fullscreen";
		this._tt_fullscreen0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreen0.ggVisible=false;
		this._tt_fullscreen0.className='ggskin ggskin_text';
		this._tt_fullscreen0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_fullscreen0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreen0__text.setAttribute('style',hs);
		this._tt_fullscreen0.ggTextDiv.innerHTML="\u5168\u5c4f";
		this._tt_fullscreen0.appendChild(this._tt_fullscreen0__text);
		this._tt_fullscreens0=document.createElement('div');
		this._tt_fullscreens0__text=document.createElement('div');
		this._tt_fullscreens0.className='ggskin ggskin_textdiv';
		this._tt_fullscreens0.ggTextDiv=this._tt_fullscreens0__text;
		this._tt_fullscreens0.ggId="tt_fullscreens";
		this._tt_fullscreens0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreens0.ggVisible=true;
		this._tt_fullscreens0.className='ggskin ggskin_text';
		this._tt_fullscreens0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_fullscreens0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreens0__text.setAttribute('style',hs);
		this._tt_fullscreens0.ggTextDiv.innerHTML="\u5168\u5c4f";
		this._tt_fullscreens0.appendChild(this._tt_fullscreens0__text);
		this._tt_fullscreen0.appendChild(this._tt_fullscreens0);
		this._fullscreen0.appendChild(this._tt_fullscreen0);
		this._container_1.appendChild(this._fullscreen0);
		this._info0=document.createElement('div');
		this._info0.ggId="info";
		this._info0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._info0.ggVisible=true;
		this._info0.className='ggskin ggskin_svg';
		this._info0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 221px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._info0.setAttribute('style',hs);
		this._info0__img=document.createElement('img');
		this._info0__img.className='ggskin ggskin_svg';
		this._info0__img.setAttribute('src',basePath + 'images/info0.svg');
		this._info0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._info0__img['ondragstart']=function() { return false; };
		this._info0.appendChild(this._info0__img);
		this._info0.onclick=function () {
			me.player.changeViewState("1",1);
		}
		this._info0.ondblclick=function () {
			me.player.changeViewState("0",1);
		}
		this._info0.onmouseover=function () {
			me._tt_info0.style[domTransition]='none';
			me._tt_info0.style.visibility='inherit';
			me._tt_info0.ggVisible=true;
			me._info0.style[domTransition]='none';
			me._info0.ggParameter.sx=1.2;me._info0.ggParameter.sy=1.2;
			me._info0.style[domTransform]=parameterToTransform(me._info0.ggParameter);
		}
		this._info0.onmouseout=function () {
			me._tt_info0.style[domTransition]='none';
			me._tt_info0.style.visibility='hidden';
			me._tt_info0.ggVisible=false;
			me._info0.style[domTransition]='none';
			me._info0.ggParameter.sx=1;me._info0.ggParameter.sy=1;
			me._info0.style[domTransform]=parameterToTransform(me._info0.ggParameter);
		}
		this._tt_info0=document.createElement('div');
		this._tt_info0__text=document.createElement('div');
		this._tt_info0.className='ggskin ggskin_textdiv';
		this._tt_info0.ggTextDiv=this._tt_info0__text;
		this._tt_info0.ggId="tt_info";
		this._tt_info0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info0.ggVisible=false;
		this._tt_info0.className='ggskin ggskin_text';
		this._tt_info0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_info0__text.setAttribute('style',hs);
		this._tt_info0.ggTextDiv.innerHTML="\u5207\u6362\u6750\u8d28 \u53cc\u51fb\u590d\u539f";
		this._tt_info0.appendChild(this._tt_info0__text);
		this._tt_infos0=document.createElement('div');
		this._tt_infos0__text=document.createElement('div');
		this._tt_infos0.className='ggskin ggskin_textdiv';
		this._tt_infos0.ggTextDiv=this._tt_infos0__text;
		this._tt_infos0.ggId="tt_infos";
		this._tt_infos0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_infos0.ggVisible=true;
		this._tt_infos0.className='ggskin ggskin_text';
		this._tt_infos0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_infos0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_infos0__text.setAttribute('style',hs);
		this._tt_infos0.ggTextDiv.innerHTML="\u5207\u6362\u6750\u8d28 \u53cc\u51fb\u590d\u539f";
		this._tt_infos0.appendChild(this._tt_infos0__text);
		this._tt_info0.appendChild(this._tt_infos0);
		this._info0.appendChild(this._tt_info0);
		this._container_1.appendChild(this._info0);
		this._autorotate10=document.createElement('div');
		this._autorotate10.ggId="autorotate1";
		this._autorotate10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate10.ggVisible=true;
		this._autorotate10.className='ggskin ggskin_svg';
		this._autorotate10.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 190px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate10.setAttribute('style',hs);
		this._autorotate10__img=document.createElement('img');
		this._autorotate10__img.className='ggskin ggskin_svg';
		this._autorotate10__img.setAttribute('src',basePath + 'images/autorotate10.svg');
		this._autorotate10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate10__img['ondragstart']=function() { return false; };
		this._autorotate10.appendChild(this._autorotate10__img);
		this._autorotate10.onclick=function () {
			me.player.changeTiltLog(1,true);
			me.player.startAutorotate("0.03");
		}
		this._autorotate10.ondblclick=function () {
			me.player.stopAutorotate();
		}
		this._autorotate10.onmouseover=function () {
			me._tt_autorotate5.style[domTransition]='none';
			me._tt_autorotate5.style.visibility='inherit';
			me._tt_autorotate5.ggVisible=true;
			me._autorotate10.style[domTransition]='none';
			me._autorotate10.ggParameter.sx=1.2;me._autorotate10.ggParameter.sy=1.2;
			me._autorotate10.style[domTransform]=parameterToTransform(me._autorotate10.ggParameter);
		}
		this._autorotate10.onmouseout=function () {
			me._tt_autorotate5.style[domTransition]='none';
			me._tt_autorotate5.style.visibility='hidden';
			me._tt_autorotate5.ggVisible=false;
			me._autorotate10.style[domTransition]='none';
			me._autorotate10.ggParameter.sx=1;me._autorotate10.ggParameter.sy=1;
			me._autorotate10.style[domTransform]=parameterToTransform(me._autorotate10.ggParameter);
		}
		this._tt_autorotate5=document.createElement('div');
		this._tt_autorotate5__text=document.createElement('div');
		this._tt_autorotate5.className='ggskin ggskin_textdiv';
		this._tt_autorotate5.ggTextDiv=this._tt_autorotate5__text;
		this._tt_autorotate5.ggId="tt_autorotate";
		this._tt_autorotate5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate5.ggVisible=false;
		this._tt_autorotate5.className='ggskin ggskin_text';
		this._tt_autorotate5.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  35px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate5.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate5__text.setAttribute('style',hs);
		this._tt_autorotate5.ggTextDiv.innerHTML="\u52a8\u6001\u5c55\u793a";
		this._tt_autorotate5.appendChild(this._tt_autorotate5__text);
		this._tt_autorotates5=document.createElement('div');
		this._tt_autorotates5__text=document.createElement('div');
		this._tt_autorotates5.className='ggskin ggskin_textdiv';
		this._tt_autorotates5.ggTextDiv=this._tt_autorotates5__text;
		this._tt_autorotates5.ggId="tt_autorotates";
		this._tt_autorotates5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates5.ggVisible=true;
		this._tt_autorotates5.className='ggskin ggskin_text';
		this._tt_autorotates5.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates5.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates5__text.setAttribute('style',hs);
		this._tt_autorotates5.ggTextDiv.innerHTML="\u52a8\u6001\u5c55\u793a";
		this._tt_autorotates5.appendChild(this._tt_autorotates5__text);
		this._tt_autorotate5.appendChild(this._tt_autorotates5);
		this._autorotate10.appendChild(this._tt_autorotate5);
		this._container_1.appendChild(this._autorotate10);
		this._autorotate4=document.createElement('div');
		this._autorotate4.ggId="autorotate";
		this._autorotate4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate4.ggVisible=true;
		this._autorotate4.className='ggskin ggskin_svg';
		this._autorotate4.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 253px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate4.setAttribute('style',hs);
		this._autorotate4__img=document.createElement('img');
		this._autorotate4__img.className='ggskin ggskin_svg';
		this._autorotate4__img.setAttribute('src',basePath + 'images/autorotate4.svg');
		this._autorotate4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate4__img['ondragstart']=function() { return false; };
		this._autorotate4.appendChild(this._autorotate4__img);
		this._autorotate4.onclick=function () {
			flag=(me._container_2.style.visibility=='hidden');
			me._container_2.style[domTransition]='none';
			me._container_2.style.visibility=flag?'inherit':'hidden';
			me._container_2.ggVisible=flag;
		}
		this._autorotate4.onmouseover=function () {
			me._tt_autorotate4.style[domTransition]='none';
			me._tt_autorotate4.style.visibility='inherit';
			me._tt_autorotate4.ggVisible=true;
			me._autorotate4.style[domTransition]='none';
			me._autorotate4.ggParameter.sx=1.2;me._autorotate4.ggParameter.sy=1.2;
			me._autorotate4.style[domTransform]=parameterToTransform(me._autorotate4.ggParameter);
		}
		this._autorotate4.onmouseout=function () {
			me._tt_autorotate4.style[domTransition]='none';
			me._tt_autorotate4.style.visibility='hidden';
			me._tt_autorotate4.ggVisible=false;
			me._autorotate4.style[domTransition]='none';
			me._autorotate4.ggParameter.sx=1;me._autorotate4.ggParameter.sy=1;
			me._autorotate4.style[domTransform]=parameterToTransform(me._autorotate4.ggParameter);
		}
		this._tt_autorotate4=document.createElement('div');
		this._tt_autorotate4__text=document.createElement('div');
		this._tt_autorotate4.className='ggskin ggskin_textdiv';
		this._tt_autorotate4.ggTextDiv=this._tt_autorotate4__text;
		this._tt_autorotate4.ggId="tt_autorotate";
		this._tt_autorotate4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate4.ggVisible=false;
		this._tt_autorotate4.className='ggskin ggskin_text';
		this._tt_autorotate4.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  35px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate4.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate4__text.setAttribute('style',hs);
		this._tt_autorotate4.ggTextDiv.innerHTML="\u5d4c\u5165\u4fe1\u606f\uff08\u4ec5\u652f\u6301\u7f51\u9875\u64ad\u653e\uff09";
		this._tt_autorotate4.appendChild(this._tt_autorotate4__text);
		this._tt_autorotates4=document.createElement('div');
		this._tt_autorotates4__text=document.createElement('div');
		this._tt_autorotates4.className='ggskin ggskin_textdiv';
		this._tt_autorotates4.ggTextDiv=this._tt_autorotates4__text;
		this._tt_autorotates4.ggId="tt_autorotates";
		this._tt_autorotates4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates4.ggVisible=true;
		this._tt_autorotates4.className='ggskin ggskin_text';
		this._tt_autorotates4.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates4.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates4__text.setAttribute('style',hs);
		this._tt_autorotates4.ggTextDiv.innerHTML="\u5d4c\u5165\u4fe1\u606f\uff08\u4ec5\u652f\u6301\u7f51\u9875\u64ad\u653e\uff09";
		this._tt_autorotates4.appendChild(this._tt_autorotates4__text);
		this._tt_autorotate4.appendChild(this._tt_autorotates4);
		this._autorotate4.appendChild(this._tt_autorotate4);
		this._container_1.appendChild(this._autorotate4);
		this._info=document.createElement('div');
		this._info.ggId="info";
		this._info.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._info.ggVisible=true;
		this._info.className='ggskin ggskin_svg';
		this._info.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 285px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._info.setAttribute('style',hs);
		this._info__img=document.createElement('img');
		this._info__img.className='ggskin ggskin_svg';
		this._info__img.setAttribute('src',basePath + 'images/info.svg');
		this._info__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._info__img['ondragstart']=function() { return false; };
		this._info.appendChild(this._info__img);
		this._info.onclick=function () {
			me.player.changeViewState("2",1);
		}
		this._info.ondblclick=function () {
			me.player.changeViewState("0",1);
		}
		this._info.onmouseover=function () {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility='inherit';
			me._tt_info.ggVisible=true;
			me._info.style[domTransition]='none';
			me._info.ggParameter.sx=1.2;me._info.ggParameter.sy=1.2;
			me._info.style[domTransform]=parameterToTransform(me._info.ggParameter);
		}
		this._info.onmouseout=function () {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility='hidden';
			me._tt_info.ggVisible=false;
			me._info.style[domTransition]='none';
			me._info.ggParameter.sx=1;me._info.ggParameter.sy=1;
			me._info.style[domTransform]=parameterToTransform(me._info.ggParameter);
		}
		this._tt_info=document.createElement('div');
		this._tt_info__text=document.createElement('div');
		this._tt_info.className='ggskin ggskin_textdiv';
		this._tt_info.ggTextDiv=this._tt_info__text;
		this._tt_info.ggId="tt_info";
		this._tt_info.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info.ggVisible=false;
		this._tt_info.className='ggskin ggskin_text';
		this._tt_info.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_info__text.setAttribute('style',hs);
		this._tt_info.ggTextDiv.innerHTML="\u5207\u6362\u6a21\u578b \u53cc\u51fb\u590d\u539f";
		this._tt_info.appendChild(this._tt_info__text);
		this._tt_infos=document.createElement('div');
		this._tt_infos__text=document.createElement('div');
		this._tt_infos.className='ggskin ggskin_textdiv';
		this._tt_infos.ggTextDiv=this._tt_infos__text;
		this._tt_infos.ggId="tt_infos";
		this._tt_infos.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_infos.ggVisible=true;
		this._tt_infos.className='ggskin ggskin_text';
		this._tt_infos.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_infos.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_infos__text.setAttribute('style',hs);
		this._tt_infos.ggTextDiv.innerHTML="\u5207\u6362\u6a21\u578b \u53cc\u51fb\u590d\u539f";
		this._tt_infos.appendChild(this._tt_infos__text);
		this._tt_info.appendChild(this._tt_infos);
		this._info.appendChild(this._tt_info);
		this._container_1.appendChild(this._info);
		this._fullscreen=document.createElement('div');
		this._fullscreen.ggId="fullscreen";
		this._fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen.ggVisible=true;
		this._fullscreen.className='ggskin ggskin_svg';
		this._fullscreen.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 348px;';
		hs+='top:  1px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._fullscreen.setAttribute('style',hs);
		this._fullscreen__img=document.createElement('img');
		this._fullscreen__img.className='ggskin ggskin_svg';
		this._fullscreen__img.setAttribute('src',basePath + 'images/fullscreen.svg');
		this._fullscreen__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._fullscreen__img['ondragstart']=function() { return false; };
		this._fullscreen.appendChild(this._fullscreen__img);
		this._fullscreen.onclick=function () {
			me.player.moveToDefaultView(1);
		}
		this._fullscreen.onmouseover=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='inherit';
			me._tt_fullscreen.ggVisible=true;
			me._fullscreen.style[domTransition]='none';
			me._fullscreen.ggParameter.sx=1.2;me._fullscreen.ggParameter.sy=1.2;
			me._fullscreen.style[domTransform]=parameterToTransform(me._fullscreen.ggParameter);
		}
		this._fullscreen.onmouseout=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='hidden';
			me._tt_fullscreen.ggVisible=false;
			me._fullscreen.style[domTransition]='none';
			me._fullscreen.ggParameter.sx=1;me._fullscreen.ggParameter.sy=1;
			me._fullscreen.style[domTransform]=parameterToTransform(me._fullscreen.ggParameter);
		}
		this._tt_fullscreen=document.createElement('div');
		this._tt_fullscreen__text=document.createElement('div');
		this._tt_fullscreen.className='ggskin ggskin_textdiv';
		this._tt_fullscreen.ggTextDiv=this._tt_fullscreen__text;
		this._tt_fullscreen.ggId="tt_fullscreen";
		this._tt_fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreen.ggVisible=false;
		this._tt_fullscreen.className='ggskin ggskin_text';
		this._tt_fullscreen.ggType='text';
		hs ='position:absolute;';
		hs+='left: -56px;';
		hs+='top:  35px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_fullscreen.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreen__text.setAttribute('style',hs);
		this._tt_fullscreen.ggTextDiv.innerHTML="\u9ed8\u8ba4\u89c6\u56fe";
		this._tt_fullscreen.appendChild(this._tt_fullscreen__text);
		this._tt_fullscreens=document.createElement('div');
		this._tt_fullscreens__text=document.createElement('div');
		this._tt_fullscreens.className='ggskin ggskin_textdiv';
		this._tt_fullscreens.ggTextDiv=this._tt_fullscreens__text;
		this._tt_fullscreens.ggId="tt_fullscreens";
		this._tt_fullscreens.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreens.ggVisible=true;
		this._tt_fullscreens.className='ggskin ggskin_text';
		this._tt_fullscreens.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_fullscreens.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_fullscreens__text.setAttribute('style',hs);
		this._tt_fullscreens.ggTextDiv.innerHTML="\u9ed8\u8ba4\u89c6\u56fe";
		this._tt_fullscreens.appendChild(this._tt_fullscreens__text);
		this._tt_fullscreen.appendChild(this._tt_fullscreens);
		this._fullscreen.appendChild(this._tt_fullscreen);
		this._container_1.appendChild(this._fullscreen);
		this.divSkin.appendChild(this._container_1);
		this._container_2=document.createElement('div');
		this._container_2.ggId="Container 2";
		this._container_2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._container_2.ggVisible=false;
		this._container_2.className='ggskin ggskin_container';
		this._container_2.ggType='container';
		this._container_2.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-5 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-117 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -5px;';
		hs+='top:  -117px;';
		hs+='width: 171px;';
		hs+='height: 53px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._container_2.setAttribute('style',hs);
		this._autorotate3=document.createElement('div');
		this._autorotate3.ggId="autorotate";
		this._autorotate3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate3.ggVisible=true;
		this._autorotate3.className='ggskin ggskin_svg';
		this._autorotate3.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 67px;';
		hs+='top:  21px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate3.setAttribute('style',hs);
		this._autorotate3__img=document.createElement('img');
		this._autorotate3__img.className='ggskin ggskin_svg';
		this._autorotate3__img.setAttribute('src',basePath + 'images/autorotate3.svg');
		this._autorotate3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate3__img['ondragstart']=function() { return false; };
		this._autorotate3.appendChild(this._autorotate3__img);
		this._autorotate3.onclick=function () {
			flag=(me.__.style.visibility=='hidden');
			me.__.style[domTransition]='none';
			me.__.style.visibility=flag?'inherit':'hidden';
			me.__.ggVisible=flag;
		}
		this._autorotate3.onmouseover=function () {
			me._tt_autorotate3.style[domTransition]='none';
			me._tt_autorotate3.style.visibility='inherit';
			me._tt_autorotate3.ggVisible=true;
			me._autorotate3.style[domTransition]='none';
			me._autorotate3.ggParameter.sx=1.2;me._autorotate3.ggParameter.sy=1.2;
			me._autorotate3.style[domTransform]=parameterToTransform(me._autorotate3.ggParameter);
		}
		this._autorotate3.onmouseout=function () {
			me._tt_autorotate3.style[domTransition]='none';
			me._tt_autorotate3.style.visibility='hidden';
			me._tt_autorotate3.ggVisible=false;
			me._autorotate3.style[domTransition]='none';
			me._autorotate3.ggParameter.sx=1;me._autorotate3.ggParameter.sy=1;
			me._autorotate3.style[domTransform]=parameterToTransform(me._autorotate3.ggParameter);
		}
		this._tt_autorotate3=document.createElement('div');
		this._tt_autorotate3__text=document.createElement('div');
		this._tt_autorotate3.className='ggskin ggskin_textdiv';
		this._tt_autorotate3.ggTextDiv=this._tt_autorotate3__text;
		this._tt_autorotate3.ggId="tt_autorotate";
		this._tt_autorotate3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate3.ggVisible=false;
		this._tt_autorotate3.className='ggskin ggskin_text';
		this._tt_autorotate3.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  -21px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate3.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate3__text.setAttribute('style',hs);
		this._tt_autorotate3.ggTextDiv.innerHTML="\u7f51\u5740";
		this._tt_autorotate3.appendChild(this._tt_autorotate3__text);
		this._tt_autorotates3=document.createElement('div');
		this._tt_autorotates3__text=document.createElement('div');
		this._tt_autorotates3.className='ggskin ggskin_textdiv';
		this._tt_autorotates3.ggTextDiv=this._tt_autorotates3__text;
		this._tt_autorotates3.ggId="tt_autorotates";
		this._tt_autorotates3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates3.ggVisible=true;
		this._tt_autorotates3.className='ggskin ggskin_text';
		this._tt_autorotates3.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates3.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates3__text.setAttribute('style',hs);
		this._tt_autorotates3.ggTextDiv.innerHTML="\u7f51\u5740";
		this._tt_autorotates3.appendChild(this._tt_autorotates3__text);
		this._tt_autorotate3.appendChild(this._tt_autorotates3);
		this._autorotate3.appendChild(this._tt_autorotate3);
		this._container_2.appendChild(this._autorotate3);
		this._autorotate2=document.createElement('div');
		this._autorotate2.ggId="autorotate";
		this._autorotate2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate2.ggVisible=true;
		this._autorotate2.className='ggskin ggskin_svg';
		this._autorotate2.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 36px;';
		hs+='top:  21px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate2.setAttribute('style',hs);
		this._autorotate2__img=document.createElement('img');
		this._autorotate2__img.className='ggskin ggskin_svg';
		this._autorotate2__img.setAttribute('src',basePath + 'images/autorotate2.svg');
		this._autorotate2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate2__img['ondragstart']=function() { return false; };
		this._autorotate2.appendChild(this._autorotate2__img);
		this._autorotate2.onclick=function () {
			flag=(me._text_1.style.visibility=='hidden');
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility=flag?'inherit':'hidden';
			me._text_1.ggVisible=flag;
		}
		this._autorotate2.onmouseover=function () {
			me._tt_autorotate2.style[domTransition]='none';
			me._tt_autorotate2.style.visibility='inherit';
			me._tt_autorotate2.ggVisible=true;
			me._autorotate2.style[domTransition]='none';
			me._autorotate2.ggParameter.sx=1.2;me._autorotate2.ggParameter.sy=1.2;
			me._autorotate2.style[domTransform]=parameterToTransform(me._autorotate2.ggParameter);
		}
		this._autorotate2.onmouseout=function () {
			me._tt_autorotate2.style[domTransition]='none';
			me._tt_autorotate2.style.visibility='hidden';
			me._tt_autorotate2.ggVisible=false;
			me._autorotate2.style[domTransition]='none';
			me._autorotate2.ggParameter.sx=1;me._autorotate2.ggParameter.sy=1;
			me._autorotate2.style[domTransform]=parameterToTransform(me._autorotate2.ggParameter);
		}
		this._tt_autorotate2=document.createElement('div');
		this._tt_autorotate2__text=document.createElement('div');
		this._tt_autorotate2.className='ggskin ggskin_textdiv';
		this._tt_autorotate2.ggTextDiv=this._tt_autorotate2__text;
		this._tt_autorotate2.ggId="tt_autorotate";
		this._tt_autorotate2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate2.ggVisible=false;
		this._tt_autorotate2.className='ggskin ggskin_text';
		this._tt_autorotate2.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  -21px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate2.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate2__text.setAttribute('style',hs);
		this._tt_autorotate2.ggTextDiv.innerHTML="\u56fe\u7247";
		this._tt_autorotate2.appendChild(this._tt_autorotate2__text);
		this._tt_autorotates2=document.createElement('div');
		this._tt_autorotates2__text=document.createElement('div');
		this._tt_autorotates2.className='ggskin ggskin_textdiv';
		this._tt_autorotates2.ggTextDiv=this._tt_autorotates2__text;
		this._tt_autorotates2.ggId="tt_autorotates";
		this._tt_autorotates2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates2.ggVisible=true;
		this._tt_autorotates2.className='ggskin ggskin_text';
		this._tt_autorotates2.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates2.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates2__text.setAttribute('style',hs);
		this._tt_autorotates2.ggTextDiv.innerHTML="\u56fe\u7247";
		this._tt_autorotates2.appendChild(this._tt_autorotates2__text);
		this._tt_autorotate2.appendChild(this._tt_autorotates2);
		this._autorotate2.appendChild(this._tt_autorotate2);
		this._container_2.appendChild(this._autorotate2);
		this._autorotate1=document.createElement('div');
		this._autorotate1.ggId="autorotate";
		this._autorotate1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate1.ggVisible=true;
		this._autorotate1.className='ggskin ggskin_svg';
		this._autorotate1.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 5px;';
		hs+='top:  21px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate1.setAttribute('style',hs);
		this._autorotate1__img=document.createElement('img');
		this._autorotate1__img.className='ggskin ggskin_svg';
		this._autorotate1__img.setAttribute('src',basePath + 'images/autorotate1.svg');
		this._autorotate1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate1__img['ondragstart']=function() { return false; };
		this._autorotate1.appendChild(this._autorotate1__img);
		this._autorotate1.onclick=function () {
			flag=(me.__2.style.visibility=='hidden');
			me.__2.style[domTransition]='none';
			me.__2.style.visibility=flag?'inherit':'hidden';
			me.__2.ggVisible=flag;
		}
		this._autorotate1.onmouseover=function () {
			me._tt_autorotate1.style[domTransition]='none';
			me._tt_autorotate1.style.visibility='inherit';
			me._tt_autorotate1.ggVisible=true;
			me._autorotate1.style[domTransition]='none';
			me._autorotate1.ggParameter.sx=1.2;me._autorotate1.ggParameter.sy=1.2;
			me._autorotate1.style[domTransform]=parameterToTransform(me._autorotate1.ggParameter);
		}
		this._autorotate1.onmouseout=function () {
			me._tt_autorotate1.style[domTransition]='none';
			me._tt_autorotate1.style.visibility='hidden';
			me._tt_autorotate1.ggVisible=false;
			me._autorotate1.style[domTransition]='none';
			me._autorotate1.ggParameter.sx=1;me._autorotate1.ggParameter.sy=1;
			me._autorotate1.style[domTransform]=parameterToTransform(me._autorotate1.ggParameter);
		}
		this._tt_autorotate1=document.createElement('div');
		this._tt_autorotate1__text=document.createElement('div');
		this._tt_autorotate1.className='ggskin ggskin_textdiv';
		this._tt_autorotate1.ggTextDiv=this._tt_autorotate1__text;
		this._tt_autorotate1.ggId="tt_autorotate";
		this._tt_autorotate1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate1.ggVisible=false;
		this._tt_autorotate1.className='ggskin ggskin_text';
		this._tt_autorotate1.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  -21px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate1__text.setAttribute('style',hs);
		this._tt_autorotate1.ggTextDiv.innerHTML="\u5730\u56fe";
		this._tt_autorotate1.appendChild(this._tt_autorotate1__text);
		this._tt_autorotates1=document.createElement('div');
		this._tt_autorotates1__text=document.createElement('div');
		this._tt_autorotates1.className='ggskin ggskin_textdiv';
		this._tt_autorotates1.ggTextDiv=this._tt_autorotates1__text;
		this._tt_autorotates1.ggId="tt_autorotates";
		this._tt_autorotates1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates1.ggVisible=true;
		this._tt_autorotates1.className='ggskin ggskin_text';
		this._tt_autorotates1.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates1__text.setAttribute('style',hs);
		this._tt_autorotates1.ggTextDiv.innerHTML="\u5730\u56fe";
		this._tt_autorotates1.appendChild(this._tt_autorotates1__text);
		this._tt_autorotate1.appendChild(this._tt_autorotates1);
		this._autorotate1.appendChild(this._tt_autorotate1);
		this._container_2.appendChild(this._autorotate1);
		this._autorotate0=document.createElement('div');
		this._autorotate0.ggId="autorotate";
		this._autorotate0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate0.ggVisible=true;
		this._autorotate0.className='ggskin ggskin_svg';
		this._autorotate0.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 99px;';
		hs+='top:  21px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate0.setAttribute('style',hs);
		this._autorotate0__img=document.createElement('img');
		this._autorotate0__img.className='ggskin ggskin_svg';
		this._autorotate0__img.setAttribute('src',basePath + 'images/autorotate0.svg');
		this._autorotate0__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate0__img['ondragstart']=function() { return false; };
		this._autorotate0.appendChild(this._autorotate0__img);
		this._autorotate0.onclick=function () {
			flag=(me.__0.style.visibility=='hidden');
			me.__0.style[domTransition]='none';
			me.__0.style.visibility=flag?'inherit':'hidden';
			me.__0.ggVisible=flag;
		}
		this._autorotate0.onmouseover=function () {
			me._tt_autorotate0.style[domTransition]='none';
			me._tt_autorotate0.style.visibility='inherit';
			me._tt_autorotate0.ggVisible=true;
			me._autorotate0.style[domTransition]='none';
			me._autorotate0.ggParameter.sx=1.2;me._autorotate0.ggParameter.sy=1.2;
			me._autorotate0.style[domTransform]=parameterToTransform(me._autorotate0.ggParameter);
		}
		this._autorotate0.onmouseout=function () {
			me._tt_autorotate0.style[domTransition]='none';
			me._tt_autorotate0.style.visibility='hidden';
			me._tt_autorotate0.ggVisible=false;
			me._autorotate0.style[domTransition]='none';
			me._autorotate0.ggParameter.sx=1;me._autorotate0.ggParameter.sy=1;
			me._autorotate0.style[domTransform]=parameterToTransform(me._autorotate0.ggParameter);
		}
		this._tt_autorotate0=document.createElement('div');
		this._tt_autorotate0__text=document.createElement('div');
		this._tt_autorotate0.className='ggskin ggskin_textdiv';
		this._tt_autorotate0.ggTextDiv=this._tt_autorotate0__text;
		this._tt_autorotate0.ggId="tt_autorotate";
		this._tt_autorotate0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate0.ggVisible=false;
		this._tt_autorotate0.className='ggskin ggskin_text';
		this._tt_autorotate0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  -21px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate0__text.setAttribute('style',hs);
		this._tt_autorotate0.ggTextDiv.innerHTML="\u89c6\u9891";
		this._tt_autorotate0.appendChild(this._tt_autorotate0__text);
		this._tt_autorotates0=document.createElement('div');
		this._tt_autorotates0__text=document.createElement('div');
		this._tt_autorotates0.className='ggskin ggskin_textdiv';
		this._tt_autorotates0.ggTextDiv=this._tt_autorotates0__text;
		this._tt_autorotates0.ggId="tt_autorotates";
		this._tt_autorotates0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates0.ggVisible=true;
		this._tt_autorotates0.className='ggskin ggskin_text';
		this._tt_autorotates0.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates0__text.setAttribute('style',hs);
		this._tt_autorotates0.ggTextDiv.innerHTML="\u89c6\u9891";
		this._tt_autorotates0.appendChild(this._tt_autorotates0__text);
		this._tt_autorotate0.appendChild(this._tt_autorotates0);
		this._autorotate0.appendChild(this._tt_autorotate0);
		this._container_2.appendChild(this._autorotate0);
		this._autorotate=document.createElement('div');
		this._autorotate.ggId="autorotate";
		this._autorotate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._autorotate.ggVisible=true;
		this._autorotate.className='ggskin ggskin_svg';
		this._autorotate.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 130px;';
		hs+='top:  21px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._autorotate.setAttribute('style',hs);
		this._autorotate__img=document.createElement('img');
		this._autorotate__img.className='ggskin ggskin_svg';
		this._autorotate__img.setAttribute('src',basePath + 'images/autorotate.svg');
		this._autorotate__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this._autorotate__img['ondragstart']=function() { return false; };
		this._autorotate.appendChild(this._autorotate__img);
		this._autorotate.onclick=function () {
			flag=(me.__1.style.visibility=='hidden');
			me.__1.style[domTransition]='none';
			me.__1.style.visibility=flag?'inherit':'hidden';
			me.__1.ggVisible=flag;
		}
		this._autorotate.onmouseover=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='inherit';
			me._tt_autorotate.ggVisible=true;
			me._autorotate.style[domTransition]='none';
			me._autorotate.ggParameter.sx=1.2;me._autorotate.ggParameter.sy=1.2;
			me._autorotate.style[domTransform]=parameterToTransform(me._autorotate.ggParameter);
		}
		this._autorotate.onmouseout=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='hidden';
			me._tt_autorotate.ggVisible=false;
			me._autorotate.style[domTransition]='none';
			me._autorotate.ggParameter.sx=1;me._autorotate.ggParameter.sy=1;
			me._autorotate.style[domTransform]=parameterToTransform(me._autorotate.ggParameter);
		}
		this._tt_autorotate=document.createElement('div');
		this._tt_autorotate__text=document.createElement('div');
		this._tt_autorotate.className='ggskin ggskin_textdiv';
		this._tt_autorotate.ggTextDiv=this._tt_autorotate__text;
		this._tt_autorotate.ggId="tt_autorotate";
		this._tt_autorotate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotate.ggVisible=false;
		this._tt_autorotate.className='ggskin ggskin_text';
		this._tt_autorotate.ggType='text';
		hs ='position:absolute;';
		hs+='left: -66px;';
		hs+='top:  -21px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_autorotate.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotate__text.setAttribute('style',hs);
		this._tt_autorotate.ggTextDiv.innerHTML="\u804a\u5929\u5ba4";
		this._tt_autorotate.appendChild(this._tt_autorotate__text);
		this._tt_autorotates=document.createElement('div');
		this._tt_autorotates__text=document.createElement('div');
		this._tt_autorotates.className='ggskin ggskin_textdiv';
		this._tt_autorotates.ggTextDiv=this._tt_autorotates__text;
		this._tt_autorotates.ggId="tt_autorotates";
		this._tt_autorotates.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_autorotates.ggVisible=true;
		this._tt_autorotates.className='ggskin ggskin_text';
		this._tt_autorotates.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._tt_autorotates.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 168px;';
		hs+='height: 18px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._tt_autorotates__text.setAttribute('style',hs);
		this._tt_autorotates.ggTextDiv.innerHTML="\u804a\u5929\u5ba4";
		this._tt_autorotates.appendChild(this._tt_autorotates__text);
		this._tt_autorotate.appendChild(this._tt_autorotates);
		this._autorotate.appendChild(this._tt_autorotate);
		this._container_2.appendChild(this._autorotate);
		this.divSkin.appendChild(this._container_2);
		this._container_3=document.createElement('div');
		this._container_3.ggId="Container 3";
		this._container_3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._container_3.ggVisible=true;
		this._container_3.className='ggskin ggskin_container';
		this._container_3.ggType='container';
		this._container_3.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-592 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-415 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -592px;';
		hs+='top:  -415px;';
		hs+='width: 1280px;';
		hs+='height: 764px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._container_3.setAttribute('style',hs);
		this.__2=document.createElement('div');
		this.__2__text=document.createElement('div');
		this.__2.className='ggskin ggskin_textdiv';
		this.__2.ggTextDiv=this.__2__text;
		this.__2.ggId="\u5730\u56fe";
		this.__2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__2.ggVisible=false;
		this.__2.className='ggskin ggskin_text';
		this.__2.ggType='text';
		this.__2.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-640 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-338 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -640px;';
		hs+='top:  -338px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__2.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.__2__text.setAttribute('style',hs);
		this.__2.ggTextDiv.innerHTML="<iframe src=\"https:\/\/www.google.com\/maps\/embed?pb=!1m18!1m12!1m3!1d14639.996133994544!2d113.14295377677377!3d23.460499354528555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3402e830895b3a5b%3A0xb9c508a9f97ba595!2z5Lit5Zu95bm_5Lic55yB5bm_5bee5biC6Iqx6YO95Yy654uu5bKt6ZWHIOmCruaUv-e8lueggTogNTEwODUw!5e0!3m2!1szh-CN!2shk!4v1657146709823!5m2!1szh-CN!2shk\" width=\"1280\" height=\"720\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"><\/iframe>";
		this.__2.appendChild(this.__2__text);
		this._container_3.appendChild(this.__2);
		this.__1=document.createElement('div');
		this.__1__text=document.createElement('div');
		this.__1.className='ggskin ggskin_textdiv';
		this.__1.ggTextDiv=this.__1__text;
		this.__1.ggId="\u5373\u4f7f\u804a\u5929";
		this.__1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__1.ggVisible=false;
		this.__1.className='ggskin ggskin_text';
		this.__1.ggType='text';
		this.__1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-640 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-340 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -640px;';
		hs+='top:  -340px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.__1__text.setAttribute('style',hs);
		this.__1.ggTextDiv.innerHTML="<iframe src=\"https:\/\/deadsimplechat.com\/3nyvaFJcl\" width=\"100%\" height=\"720px\"><\/iframe>";
		this.__1.appendChild(this.__1__text);
		this._container_3.appendChild(this.__1);
		this.__0=document.createElement('div');
		this.__0__text=document.createElement('div');
		this.__0.className='ggskin ggskin_textdiv';
		this.__0.ggTextDiv=this.__0__text;
		this.__0.ggId="\u5ba3\u4f20\u89c6\u9891";
		this.__0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__0.ggVisible=false;
		this.__0.className='ggskin ggskin_text';
		this.__0.ggType='text';
		this.__0.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-640 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-340 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -640px;';
		hs+='top:  -340px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.__0__text.setAttribute('style',hs);
		this.__0.ggTextDiv.innerHTML="<iframe src=\"https:\/\/streamable.com\/e\/6ugqi5\" width=\"1280\" height=\"720\" frameborder=\"0\" allowfullscreen><\/iframe>";
		this.__0.appendChild(this.__0__text);
		this._container_3.appendChild(this.__0);
		this.__=document.createElement('div');
		this.____text=document.createElement('div');
		this.__.className='ggskin ggskin_textdiv';
		this.__.ggTextDiv=this.____text;
		this.__.ggId="\u8d2d\u4e70\u94fe\u63a5";
		this.__.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__.ggVisible=false;
		this.__.className='ggskin ggskin_text';
		this.__.ggType='text';
		this.__.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-640 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-340 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -640px;';
		hs+='top:  -340px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 1277px;';
		hs+='height: 719px;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.____text.setAttribute('style',hs);
		this.__.ggTextDiv.innerHTML="<iframe src=\"https:\/\/world.taobao.com\/\" width=\"1280px\" height=\"720px\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder=\"0\"><\/iframe>";
		this.__.appendChild(this.____text);
		this._container_3.appendChild(this.__);
		this._text_1=document.createElement('div');
		this._text_1__text=document.createElement('div');
		this._text_1.className='ggskin ggskin_textdiv';
		this._text_1.ggTextDiv=this._text_1__text;
		this._text_1.ggId="Text 1";
		this._text_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._text_1.ggVisible=false;
		this._text_1.className='ggskin ggskin_text';
		this._text_1.ggType='text';
		this._text_1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-464 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-423 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -464px;';
		hs+='top:  -423px;';
		hs+='width: 921px;';
		hs+='height: 857px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._text_1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 921px;';
		hs+='height: 857px;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		this._text_1__text.setAttribute('style',hs);
		this._text_1.ggTextDiv.innerHTML="<iframe src=\"andrea.jpg\" width=\"924\" height=\"858\" frameborder=\"0\" allowfullscreen><\/iframe>";
		this._text_1.appendChild(this._text_1__text);
		this._container_3.appendChild(this._text_1);
		this.divSkin.appendChild(this._container_3);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		this.divSkin.ggReLoaded=function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='inherit';
			me._loading.ggVisible=true;
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		var newMarker=new Array();
		var i,j;
		var tags=me.player.userdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
			}
		}
		activeNodeMarker=newMarker;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		this._loadingtext.ggUpdateText();
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		if (me.elementMouseDown['zoomin']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout']) {
			me.player.changeFovLog(1,true);
		}
	};
	this.addSkin();
};