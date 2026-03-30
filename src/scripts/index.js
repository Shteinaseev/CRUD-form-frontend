import { formGroup } from "../components/form-group";
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

    dragStart = (e) => {
        this.isDragging = true;
        this.container.classList.add("dragging");
        this.startX = e.pageX;
        this.startScrollLeft = this.container.scrollLeft;
    }

    dragging = (e) => {
        if (!this.isDragging) return;
        this.container.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
    }

    dragStop = () => {
        this.isDragging = false;
        this.container.classList.remove("dragging");
    }

    infiniteScroll = () => {
        if (this.container.scrollLeft === 0) {
            this.container.classList.add("no-transition");
            this.container.scrollLeft = this.container.scrollWidth - (2 * this.container.offsetWidth);
            this.container.classList.remove("no-transition");
        } else if (Math.ceil(this.container.scrollLeft) >= this.container.scrollWidth - this.container.offsetWidth) {
            this.container.classList.add("no-transition");
            this.container.scrollLeft = this.container.offsetWidth;
            this.container.classList.remove("no-transition");
        }
    }

    constructor() {
        getIcons({
            icons: { ChevronLeft, ChevronRight, Alarm }
        });

        this.root = document.querySelector(this.selectors.root);
        this.container = this.root.querySelector(this.selectors.container);
        this.arrowsBtns = document.querySelectorAll('.arrow');
        this.cardPervView = Math.round(this.container.offsetWidth / this.firstCardWidth);

        fetch('https://mocki.io/v1/8b08d074-93c2-42be-bb3c-94d1248c9925')
            .then(response => response.json())
            .then(data => {
                data.forEach((el, i) => {
                    this.container.append(this.createEntityCardEl(el));
                })
                const containerChildrens = [...this.container.children];
                containerChildrens.slice(-this.cardPerView).reverse().forEach(card => {
                    console.log("sdds")
                    this.container.insertAdjacentHTML("afterbegin", card.outerHTML);
                })

                containerChildrens.slice(0, this.cardPerView).forEach(card => {
                    this.container.insertAdjacentHTML("beforeend", card.outerHTML);
                })
            })
        this.bindEvents();
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
        this.arrowsBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.container.scrollLeft += btn.id === "left" ? -this.firstCardWidth : this.firstCardWidth
            })
        })
        this.container.addEventListener("scroll", this.infiniteScroll);
    }
}

new CRUD();
new ReflectGradient();
