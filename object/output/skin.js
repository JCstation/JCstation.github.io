// Garden Gnome Software - Skin
// Object2VR 3.1.9/10783
// Filename: ????.ggsk
// Generated 周四 7月 7 23:02:56 2022

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
		this._container_2=document.createElement('div');
		this._container_2.ggId="Container 2";
		this._container_2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._container_2.ggVisible=true;
		this._container_2.className='ggskin ggskin_container';
		this._container_2.ggType='container';
		this._container_2.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-323 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-154 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -323px;';
		hs+='top:  -154px;';
		hs+='width: 643px;';
		hs+='height: 118px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._container_2.setAttribute('style',hs);
		this.__20=document.createElement('div');
		this.__20.ggId="\u52a8\u6001\u5f00\u5173";
		this.__20.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__20.ggVisible=true;
		this.__20.className='ggskin ggskin_svg';
		this.__20.ggType='svg';
		this.__20.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-265 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -265px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__20.setAttribute('style',hs);
		this.__20__img=document.createElement('img');
		this.__20__img.className='ggskin ggskin_svg';
		this.__20__img.setAttribute('src',basePath + 'images/_20.svg');
		this.__20__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__20__img['ondragstart']=function() { return false; };
		this.__20.appendChild(this.__20__img);
		this.__20.onclick=function () {
			me.player.changeTiltLog(1,true);
			me.player.startAutorotate("0.5");
		}
		this.__20.onmouseover=function () {
			me.__21.style[domTransition]='none';
			me.__21.style.visibility='inherit';
			me.__21.ggVisible=true;
			me.__20.style[domTransition]='none';
			me.__20.ggParameter.sx=1.2;me.__20.ggParameter.sy=1.2;
			me.__20.style[domTransform]=parameterToTransform(me.__20.ggParameter);
			me.__20__img.src=basePath + 'images/_20__o.svg';
		}
		this.__20.onmouseout=function () {
			me.__21.style[domTransition]='none';
			me.__21.style.visibility='hidden';
			me.__21.ggVisible=false;
			me.__20.style[domTransition]='none';
			me.__20.ggParameter.sx=1;me.__20.ggParameter.sy=1;
			me.__20.style[domTransform]=parameterToTransform(me.__20.ggParameter);
			me.__20__img.src=basePath + 'images/_20.svg';
		}
		this.__21=document.createElement('div');
		this.__21__text=document.createElement('div');
		this.__21.className='ggskin ggskin_textdiv';
		this.__21.ggTextDiv=this.__21__text;
		this.__21.ggId="\u52a8\u6001";
		this.__21.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__21.ggVisible=false;
		this.__21.className='ggskin ggskin_text';
		this.__21.ggType='text';
		this.__21.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(2 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__21.setAttribute('style',hs);
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
		this.__21__text.setAttribute('style',hs);
		this.__21.ggTextDiv.innerHTML="\u52a8\u6001";
		this.__21.appendChild(this.__21__text);
		this.__20.appendChild(this.__21);
		this._container_2.appendChild(this.__20);
		this.__18=document.createElement('div');
		this.__18.ggId="\u9ed8\u8ba4\u8bd5\u56fe";
		this.__18.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__18.ggVisible=true;
		this.__18.className='ggskin ggskin_svg';
		this.__18.ggType='svg';
		this.__18.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-230 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -230px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__18.setAttribute('style',hs);
		this.__18__img=document.createElement('img');
		this.__18__img.className='ggskin ggskin_svg';
		this.__18__img.setAttribute('src',basePath + 'images/_18.svg');
		this.__18__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__18__img['ondragstart']=function() { return false; };
		this.__18.appendChild(this.__18__img);
		this.__18.onclick=function () {
			me.player.moveToDefaultView(1);
		}
		this.__18.onmouseover=function () {
			me.__19.style[domTransition]='none';
			me.__19.style.visibility='inherit';
			me.__19.ggVisible=true;
			me.__18.style[domTransition]='none';
			me.__18.ggParameter.sx=1.2;me.__18.ggParameter.sy=1.2;
			me.__18.style[domTransform]=parameterToTransform(me.__18.ggParameter);
			me.__18__img.src=basePath + 'images/_18__o.svg';
		}
		this.__18.onmouseout=function () {
			me.__19.style[domTransition]='none';
			me.__19.style.visibility='hidden';
			me.__19.ggVisible=false;
			me.__18.style[domTransition]='none';
			me.__18.ggParameter.sx=1;me.__18.ggParameter.sy=1;
			me.__18.style[domTransform]=parameterToTransform(me.__18.ggParameter);
			me.__18__img.src=basePath + 'images/_18.svg';
		}
		this.__19=document.createElement('div');
		this.__19__text=document.createElement('div');
		this.__19.className='ggskin ggskin_textdiv';
		this.__19.ggTextDiv=this.__19__text;
		this.__19.ggId="\u9ed8\u8ba41";
		this.__19.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__19.ggVisible=false;
		this.__19.className='ggskin ggskin_text';
		this.__19.ggType='text';
		this.__19.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-74 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(2 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -74px;';
		hs+='top:  2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__19.setAttribute('style',hs);
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
		this.__19__text.setAttribute('style',hs);
		this.__19.ggTextDiv.innerHTML="\u9ed8\u8ba4\u89c6\u56fe";
		this.__19.appendChild(this.__19__text);
		this.__18.appendChild(this.__19);
		this._container_2.appendChild(this.__18);
		this.__16=document.createElement('div');
		this.__16.ggId="\u5de6\u8f6c";
		this.__16.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__16.ggVisible=true;
		this.__16.className='ggskin ggskin_svg';
		this.__16.ggType='svg';
		this.__16.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-195 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -195px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__16.setAttribute('style',hs);
		this.__16__img=document.createElement('img');
		this.__16__img.className='ggskin ggskin_svg';
		this.__16__img.setAttribute('src',basePath + 'images/_16.svg');
		this.__16__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__16__img['ondragstart']=function() { return false; };
		this.__16.appendChild(this.__16__img);
		this.__16.onclick=function () {
			me.player.changePanLog(1,true);
		}
		this.__16.onmouseover=function () {
			me.__17.style[domTransition]='none';
			me.__17.style.visibility='inherit';
			me.__17.ggVisible=true;
			me.__16.style[domTransition]='none';
			me.__16.ggParameter.sx=1.2;me.__16.ggParameter.sy=1.2;
			me.__16.style[domTransform]=parameterToTransform(me.__16.ggParameter);
			me.__16__img.src=basePath + 'images/_16__o.svg';
		}
		this.__16.onmouseout=function () {
			me.__17.style[domTransition]='none';
			me.__17.style.visibility='hidden';
			me.__17.ggVisible=false;
			me.__16.style[domTransition]='none';
			me.__16.ggParameter.sx=1;me.__16.ggParameter.sy=1;
			me.__16.style[domTransform]=parameterToTransform(me.__16.ggParameter);
			me.__16__img.src=basePath + 'images/_16.svg';
		}
		this.__17=document.createElement('div');
		this.__17__text=document.createElement('div');
		this.__17.className='ggskin ggskin_textdiv';
		this.__17.ggTextDiv=this.__17__text;
		this.__17.ggId="\u5de6\u8f6c1";
		this.__17.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__17.ggVisible=false;
		this.__17.className='ggskin ggskin_text';
		this.__17.ggType='text';
		this.__17.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-77 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(2 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -77px;';
		hs+='top:  2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__17.setAttribute('style',hs);
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
		this.__17__text.setAttribute('style',hs);
		this.__17.ggTextDiv.innerHTML="\u5411\u53f3";
		this.__17.appendChild(this.__17__text);
		this.__16.appendChild(this.__17);
		this._container_2.appendChild(this.__16);
		this.__14=document.createElement('div');
		this.__14.ggId="\u53f3\u8f6c";
		this.__14.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__14.ggVisible=true;
		this.__14.className='ggskin ggskin_svg';
		this.__14.ggType='svg';
		this.__14.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-160 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -160px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__14.setAttribute('style',hs);
		this.__14__img=document.createElement('img');
		this.__14__img.className='ggskin ggskin_svg';
		this.__14__img.setAttribute('src',basePath + 'images/_14.svg');
		this.__14__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__14__img['ondragstart']=function() { return false; };
		this.__14.appendChild(this.__14__img);
		this.__14.onclick=function () {
			me.player.changePanLog(-1,true);
		}
		this.__14.onmouseover=function () {
			me.__15.style[domTransition]='none';
			me.__15.style.visibility='inherit';
			me.__15.ggVisible=true;
			me.__14.style[domTransition]='none';
			me.__14.ggParameter.sx=1.2;me.__14.ggParameter.sy=1.2;
			me.__14.style[domTransform]=parameterToTransform(me.__14.ggParameter);
			me.__14__img.src=basePath + 'images/_14__o.svg';
		}
		this.__14.onmouseout=function () {
			me.__15.style[domTransition]='none';
			me.__15.style.visibility='hidden';
			me.__15.ggVisible=false;
			me.__14.style[domTransition]='none';
			me.__14.ggParameter.sx=1;me.__14.ggParameter.sy=1;
			me.__14.style[domTransform]=parameterToTransform(me.__14.ggParameter);
			me.__14__img.src=basePath + 'images/_14.svg';
		}
		this.__15=document.createElement('div');
		this.__15__text=document.createElement('div');
		this.__15.className='ggskin ggskin_textdiv';
		this.__15.ggTextDiv=this.__15__text;
		this.__15.ggId="\u53f3\u8f6c1";
		this.__15.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__15.ggVisible=false;
		this.__15.className='ggskin ggskin_text';
		this.__15.ggType='text';
		this.__15.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-71 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(2 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -71px;';
		hs+='top:  2px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__15.setAttribute('style',hs);
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
		this.__15__text.setAttribute('style',hs);
		this.__15.ggTextDiv.innerHTML="\u5411\u5de6";
		this.__15.appendChild(this.__15__text);
		this.__14.appendChild(this.__15);
		this._container_2.appendChild(this.__14);
		this.__13=document.createElement('div');
		this.__13.ggId="\u653e\u5927";
		this.__13.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__13.ggVisible=true;
		this.__13.className='ggskin ggskin_svg';
		this.__13.ggType='svg';
		this.__13.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-125 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -125px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__13.setAttribute('style',hs);
		this.__13__img=document.createElement('img');
		this.__13__img.className='ggskin ggskin_svg';
		this.__13__img.setAttribute('src',basePath + 'images/_13.svg');
		this.__13__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__13__img['ondragstart']=function() { return false; };
		this.__13.appendChild(this.__13__img);
		this.__13.onmouseover=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='inherit';
			me._tt_zoomin.ggVisible=true;
			me.__13.style[domTransition]='none';
			me.__13.ggParameter.sx=1.2;me.__13.ggParameter.sy=1.2;
			me.__13.style[domTransform]=parameterToTransform(me.__13.ggParameter);
			me.__13__img.src=basePath + 'images/_13__o.svg';
		}
		this.__13.onmouseout=function () {
			me._tt_zoomin.style[domTransition]='none';
			me._tt_zoomin.style.visibility='hidden';
			me._tt_zoomin.ggVisible=false;
			me.__13.style[domTransition]='none';
			me.__13.ggParameter.sx=1;me.__13.ggParameter.sy=1;
			me.__13.style[domTransform]=parameterToTransform(me.__13.ggParameter);
			me.__13__img.src=basePath + 'images/_13.svg';
			me.elementMouseDown['_13']=false;
		}
		this.__13.onmousedown=function () {
			me.elementMouseDown['_13']=true;
		}
		this.__13.onmouseup=function () {
			me.elementMouseDown['_13']=false;
		}
		this.__13.ontouchend=function () {
			me.elementMouseDown['_13']=false;
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
		this._tt_zoomin.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(1 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  1px;';
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
		this.__13.appendChild(this._tt_zoomin);
		this._container_2.appendChild(this.__13);
		this.__12=document.createElement('div');
		this.__12.ggId="\u653e\u5c0f";
		this.__12.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__12.ggVisible=true;
		this.__12.className='ggskin ggskin_svg';
		this.__12.ggType='svg';
		this.__12.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-90 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -90px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__12.setAttribute('style',hs);
		this.__12__img=document.createElement('img');
		this.__12__img.className='ggskin ggskin_svg';
		this.__12__img.setAttribute('src',basePath + 'images/_12.svg');
		this.__12__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__12__img['ondragstart']=function() { return false; };
		this.__12.appendChild(this.__12__img);
		this.__12.onmouseover=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='inherit';
			me._tt_zoomout.ggVisible=true;
			me.__12.style[domTransition]='none';
			me.__12.ggParameter.sx=1.2;me.__12.ggParameter.sy=1.2;
			me.__12.style[domTransform]=parameterToTransform(me.__12.ggParameter);
			me.__12__img.src=basePath + 'images/_12__o.svg';
		}
		this.__12.onmouseout=function () {
			me._tt_zoomout.style[domTransition]='none';
			me._tt_zoomout.style.visibility='hidden';
			me._tt_zoomout.ggVisible=false;
			me.__12.style[domTransition]='none';
			me.__12.ggParameter.sx=1;me.__12.ggParameter.sy=1;
			me.__12.style[domTransform]=parameterToTransform(me.__12.ggParameter);
			me.__12__img.src=basePath + 'images/_12.svg';
			me.elementMouseDown['_12']=false;
		}
		this.__12.onmousedown=function () {
			me.elementMouseDown['_12']=true;
		}
		this.__12.onmouseup=function () {
			me.elementMouseDown['_12']=false;
		}
		this.__12.ontouchend=function () {
			me.elementMouseDown['_12']=false;
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
		this._tt_zoomout.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-78 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -78px;';
		hs+='top:  3px;';
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
		this.__12.appendChild(this._tt_zoomout);
		this._container_2.appendChild(this.__12);
		this.__11=document.createElement('div');
		this.__11.ggId="\u81ea\u52a8\u65cb\u8f6c";
		this.__11.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__11.ggVisible=true;
		this.__11.className='ggskin ggskin_svg';
		this.__11.ggType='svg';
		this.__11.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-55 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -55px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__11.setAttribute('style',hs);
		this.__11__img=document.createElement('img');
		this.__11__img.className='ggskin ggskin_svg';
		this.__11__img.setAttribute('src',basePath + 'images/_11.svg');
		this.__11__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__11__img['ondragstart']=function() { return false; };
		this.__11.appendChild(this.__11__img);
		this.__11.onclick=function () {
			me.player.toggleAutorotate();
		}
		this.__11.ondblclick=function () {
			me.player.stopAutorotate();
		}
		this.__11.onmouseover=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='inherit';
			me._tt_autorotate.ggVisible=true;
			me.__11.style[domTransition]='none';
			me.__11.ggParameter.sx=1.2;me.__11.ggParameter.sy=1.2;
			me.__11.style[domTransform]=parameterToTransform(me.__11.ggParameter);
			me.__11__img.src=basePath + 'images/_11__o.svg';
		}
		this.__11.onmouseout=function () {
			me._tt_autorotate.style[domTransition]='none';
			me._tt_autorotate.style.visibility='hidden';
			me._tt_autorotate.ggVisible=false;
			me.__11.style[domTransition]='none';
			me.__11.ggParameter.sx=1;me.__11.ggParameter.sy=1;
			me.__11.style[domTransform]=parameterToTransform(me.__11.ggParameter);
			me.__11__img.src=basePath + 'images/_11.svg';
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
		this._tt_autorotate.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-83 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -83px;';
		hs+='top:  3px;';
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
		this._tt_autorotate.ggTextDiv.innerHTML="\u81ea\u52a8\u65cb\u8f6c\/\u53cc\u51fb\u505c\u6b62";
		this._tt_autorotate.appendChild(this._tt_autorotate__text);
		this.__11.appendChild(this._tt_autorotate);
		this._container_2.appendChild(this.__11);
		this.__10=document.createElement('div');
		this.__10.ggId="\u529f\u80fd";
		this.__10.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__10.ggVisible=true;
		this.__10.className='ggskin ggskin_svg';
		this.__10.ggType='svg';
		this.__10.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-20 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -20px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__10.setAttribute('style',hs);
		this.__10__img=document.createElement('img');
		this.__10__img.className='ggskin ggskin_svg';
		this.__10__img.setAttribute('src',basePath + 'images/_10.svg');
		this.__10__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__10__img['ondragstart']=function() { return false; };
		this.__10.appendChild(this.__10__img);
		this.__10.onclick=function () {
			flag=me.__10.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__10.style[domTransition]='none';
			} else {
				me.__10.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__10.style.opacity='1';
				me.__10.style.visibility=me.__10.ggVisible?'inherit':'hidden';
			} else {
				me.__10.style.opacity='0.6';
				me.__10.style.visibility=me.__10.ggVisible?'inherit':'hidden';
			}
			me.__10.ggOpacitiyActive=!flag;
		}
		this.__10.onmouseover=function () {
			me._tt_info5.style[domTransition]='none';
			me._tt_info5.style.visibility='inherit';
			me._tt_info5.ggVisible=true;
			me.__10.style[domTransition]='none';
			me.__10.ggParameter.sx=1.2;me.__10.ggParameter.sy=1.2;
			me.__10.style[domTransform]=parameterToTransform(me.__10.ggParameter);
			me.__10__img.src=basePath + 'images/_10__o.svg';
		}
		this.__10.onmouseout=function () {
			me._tt_info5.style[domTransition]='none';
			me._tt_info5.style.visibility='hidden';
			me._tt_info5.ggVisible=false;
			me.__10.style[domTransition]='none';
			me.__10.ggParameter.sx=1;me.__10.ggParameter.sy=1;
			me.__10.style[domTransform]=parameterToTransform(me.__10.ggParameter);
			me.__10__img.src=basePath + 'images/_10.svg';
		}
		this._tt_info5=document.createElement('div');
		this._tt_info5__text=document.createElement('div');
		this._tt_info5.className='ggskin ggskin_textdiv';
		this._tt_info5.ggTextDiv=this._tt_info5__text;
		this._tt_info5.ggId="tt_info";
		this._tt_info5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info5.ggVisible=false;
		this._tt_info5.className='ggskin ggskin_text';
		this._tt_info5.ggType='text';
		this._tt_info5.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info5.setAttribute('style',hs);
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
		this._tt_info5__text.setAttribute('style',hs);
		this._tt_info5.ggTextDiv.innerHTML="\u56fe\u6587";
		this._tt_info5.appendChild(this._tt_info5__text);
		this.__10.appendChild(this._tt_info5);
		this._container_2.appendChild(this.__10);
		this.__9=document.createElement('div');
		this.__9.ggId="\u89c6\u9891";
		this.__9.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__9.ggVisible=true;
		this.__9.className='ggskin ggskin_svg';
		this.__9.ggType='svg';
		this.__9.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(15 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 15px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__9.setAttribute('style',hs);
		this.__9__img=document.createElement('img');
		this.__9__img.className='ggskin ggskin_svg';
		this.__9__img.setAttribute('src',basePath + 'images/_9.svg');
		this.__9__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__9__img['ondragstart']=function() { return false; };
		this.__9.appendChild(this.__9__img);
		this.__9.onclick=function () {
			flag=me.__9.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__9.style[domTransition]='none';
			} else {
				me.__9.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__9.style.opacity='1';
				me.__9.style.visibility=me.__9.ggVisible?'inherit':'hidden';
			} else {
				me.__9.style.opacity='0.6';
				me.__9.style.visibility=me.__9.ggVisible?'inherit':'hidden';
			}
			me.__9.ggOpacitiyActive=!flag;
		}
		this.__9.onmouseover=function () {
			me._tt_info4.style[domTransition]='none';
			me._tt_info4.style.visibility='inherit';
			me._tt_info4.ggVisible=true;
			me.__9.style[domTransition]='none';
			me.__9.ggParameter.sx=1.2;me.__9.ggParameter.sy=1.2;
			me.__9.style[domTransform]=parameterToTransform(me.__9.ggParameter);
			me.__9__img.src=basePath + 'images/_9__o.svg';
		}
		this.__9.onmouseout=function () {
			me._tt_info4.style[domTransition]='none';
			me._tt_info4.style.visibility='hidden';
			me._tt_info4.ggVisible=false;
			me.__9.style[domTransition]='none';
			me.__9.ggParameter.sx=1;me.__9.ggParameter.sy=1;
			me.__9.style[domTransform]=parameterToTransform(me.__9.ggParameter);
			me.__9__img.src=basePath + 'images/_9.svg';
		}
		this._tt_info4=document.createElement('div');
		this._tt_info4__text=document.createElement('div');
		this._tt_info4.className='ggskin ggskin_textdiv';
		this._tt_info4.ggTextDiv=this._tt_info4__text;
		this._tt_info4.ggId="tt_info";
		this._tt_info4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info4.ggVisible=false;
		this._tt_info4.className='ggskin ggskin_text';
		this._tt_info4.ggType='text';
		this._tt_info4.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info4.setAttribute('style',hs);
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
		this._tt_info4__text.setAttribute('style',hs);
		this._tt_info4.ggTextDiv.innerHTML="\u89c6\u9891";
		this._tt_info4.appendChild(this._tt_info4__text);
		this.__9.appendChild(this._tt_info4);
		this._container_2.appendChild(this.__9);
		this.__8=document.createElement('div');
		this.__8.ggId="\u804a\u5929";
		this.__8.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__8.ggVisible=true;
		this.__8.className='ggskin ggskin_svg';
		this.__8.ggType='svg';
		this.__8.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(120 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 120px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__8.setAttribute('style',hs);
		this.__8__img=document.createElement('img');
		this.__8__img.className='ggskin ggskin_svg';
		this.__8__img.setAttribute('src',basePath + 'images/_8.svg');
		this.__8__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__8__img['ondragstart']=function() { return false; };
		this.__8.appendChild(this.__8__img);
		this.__8.onclick=function () {
			me.__8.style[domTransition]='none';
			me.__8.style.opacity='0.6';
			me.__8.style.visibility=me.__8.ggVisible?'inherit':'hidden';
			flag=me.__8.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__8.style[domTransition]='none';
			} else {
				me.__8.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__8.style.opacity='1';
				me.__8.style.visibility=me.__8.ggVisible?'inherit':'hidden';
			} else {
				me.__8.style.opacity='0.6';
				me.__8.style.visibility=me.__8.ggVisible?'inherit':'hidden';
			}
			me.__8.ggOpacitiyActive=!flag;
		}
		this.__8.onmouseover=function () {
			me._tt_info3.style[domTransition]='none';
			me._tt_info3.style.visibility='inherit';
			me._tt_info3.ggVisible=true;
			me.__8.style[domTransition]='none';
			me.__8.ggParameter.sx=1.2;me.__8.ggParameter.sy=1.2;
			me.__8.style[domTransform]=parameterToTransform(me.__8.ggParameter);
			me.__8__img.src=basePath + 'images/_8__o.svg';
		}
		this.__8.onmouseout=function () {
			me._tt_info3.style[domTransition]='none';
			me._tt_info3.style.visibility='hidden';
			me._tt_info3.ggVisible=false;
			me.__8.style[domTransition]='none';
			me.__8.ggParameter.sx=1;me.__8.ggParameter.sy=1;
			me.__8.style[domTransform]=parameterToTransform(me.__8.ggParameter);
			me.__8__img.src=basePath + 'images/_8.svg';
		}
		this._tt_info3=document.createElement('div');
		this._tt_info3__text=document.createElement('div');
		this._tt_info3.className='ggskin ggskin_textdiv';
		this._tt_info3.ggTextDiv=this._tt_info3__text;
		this._tt_info3.ggId="tt_info";
		this._tt_info3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info3.ggVisible=false;
		this._tt_info3.className='ggskin ggskin_text';
		this._tt_info3.ggType='text';
		this._tt_info3.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info3.setAttribute('style',hs);
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
		this._tt_info3__text.setAttribute('style',hs);
		this._tt_info3.ggTextDiv.innerHTML="\u6c9f\u901a";
		this._tt_info3.appendChild(this._tt_info3__text);
		this.__8.appendChild(this._tt_info3);
		this._container_2.appendChild(this.__8);
		this.__7=document.createElement('div');
		this.__7.ggId="\u5168\u5c4f";
		this.__7.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__7.ggVisible=true;
		this.__7.className='ggskin ggskin_svg';
		this.__7.ggType='svg';
		this.__7.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(225 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 225px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__7.setAttribute('style',hs);
		this.__7__img=document.createElement('img');
		this.__7__img.className='ggskin ggskin_svg';
		this.__7__img.setAttribute('src',basePath + 'images/_7.svg');
		this.__7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__7__img['ondragstart']=function() { return false; };
		this.__7.appendChild(this.__7__img);
		this.__7.onclick=function () {
			me.player.toggleFullscreen();
			flag=me.__7.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__7.style[domTransition]='none';
			} else {
				me.__7.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__7.style.opacity='1';
				me.__7.style.visibility=me.__7.ggVisible?'inherit':'hidden';
			} else {
				me.__7.style.opacity='0.6';
				me.__7.style.visibility=me.__7.ggVisible?'inherit':'hidden';
			}
			me.__7.ggOpacitiyActive=!flag;
		}
		this.__7.onmouseover=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='inherit';
			me._tt_fullscreen.ggVisible=true;
			me.__7.style[domTransition]='none';
			me.__7.ggParameter.sx=1.2;me.__7.ggParameter.sy=1.2;
			me.__7.style[domTransform]=parameterToTransform(me.__7.ggParameter);
			me.__7__img.src=basePath + 'images/_7__o.svg';
		}
		this.__7.onmouseout=function () {
			me._tt_fullscreen.style[domTransition]='none';
			me._tt_fullscreen.style.visibility='hidden';
			me._tt_fullscreen.ggVisible=false;
			me.__7.style[domTransition]='none';
			me.__7.ggParameter.sx=1;me.__7.ggParameter.sy=1;
			me.__7.style[domTransform]=parameterToTransform(me.__7.ggParameter);
			me.__7__img.src=basePath + 'images/_7.svg';
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
		this._tt_fullscreen.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
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
		this.__7.appendChild(this._tt_fullscreen);
		this._container_2.appendChild(this.__7);
		this.__6=document.createElement('div');
		this.__6.ggId="\u8d2d\u7269";
		this.__6.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__6.ggVisible=true;
		this.__6.className='ggskin ggskin_svg';
		this.__6.ggType='svg';
		this.__6.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(85 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 85px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__6.setAttribute('style',hs);
		this.__6__img=document.createElement('img');
		this.__6__img.className='ggskin ggskin_svg';
		this.__6__img.setAttribute('src',basePath + 'images/_6.svg');
		this.__6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__6__img['ondragstart']=function() { return false; };
		this.__6.appendChild(this.__6__img);
		this.__6.onclick=function () {
			flag=me.__6.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__6.style[domTransition]='none';
			} else {
				me.__6.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__6.style.opacity='1';
				me.__6.style.visibility=me.__6.ggVisible?'inherit':'hidden';
			} else {
				me.__6.style.opacity='0.6';
				me.__6.style.visibility=me.__6.ggVisible?'inherit':'hidden';
			}
			me.__6.ggOpacitiyActive=!flag;
		}
		this.__6.onmouseover=function () {
			me._tt_info2.style[domTransition]='none';
			me._tt_info2.style.visibility='inherit';
			me._tt_info2.ggVisible=true;
			me.__6.style[domTransition]='none';
			me.__6.ggParameter.sx=1.2;me.__6.ggParameter.sy=1.2;
			me.__6.style[domTransform]=parameterToTransform(me.__6.ggParameter);
			me.__6__img.src=basePath + 'images/_6__o.svg';
		}
		this.__6.onmouseout=function () {
			me._tt_info2.style[domTransition]='none';
			me._tt_info2.style.visibility='hidden';
			me._tt_info2.ggVisible=false;
			me.__6.style[domTransition]='none';
			me.__6.ggParameter.sx=1;me.__6.ggParameter.sy=1;
			me.__6.style[domTransform]=parameterToTransform(me.__6.ggParameter);
			me.__6__img.src=basePath + 'images/_6.svg';
		}
		this._tt_info2=document.createElement('div');
		this._tt_info2__text=document.createElement('div');
		this._tt_info2.className='ggskin ggskin_textdiv';
		this._tt_info2.ggTextDiv=this._tt_info2__text;
		this._tt_info2.ggId="tt_info";
		this._tt_info2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._tt_info2.ggVisible=false;
		this._tt_info2.className='ggskin ggskin_text';
		this._tt_info2.ggType='text';
		this._tt_info2.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
		hs+='width: 148px;';
		hs+='height: 18px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._tt_info2.setAttribute('style',hs);
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
		this._tt_info2__text.setAttribute('style',hs);
		this._tt_info2.ggTextDiv.innerHTML="\u94fe\u63a5";
		this._tt_info2.appendChild(this._tt_info2__text);
		this.__6.appendChild(this._tt_info2);
		this._container_2.appendChild(this.__6);
		this.__5=document.createElement('div');
		this.__5.ggId="\u6a21\u578b";
		this.__5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__5.ggVisible=true;
		this.__5.className='ggskin ggskin_svg';
		this.__5.ggType='svg';
		this.__5.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(190 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 190px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__5.setAttribute('style',hs);
		this.__5__img=document.createElement('img');
		this.__5__img.className='ggskin ggskin_svg';
		this.__5__img.setAttribute('src',basePath + 'images/_5.svg');
		this.__5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__5__img['ondragstart']=function() { return false; };
		this.__5.appendChild(this.__5__img);
		this.__5.onclick=function () {
			flag=(me.__0.style.visibility=='hidden');
			me.__0.style[domTransition]='none';
			me.__0.style.visibility=flag?'inherit':'hidden';
			me.__0.ggVisible=flag;
			flag=me.__5.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__5.style[domTransition]='none';
			} else {
				me.__5.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__5.style.opacity='1';
				me.__5.style.visibility=me.__5.ggVisible?'inherit':'hidden';
			} else {
				me.__5.style.opacity='0.6';
				me.__5.style.visibility=me.__5.ggVisible?'inherit':'hidden';
			}
			me.__5.ggOpacitiyActive=!flag;
		}
		this.__5.onmouseover=function () {
			me._tt_info1.style[domTransition]='none';
			me._tt_info1.style.visibility='inherit';
			me._tt_info1.ggVisible=true;
			me.__5.style[domTransition]='none';
			me.__5.ggParameter.sx=1.2;me.__5.ggParameter.sy=1.2;
			me.__5.style[domTransform]=parameterToTransform(me.__5.ggParameter);
			me.__5__img.src=basePath + 'images/_5__o.svg';
		}
		this.__5.onmouseout=function () {
			me._tt_info1.style[domTransition]='none';
			me._tt_info1.style.visibility='hidden';
			me._tt_info1.ggVisible=false;
			me.__5.style[domTransition]='none';
			me.__5.ggParameter.sx=1;me.__5.ggParameter.sy=1;
			me.__5.style[domTransform]=parameterToTransform(me.__5.ggParameter);
			me.__5__img.src=basePath + 'images/_5.svg';
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
		this._tt_info1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
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
		this._tt_info1.ggTextDiv.innerHTML="\u5207\u6362\u6a21\u578b";
		this._tt_info1.appendChild(this._tt_info1__text);
		this.__5.appendChild(this._tt_info1);
		this._container_2.appendChild(this.__5);
		this.__4=document.createElement('div');
		this.__4.ggId="\u5730\u7406\u4f4d\u7f6e";
		this.__4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__4.ggVisible=true;
		this.__4.className='ggskin ggskin_svg';
		this.__4.ggType='svg';
		this.__4.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(50 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 50px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__4.setAttribute('style',hs);
		this.__4__img=document.createElement('img');
		this.__4__img.className='ggskin ggskin_svg';
		this.__4__img.setAttribute('src',basePath + 'images/_4.svg');
		this.__4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__4__img['ondragstart']=function() { return false; };
		this.__4.appendChild(this.__4__img);
		this.__4.onclick=function () {
			flag=me.__4.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__4.style[domTransition]='none';
			} else {
				me.__4.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__4.style.opacity='1';
				me.__4.style.visibility=me.__4.ggVisible?'inherit':'hidden';
			} else {
				me.__4.style.opacity='0.6';
				me.__4.style.visibility=me.__4.ggVisible?'inherit':'hidden';
			}
			me.__4.ggOpacitiyActive=!flag;
		}
		this.__4.onmouseover=function () {
			me._tt_info0.style[domTransition]='none';
			me._tt_info0.style.visibility='inherit';
			me._tt_info0.ggVisible=true;
			me.__4.style[domTransition]='none';
			me.__4.ggParameter.sx=1.2;me.__4.ggParameter.sy=1.2;
			me.__4.style[domTransform]=parameterToTransform(me.__4.ggParameter);
			me.__4__img.src=basePath + 'images/_4__o.svg';
		}
		this.__4.onmouseout=function () {
			me._tt_info0.style[domTransition]='none';
			me._tt_info0.style.visibility='hidden';
			me._tt_info0.ggVisible=false;
			me.__4.style[domTransition]='none';
			me.__4.ggParameter.sx=1;me.__4.ggParameter.sy=1;
			me.__4.style[domTransform]=parameterToTransform(me.__4.ggParameter);
			me.__4__img.src=basePath + 'images/_4.svg';
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
		this._tt_info0.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
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
		this._tt_info0.ggTextDiv.innerHTML="\u4f4d\u7f6e";
		this._tt_info0.appendChild(this._tt_info0__text);
		this.__4.appendChild(this._tt_info0);
		this._container_2.appendChild(this.__4);
		this.__3=document.createElement('div');
		this.__3.ggId="\u5e03\u6599";
		this.__3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__3.ggVisible=true;
		this.__3.className='ggskin ggskin_svg';
		this.__3.ggType='svg';
		this.__3.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(155 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-53 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 155px;';
		hs+='top:  -53px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__3.setAttribute('style',hs);
		this.__3__img=document.createElement('img');
		this.__3__img.className='ggskin ggskin_svg';
		this.__3__img.setAttribute('src',basePath + 'images/_3.svg');
		this.__3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__3__img['ondragstart']=function() { return false; };
		this.__3.appendChild(this.__3__img);
		this.__3.onclick=function () {
			me.player.changeViewState("2",1);
			flag=me.__3.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__3.style[domTransition]='none';
			} else {
				me.__3.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__3.style.opacity='1';
				me.__3.style.visibility=me.__3.ggVisible?'inherit':'hidden';
			} else {
				me.__3.style.opacity='0.6';
				me.__3.style.visibility=me.__3.ggVisible?'inherit':'hidden';
			}
			me.__3.ggOpacitiyActive=!flag;
		}
		this.__3.ondblclick=function () {
			me.player.changeViewState("0",1);
		}
		this.__3.onmouseover=function () {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility='inherit';
			me._tt_info.ggVisible=true;
			me.__3.style[domTransition]='none';
			me.__3.ggParameter.sx=1.2;me.__3.ggParameter.sy=1.2;
			me.__3.style[domTransform]=parameterToTransform(me.__3.ggParameter);
			me.__3__img.src=basePath + 'images/_3__o.svg';
		}
		this.__3.onmouseout=function () {
			me._tt_info.style[domTransition]='none';
			me._tt_info.style.visibility='hidden';
			me._tt_info.ggVisible=false;
			me.__3.style[domTransition]='none';
			me.__3.ggParameter.sx=1;me.__3.ggParameter.sy=1;
			me.__3.style[domTransform]=parameterToTransform(me.__3.ggParameter);
			me.__3__img.src=basePath + 'images/_3.svg';
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
		this._tt_info.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-72 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(3 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -72px;';
		hs+='top:  3px;';
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
		this._tt_info.ggTextDiv.innerHTML="\u5207\u6362\u9762\u6599\/\u53cc\u51fb\u8fd8\u539f";
		this._tt_info.appendChild(this._tt_info__text);
		this.__3.appendChild(this._tt_info);
		this._container_2.appendChild(this.__3);
		this.__0=document.createElement('div');
		this.__0.ggId="\u6a21\u578b\u5217\u8868";
		this.__0.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__0.ggVisible=false;
		this.__0.className='ggskin ggskin_container';
		this.__0.ggType='container';
		this.__0.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(117 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-114 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 117px;';
		hs+='top:  -114px;';
		hs+='width: 32px;';
		hs+='height: 61px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__0.setAttribute('style',hs);
		this.__1=document.createElement('div');
		this.__1.ggId="\u6a21\u578b1";
		this.__1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__1.ggVisible=true;
		this.__1.className='ggskin ggskin_svg';
		this.__1.ggType='svg';
		this.__1.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(57 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-35 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 57px;';
		hs+='top:  -35px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__1.setAttribute('style',hs);
		this.__1__img=document.createElement('img');
		this.__1__img.className='ggskin ggskin_svg';
		this.__1__img.setAttribute('src',basePath + 'images/_1.svg');
		this.__1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__1__img['ondragstart']=function() { return false; };
		this.__1.appendChild(this.__1__img);
		this.__1.onclick=function () {
			me.player.changeViewState("0",1);
			flag=me.__1.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__1.style[domTransition]='none';
			} else {
				me.__1.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__1.style.opacity='1';
				me.__1.style.visibility=me.__1.ggVisible?'inherit':'hidden';
			} else {
				me.__1.style.opacity='0.6';
				me.__1.style.visibility=me.__1.ggVisible?'inherit':'hidden';
			}
			me.__1.ggOpacitiyActive=!flag;
		}
		this.__1.onmouseover=function () {
			me.__1.style[domTransition]='none';
			me.__1.ggParameter.sx=1.2;me.__1.ggParameter.sy=1.2;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			me.__1__img.src=basePath + 'images/_1__o.svg';
		}
		this.__1.onmouseout=function () {
			me.__1.style[domTransition]='none';
			me.__1.ggParameter.sx=1;me.__1.ggParameter.sy=1;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			me.__1__img.src=basePath + 'images/_1.svg';
		}
		this.__0.appendChild(this.__1);
		this.__2=document.createElement('div');
		this.__2.ggId="\u6a21\u578b2";
		this.__2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__2.ggVisible=true;
		this.__2.className='ggskin ggskin_svg';
		this.__2.ggType='svg';
		this.__2.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(57 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-71 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 57px;';
		hs+='top:  -71px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__2.setAttribute('style',hs);
		this.__2__img=document.createElement('img');
		this.__2__img.className='ggskin ggskin_svg';
		this.__2__img.setAttribute('src',basePath + 'images/_2.svg');
		this.__2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 32px;height: 32px;-webkit-user-drag:none;');
		this.__2__img['ondragstart']=function() { return false; };
		this.__2.appendChild(this.__2__img);
		this.__2.onclick=function () {
			me.player.changeViewState("1",1);
			flag=me.__2.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me.__2.style[domTransition]='none';
			} else {
				me.__2.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me.__2.style.opacity='1';
				me.__2.style.visibility=me.__2.ggVisible?'inherit':'hidden';
			} else {
				me.__2.style.opacity='0.6';
				me.__2.style.visibility=me.__2.ggVisible?'inherit':'hidden';
			}
			me.__2.ggOpacitiyActive=!flag;
		}
		this.__2.onmouseover=function () {
			me.__2.style[domTransition]='none';
			me.__2.ggParameter.sx=1.2;me.__2.ggParameter.sy=1.2;
			me.__2.style[domTransform]=parameterToTransform(me.__2.ggParameter);
			me.__2__img.src=basePath + 'images/_2__o.svg';
		}
		this.__2.onmouseout=function () {
			me.__2.style[domTransition]='none';
			me.__2.ggParameter.sx=1;me.__2.ggParameter.sy=1;
			me.__2.style[domTransform]=parameterToTransform(me.__2.ggParameter);
			me.__2__img.src=basePath + 'images/_2.svg';
		}
		this.__0.appendChild(this.__2);
		this._container_2.appendChild(this.__0);
		this.__=document.createElement('div');
		this.__.ggId="\u66f4\u591a\u6750\u8d28";
		this.__.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__.ggVisible=false;
		this.__.className='ggskin ggskin_container';
		this.__.ggType='container';
		this.__.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(102 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-114 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: 102px;';
		hs+='top:  -114px;';
		hs+='width: 32px;';
		hs+='height: 61px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this.__.setAttribute('style',hs);
		this._container_2.appendChild(this.__);
		this.divSkin.appendChild(this._container_2);
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
		if (me.elementMouseDown['_13']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['_12']) {
			me.player.changeFovLog(1,true);
		}
	};
	this.addSkin();
};