import { FormGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";
import { ReflectGradient } from "./reflect-gradient";
import { getIcons, Alarm, ChevronLeft, ChevronRight } from '@boxicons/js';

class CRUD {
    isDragging = false;
    startX = 0;
    firstCardWidth = 350;
    selectors = {
        root: '[data-js]',
        container: '[data-js-entity-card-cont]',
        arrow: '[data-js-arrow]'
    }

    constructor() {
        getIcons({
            icons: { ChevronLeft, ChevronRight, Alarm }
        });

        this.root = document.querySelector(this.selectors.root);
        this.container = this.root.querySelector(this.selectors.container);
        this.arrowsBtns = document.querySelectorAll('.arrow');
        this.cardPervView = Math.round(this.container.offsetWidth / this.firstCardWidth);

        fetch('https://mocki.io/v1/840e113d-8cfc-4286-85d5-9742b876cb08')
            .then(response => response.json())
            .then(data => {
                data = data.slice(0, 2);
                data.forEach((el, i) => {
                    this.container.append(this.createEntityCardEl(el));
                })
            })
        // this.bindEvents();
    }

    createEntityCardEl(data) {
        const card = document.createElement('entity-card');
        card.data = data;
        return card;
    }

    updateAttrs(card, data) {
        for (const [key, value] of Object.entries(data)) {
            card.setAttribute(key, value);
        }
    }

    bindEvents() {
    }
}

new CRUD();
new ReflectGradient();
