import styles from './form-group.css?inline';
import * as icons from '@boxicons/js';

export class FormGroup extends HTMLElement {

    static get observedAttributes() {
        return ['label', 'name', 'type', 'icon',
            'inputmode', 'min-length', 'max-length', 'value', 'required', 'options'];
    }

    #label = '';
    #name = '';
    #type = 'text';
    #icon = '';
    #inputMode = null;
    #minLength = 3;
    #maxLength = 15;
    #value = '';
    #required = false;
    #options = [];

    #id = '';
    #internals = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.#internals = this.attachInternals?.();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || newValue === '') return;

        switch (name) {
            case 'label':
                this.#label = newValue || 'Bez naslova';
                break;

            case 'name':
                this.#name = newValue || '';
                break;

            case 'type':
                this.#type = newValue || 'text';
                break;

            case 'icon':
                this.#icon = icons.createSvgString(icons[newValue]) || '';
                break;

            case 'inputmode':
                this.#inputMode = newValue || null;
                break;

            case 'options':
                this.#options = this.#parseOptions(newValue);
                break;

            case 'min-length':
                this.#minLength = newValue ? parseInt(newValue, 10) : 3;
                break;

            case 'max-length':
                this.#maxLength = newValue ? parseInt(newValue, 10) : 15;
                break;

            case 'value':
                this.#value = newValue || '';
                break;

            case 'required':
                this.#required = newValue !== null;
                break;
        }

        this.#id = this.#name.toLowerCase().replace(/\s/g, '-') + '-' + Math.floor(Math.random() * 1000);

        this.render();
        this.#bindInputEvents();
    }

    #bindInputEvents() {
        const input = this.shadowRoot.querySelector('input, textarea');
        if (!input) return;

        input.addEventListener('input', () => {
            if (this.#type === 'number' || this.#inputMode === 'numeric') {
                input.value = input.value.replace(/\D/g, '');
            }
            this.#value = input.value;
        });
    }

    #parseOptions(value) {
        if (!value) return [];

        try {
            return JSON.parse(value);
        } catch {
            return value.split(',').map(v => v.trim());
        }
    }

    #renderBlockEl() {
        const block = document.createElement('div');
        if (this.#type === 'radio') {
            block.classList.add('radio-group');
            block.innerHTML = this.#renderRadioInputs();
        } else if (this.#type === 'date') {
            block.classList.add('block');
            block.innerHTML = this.#renderDateInput();
        } else {
            block.classList.add('block');
            block.innerHTML = this.#renderInput();
        }
        return block.outerHTML;
    }

    #renderRadioInputs() {
        return this.#options.map((value, i) => `
                <div class="radio-block">
                    <input id="${this.#id}-${i}" name="${this.#name}" class="field-control" type="radio" value="${value}">
                    <label for="${this.#id}-${i}">${value}</label>
                </div>
            `).join('');
    }

    #renderInput() {
        return `
            <input 
                id="${this.#id}" 
                name="${this.#name}" 
                class="field-control" 
                type="${this.#type}"
                ${this.#maxLength ? `minlength="${this.#minLength}"` : ''}
                ${this.#maxLength ? `maxlength="${this.#maxLength}"` : ''}    
                ${this.#inputMode ? `inputmode="${this.#inputMode}"` : ''}
            >
            ${this.#icon}
        `
    }


    #renderDateInput() {
        return `
            <input 
                id="${this.#id}" 
                name="${this.#name}" 
                class="field-control" 
                type="${this.#type}"
                ${this.#maxLength ? `minlength="${this.#minLength}"` : ''}
                ${this.#maxLength ? `maxlength="${this.#maxLength}"` : 'max="${new Date().getFullYear()}-12-31"'}    
            >   
        `
    }

    render() {
        const blockHTML = this.#renderBlockEl();
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <label for="${this.#id}">${this.#label}</label>
            ${blockHTML} 
            <span class="field-errors" id="${this.#id}-errors" data-js-field-errors></span>
        `
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("form-group", FormGroup); 