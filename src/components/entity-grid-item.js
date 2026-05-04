import styles from './entity-grid-item.css?inline';
import { columnsWidth } from "../config/data-grid-config";

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
        let i = 0;
        for (const value of Object.values(this._data)) {
            this.liElementsList.push(`<li>${value}</li>`);
            const width = value.toString().length * 16 + 32;
            if (!columnsWidth[i]) {
                columnsWidth[i] = width;
            }
            else if (columnsWidth[i] < width) {
                columnsWidth[i] = width;
            }
            i++;
        }
        this.liElementsList.push(`<li><button class="btn submit">promeniti</button></li>`);
        this.liElementsList.push(`<li><button class="btn danger">obrisati</button></li>`);
    }

    connectedCallback() {
        this.renderLiEls();
        this.render();
    }
}

customElements.define("entity-grid-item", EntityGridItem); 