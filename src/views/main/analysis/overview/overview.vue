<template>
  <!-- <button @click="moveCamera">移动相机</button> -->
  <div class="overview" id="overview"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
// import dat from 'dat.gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
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
// const controlData = {
//   rotationSpeed: 0.01,
//   color: '#66ccff',
//   wireframe: false
// }

// 创建实例
// const gui = new dat.GUI()
// const f = gui.addFolder('配置')
// // f.add(controlData, "rotationSpeed", 0.01, 0.1, 0.01)

// f.add(controlData, 'rotationSpeed').min(0.01).max(0.1).step(0.01)
// // 颜色选择器
// f.addColor(controlData, 'color')

// // checkbox
// f.add(controlData, 'wireframe')

// f.domElement.id = 'gui'

// f.open()

//创建相机
const camera = new THREE.PerspectiveCamera()
camera.position.y = 12
camera.position.x = 0
camera.position.z = 0
//移动相机
// const moveCamera = () => {
//   camera.position.y = 15
//   camera.position.z = 10
//   camera.lookAt(0, 3, 0)
// }
//高光反射材质
const material = new THREE.MeshPhongMaterial({ color: 0xff3399 })
//创建GLTF实例
const loader = new GLTFLoader()
loader.load('./bento.glb', function (glb) {
  const model = glb.scene

  model.traverse((child: any) => {})
  // model.rotation.z = Math.PI / 6

  model.scale.set(8, 8, 8)
  scene.add(model)
})

const c = scene.getObjectByName('Sketchfab_Scene')

console.log(c)

//创建纹理
// const texture = new THREE.TextureLoader().load('textures/02-map.jpg')
//创建立体纹理
// const cubeTexture = new THREE.CubeTextureLoader()
//   .setPath('/textures/')
//   .load(['04.jpg', '01.jpg', '05.jpg', '02.jpg', '06.jpg', '03.jpg'])

// scene.background = cubeTexture

//创建立方体
// const geometry = new THREE.BoxGeometry(1, 1, 1)
//创建球体
// const geometry = new THREE.SphereGeometry(1)
//材质
// const material = new THREE.MeshBasicMaterial({ map: texture, envMap: cubeTexture })
// const material = new THREE.MeshBasicMaterial({ map: texture })

//网格
// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0, 0.5, 0)
// // 箱子去接受光源
// cube.receiveShadow = true
// // 箱子去投射光源
// cube.castShadow = true

// scene.add(cube)

// 环境光
const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

//点光源
// 添加点光源
// const pointLight = new THREE.PointLight(0xffffff, 200, 100)
// pointLight.position.set(5, 3, 5)
// pointLight.castShadow = true
// scene.add(pointLight)

//平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(11.2, 11.2, 7.4)
scene.add(directionalLight)
//监听轨道控制器
// controls.addEventListener('change', () => {
//   console.log(22)
// })

//添加阻尼
// controls.enableDamping = true
//自动旋转
// controls.autoRotate = true

//添加坐标轴
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

//添加网格地面
// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)
//进行渲染
// renderer.render(scene, camera)
// 创建地面
// const meshfloor = new THREE.Mesh(
//   new THREE.PlaneGeometry(10, 10),
//   new THREE.MeshPhongMaterial({
//     color: 0x1b5e20
//   })
// )
// // rotation 单位欧拉角  三维物体（Object3D）
// meshfloor.rotation.x -= Math.PI / 2
// // 地面同样设置去接受光源
// meshfloor.receiveShadow = true
// scene.add(meshfloor)

onMounted(() => {
  const el = document.querySelector('#overview')

  // el?.appendChild(f.domElement)
  el?.appendChild(renderer.domElement)
  // 将gui添加到页面
  //调整窗口大小
  renderer.setSize(el?.clientWidth, el?.clientHeight)
  renderer.shadowMap.enabled = true

  //轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  //让立方体动起来
  function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // cube.material.color = new THREE.Color(controlData.color)
    // material.wireframe = controlData.wireframe

    //轨道控制器更新
    controls.update()
    renderer.render(scene, camera)
  }

  animate()

  renderer.render(scene, camera)
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
