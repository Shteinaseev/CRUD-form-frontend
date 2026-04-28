import styles from './entity-grid-item.css?inline';

export class EntityGridItem extends HTMLElement {
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
            `
    }

    renderLiEls() {
        // let i = 0; style="max-width: ${this.colWidths[i] || 100}px">
        for (const [key, value] of Object.entries(this._data)) {
            this.liElementsList.push(`<li>${value}</li>`);
        }
    }

    connectedCallback() {
        this.renderLiEls();
        this.render();
    }
}

customElements.define("entity-grid-item", EntityGridItem); 