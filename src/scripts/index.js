import { FormGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";
import { EntityGridItem } from "../components/entity-grid-item";
import { ReflectGradient } from "./reflect-gradient";
import { getIcons, Alarm, ChevronLeft, ChevronRight, Menu } from '@boxicons/js';

class CRUD {
    isDragging = false;
    startX = 0;
    firstCardWidth = 350;
    selectors = {
        root: '[data-js]',
        navbar: '[data-js-navbar]',
        entitysSection: '[data-js-entity-card-cont]',
        btnShowAll: '[data-js-show-all]',
        postForm: '[data-js-post-form]',
    }

    constructor() {
        getIcons({
            icons: { ChevronLeft, ChevronRight, Alarm, Menu }
        });

        this.root = document.querySelector(this.selectors.root);
        this.navbar = document.querySelector(this.selectors.navbar);
        this.container = this.root.querySelector(this.selectors.container);
        this.btnShowAll = this.root.querySelector(this.selectors.btnShowAll);
        this.postForm = this.root.querySelector(this.selectors.postForm);

        fetch('https://mocki.io/v1/840e113d-8cfc-4286-85d5-9742b876cb08')
            .then(response => response.json())
            .then(data => {
                data = data.slice(0, 2);
                data.forEach((el, i) => {
                    this.container.append(this.createEntityCardEl(el, i));
                })
            })
        this.bindEvents();
    }

    createEntityCardEl(data, i) {
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
        this.btnShowAll.addEventListener('click', () => {
            [...this.container.children].forEach((child, i) => {
                child.classList.toggle('disactivated');
            });
            this.container.classList.toggle('disactivated');
        });
        this.navbar.addEventListener('click', () => {
            this.postForm.classList.toggle('active');
        });
    }
}

new CRUD();
new ReflectGradient();
