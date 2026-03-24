import * as THREE from 'three';

export class dotsGenerator {
    SEPARATION = 50;
    AMOUNTX = 60;
    AMOUNTY = 30;
    particles = 0;
    count = 0;

    constructor() {
        this.init();
        this.animate();
    }

    init() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.y = 180;
        this.camera.position.z = 20;
        this.camera.rotation.x = 0.35;

        this.scene = new THREE.Scene();

        // Создаем круглую текстуру для точек
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgb(255, 255, 255)');
        gradient.addColorStop(1, 'rgba(26, 4, 86, 0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(16, 16, 16, 0, Math.PI * 2);
        context.fill();

        const texture = new THREE.CanvasTexture(canvas);

        // Создаем точки
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const sizes = [];

        for (let ix = 0; ix < this.AMOUNTX; ix++) {
            for (let iy = 0; iy < this.AMOUNTY; iy++) {
                positions.push(
                    ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2),
                    0,
                    iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) - 10)
                );
                sizes.push(5); // Начальный размер
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 10,
            sizeAttenuation: true,
            map: texture,
            transparent: false,
            alphaTest: 0.01,
            opacity: 1
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff, 0);
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        const positions = this.particles.geometry.attributes.position.array;
        const sizes = this.particles.geometry.attributes.size.array;

        let i = 0;
        for (let ix = 0; ix < this.AMOUNTX; ix++) {
            for (let iy = 0; iy < this.AMOUNTY; iy++) {
                const i3 = i * 3;
                positions[i3 + 1] = (Math.sin((ix + this.count) * 0.5) * 15 + (Math.sin((iy + this.count) * 0.5) * 15));
                sizes[i] = (Math.sin((ix + this.count) * 0.5) + 2 * 4 + (Math.sin((iy + this.count) * 0.5) + 1) * 4);
                i++;
            }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
        this.particles.geometry.attributes.size.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
        this.count += 0.05;
    }
}