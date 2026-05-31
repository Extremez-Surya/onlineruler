<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container: HTMLDivElement;

  onMount(() => {
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // --- Objects ---
    const objects: THREE.Mesh[] = [];
    
    // Create 20 floating geometric shapes
    for (let i = 0; i < 20; i++) {
        const isRuler = Math.random() > 0.6;
        const geometry = isRuler ? new THREE.BoxGeometry(6, 0.3, 0.2) : new THREE.BoxGeometry(1.5, 1.5, 1.5);
        
        const material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.1 + Math.random() * 0.2,
            wireframe: Math.random() > 0.4,
            shininess: 100
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // Random distribution in a larger volume
        mesh.position.x = (Math.random() - 0.5) * 50;
        mesh.position.y = (Math.random() - 0.5) * 50;
        mesh.position.z = (Math.random() - 0.5) * 30 - 10;
        
        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        scene.add(mesh);
        objects.push(mesh);
    }

    camera.position.z = 15;

    // --- Interaction Logic ---
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
        scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- Animation Loop ---
    const animate = () => {
        requestAnimationFrame(animate);

        // Slow rotation and hover
        objects.forEach((obj, i) => {
            obj.rotation.x += 0.0005 * (i % 3 + 1);
            obj.rotation.y += 0.001 * (i % 2 + 1);
            
            // Float effect
            obj.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.01;
            
            // Mouse reaction (Enhanced)
            obj.position.x += (mouseX * 15 - obj.position.x) * 0.01;
            
            // Scroll reaction (Dramatic Following effect)
            // Objects sink/rise based on scroll position with parallax depth
            const depthFactor = (obj.position.z + 20) / 40; // 0 to 1 approx
            const targetY = (scrollY * -0.02 * depthFactor) + (i * 3 - 30);
            obj.position.y += (targetY - obj.position.y) * 0.03;
        });

        // Cinematic Camera movement
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // --- Resize ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
    };
  });
</script>

<div bind:this={container} class="fixed inset-0 -z-20 pointer-events-none opacity-50 dark:opacity-70 transition-opacity duration-1000"></div>

<style>
    div {
        /* Ensures the 3D canvas blends nicely with the background noise/gradients */
        mix-blend-mode: multiply;
    }
    
    :global([data-theme='dark']) div {
        mix-blend-mode: screen;
    }
</style>
