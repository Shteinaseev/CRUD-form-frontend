import styles from './table-sheme.css?inline';
export class TableSheme extends HTMLElement {
    liElementsList = [];

    set data(value) {
        this._data = value;
        this.render();
    }

    get data() {
        return this._data;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    renderLiEls() {
        let i = 0;
        for (const [key, value] of Object.entries(this._data)) {
            this.liElementsList.push(`<li>${key} : ${value}</li>`);
        }
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

    connectedCallback() {
        console.log("fdfd", this.data)
        this.renderLiEls();
        this.render();
    }

}
customElements.define("table-sheme", TableSheme); 