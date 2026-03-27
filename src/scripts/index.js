import { formGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";
import { getIcons, Alarm, ChevronLeft, ChevronRight } from '@boxicons/js';

class CRUD {
    isDragging = false;
    startX = 0;
    selectors = {
        root: '[data-js]',
        container: '[data-js-entity-card-cont]'
    }

    dragStart = (e) => {
        this.isDragging = true;
        this.container.classList.add("dragging");
        this.startX = e.pageX;
        this.startScrollLeft = this.container.scrollLeft;
    }

    dragging = (e) => {
        if (!this.isDragging) return;
        console.log(this.startScrollLeft - (e.pageX - this.startX));
        this.container.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
    }

    dragStop = () => {
        this.isDragging = false;
        this.container.classList.remove("dragging");
    }

    constructor() {
        this.root = document.querySelector(this.selectors.root);
        this.container = this.root.querySelector(this.selectors.container)

        getIcons({
            icons: { ChevronLeft, ChevronRight, Alarm }
        });

        this.bindEvents();

        fetch('https://jsonplaceholder.typicode.com/todos')
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

    bindEvents() {
        this.container.addEventListener("mousedown", this.dragStart);
        this.container.addEventListener("mousemove", this.dragging, { capture: true });
        document.addEventListener("mouseup", this.dragStop);

    }
}

new CRUD();
