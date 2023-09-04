<template>
  <!-- <button @click="moveCamera">移动相机</button> -->
  <div class="overview" id="overview"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import dat from 'dat.gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted } from 'vue'
//创建场景
const scene = new THREE.Scene()
//创建渲染器
const renderer = new THREE.WebGLRenderer()

//添加背景颜色
// scene.background = new THREE.Color(0x666666)

//添加雾
// scene.fog = new THREE.Fog(0xcccccc, 10, 15)

//添加背景图片
// scene.background = new THREE.CubeTextureLoader()
//   .setPath('/')
//   .load(['room.jpg', 'room.jpg', 'room.jpg', 'room.jpg', 'room.jpg', 'room.jpg'])

// 创建控制对象
const controlData = {
  rotationSpeed: 0.01,
  color: '#66ccff',
  wireframe: false
}

// 创建实例
const gui = new dat.GUI()
const f = gui.addFolder('配置')
// f.add(controlData, "rotationSpeed", 0.01, 0.1, 0.01)

f.add(controlData, 'rotationSpeed').min(0.01).max(0.1).step(0.01)
// 颜色选择器
f.addColor(controlData, 'color')

// checkbox
f.add(controlData, 'wireframe')

f.domElement.id = 'gui'

f.open()

//创建相机
const camera = new THREE.PerspectiveCamera()
camera.position.y = 5
camera.position.z = 10

//移动相机
// const moveCamera = () => {
//   camera.position.y = 15
//   camera.position.z = 10
//   camera.lookAt(0, 3, 0)
// }

//创建立方体
const geometry = new THREE.BoxGeometry()
//材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//网格
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 3, 0)
scene.add(cube)

//轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

//监听轨道控制器
// controls.addEventListener('change', () => {
//   console.log(22)
// })

//添加阻尼
controls.enableDamping = true
//自动旋转
// controls.autoRotate = true

//添加坐标轴
// const axesHelper = new THREE.AxesHelper(5)
// axesHelper.position.y = 3
// scene.add(axesHelper)

//添加网格地面
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)
//进行渲染
renderer.render(scene, camera)

onMounted(() => {
  const el = document.querySelector('#overview')

  el?.appendChild(f.domElement)
  el?.appendChild(renderer.domElement)
  // 将gui添加到页面
  //调整窗口大小
  renderer.setSize(el?.clientWidth, el?.clientHeight)

  //让立方体动起来
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += controlData.rotationSpeed
    cube.rotation.y += controlData.rotationSpeed
    cube.material.color = new THREE.Color(controlData.color)
    material.wireframe = controlData.wireframe

    //轨道控制器更新
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style lang="less">
.overview {
  height: 100%;
}
#gui {
  position: absolute;
  right: 0;
  width: 300px;
}
</style>
