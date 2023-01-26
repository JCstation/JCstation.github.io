"use strict";window.addEventListener("load",async()=>{let e;BABYLON.apps=[],e=new class{constructor(e){this.canvas=e?"string"==typeof e?document.getElementById(e):e:null,this.engine=null,this.scene=null,this.camera=null,this.env=null,this.defaultRendingPipline=null,this.defautlMaterial=null,this.keepAssets=null,this.fps=null,this.running=!1,this._glob={},this.glob={}}setup(){if(!this.canvas){document.body.style.width="100%",document.body.style.height="100%",document.body.style.margin="0",document.body.style.padding="0";const e=document.createElement("div"),t=(e.style.width="100%",e.style.height="100%",document.body.appendChild(e),document.createElement("canvas"));t.id="renderCanvas",t.style.width="100%",t.style.height="100%",t.style.display="block",e.appendChild(t),t.width=window.innerWidth,t.height=window.innerHeight,this.canvas=t}return this.engine=new BABYLON.Engine(this.canvas,!0,{stencil:!0}),this.scene=new BABYLON.Scene(this.engine),this.camera=new BABYLON.ArcRotateCamera("defaultCamera",-Math.PI/2,Math.PI/3,10,BABYLON.Vector3.Zero(),this.scene),this.camera.lowerRadiusLimit=1,this.camera.wheelPrecision=24,this.camera.attachControl(this.canvas),this.scene.activeCamera=this.camera,this.defautlMaterial=new BABYLON.PBRMaterial("defaultMaterial",this.scene),this.defautlMaterial.roughness=1,this.scene.defautlMaterial=this.defautlMaterial,this.keepAssets=new BABYLON.KeepAssets,this.keepAssets.cameras.push(this.camera),this.keepAssets.materials.push(this.defautlMaterial),window.addEventListener("resize",this.resize),this}resize=()=>this.engine.resize();beforeRun(){}run(){this.beforeRun&&this.beforeRun(),this.engine.runRenderLoop(()=>this.scene.render()),this.running=!0}stop(){this.running&&this.engine.stopRenderLoop(),this.running=!1}getFps(){return this.engine.getFps().toFixed()}dispose(){window.removeEventListener("resize",this._resize),this.engine.dispose()}}("renderCanvas").setup(),BABYLON.apps.push(e),await BABYLON.Tools.LoadScriptAsync("./assets/js/visual_logic.js"),e.run()});