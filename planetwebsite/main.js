import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';  // Make sure style.css exists if you're importing it

// making a renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// making a camera 
const fov = 30; 
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect,near, far);
camera.position.z = -1;

//making a loader
const loader = new THREE.TextureLoader();

//making a scene 
const scene = new THREE.Scene();

// making the mesh and ever group for the Earth Planet

//making an earthGroup
const earthGroup = new THREE.Group();
earthGroup.position.y = -2;
earthGroup.position.x = -2;
scene.add(earthGroup);


// The geometry and material
const earthGeometry = new THREE.IcosahedronGeometry(1);
const earthMaterial = new THREE.MeshStandardMaterial({
  color : "white",
  map : loader.load('/textures/earthy.jpg')
})

//making an EarthMesh 
const earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);
earthGroup.add(earthMesh);



