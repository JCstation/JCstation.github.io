// Garden Gnome Software - Skin
// Object2VR 3.1.9/10783
// Filename: JC.ggsk
// Generated 周二 4月 16 04:58:57 2024

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
		this._loading_image=document.createElement('div');
		this._loading_image.ggId="loading image";
		this._loading_image.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_image.ggVisible=true;
		this._loading_image.className='ggskin ggskin_image';
		this._loading_image.ggType='image';
		this._loading_image.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-112 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-32 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -112px;';
		hs+='top:  -32px;';
		hs+='width: 224px;';
		hs+='height: 64px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading_image.setAttribute('style',hs);
		this._loading_image__img=document.createElement('img');
		this._loading_image__img.className='ggskin ggskin_image';
		this._loading_image__img.setAttribute('src',basePath + 'images/loading_image.png');
		this._loading_image__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._loading_image__img.className='ggskin ggskin_image';
		this._loading_image__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._loading_image__img);
		this._loading_image.appendChild(this._loading_image__img);
		this._loading_text=document.createElement('div');
		this._loading_text__text=document.createElement('div');
		this._loading_text.className='ggskin ggskin_textdiv';
		this._loading_text.ggTextDiv=this._loading_text__text;
		this._loading_text.ggId="loading text";
		this._loading_text.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_text.ggVisible=true;
		this._loading_text.className='ggskin ggskin_text';
		this._loading_text.ggType='text';
		hs ='position:absolute;';
		hs+='left: 12px;';
		hs+='top:  14px;';
		hs+='width: 198px;';
		hs+='height: 20px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading_text.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 198px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._loading_text__text.setAttribute('style',hs);
		this._loading_text.ggUpdateText=function() {
			var hs="<b>Loading... "+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
			}
		}
		this._loading_text.ggUpdateText();
		this._loading_text.appendChild(this._loading_text__text);
		this._loading_image.appendChild(this._loading_text);
		this._loading_bar=document.createElement('div');
		this._loading_bar.ggId="loading bar";
		this._loading_bar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_bar.ggVisible=true;
		this._loading_bar.className='ggskin ggskin_rectangle';
		this._loading_bar.ggType='rectangle';
		hs ='position:absolute;';
		hs+='left: 11px;';
		hs+='top:  39px;';
		hs+='width: 198px;';
		hs+='height: 10px;';
		hs+=cssPrefix + 'transform-origin: 0% 50%;';
		hs+='visibility: inherit;';
		hs+='background: #4f4f4f;';
		hs+='border: 2px solid #000000;';
		this._loading_bar.setAttribute('style',hs);
		this._loading_image.appendChild(this._loading_bar);
		this._loading_close=document.createElement('div');
		this._loading_close.ggId="loading close";
		this._loading_close.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_close.ggVisible=true;
		this._loading_close.className='ggskin ggskin_image';
		this._loading_close.ggType='image';
		hs ='position:absolute;';
		hs+='left: 200px;';
		hs+='top:  1px;';
		hs+='width: 24px;';
		hs+='height: 24px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading_close.setAttribute('style',hs);
		this._loading_close__img=document.createElement('img');
		this._loading_close__img.className='ggskin ggskin_image';
		this._loading_close__img.setAttribute('src',basePath + 'images/loading_close.png');
		this._loading_close__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._loading_close__img.className='ggskin ggskin_image';
		this._loading_close__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._loading_close__img);
		this._loading_close.appendChild(this._loading_close__img);
		this._loading_close.onclick=function () {
			me._loading_image.style[domTransition]='none';
			me._loading_image.style.visibility='hidden';
			me._loading_image.ggVisible=false;
		}
		this._loading_image.appendChild(this._loading_close);
		this.divSkin.appendChild(this._loading_image);
		this._toolbar=document.createElement('div');
		this._toolbar.ggId="toolbar";
		this._toolbar.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		this._toolbar.ggVisible=true;
		this._toolbar.className='ggskin ggskin_rectangle';
		this._toolbar.ggType='rectangle';
		this._toolbar.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
				this.style.left=Math.floor(-139 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
				this.style.top=Math.floor(-61 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -139px;';
		hs+='top:  -61px;';
		hs+='width: 277px;';
		hs+='height: 35px;';
		hs+=cssPrefix + 'transform-origin: 50% 100%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._toolbar.ggParameter) + ';';
		hs+='opacity: 0.5;';
		hs+='visibility: inherit;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.00392157);';
		hs+='border: 0px solid #000000;';
		this._toolbar.setAttribute('style',hs);
		this._toolbar.onmouseover=function () {
			if (me.player.transitionsDisabled) {
				me._toolbar.style[domTransition]='none';
			} else {
				me._toolbar.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._toolbar.ggParameter.sx=1;me._toolbar.ggParameter.sy=1;
			me._toolbar.style[domTransform]=parameterToTransform(me._toolbar.ggParameter);
			if (me.player.transitionsDisabled) {
				me._toolbar.style[domTransition]='none';
			} else {
				me._toolbar.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._toolbar.style.opacity='1';
			me._toolbar.style.visibility=me._toolbar.ggVisible?'inherit':'hidden';
		}
		this._toolbar.onmouseout=function () {
			if (me.player.transitionsDisabled) {
				me._toolbar.style[domTransition]='none';
			} else {
				me._toolbar.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._toolbar.ggParameter.sx=0.5;me._toolbar.ggParameter.sy=0.5;
			me._toolbar.style[domTransform]=parameterToTransform(me._toolbar.ggParameter);
			if (me.player.transitionsDisabled) {
				me._toolbar.style[domTransition]='none';
			} else {
				me._toolbar.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._toolbar.style.opacity='0.5';
			me._toolbar.style.visibility=me._toolbar.ggVisible?'inherit':'hidden';
		}
		this._svg_1=document.createElement('div');
		this._svg_1.ggId="Svg 1";
		this._svg_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._svg_1.ggVisible=true;
		this._svg_1.className='ggskin ggskin_svg';
		this._svg_1.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 98px;';
		hs+='top:  2px;';
		hs+='width: 31px;';
		hs+='height: 31px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._svg_1.setAttribute('style',hs);
		this._svg_1__img=document.createElement('img');
		this._svg_1__img.className='ggskin ggskin_svg';
		this._svg_1__img.setAttribute('src',basePath + 'images/svg_1.svg');
		this._svg_1__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 31px;height: 31px;-webkit-user-drag:none;');
		this._svg_1__img['ondragstart']=function() { return false; };
		this._svg_1.appendChild(this._svg_1__img);
		this._svg_1.onclick=function () {
			me.player.changePanLog(-1,true);
		}
		this._svg_1.onmouseover=function () {
			me._svg_1__img.src=basePath + 'images/svg_1__o.svg';
		}
		this._svg_1.onmouseout=function () {
			me._svg_1__img.src=basePath + 'images/svg_1.svg';
		}
		this._toolbar.appendChild(this._svg_1);
		this._svg_4=document.createElement('div');
		this._svg_4.ggId="Svg 4";
		this._svg_4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._svg_4.ggVisible=true;
		this._svg_4.className='ggskin ggskin_svg';
		this._svg_4.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 62px;';
		hs+='top:  2px;';
		hs+='width: 31px;';
		hs+='height: 31px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._svg_4.setAttribute('style',hs);
		this._svg_4__img=document.createElement('img');
		this._svg_4__img.className='ggskin ggskin_svg';
		this._svg_4__img.setAttribute('src',basePath + 'images/svg_4.svg');
		this._svg_4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 31px;height: 31px;-webkit-user-drag:none;');
		this._svg_4__img['ondragstart']=function() { return false; };
		this._svg_4.appendChild(this._svg_4__img);
		this._svg_4.onclick=function () {
			me.player.changePanLog(1,true);
		}
		this._svg_4.onmouseover=function () {
			me._svg_4__img.src=basePath + 'images/svg_4__o.svg';
		}
		this._svg_4.onmouseout=function () {
			me._svg_4__img.src=basePath + 'images/svg_4.svg';
		}
		this._toolbar.appendChild(this._svg_4);
		this._svg_2=document.createElement('div');
		this._svg_2.ggId="Svg 2";
		this._svg_2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._svg_2.ggVisible=true;
		this._svg_2.className='ggskin ggskin_svg';
		this._svg_2.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 131px;';
		hs+='top:  2px;';
		hs+='width: 31px;';
		hs+='height: 31px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._svg_2.setAttribute('style',hs);
		this._svg_2__img=document.createElement('img');
		this._svg_2__img.className='ggskin ggskin_svg';
		this._svg_2__img.setAttribute('src',basePath + 'images/svg_2.svg');
		this._svg_2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 31px;height: 31px;-webkit-user-drag:none;');
		this._svg_2__img['ondragstart']=function() { return false; };
		this._svg_2.appendChild(this._svg_2__img);
		this._svg_2.onclick=function () {
			me.player.toggleFullscreen();
		}
		this._svg_2.onmouseover=function () {
			me._svg_2__img.src=basePath + 'images/svg_2__o.svg';
		}
		this._svg_2.onmouseout=function () {
			me._svg_2__img.src=basePath + 'images/svg_2.svg';
		}
		this._toolbar.appendChild(this._svg_2);
		this._svg_3=document.createElement('div');
		this._svg_3.ggId="Svg 3";
		this._svg_3.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._svg_3.ggVisible=true;
		this._svg_3.className='ggskin ggskin_svg';
		this._svg_3.ggType='svg';
		hs ='position:absolute;';
		hs+='left: 165px;';
		hs+='top:  2px;';
		hs+='width: 31px;';
		hs+='height: 31px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._svg_3.setAttribute('style',hs);
		this._svg_3__img=document.createElement('img');
		this._svg_3__img.className='ggskin ggskin_svg';
		this._svg_3__img.setAttribute('src',basePath + 'images/svg_3.svg');
		this._svg_3__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 31px;height: 31px;-webkit-user-drag:none;');
		this._svg_3__img['ondragstart']=function() { return false; };
		this._svg_3.appendChild(this._svg_3__img);
		this._svg_3.onclick=function () {
			me.player.changeViewState("1",0.2);
		}
		this._svg_3.ondblclick=function () {
			me.player.changeViewState("0",0.2);
		}
		this._svg_3.onmouseover=function () {
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility='inherit';
			me._text_1.ggVisible=true;
			me._svg_3__img.src=basePath + 'images/svg_3__o.svg';
		}
		this._svg_3.onmouseout=function () {
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility='hidden';
			me._text_1.ggVisible=false;
			me._svg_3__img.src=basePath + 'images/svg_3.svg';
		}
		this._text_1=document.createElement('div');
		this._text_1__text=document.createElement('div');
		this._text_1.className='ggskin ggskin_textdiv';
		this._text_1.ggTextDiv=this._text_1__text;
		this._text_1.ggId="Text 1";
		this._text_1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._text_1.ggVisible=false;
		this._text_1.className='ggskin ggskin_text';
		this._text_1.ggType='text';
		hs ='position:absolute;';
		hs+='left: -37px;';
		hs+='top:  -16px;';
		hs+='width: 101px;';
		hs+='height: 28px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		this._text_1.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 101px;';
		hs+='height: 28px;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._text_1__text.setAttribute('style',hs);
		this._text_1.ggTextDiv.innerHTML="\u5207\u6362\u989c\u8272";
		this._text_1.appendChild(this._text_1__text);
		this._svg_3.appendChild(this._text_1);
		this._toolbar.appendChild(this._svg_3);
		this.divSkin.appendChild(this._toolbar);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
			me._loading_image.style[domTransition]='none';
			me._loading_image.style.visibility='hidden';
			me._loading_image.ggVisible=false;
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
		this._loading_text.ggUpdateText();
		var hs='';
		if (me._loading_bar.ggParameter) {
			hs+=parameterToTransform(me._loading_bar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
		me._loading_bar.style[domTransform]=hs;
	};
	this.addSkin();
};