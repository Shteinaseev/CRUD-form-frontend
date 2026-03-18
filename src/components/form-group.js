import styles from './form-group.css?inline';

export class formGroup extends HTMLElement {

    static observedAttributes = ['title', 'type', 'min-length', 'max-length', 'icon'];

    title = this.getAttribute('title');
    type = this.getAttribute('type');
    minLength = Number(this.getAttribute('min-length')) || 3;
    maxLength = Number(this.getAttribute('max-length')) || 15;
    icon = this.getAttribute('icon');

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
        if (name === 'icon') this.icon = Number(newValue);

        this.render();
    }

    render() {
        id = this.title.toLowerCase();
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <label for="${id}">${this.title}</label>
            <div class="block">
                <input id="${id}" name="${this.title}" class="field-control" type="${this.type}" 
                minlength="${this.minLength}" maxlength="${this.maxLength}"
                    required aria-errormessage="${id}-errors">
                <i class="bx ${this.icon}"></i>
            </div>
            <span class="field-errors" id="${id}-errors" data-js-field-errors></span>
        `
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("form-group", formGroup); 