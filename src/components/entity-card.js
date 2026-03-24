import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    // static observedAttributes = ['title', 'min-length', 'max-length', 'icon'];

    liElementsList = []
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log(this.liElementsList)
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <ul>
               ${this.liElementsList.join("")}
            </ul>
        `
    }

    renderLiEls() {
        for (let attr of this.attributes) {
            console.log(`<li>${attr.name}: ${attr.value}</li>`);
            this.liElementsList.push(`<li>${attr.name}: ${attr.value}</li>`);
        }
    }

    connectedCallback() {
        this.renderLiEls();
        this.render();
    }
}

customElements.define("entity-card", entityCard); 