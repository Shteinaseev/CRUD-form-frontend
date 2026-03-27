import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    liElementsList = [];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });


    }

    render() {
        this.shadowRoot.innerHTML = `
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
        const parent = this.parentElement;
        if (!parent) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    if (parent.classList.contains('dragging')) {
                        this.style.cursor = 'grab';
                        this.style.userSelect = 'none';
                    } else {
                        this.style.cursor = 'auto';
                        this.style.userSelect = 'all';
                    }
                }
            });
        });

        observer.observe(parent, { attributes: true });

    }
}

customElements.define("entity-card", entityCard); 