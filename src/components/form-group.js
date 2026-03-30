import styles from './form-group.css?inline';
import * as icons from '@boxicons/js';

export class formGroup extends HTMLElement {

    static get observedAttributes() {
        return ['title', 'type', 'icon', 'min-length', 'max-length', 'number'];
    }

    minLength = 0;
    maxLength = 15;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === 'title') this.title = newValue;
        if (name === 'type') this.type = newValue;
        if (name === 'min-length') this.minLength = newValue ? newValue : 0;
        if (name === 'max-length') this.maxLength = newValue ? newValue : 15;
        if (name === 'icon') this.iconsAttr = newValue.toString();
        if (name === 'number') this.isNumber = newValue === 'true' ? true : false;

        if (this.iconsAttr) {
            this.icon = icons.createSvgString(icons[this.iconsAttr]);
        } else {
            this.icon = '';
        }

        if (this.type === 'text') {
            this.attrsString = `minlength="${this.minLength}" maxlength="${this.maxLength}"
                ${this.isNumber ? 'pattern="\d*"' : ''}
            `;
        } else if (this.type === 'date') {
            this.attrsString = `max="${new Date().getFullYear()}-12-31"`;
        } else {
            this.attrsString = '';
        }

        this.render();
        const input = this.shadowRoot.querySelector('.field-control');
        if (input) {
            input.addEventListener('input', () => {
                if (this.isNumber) {
                    input.value = input.value.replace(/\D/g, '');
                }
            });
        }
    }

    generateValuesList() {
        this.valuesList = [];
        for (const attr of this.attributes) {
            if (attr.name.startsWith('value')) {
                this.valuesList.push(attr.value);
            }
        }
    }

    generateBlockEl() {
        const block = document.createElement('div');
        this.generateValuesList();

        if (this.type === 'radio') {
            this.valuesList.forEach((value, i) => {
                block.classList.add('radio-group');
                block.innerHTML += `
                    <div class="radio-block">
                        <input id="${this.id}-${i}" name="${this.title}" class="field-control" type="radio" value="${value}">
                        <label for="${this.id}-${i}">${value}</label>
                    </div>
                `;
            });
        } else {
            block.classList.add('block');
            block.innerHTML = `
                <input id="${this.id}" name="${this.title}" class="field-control" type="${this.type}" 
                ${this.attrsString}>
                ${this.icon}    
            `;
        }

        return block;
    }

    render() {
        const block = this.generateBlockEl();
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <label for="${this.id}">${this.title}</label>
            ${block.outerHTML}
            <span class="field-errors" id="${this.id}-errors" data-js-field-errors></span>
        `
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("form-group", formGroup); 