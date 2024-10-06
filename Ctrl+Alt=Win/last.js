import * as THREE from 'three';

let scene, camera, renderer, planets = [];

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 8; i++) {
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = i * 2.5;
        scene.add(planet);
        planets.push(planet);
    }

    camera.position.z = 10;

    window.addEventListener('mousemove', onMouseMove, false);
}

function onMouseMove(event) {
    event.preventDefault();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const planet = intersects[0].object;
        document.getElementById('info').innerText = `Planet: ${planet.position.x}`;
        document.getElementById('details').innerText = `Incoming Data: ... \nOutgoing Data: ...`;
    } else {
        document.getElementById('info').innerText = 'Hover over a planet to see details';
        document.getElementById('details').innerText = '';
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
