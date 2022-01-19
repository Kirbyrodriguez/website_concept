import './style.css'

import * as THREE from 'three';
import { TorusBufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.RingGeometry(5,4 ,300,6,6);
// const geometry = new THREE.TorusGeometry(4.7, 0.4, 8, 50);
const material = new THREE.MeshStandardMaterial({ color: 0xeb9e34, side: THREE.DoubleSide});
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);
// torus.position.setX(7.5);
// torus.position.setZ(-5);
torus.position.setX(7.8);
torus.position.setZ(-5);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x6c42f5 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// Avatar

const Texture = new THREE.TextureLoader().load('planetRing.png');

const ringMoon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ map: Texture }));

scene.add(ringMoon);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.png');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
 
  })
);

scene.add(moon);

moon.position.z = 29;
moon.position.setX(-15);

ringMoon.position.z = -5;
ringMoon.position.x = 8;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.0005;
  moon.rotation.z += 0.001;

  ringMoon.rotation.y += 0.001;
  ringMoon.rotation.z += 0.001;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  ringMoon.rotation.x += 0.001;
  ringMoon.rotation.y += 0.0005;
  ringMoon.rotation.z += 0.001;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.001;

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.0005;
  moon.rotation.z += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();