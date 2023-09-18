<template>
  <div class="login" id="login">
    <!-- <h2 class="login-title">Smlz CMS</h2> -->
    <!-- <login-panel></login-panel> -->
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import random from 'lodash/random'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted } from 'vue'
// import LoginPanel from './c-cpns/login-panel.vue'

let container: HTMLElement | null = null //容器
let scene: any = '' //场景
let camera: any = '' //相机
let renderer: any = '' //渲染器
let sphere: any = '' //球体网格

const IMAGE_SKY = new URL('@/assets/sky.jpg', import.meta.url) //加载图片
const IMAGE_BOX = new URL('@/assets/box.jpg', import.meta.url) //加载图片
const IMAGE_STAR1 = new URL('@/assets/star.jpg', import.meta.url) //加载图片
const IMAGE_STAR2 = new URL('@/assets/dian.jpg', import.meta.url) //加载图片

let width: number = 0 //宽度
let height: number = 0 //高度
let depth = 1400 //深度
let zAxisNumber = 0 //相机在z轴的位置

let parameters: any = '' //点的初始参数
let materials: any = [] //点的材质
let particles_init_portions: any = [] //点的初始位置
let pointGeometry: any = []

onMounted(() => {
  container = document.getElementById('login')
  width = container!.clientWidth
  height = container!.clientHeight
  initScene()
  initSceneBg()
  initCamera()
  initSphereGeometry()
  //定于初始位置
  particles_init_portions = -zAxisNumber - depth / 2
  pointGeometry = initSceneStar(particles_init_portions)
  console.log(pointGeometry)

  initLight()
  initRenderer()
  initOrbitControls()
  animate()
})

//初始化场景
function initScene() {
  scene = new THREE.Scene()
  //添加雾效果
  scene.fog = new THREE.Fog(0x000000, 0, 10000)
}

//添加背景
function initSceneBg() {
  new THREE.TextureLoader().load(IMAGE_SKY, (texture: any) => {
    //创建立方体
    const geometry = new THREE.BoxGeometry(width, height, depth)
    //添加材质
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    //创建网格
    const mesh = new THREE.Mesh(geometry, material)
    //添加到场景
    scene.add(mesh)
  })
}

//初始化球体
function initSphereGeometry() {
  //创建球体几何体
  const geometry = new THREE.SphereGeometry(50, 64, 32)
  //创建高光反射材质
  const material = new THREE.MeshPhongMaterial()
  //创建纹理
  material.map = new THREE.TextureLoader().load(IMAGE_BOX)
  //创建网格
  sphere = new THREE.Mesh(geometry, material)
  //球体位置
  sphere.position.set(-400, 200, -200)
  //添加到场景
  scene.add(sphere)
}

//球体自转
function renderSphereRotate() {
  sphere.rotateY(0.01)
}

//添加光照
function initLight() {
  //创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  //添加到场景
  scene.add(ambientLight)
  //创建点光源
  const pointLight = new THREE.PointLight(0x0655fd, 5, 0)
  //点光源位置
  pointLight.position.set(0, 100, -200)
  //添加到场景
  scene.add(pointLight)
}

//初始化相机
function initCamera() {
  //视野夹角
  const fov = 15
  //计算相机距离物体的距离
  const distance = width / 2 / Math.tan(Math.PI / 12)
  //相机在z轴的位置
  zAxisNumber = Math.floor(distance - 1400 / 2)
  //定义相机
  camera = new THREE.PerspectiveCamera(fov, width / height, 1, 30000)
  //设置相机所在的位置
  camera.position.set(0, 0, zAxisNumber)
  //相机看向原点
  camera.lookAt(0, 0, 0)
}

//初始化星星
function initSceneStar(initZportions: number) {
  //创建几何体
  const geometry = new THREE.BufferGeometry()
  //星星的位置坐标
  const vertices = []
  //创建纹理
  const texture1 = new THREE.TextureLoader().load(IMAGE_STAR1)
  const texture2 = new THREE.TextureLoader().load(IMAGE_STAR1)
  //星星的数据
  const pointGeometry = []
  //声明点的参数
  parameters = [
    [[0.6, 100, 0.75], texture1, 50],
    [[0, 0, 1], texture2, 20]
  ]
  //创建1500个星星
  for (let i = 0; i < 1500; i++) {
    const x = THREE.MathUtils.randFloatSpread(width)
    const y = random(0, height / 2)
    const z = random(-depth / 2, zAxisNumber)
    vertices.push(x, y, z)
  }
  //物体设置坐标
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  //创建两种不同的材质
  for (let i = 0; i < parameters.length; i++) {
    //颜色
    const color = parameters[i][0]
    //纹理
    const texture = parameters[i][1]
    //点的大小
    const size = parameters[i][2]
    //设置材质
    materials[i] = new THREE.PointsMaterial({ size, map: texture })
    //设置颜色
    materials[i].color.setHSL(color[0], color[1], color[2])
    //创建物体
    const star = new THREE.Points(geometry, materials[i])
    //设置角度
    star.rotation.x = Math.random() * 0.2 - 0.15
    star.rotation.y = Math.random() * 0.2 - 0.15
    star.rotation.z = Math.random() * 0.2 - 0.15
    star.position.setZ(initZportions)
    pointGeometry.push(star)
    scene.add(star)
  }

  return pointGeometry
}

//初始化渲染器
function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  //定于渲染器的尺寸
  renderer.setSize(width, height)
  //添加到页面中
  container?.appendChild(renderer.domElement)
}

//添加轨道控制器
function initOrbitControls() {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = true //开启阻尼效果，类似物理中的弹簧效果
  controls.update()
}

//动画刷新
function animate() {
  requestAnimationFrame(animate)
  renderSphereRotate()
  pointGeometry.forEach((star: any) => {
    star.position.z = star.position.z + 10
  })
  renderer.render(scene, camera)
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  // background: url('https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/l3/wallhaven-l36xyy.png?w=2560&h=1440&fmt=webp')
  //   center;
  // background-size: cover;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  .login-title {
    font-size: 36px;
    padding-bottom: 50px;
    margin-top: 20vh;
  }
}
</style>
