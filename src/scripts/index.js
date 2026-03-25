import { formGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";

class CRUD {
    selectors = {
        root: '[data-js]',
        container: '[data-js-entity-card-cont]'
    }

    constructor() {
        this.root = document.querySelector(this.selectors.root);
        this.container = this.root.querySelector(this.selectors.container)

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => data.forEach((el, i) => {
                this.container.append(this.createEntityCardEl(el));
            }))
    }

    createEntityCardEl(data) {
        const card = document.createElement('entity-card');
        this.updateAttrs(card, data);
        return card;
    }

    updateAttrs(card, data) {
        for (const [key, value] of Object.entries(data)) {
            card.setAttribute(key, value);
        }
    }
}

new CRUD();
new dotsGenerator();