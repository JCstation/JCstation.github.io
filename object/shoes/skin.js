// Garden Gnome Software - Skin
// Object2VR 3.1.9/10783
// Filename: simplex_shoes.ggsk
// Generated 周四 6月 30 14:53:50 2022

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
	
	this.preloadImages=function() {
		var preLoadImg=new Image();
		preLoadImg.src=basePath + 'images/button_10__o.png';
		preLoadImg.src=basePath + 'images/button_1__o.png';
	}
	
	this.addSkin=function() {
		this._controller=document.createElement('div');
		this._controller.ggId="controller";
		this._controller.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._controller.ggVisible=true;
		this._controller.className='ggskin ggskin_container';
		this._controller.ggType='container';
		this._controller.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-112 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-65 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -112px;';
		hs+='top:  -65px;';
		hs+='width: 263px;';
		hs+='height: 50px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._controller.setAttribute('style',hs);
		this._left=document.createElement('div');
		this._left.ggId="left";
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_svg';
		this._left.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 21px;';
		hs+='top:  10px;';
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
			me._left__img.src=basePath + 'images/left__o.svg';
		}
		this._left.onmouseout=function () {
			me._left__img.src=basePath + 'images/left.svg';
		}
		this._controller.appendChild(this._left);
		this._right=document.createElement('div');
		this._right.ggId="right";
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_svg';
		this._right.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 55px;';
		hs+='top:  10px;';
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
			me._right__img.src=basePath + 'images/right__o.svg';
		}
		this._right.onmouseout=function () {
			me._right__img.src=basePath + 'images/right.svg';
		}
		this._controller.appendChild(this._right);
		this._zoomin=document.createElement('div');
		this._zoomin.ggId="zoomin";
		this._zoomin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomin.ggVisible=true;
		this._zoomin.className='ggskin ggskin_svg';
		this._zoomin.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 90px;';
		hs+='top:  10px;';
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
			me._zoomin__img.src=basePath + 'images/zoomin__o.svg';
		}
		this._zoomin.onmouseout=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me._zoomin__img.src=basePath + 'images/zoomin.svg';
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
		this._tt_zoomins.ggVisible=false;
		this._tt_zoomins.className='ggskin ggskin_text';
		this._tt_zoomins.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomins.setAttribute('style',hs);
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
		this._tt_zoomins__text.setAttribute('style',hs);
		this._tt_zoomins.ggTextDiv.innerHTML="\u653e\u5927";
		this._tt_zoomins.appendChild(this._tt_zoomins__text);
		this._tt_zoomin.appendChild(this._tt_zoomins);
		this._zoomin.appendChild(this._tt_zoomin);
		this._controller.appendChild(this._zoomin);
		this._zoomout=document.createElement('div');
		this._zoomout.ggId="zoomout";
		this._zoomout.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoomout.ggVisible=true;
		this._zoomout.className='ggskin ggskin_svg';
		this._zoomout.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 125px;';
		hs+='top:  10px;';
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
			me._zoomout__img.src=basePath + 'images/zoomout__o.svg';
		}
		this._zoomout.onmouseout=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me._zoomout__img.src=basePath + 'images/zoomout.svg';
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
		this._tt_zoomouts.ggVisible=false;
		this._tt_zoomouts.className='ggskin ggskin_text';
		this._tt_zoomouts.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  3px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_zoomouts.setAttribute('style',hs);
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
		this._tt_zoomouts__text.setAttribute('style',hs);
		this._tt_zoomouts.ggTextDiv.innerHTML="\u7f29\u5c0f";
		this._tt_zoomouts.appendChild(this._tt_zoomouts__text);
		this._tt_zoomout.appendChild(this._tt_zoomouts);
		this._zoomout.appendChild(this._tt_zoomout);
		this._controller.appendChild(this._zoomout);
		this._fullscreen=document.createElement('div');
		this._fullscreen.ggId="fullscreen";
		this._fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen.ggVisible=true;
		this._fullscreen.className='ggskin ggskin_svg';
		this._fullscreen.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 163px;';
		hs+='top:  10px;';
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
			me.player.toggleFullscreen();
		}
		this._fullscreen.onmouseover=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='inherit';
			me._tt_fullscreen.ggVisible=true;
			me._fullscreen__img.src=basePath + 'images/fullscreen__o.svg';
		}
		this._fullscreen.onmouseout=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='hidden';
			me._tt_fullscreen.ggVisible=false;
			me._fullscreen__img.src=basePath + 'images/fullscreen.svg';
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
		this._tt_fullscreen.ggTextDiv.innerHTML="\u5168\u5c4f";
		this._tt_fullscreen.appendChild(this._tt_fullscreen__text);
		this._tt_fullscreens=document.createElement('div');
		this._tt_fullscreens__text=document.createElement('div');
		this._tt_fullscreens.className='ggskin ggskin_textdiv';
		this._tt_fullscreens.ggTextDiv=this._tt_fullscreens__text;
		this._tt_fullscreens.ggId="tt_fullscreens";
		this._tt_fullscreens.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_fullscreens.ggVisible=false;
		this._tt_fullscreens.className='ggskin ggskin_text';
		this._tt_fullscreens.ggType='text';
		hs ='position:absolute;';
		hs+='left: -1px;';
		hs+='top:  -1px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_fullscreens.setAttribute('style',hs);
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
		this._tt_fullscreens__text.setAttribute('style',hs);
		this._tt_fullscreens.ggTextDiv.innerHTML="\u5168\u5c4f";
		this._tt_fullscreens.appendChild(this._tt_fullscreens__text);
		this._tt_fullscreen.appendChild(this._tt_fullscreens);
		this._fullscreen.appendChild(this._tt_fullscreen);
		this._controller.appendChild(this._fullscreen);
		this.divSkin.appendChild(this._controller);
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
				this.style.left=Math.floor(-132 + w) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-145 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -132px;';
		hs+='top:  -145px;';
		hs+='width: 131px;';
		hs+='height: 268px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._container_3.setAttribute('style',hs);
		this._button_10=document.createElement('div');
		this._button_10.ggId="Button 1";
		this._button_10.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		this._button_10.ggVisible=true;
		this._button_10.className='ggskin ggskin_button';
		this._button_10.ggType='button';
		this._button_10.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-18 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(21 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -18px;';
		hs+='top:  21px;';
		hs+='width: 59px;';
		hs+='height: 59px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._button_10.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._button_10.setAttribute('style',hs);
		this._button_10__img=document.createElement('img');
		this._button_10__img.className='ggskin ggskin_button';
		this._button_10__img.setAttribute('src',basePath + 'images/button_10.png');
		this._button_10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._button_10__img.className='ggskin ggskin_button';
		this._button_10__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._button_10__img);
		this._button_10.appendChild(this._button_10__img);
		this._button_10.onclick=function () {
			me.player.changeViewState("0",1);
		}
		this._button_10.onmouseover=function () {
			me._button_10__img.src=basePath + 'images/button_10__o.png';
			me.elementMouseOver['button_10']=true;
		}
		this._button_10.onmouseout=function () {
			me.__0.style[domTransition]='none';
			me.__0.style.visibility='hidden';
			me.__0.ggVisible=false;
			me._button_10__img.src=basePath + 'images/button_10.png';
			me.elementMouseOver['button_10']=false;
		}
		this._button_10.ontouchend=function () {
			me.elementMouseOver['button_10']=false;
		}
		this.__0=document.createElement('div');
		this.__0__text=document.createElement('div');
		this.__0.className='ggskin ggskin_textdiv';
		this.__0.ggTextDiv=this.__0__text;
		this.__0.ggId="\u7070\u8272";
		this.__0.ggParameter={ rx:0,ry:0,a:0,sx:1.5,sy:1.5 };
		this.__0.ggVisible=false;
		this.__0.className='ggskin ggskin_text';
		this.__0.ggType='text';
		this.__0.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-49 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(14 + h) + 'px';
			}
			this.ggTextDiv.style.left=Math.floor(0 + (98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		hs ='position:absolute;';
		hs+='left: -49px;';
		hs+='top:  14px;';
		hs+='width: 98px;';
		hs+='height: 20px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this.__0.ggParameter) + ';';
		hs+='visibility: hidden;';
		this.__0.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.__0__text.setAttribute('style',hs);
		this.__0.ggTextDiv.innerHTML="\u7070\u8272";
		this.__0.appendChild(this.__0__text);
		this._button_10.appendChild(this.__0);
		this._container_3.appendChild(this._button_10);
		this._button_1=document.createElement('div');
		this._button_1.ggId="Button 1";
		this._button_1.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		this._button_1.ggVisible=true;
		this._button_1.className='ggskin ggskin_button';
		this._button_1.ggType='button';
		this._button_1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-19 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-29 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -19px;';
		hs+='top:  -29px;';
		hs+='width: 59px;';
		hs+='height: 59px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._button_1.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._button_1.setAttribute('style',hs);
		this._button_1__img=document.createElement('img');
		this._button_1__img.className='ggskin ggskin_button';
		this._button_1__img.setAttribute('src',basePath + 'images/button_1.png');
		this._button_1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._button_1__img.className='ggskin ggskin_button';
		this._button_1__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._button_1__img);
		this._button_1.appendChild(this._button_1__img);
		this._button_1.onclick=function () {
			me.player.changeViewState("1",1);
		}
		this._button_1.onmouseover=function () {
			me._button_1__img.src=basePath + 'images/button_1__o.png';
			me.elementMouseOver['button_1']=true;
		}
		this._button_1.onmouseout=function () {
			me.__.style[domTransition]='none';
			me.__.style.visibility='hidden';
			me.__.ggVisible=false;
			me._button_1__img.src=basePath + 'images/button_1.png';
			me.elementMouseOver['button_1']=false;
		}
		this._button_1.ontouchend=function () {
			me.elementMouseOver['button_1']=false;
		}
		this.__=document.createElement('div');
		this.____text=document.createElement('div');
		this.__.className='ggskin ggskin_textdiv';
		this.__.ggTextDiv=this.____text;
		this.__.ggId="\u9ed1\u8272";
		this.__.ggParameter={ rx:0,ry:0,a:0,sx:1.5,sy:1.5 };
		this.__.ggVisible=false;
		this.__.className='ggskin ggskin_text';
		this.__.ggType='text';
		this.__.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-47 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(12 + h) + 'px';
			}
			this.ggTextDiv.style.left=Math.floor(0 + (98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		hs ='position:absolute;';
		hs+='left: -47px;';
		hs+='top:  12px;';
		hs+='width: 98px;';
		hs+='height: 20px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this.__.ggParameter) + ';';
		hs+='visibility: hidden;';
		this.__.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this.____text.setAttribute('style',hs);
		this.__.ggTextDiv.innerHTML="\u9ed1\u8272";
		this.__.appendChild(this.____text);
		this._button_1.appendChild(this.__);
		this._container_3.appendChild(this._button_1);
		this.divSkin.appendChild(this._container_3);
		this.preloadImages();
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
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
		if (id=='black_1') {
			me._button_10.onclick();
		}
		if (id=='black_1') {
			me._button_1.onclick();
		}
	}
	this.hotspotProxyOver=function(id) {
		if (id=='black_1') {
			me._button_10.onmouseover();
		}
		if (id=='black_1') {
			me._button_1.onmouseover();
		}
	}
	this.hotspotProxyOut=function(id) {
		if (id=='black_1') {
			me._button_10.onmouseout();
		}
		if (id=='black_1') {
			me._button_1.onmouseout();
		}
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
		if (me.elementMouseDown['zoomin']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoomout']) {
			me.player.changeFovLog(1,true);
		}
		if (me.elementMouseOver['button_10']) {
			me.__0.style[domTransition]='none';
			me.__0.style.visibility='inherit';
			me.__0.ggVisible=true;
		}
		if (me.elementMouseOver['button_1']) {
			me.__.style[domTransition]='none';
			me.__.style.visibility='inherit';
			me.__.ggVisible=true;
		}
	};
	this.addSkin();
};