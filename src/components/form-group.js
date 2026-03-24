import styles from './form-group.css?inline';
import * as icons from '@boxicons/js';

export class formGroup extends HTMLElement {

    static observedAttributes = ['title', 'type', 'min-length', 'max-length', 'icon'];

    title = this.getAttribute('title');
    type = this.getAttribute('type');
    minLength = Number(this.getAttribute('min-length')) || 3;
    maxLength = Number(this.getAttribute('max-length')) || 15;
    id = this.title.toLowerCase();
    iconsAttr = this.getAttribute('icon').toString();
    icon = icons.createSvgString(icons[this.iconsAttr]);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === 'title') this.title = newValue;
        if (name === 'type') this.type = Number(newValue);
        if (name === 'min-length') this.minlength = Number(newValue) || 3;
        if (name === 'max-length') this.maxlength = Number(newValue) || 15;
        if (name === 'icon') this.iconsAttr = newValue.toString();

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <label for="${this.id}">${this.title}</label>
            <div class="block">
                <input id="${this.id}" name="${this.title}" class="field-control" type="${this.type}" 
                minlength="${this.minLength}" maxlength="${this.maxLength}"
                    required aria-errormessage="${this.id}-errors">
                ${this.icon}    
            </div>
            <span class="field-errors" id="${this.id}-errors" data-js-field-errors></span>
        `
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("form-group", formGroup); 