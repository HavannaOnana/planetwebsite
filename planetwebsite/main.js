  import * as THREE from "three";
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import './style.css';  // Make sure style.css exists if you're importing it

  // making a renderer
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth , window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // making a camera 
  const fov = 70; 
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect,near, far);
  camera.position.z = 2;

  //making a loader
  const loader = new THREE.TextureLoader();

  //making a scene 
  const scene = new THREE.Scene();

  // making the mesh and ever group for the Earth Planet

  //making an earthGroup
  const earthGroup = new THREE.Group();

  scene.add(earthGroup);


  // The geometry and material
  const earthGeometry = new THREE.IcosahedronGeometry(1 , 20);
  const earthMaterial = new THREE.MeshStandardMaterial({
    color : "white",
    map : loader.load('/textures/earthy.jpg')
  })

  //making an EarthMesh 
  const earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);
  earthGroup.add(earthMesh);


  // making a earthliight to earth
  const hemiEarthLight = new THREE.HemisphereLight("black","lightblue",1);
  scene.add(hemiEarthLight);

  //making a directional light for the earth
  const Sunlight = new THREE.DirectionalLight("white");
  Sunlight.position.set(-2,0.5,1.5);
  scene.add(Sunlight)

  //making the function animate to render the scene
  function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.0008;
    renderer.render(scene, camera);
  }

  animate();