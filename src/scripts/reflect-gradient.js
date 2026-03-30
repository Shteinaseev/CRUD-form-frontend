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
        precision mediump float;

        uniform vec2 iResolution;
        uniform float iTime;

        varying vec2 vUv;

        #define TAU 6.28318530718
        #define MAX_ITER 5

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            float time = iTime * 0.5 + 23.0;
            vec2 uv = fragCoord.xy / iResolution.xy;
            vec2 p = mod(uv * TAU, TAU) - 250.0;
            vec2 i = vec2(p);
            float c = 1.0;
            float inten = 0.005;

            for (int n = 0; n < MAX_ITER; n++) {
                float t = time * (1.0 - (3.5 / float(n + 1)));
                i = p + vec2(
                    cos(t - i.x) + sin(t + i.y),
                    sin(t - i.y) + cos(t + i.x)
                );
                c += 1.0 / length(vec2(
                    p.x / (sin(i.x + t) / inten),
                    p.y / (cos(i.y + t) / inten)
                ));
            }

            c /= float(MAX_ITER);
            c = 1.17 - pow(c, 1.4);
            vec3 colour = vec3(pow(abs(c), 8.0));
            colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);
            fragColor = vec4(colour, 1.0);
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

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });

        const geometry = new THREE.PlaneBufferGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

        this.startTime = Date.now();
        window.addEventListener('resize', this.resize.bind(this));
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        const elapsed = (Date.now() - this.startTime) / 1000;
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