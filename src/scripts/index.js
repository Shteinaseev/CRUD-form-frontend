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

    #fadeOutAndRemove(el, timeout = 500) {
        return new Promise(resolve => {
            void el.offsetWidth;
            el.classList.add('disactivated');

            const onEnd = e => {
                if (e.target !== el) return;
                el.removeEventListener('transitionend', onEnd);
                clearTimeout(timer);
                el.remove();
                resolve();
            };

            const timer = setTimeout(() => {
                el.removeEventListener('transitionend', onEnd);
                el.remove();
                resolve();
            }, timeout);

            el.addEventListener('transitionend', onEnd);
        });
    }

    #hideAllItems(container, timeout = 500) {
        const promises = [...container.children].map(el => this.#fadeOutAndRemove(el, timeout));
        return Promise.all(promises);
    }

    #fadeContainer(container, timeout = 500) {
        return new Promise(resolve => {
            void container.offsetWidth;
            container.classList.add('disactivated');

            const onEnd = e => {
                if (e.target !== container) return;
                container.removeEventListener('transitionend', onEnd);
                clearTimeout(timer);
                resolve();
            };

            const timer = setTimeout(() => {
                container.removeEventListener('transitionend', onEnd);
                resolve();
            }, timeout);

            container.addEventListener('transitionend', onEnd);
        });
    }

    bindEvents() {
        let isShowingAll = false;

        this.btnShowAll.addEventListener('click', () => {
            this.btnShowAll.disabled = true;

            this.#fadeContainer(this.container, 500)
                .then(() => this.#hideAllItems(this.container, 500))
                .then(() => {
                    if (!isShowingAll) {
                        this.renderGridItems();
                        this.btnShowAll.textContent = "Vrati se nazad";
                        isShowingAll = true;
                    } else {
                        return this.#hideAllItems(this.section, 500)
                            .then(() => {
                                this.renderEntityCards();
                                this.btnShowAll.textContent = "Prikaži sve";
                            });
                    }
                })
                .then(() => {
                    this.container.classList.remove('disactivated');
                })
                .finally(() => {
                    this.btnShowAll.disabled = false;
                });
        });
    }
}

new CRUD();
new ReflectGradient();
