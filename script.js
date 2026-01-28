// 1. THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create 3D Icosahedron (Network Hub)
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true, transparent: true, opacity: 0.2 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.001;
    mesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
}
animate();

// 2. GSAP REVEALS
gsap.registerPlugin(ScrollTrigger);
gsap.from(".reveal", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
});

// 3. CARD SPOTLIGHT EFFECT
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
