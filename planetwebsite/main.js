import './style.css';
import * as THREE from 'three';

// Create a renderer with antialiasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Append the renderer's canvas to the DOM
document.body.appendChild(renderer.domElement);

// Create a camera
const fov = 90;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Create a new scene
const scene = new THREE.Scene();

// Create a geometry and material
const geometry = new THREE.IcosahedronGeometry(1, 20);
const material = new THREE.MeshStandardMaterial({ color: "white" });

// Create a mesh and add it to the scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add a light to the scene
const hemiLight = new THREE.HemisphereLight("white", "white");
scene.add(hemiLight);

// Handle window resize
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  // Update camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Start the rendering loop
animate();
