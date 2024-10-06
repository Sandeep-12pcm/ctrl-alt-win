const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry for the Earth
const geometry = new THREE.SphereGeometry(1, 32, 32);
const textureLoader = new THREE.TextureLoader();

// Load Earth texture (correct URL)
const earthTexture = textureLoader.load('https://drive.google.com/uc?id=1nRM6MwuhGhMOV39-hh9s7WF3UudZTiWA');
const material = new THREE.MeshStandardMaterial({ map: earthTexture });

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Add a light source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Set camera position
camera.position.z = 3;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.01; // Rotate the Earth
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();


    
    renderer.setSize(window.innerWidth, window.innerHeight);
});
