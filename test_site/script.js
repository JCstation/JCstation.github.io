// 获取画布元素
const canvas3d = document.getElementById("canvas-3d");
const canvas2d = document.getElementById("canvas-2d");

// 设置画布尺寸
canvas2d.width = window.innerWidth / 2;
canvas2d.height = window.innerHeight;

// 获取画布上下文
var ctx = canvas2d.getContext("2d");

// 绘制一个矩形，作为2D画布的背景
ctx.fillStyle = "#EEEEEE";
ctx.fillRect(0, 0, canvas2d.width, canvas2d.height);

// 创建场景
const scene = new THREE.Scene();

// 创建摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ canvas: canvas3d });
renderer.setSize(window.innerWidth / 2, window.innerHeight);

// 添加立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加灯光
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// 添加控制器
const controls = new THREE.OrbitControls(camera, canvas3d);

// 创建一个2D上下文
const ctx2d = canvas2d.getContext("2d");

function render() {
  requestAnimationFrame(render);
  
// 绘制立方体的UV贴图到2D画布上
const position = new THREE.Vector3();
const rotation = new THREE.Euler();
const scale = new THREE.Vector3();
const canvasSize = new THREE.Vector2(canvas2d.width, canvas2d.height);
const canvasPadding = new THREE.Vector2(20, 20);
const canvasPosition = new THREE.Vector2(canvasPadding.x / 2, canvasPadding.y / 2);
const canvasRect = new THREE.Box2(canvasPosition, canvasPosition.clone().add(canvasSize));

cube.updateMatrixWorld();
cube.geometry.computeBoundingBox();

cube.geometry.faceVertexUvs[0].forEach((faceUVs, faceIndex) => {
const face = cube.geometry.faces[faceIndex];
const uv0 = faceUVs[0].clone().multiply(canvasSize).add(canvasPadding);
const uv1 = faceUVs[1].clone().multiply(canvasSize).add(canvasPadding);
const uv2 = faceUVs[2].clone().multiply(canvasSize).add(canvasPadding);
const uvCenter = new THREE.Vector2().add(uv0).add(uv1).add(uv2).multiplyScalar(1 / 3);
const triangleRect = new THREE.Triangle(uv0, uv1, uv2).getBoundingBox(new THREE.Box2());
const triangleSize = triangleRect.getSize(new THREE.Vector2());
const triangleScale = new THREE.Vector2().copy(canvasSize).sub(canvasPadding).divide(triangleSize);
const trianglePosition = uvCenter.clone().sub(triangleRect.getCenter(new THREE.Vector2())).multiply(triangleScale);
const triangleMatrix = new THREE.Matrix3()
.scale(triangleScale)
.translate(trianglePosition.x, trianglePosition.y)
.multiply(new THREE.Matrix3().set(
uv0.x - uvCenter.x, uv1.x - uvCenter.x, uv2.x - uvCenter.x,
uv0.y - uvCenter.y, uv1.y - uvCenter.y, uv2.y - uvCenter.y,
0, 0, 1
));
const uvRect = new THREE.Box2().setFromPoints([uv0, uv1, uv2]);
const intersection = canvasRect.intersect(uvRect);

if (intersection) {
  const canvasUv0 = intersection.min.clone().sub(canvasPosition).applyMatrix3(triangleMatrix);
  const canvasUv1 = intersection.max.clone().sub(canvasPosition).applyMatrix3(triangleMatrix);
  const canvasUv2 = new THREE.Vector2().copy(canvasUv1).setX(canvasUv0.x);

  ctx.beginPath();
  ctx.moveTo(canvasUv0.x, canvasUv0.y);
  ctx.lineTo(canvasUv1.x, canvasUv1.y);
  ctx.lineTo(canvasUv2.x, canvasUv2.y);
  ctx.closePath();

  ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  ctx.fill();
}
});
}