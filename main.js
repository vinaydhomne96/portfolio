
import * as THREE from 'three';

const myCanva = document.querySelector('#background-animation');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: myCanva });

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera aspect ratio and renderer size
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener('resize', handleResize);
handleResize(); // Call handleResize initially to set up the correct aspect ratio

// Set background color
renderer.setClearColor('#FFFAF5');

// Create Shape
const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 5, 5);
const material = new THREE.PointsMaterial({ size: 0.02, color: '#FF7B00' });
const mesh = new THREE.Points(geometry, material);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 50000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 100);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMesh = new THREE.Points(particlesGeometry, material);

scene.add(mesh, particlesMesh);

////////////////

///////////

// Mouse Access
document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseX = (event.clientX / myCanva.clientWidth) * 2 - 1;
  mouseY = -(event.clientY / myCanva.clientHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.001;

  particlesMesh.rotation.y = mouseX * elapsedTime * 0.01;
  particlesMesh.rotation.x = mouseY * elapsedTime * 0.01;

  renderer.render(scene, camera);
}

const clock = new THREE.Clock();
animate();
