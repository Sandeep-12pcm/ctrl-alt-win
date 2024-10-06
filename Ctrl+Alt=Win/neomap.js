// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Function to create a sphere (for planets, Sun, or NEOs)
function createSphere(radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

// Create the Sun
const sun = createSphere(5, 0xffff00);
scene.add(sun);

// Create the planets (positions are illustrative, not to scale)
const earth = createSphere(1, 0x0000ff);
earth.position.x = 15;
scene.add(earth);

const mars = createSphere(0.8, 0xff4500);
mars.position.x = 22;
scene.add(mars);

// Set camera position
camera.position.z = 50;

// Function to create a small sphere for NEOs
function createNEO(position, color) {
    const neo = createSphere(0.3, color);
    neo.position.set(position.x, position.y, position.z);
    return neo;
}

// Sample NEO data (position coordinates in 3D space, illustrative data)
const neoData = [
    { name: "2023 AB", position: { x: 10, y: 2, z: -5 }, color: 0xff0000 },
    { name: "2024 CD", position: { x: 18, y: -3, z: 8 }, color: 0x00ff00 },
    { name: "2025 EF", position: { x: 25, y: 5, z: -10 }, color: 0x0000ff }
];

// Add NEOs to the scene
neoData.forEach(neo => {
    const neoObject = createNEO(neo.position, neo.color);
    scene.add(neoObject);
});

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the Sun and planets (optional)
    sun.rotation.y += 0.005;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// Resize handler to update camera and renderer
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
