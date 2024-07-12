import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';  // Make sure style.css exists if you're importing it
import { getFresnelMat } from '../getFresnelMat';
import getStarfield from '../getStarfield';
import { color } from "three/examples/jsm/nodes/Nodes.js";


// making a renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth , window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// making a camera 
const fov = 50; 
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 700;

const camera = new THREE.PerspectiveCamera(fov, aspect,near, far);
camera.position.z = 2;

//making a loader
const loader = new THREE.TextureLoader();

//making a scene 
const scene = new THREE.Scene();

// making the mesh and ever group for the Earth Planet

//making an earthGroup
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.set(0,-1,-0.6)
//earthGroup.position.set(0,-0.2,-0.6)
scene.add(earthGroup);


// The geometry and material
const earthGeometry = new THREE.IcosahedronGeometry(1,20);
const earthMaterial = new THREE.MeshStandardMaterial({
  color : "white",
  map : loader.load('/textures/earthy.jpg')
})

//making an EarthMesh 
const earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);
earthMesh.scale.setScalar(1.001)
earthGroup.add(earthMesh);

// making a earthliight to earth
const hemiEarthLight = new THREE.HemisphereLight("black","lightblue",);
scene.add(hemiEarthLight);

//making a directional light for the earth
const Sunlight = new THREE.DirectionalLight("lightblue",1);
Sunlight.position.set(10,0,0);
scene.add(Sunlight)

//adding the night version
const earthNightlight = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/earthdark.png"),
  blending : THREE.AdditiveBlending,
  transparent:true
})
//adding the mesh of the earthNightlight
const earthNightlightMesh = new THREE.Mesh(earthGeometry,earthNightlight);
earthGroup.add(earthNightlightMesh);

//adding clouds
const earthClouds = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/clouds.jpg"),
  blending : THREE.AdditiveBlending,
  color: 0x00FFFFFF,
  transparent:true
})
// adding clouds mesh
const earthCloudsMesh = new THREE.Mesh(earthGeometry,earthClouds);
earthCloudsMesh.scale.setScalar(1.005)
earthGroup.add(earthCloudsMesh);

//adding a glow to the earth
const earthfresnelMat = getFresnelMat();
const earthGlowMesh = new THREE.Mesh(earthGeometry,earthfresnelMat);
earthGlowMesh.scale.setScalar(1.01);
earthGroup.add(earthGlowMesh);


// going to add stars
const stars = getStarfield({numStars : 500});
scene.add(stars);





//making venus too


const venusGroup = new THREE.Group();
venusGroup.position.set(0, 0, -5);
scene.add(venusGroup)


// making the geometry and material 
const venusGeometry = new THREE.IcosahedronGeometry(1,20);
const venusMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/venus.jpg")
})

//making a mesh 
const venusMesh = new THREE.Mesh(venusGeometry,venusMaterial);
venusGroup.add(venusMesh);





//making the function animate to render the scene
function animate(){
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.0008;
  earthNightlightMesh.rotation.y +=0.0006;
  earthCloudsMesh.rotation.y += 0.001;
  earthGlowMesh.rotation.y += 0.0008;
  venusGroup.rotation.y +=0.0010;
  renderer.render(scene, camera);
}

animate();