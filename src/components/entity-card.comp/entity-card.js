import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    liElementsList = [];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    edit() {

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
                <button data-js-btn-edit class="btn submit">Promeniti</button>
                <button data-js-btn-delete class="btn danger">Obrisati</button>
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

        this.shadowRoot.querySelector("[data-js-btn-edit]").addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("editEvent", {
                detail: { type: "btnEdit", data: this._data },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define("entity-card", entityCard); 