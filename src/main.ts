import "./style.css";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three-stdlib";

// Create a scene
const scene = new Scene();

// Create a camera
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// Create a renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x090909);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Animation loop
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

// Resize handler
const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", resize);
