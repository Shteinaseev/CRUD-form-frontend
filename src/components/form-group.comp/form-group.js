import styles from './form-group.css?inline';
import * as icons from '@boxicons/js';
export class FormGroup extends HTMLElement {

    static formAssociated = true;
    static get observedAttributes() {
        return ['label', 'name', 'type', 'icon',
            'inputmode', 'min-length', 'max-length', 'value', 'required', 'options', 'lookup', 'displayfields', 'searchfields', 'valueFrom'];
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
    #lookup = '';
    #displayFields = [];
    #searchFields = [];
    #id = '';
    #internals = null;
    #valueFrom = '';

    on = {
        dataSend: (callback) => {
            this.addEventListener("data-send", (e) => {
                callback(e.detail);
            });
        }
    };

    off = {
        dataSend: (callback) => {
            this.removeEventListener("data-send", (e) => {
                callback(e.detail);
            })
        }
    };



    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.#internals = this.attachInternals();
    }

    set value(val) {
        this.#value = val ?? '';
        this.#internals.setFormValue(this.#value);

        const input = this.shadowRoot?.querySelector('input, textarea');

        if (!input) return;

        if (input.type === 'checkbox') {
            input.checked = Boolean(this.#value);
        } else if (input.type === 'radio') {
            const radio = this.shadowRoot.querySelector(`input[value="${this.#value}"]`);
            if (radio) radio.checked = true;
        } else {
            input.value = this.#value;
        }
    }

    get value() {
        return this.#value;
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
                this.#internals.setFormValue(this.#value);
                break;

            case 'required':
                this.#required = newValue !== null;
                break;

            case 'lookup':
                this.#lookup = newValue || '';
                break;

            case 'displayfields':
                this.#displayFields = this.#parseOptions(newValue);

                break;

            case 'searchfields':
                this.#searchFields = this.#parseOptions(newValue);
                break;

            case 'valueFrom':
                this.#valueFrom = newValue || '';
                break;
        }

        this.#id = this.#name.toLowerCase().replace(/\s/g, '-') + '-' + Math.floor(Math.random() * 1000);

        this.render();
        this.#bindInputEvents();

    }

    debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    #fetchSuggestions(value) {
        if (!value) {
            return
        }
        let url;
        if (this.#lookup === 'odeljenje') {
            console.log("fsd")
            url = `https://dario.ginder.ucim.in.rs/${this.#lookup}/api/odeljenje_find.php?${this.#searchFields.join('')}&keyword=${value}`
        } else {
            url = `http://localhost:3000/${this.#lookup}?q=${value}`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const newData = [];
                let arr;
                if (this.#lookup === 'odeljenje') {
                    arr = data.data
                } else {
                    arr = data
                }
                console.log(data, arr)
                arr.forEach(el => {
                    let i = 0;
                    const obj = {};
                    console.log(el)
                    for (const [key, value] of Object.entries(el)) {
                        if (this.#displayFields[i++] === key) {
                            obj[key] = value
                        }
                    }
                    newData.push(obj)

                });
                this.dispatchEvent(new CustomEvent("data-send", {
                    detail: { data: newData, title: this.#lookup },
                    bubbles: true,
                    composed: true
                }));

            })
            .catch(err => console.error('Search error:', err));

    }

    onInput(event) {
        const value = event.target.value.trim();
        this.value = value;
        this.#fetchSuggestions(value);
    }

    #bindInputEvents() {
        const inputs = this.shadowRoot.querySelectorAll('input, textarea');
        if (!inputs.length) return;

        const syncValue = (input) => {
            if (this.#type === 'checkbox') {
                this.value = input.checked ? input.value || '1' : '';
                return;
            }

            if (this.#type === 'radio') {
                const checkedInput = this.shadowRoot.querySelector('input:checked');
                this.value = checkedInput ? checkedInput.value : '';
                return;
            }

            this.value = input.value;
        };

        inputs.forEach((input) => {
            input.addEventListener('input', () => syncValue(input));
            input.addEventListener('change', () => syncValue(input));
        });

        const input = inputs[0];

        if (this.#type === 'number' || this.#inputMode === 'numeric') {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
                this.value = input.value;
            });
        }
        else if (this.#type === 'checkbox') {
            input.nextElementSibling.addEventListener('click', () => {
                input.checked = !input.checked;
                input.nextElementSibling.classList.toggle('check');
                this.value = input.checked ? input.value || '1' : '';
            });
        }
        else if (this.#type === 'search') {
            input.addEventListener('input', this.debounce(this.onInput.bind(this), 500));
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.#fetchSuggestions(input.value.trim());
                }
            });
            document.addEventListener('suggestion-selected', (e) => {
                if (e.detail['data-js-table'].value === this.#lookup) {
                    input.value = e.detail['data-js-suggestion'].value;
                    this.value = input.value;
                }
            });
        }

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
        } else if (this.#type === 'search') {
            block.classList.add('block');
            block.innerHTML = this.#renderSearchInput();
        } else if (this.#type === 'checkbox') {
            block.classList.add('checkbox');
            block.innerHTML = this.#renderCheckboxInput();

        } else {
            block.classList.add('block');
            block.innerHTML = this.#renderInput();
        }
        return block.outerHTML;
    }

    #renderSearchInput() {
        return `
            <input 
                id="${this.#id}"
                name="${this.#name}"
                class="field-control" 
                type="text"
                ${this.#inputMode ? `inputmode="${this.#inputMode}"` : ''}
            >
            ${this.#icon}
        `
    }

    #renderCheckboxInput() {
        return `
                <input id="${this.#id}" name="${this.#name}" class="field-control" type="checkbox" >
                <div class="checkmark"></div>
            `
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
        //  if (this.#type === 'checkbox') {

        // } else {
        //     let tm = '<label for="${this.#id}">${this.#label}</label>'
        // }
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
        this.#bindInputEvents();
    }

}

customElements.define("form-group", FormGroup); 
