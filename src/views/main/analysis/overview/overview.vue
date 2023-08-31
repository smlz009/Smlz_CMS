<template>
  <div class="overview" id="overview"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted } from 'vue'
onMounted(() => {
  //创建场景
  const scene = new THREE.Scene()
  //创建相机
  const camera = new THREE.PerspectiveCamera()
  camera.position.z = 10
  camera.position.y = 1
  //创建立方体
  const geometry = new THREE.BoxGeometry()
  //材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  //网格
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(3, 3, 3)
  scene.add(cube)

  //创建渲染器
  const renderer = new THREE.WebGLRenderer()
  const el = document.querySelector('#overview')
  el?.appendChild(renderer.domElement)
  //调整窗口大小
  renderer.setSize(el?.clientWidth, el?.clientHeight)

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
  const axesHelper = new THREE.AxesHelper(5)
  axesHelper.position.y = 3
  scene.add(axesHelper)

  //添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)
  //进行渲染
  renderer.render(scene, camera)

  //让立方体动起来
  function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.y += 0.01
    //轨道控制器更新
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style lang="less" scoped>
.overview {
  height: 100%;
}
</style>
