import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';  // Make sure style.css exists if you're importing it
import { getFresnelMat } from '../getFresnelMat';
import getStarfield from '../getStarfield';
import { color } from "three/examples/jsm/nodes/Nodes.js";
import gsap from "gsap";

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
//earthGroup.position.set(0,-1,-0.6)
earthGroup.position.set(0,-3,-1)
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





//making moon too


const moonGroup = new THREE.Group();
moonGroup.position.set(0,0, 4);
scene.add(moonGroup)


// making the geometry and material 
const moonGeometry = new THREE.IcosahedronGeometry(1,20);
const moonTexture = loader.load("/textures/moon.jpg")
const moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture,
  color : "whitesmoke"
})

//increasing the sharpness
moonTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//making a mesh 
const moonMesh = new THREE.Mesh(moonGeometry,moonMaterial);
moonGroup.add(moonMesh);


//selecting the content from html
const contentDiv = document.querySelector(".content");
const Button = document.querySelector(".moon");
const contentH1 = document.getElementById("h1");


//adding a glow effect to Button
Button.addEventListener("mouseover",function(){
  Button.classList.add("glow");
})



//making the function animate to render the scene
function animate(){
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.0008;
  earthNightlightMesh.rotation.y +=0.0006;
  earthCloudsMesh.rotation.y += 0.001;
  earthGlowMesh.rotation.y += 0.0008;
  moonGroup.rotation.y +=0.0010;
  renderer.render(scene, camera);
}

//animating the earth for the beginning
function beginning(){
  gsap.to(earthGroup.position, {duration : 3 , y:-0.7 , delay : 1,
    onUpdate : ()=>{
      //checking to see if the Y of the Earth is 0.7
      if(Math.abs(earthGroup.position.y + 0.7)< 0.01){
        //we show the text
        contentDiv.classList.add("fade-in")
      }
    }
  });
  
}



// Animate the Earth moving out of the view and zooming into Venus after a delay
function animateEarthAndVenus() {
  gsap.to(camera.position, { duration: 3, z: 3, delay: 2 });
  gsap.to(earthGroup.position, { duration: 3, z: -5, y:2, delay: 2 });
  gsap.to(moonGroup.position, { duration: 3, z: 0.6, y:-0.39,  delay: 2 });
}


//calling


beginning();
animate();
//animateEarthAndVenus()