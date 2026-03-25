import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    liElementsList = [];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <svg style="display: none">
                <filter id="glass-distortion">
                    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
                </filter>
            </svg>
            <div class="glass-filter"></div>
            <div class="glass-overlay"></div>
            <div class="glass-specular"></div>
            <style>
                ${styles}
            </style>
            <ul>
               ${this.liElementsList.join("")}
            </ul>
            <div class="btn-wrapper">
                <button class="btn submit">Promeniti</button>
                <button class="btn danger">Obrisati</button>
            </div>
        `
    }

    renderLiEls() {
        for (let attr of this.attributes) {
            this.liElementsList.push(`<li>${attr.name}: ${attr.value}</li>`);
        }
    }

    connectedCallback() {
        this.renderLiEls();
        this.render();
    }
}

customElements.define("entity-card", entityCard); 