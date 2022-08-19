import * as THREE from "three";
import { scene,camera } from "./setup";
import { loadModel } from "./ModelLoader";
const earth = require("./vi arcane retopo4.glb").default;

let earthModel
function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.8);
  let lightBack = new THREE.RectAreaLight(0xffffff, 0.2,10,10);
  let lightFront = new THREE.RectAreaLight(0xffffff, 0.2,10,10);
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
      const clonemodel = e.scene.clone();

      renderAtmo(clonemodel)
    })
    addLights();
};


function renderAtmo(clonemodel) {
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
	float intensity = pow( 0.5 - dot( vNormal, vec3( 0.0, 0.0, 0.5 ) ), 5.0 ); 
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
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

	var sphereGeo = new THREE.CylinderGeometry( 0.6, 0.6,128, 128 );
  const atmMesh = new THREE.Mesh(sphereGeo,customMaterial)
  // atmMesh.material = customMaterial
  // atmMesh.position.setX(0)
  atmMesh.renderOrder=-10
  atmMesh.material.depthTest = false

  // clonemodel.rotation.x=-Math.PI/2
  // clonemodel.traverse(n => { if ( n.isMesh ) {
  //   console.log(n.material)
  //   n.material= customMaterial
  // }});

  scene.add(atmMesh)

}
export { addItem,earthModel };
