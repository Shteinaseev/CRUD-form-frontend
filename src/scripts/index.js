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
        section: '[data-js-section]',
        btnShowAll: '[data-js-show-all]',
        postForm: '[data-js-post-form]',
    }

    constructor() {
        getIcons({
            icons: { ChevronLeft, ChevronRight, Alarm, Menu }
        });

        this.root = document.querySelector(this.selectors.root);
        this.navbar = document.querySelector(this.selectors.navbar);
        this.section = this.root.querySelector(this.selectors.section);
        this.container = this.section.querySelector('.container');
        this.btnShowAll = this.root.querySelector(this.selectors.btnShowAll);
        this.postForm = this.root.querySelector(this.selectors.postForm);

        fetch('https://mocki.io/v1/840e113d-8cfc-4286-85d5-9742b876cb08')
            .then(response => response.json())
            .then(data => {
                this.data = data;
                this.renderEntityCards();
            })
        this.bindEvents();
    }

    renderEntityCards() {
        let data = this.data.slice(0, 2);
        data.forEach((data, i) => {
            const card = this.createEntityCardEl(data, i);
            this.container.appendChild(card);
        });
    }

    renderGridItems() {
        this.data.forEach((data, i) => {
            const gridItem = this.createGridItem(data, i);
            gridItem.classList.add('animation');
            gridItem.classList.add('disactivated');
            setTimeout(() => {
                gridItem.classList.remove('disactivated');
            }, 100);
            this.section.appendChild(gridItem);
        });
    }

    createEntityCardEl(data, i) {
        const card = document.createElement('entity-card');
        card.data = data;
        return card;
    }

    createGridItem(data, i) {
        const gridItem = document.createElement('entity-grid-item');
        gridItem.style.setProperty('--i', `${i + 5}`);
        gridItem.data = data;
        return gridItem;
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
                setTimeout(() => {
                    child.remove();
                }, 500);
            });
            this.container.classList.toggle('disactivated');
            this.btnShowAll.classList.add('disactivated');
            setTimeout(() => {
                this.renderGridItems();
                this.btnShowAll.textContent = "Vratiti nazad";
                this.btnShowAll.classList.remove('disactivated');
            }, 600);
        });
        this.navbar.addEventListener('click', () => {
            this.postForm.classList.toggle('active');
        });
    }
}

new CRUD();
new ReflectGradient();
