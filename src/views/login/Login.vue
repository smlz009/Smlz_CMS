<template>
  <div class="login" id="login">
    <!-- <h2 class="login-title">Smlz CMS</h2> -->
    <!-- <login-panel></login-panel> -->
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted } from 'vue'
// import LoginPanel from './c-cpns/login-panel.vue'

let container: HTMLElement | null = null //容器
let scene: any = '' //场景
let camera: any = '' //相机
let renderer: any = '' //渲染器

const IMAGE_SKY = new URL('@/assets/sky.jpg', import.meta.url) //加载图片
let width: number = 0 //宽度
let height: number = 0 //高度
let depth = 1400 //深度
let zAxisNumber = 0 //相机在z轴的位置
onMounted(() => {
  container = document.getElementById('login')
  width = container!.clientWidth
  height = container!.clientHeight
  initScene()
  initSceneBg()
  initCamera()
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
