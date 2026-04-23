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
        for (const [key, value] of Object.entries(this._data)) {
            this.liElementsList.push(`<li><strong>${key}:</strong><span> ${value}</span></li>`);
        }
    }

    connectedCallback() {
        this.renderLiEls();
        console.log(this.liElementsList.join(""))
        this.render();
    }
}

customElements.define("entity-grid-item", EntityGridItem); 