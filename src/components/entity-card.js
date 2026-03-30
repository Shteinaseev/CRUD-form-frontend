import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    liElementsList = [];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    get data() {
        return this._data;
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
        for (const [key, value] of Object.entries(this._data)) {
            this.liElementsList.push(`<li>${key}: ${value}</li>`);
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