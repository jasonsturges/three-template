import "./style.css";
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from "three";
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new BoxGeometry();
const material = new MeshStandardMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

// Create a plane
const groundGeometry = new PlaneGeometry(10, 10);
const groundMaterial = new MeshStandardMaterial({ color: 0x808080 });
const ground = new Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
ground.receiveShadow = true;
scene.add(ground);

// Add a light
const light = new DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 0);
light.castShadow = true;
scene.add(light);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Animation loop
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
});

// Resize handler
const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", resize);
