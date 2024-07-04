import './style.css';
import * as THREE from 'three';


// making a renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//appending it to the dom of the html
document.body.appendChild(renderer.domElement);