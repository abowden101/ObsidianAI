// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    if (window.THREE) {
        const canvas = document.getElementById("hero-canvas");
        
        // Safety check to ensure the canvas exists
        if (!canvas) {
            console.error("Canvas element 'hero-canvas' not found.");
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
        camera.position.z = 5;

        // Create the geometry
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x7f9cff,
            wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add Lighting
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.002;
            mesh.rotation.y += 0.003;
            renderer.render(scene, camera);
        }
        animate();

        // Handle Window Resizing
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } else {
        console.error("Three.js library not loaded.");
    }
});
