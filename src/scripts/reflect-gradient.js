import * as THREE from 'three';

export class ReflectGradient {
    vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    fragmentShader = `
    uniform float iTime;
    uniform vec2 iResolution;

    void mainImage(out vec4 fragColor, vec2 fragCoord) {
        float mr = min(iResolution.x, iResolution.y);
        vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;
        float d = -iTime * 0.5;
        float a = 0.0;
        for (float i = 0.0; i < 8.0; ++i) {
            a += cos(i - d - a * uv.x);
            d += sin(uv.y * i + a);
        }
        d += iTime * 0.5;

        vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
        col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

        // Тёмно-синяя палитра
        float t = dot(col, vec3(0.299, 0.587, 0.114)); // яркость как параметр mix
        t = clamp(t, 0.0, 1.0);

        vec3 black  = vec3(0.0);
        vec3 blue   = vec3(0.169, 0.369, 0.576);  // #2b5e93
        vec3 violet = vec3(0.702, 0.447, 0.902);  // #b372e6
        float threshold = 0.9;

        vec3 finalCol = t < threshold
            ? mix(black, blue, t / threshold)
            : mix(blue, violet, (t - threshold) / (1.0 - threshold));
            
        fragColor = vec4(finalCol, 1.0);
    }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

    constructor() {
        this.container = document.querySelector('[data-js-reflect-container]');
        this.blurOverlay = document.querySelector('[data-js-blur-overlay]');

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.mouse = new THREE.Vector2(0, 0);
        this.mousePrev = new THREE.Vector2(0, 0);
        this.velocity = new THREE.Vector2(0, 0);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            iMouse: { value: new THREE.Vector2(0, 0) },
            iMouseVelocity: { value: new THREE.Vector2(0, 0) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

        this.clock = new THREE.Clock();
        window.addEventListener('resize', this.resize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.animate();
    }

    onMouseMove(e) {
        this.mouse.set(e.clientX, window.innerHeight - e.clientY);
        this.uniforms.iMouse.value.copy(this.mouse);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Считаем скорость здесь — плавное затухание
        this.velocity.subVectors(this.mouse, this.mousePrev);
        this.mousePrev.copy(this.mouse);
        this.uniforms.iMouseVelocity.value.lerp(this.velocity, 0.15);
        const elapsed = this.clock.getElapsedTime();
        this.uniforms.iTime.value = elapsed;
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.renderer.setSize(w, h);
        this.uniforms.iResolution.value.set(w, h);
    }

}