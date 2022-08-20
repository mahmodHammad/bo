import * as THREE from "three";
import { scene,camera } from "./setup";
import { loadModel } from "./ModelLoader";
const earth = require("./vi arcane retopo4.glb").default;

let earthModel
function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.7);
  let lightBack = new THREE.RectAreaLight(0xffffff, 1,10,0.7);
  let lightFront = new THREE.RectAreaLight(0xffffff, 1,10,0.6);
  lightBack.position.set(2, 2, 7);
  lightFront.position.set(-2, -2, 7);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
}
const addItem = () => {
  loadModel(earth , {x:0,y:0,z:0})
    .then((e) => {
      earthModel=e.scene.getChildByName("earthblack")
      scene.add(e.scene);
      renderAtmo()
    })
    addLights();
};


function renderAtmo() {
  const vertexShader = `
  varying vec3 vNormal;
  void main() 
  {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`
  const fragmentShader = `
  varying vec3 vNormal;
void main() 
{
	float intensity = pow( 0.45 - dot( vNormal, vec3( 0.0, 0.35, 0.5 ) ), 3.0 ); 
    gl_FragColor = vec4( 1.0, 1.0, 0.8, 1.0 ) * intensity;
}`

var customMaterial = new THREE.ShaderMaterial( 
	{

	    uniforms: {  },
		vertexShader,
		fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );

	var sphereGeo = new THREE.CylinderGeometry( 0.7,0.7, 4, 64 );
  
  const atmMesh = new THREE.Mesh(sphereGeo,customMaterial)
  atmMesh.position.setY(2)
  atmMesh.renderOrder=-10
  // atmMesh.material.depthTest = false
  scene.add(atmMesh)

}
export { addItem,earthModel };
