import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { displayCoards } from "./helpers.js";
import settings from "./settings.js";
import Stats from "stats-js";
import {addItem} from "./sceneItems"

THREE.Cache.enabled = true;

const stats = new Stats();

let width = window.innerWidth;
let height = window.innerHeight;
// ----------------------------------------------> render
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  powerPreference: "high-performance",
  antialias: false,
  logarithmicDepthBuffer:true,
});

renderer.setPixelRatio(settings.quality);
renderer.outputEncoding=  THREE.sRGBEncoding
function render() {
  renderer.render(scene, camera);
}
// ----------------------------------------------> scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x050505);
// ----------------------------------------------> camera
const camera = new THREE.PerspectiveCamera(
  50, // fov = field of view
  width / height, // aspect ratio
  0.001, // near plane
  80000 // far plane
);
camera.position.set(0, 0, 4);
// camera.lookAt(new THREE.Vector3(4,0,0))

// ----------------------------------------------> controls

const controls = new OrbitControls(camera, renderer.domElement);
function setupControls(speed) {
  let ctrSpeed = speed || settings.ctrlSpeed;
  controls.zoomSpeed = ctrSpeed;
  controls.panSpeed = ctrSpeed;
  controls.rotateSpeed = ctrSpeed;

  // controls.target = new THREE.Vector3(0, 1, 0);

  controls.maxDistance = settings.maxZoom;
  controls.minDistance = settings.minZoom;

  controls.maxPolarAngle = settings.maxPolarAngle;
  controls.minPolarAngle = settings.minPolarAngle;

  controls.autoRotate = settings.autoRotate;
  controls.autoRotateSpeed = settings.autoRotateSpeed;

  controls.enablePan=false
  controls.enableZoom=false
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target = new THREE.Vector3(0,1,0)
}


// ----------------------------------------------> resize
const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  console.log("HEY",document.body.innerWidth)
 
  renderer.setSize(document.body.offsetWidth , height);
  camera.aspect = document.body.offsetWidth / height;
  camera.updateProjectionMatrix();

};
// ----------------------------------------------> setup
const sceneSetup = (root) => {
  console.log("ROTTTT:,",root.offsetWidth)
  console.log("RfOTTTT:,",root.offsetHeight)
  // console.log("fuck:,",root)
  renderer.setSize(document.body.offsetWidth , height);
  camera.aspect = document.body.offsetWidth / height;
  root.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);
  if (settings.developmentModel) {
    displayCoards();
  }
  setupControls();

  if (settings.developmentModel) {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }
  addItem()
};


export {
  sceneSetup,
  scene,
  controls,
  render,
  camera,
  stats,

};
