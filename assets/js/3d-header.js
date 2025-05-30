let scene, camera, renderer, model, container;

function init() {
    // Set up container
    container = document.getElementById('header-3d-container');
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Match your theme
    
    // Set up camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Load 3D model (replace with your model path)
    const loader = new THREE.GLTFLoader();
    loader.load(
        '/assets/models/pointy_v1.gltf', // Path to your 3D model
        (gltf) => {
            model = gltf.scene;
            scene.add(model);
            animate();
        },
        undefined,
        (error) => {
            console.error('Error loading 3D model:', error);
        }
    );
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Hover rotation effect
    container.addEventListener('mousemove', (event) => {
        if (!model) return;
        
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        model.rotation.y = x * 0.5;
        model.rotation.x = y * 0.2;
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', init);