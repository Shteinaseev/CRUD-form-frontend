import { FormGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";
import { EntityGridItem } from "../components/entity-grid-item";
import { ReflectGradient } from "./reflect-gradient";
import { getIcons, Home, ChevronLeft, ChevronRight, Menu, Plus, InfoCircle, HelpCircle } from '@boxicons/js';

class CRUD {
    isDragging = false;
    index = 2;
    startX = 0;
    firstCardWidth = 350;
    selectors = {
        root: '[data-js]',
        navbar: '[data-js-navbar]',
        section: '[data-js-section]',
        btnShowAll: '[data-js-show-all]',
        postForm: '[data-js-post-form]',
        navbar: '[data-js-navbar]',
        navbarBtn: '[data-js-navbar-btn]',
        homeBtn: '[data-js-navbar-home-btn]',
        addBtn: '[data-js-navbar-add-btn]',
        infoBtn: '[data-js-navbar-info-btn]',
        postFormContainer: '[data-js-post-form-container]',
        btnWrapper: '[data-js-btn-wrapper]'
    }

    firstFormFields = [
        { label: "Ime", name: "first_name", type: "text", icon: "User" },
        { label: "Prezime", name: "last_name", type: "text", icon: "User" },
        { label: "Datum rodjenja", name: "birthday", type: "date", icon: "" },
        { label: "JMBG", type: "text", icon: "User", minLength: 13, maxLength: 13, number: true },
        { label: "Broj Stana", type: "number", icon: "Home" },
        { label: "Telefon fiksni", type: "tel", icon: "Phone" },
        { label: "Telefon mobilni", type: "tel", icon: "Phone" },
        { label: "Nova lozinka", type: "text", icon: "Lock" },
        { label: "Potvrda nove lozinke", type: "text", icon: "Lock" },
        { label: "Pol", name: "gender", type: "radio", icon: "User", options: ["Male", "Female", "Other"] },
        { label: "Datum prvog upisa", type: "date", icon: "" },
        { label: "Email", type: "email", icon: "Envelope" },
        { label: "Username", type: "text", icon: "User" }
    ];

    secondFormFields = [
        { label: "Naziv smera", name: "direction_name", type: "text", icon: "User" },
    ]

    constructor() {
        getIcons({
            icons: { Home, ChevronLeft, ChevronRight, Menu, Plus, InfoCircle, HelpCircle }
        });

        this.root = document.querySelector(this.selectors.root);
        this.navbar = document.querySelector(this.selectors.navbar);
        this.homeBtn = this.navbar.querySelector(this.selectors.homeBtn)
        this.addBtn = this.navbar.querySelector(this.selectors.addBtn);
        this.navbarBtn = this.navbar.querySelector(this.selectors.navbarBtn);
        this.section = this.root.querySelector(this.selectors.section);
        this.container = this.section.querySelector('.container');
        this.btnShowAll = this.root.querySelector(this.selectors.btnShowAll);
        this.postForm = this.root.querySelector(this.selectors.postForm);
        this.postFormContainer = this.postForm.querySelector(this.selectors.postFormContainer);
        this.btnWrapper = this.postFormContainer.querySelector(this.selectors.btnWrapper);
        this.renderFormGroups();
        fetch('https://mocki.io/v1/840e113d-8cfc-4286-85d5-9742b876cb08')
            .then(response => response.json())
            .then(data => {
                this.data = data;
                this.renderEntityCards();
            })
        this.bindEvents();
    }

    createFormGroup() {
        const formGroup = document.createElement('form-group');
        return formGroup;
    }

    updateAttrs(el, obj) {
        for (const [key, value] of Object.entries(obj)) {
            el.setAttribute(key, value);
        }
    }

    renderFormGroups() {
        switch (this.index) {
            case 1:
                this.firstFormFields.forEach((obj) => {
                    const el = this.createFormGroup();
                    this.updateAttrs(el, obj);
                    this.postFormContainer.prepend(el);
                })
                break;
            case 2:
                this.secondFormFields.forEach((obj) => {
                    const el = this.createFormGroup();
                    this.updateAttrs(el, obj);
                    this.postFormContainer.prepend(el);
                })
                break;
        }
    }

    renderEntityCards() {
        let data = this.data.slice(0, 2);
        data.forEach((data, i) => {
            const card = this.createEntityCardEl(data, i);
            card.classList.add('animation');
            card.classList.add('disactivated');
            setTimeout(() => {
                card.classList.remove('disactivated');
            }, 10);
            this.container.appendChild(card);
        });

        if (this.container.classList.contains('disactivated')) {
            this.container.classList.remove('disactivated');
        }
    }

    renderGridItems() {
        let j = 0;
        this.data.forEach((data, i) => {
            const gridItem = this.createGridItem(data, j);
            gridItem.classList.add('animation');
            gridItem.classList.add('disactivated');
            setTimeout(() => {
                gridItem.classList.remove('disactivated');
            }, 100);
            this.section.appendChild(gridItem);
            j += 5;
        });
    }


    renderHeaderGridItem() {
        const el = this.createHeaderGridItem();
        el.classList.add('animation');
        el.classList.add('disactivated');
        setTimeout(() => {
            el.classList.remove('disactivated');
        }, 100);
        this.section.prepend(el);
    }

    createEntityCardEl(data, i) {
        const card = document.createElement('entity-card');
        card.data = data;
        return card;
    }

    createGridItem(data, i) {
        const gridItem = document.createElement('entity-grid-item');
        gridItem.style.setProperty('--i', `${i}`);
        gridItem.data = data;
        gridItem.colWidths = this.colWidths;
        return gridItem;
    }

    createHeaderGridItem() {
        const header = document.createElement('header');
        header.style.setProperty('--i', `2`);
        this.colWidths = [];
        for (const key of Object.keys(this.data[0])) {
            const width = key.length * 8;
            this.colWidths.push(width);
            header.innerHTML += `<p>${key}</p>`;
        }
        return header;
    }

    #fadeOut(el, timeout = 500) {
        return new Promise(resolve => {
            void el.offsetWidth;
            el.classList.add('disactivated');

            const onEnd = e => {
                if (e.target !== el) return;
                el.removeEventListener('transitionend', onEnd);
                resolve(el);
            };

            el.addEventListener('transitionend', onEnd);
        });
    }

    #hideAllItems(container, timeout = 1000) {
        const elements = [...container.children];
        const filteredElements = elements.filter(el => {
            return el.tagName.toLowerCase() !== 'div' && el.tagName.toLowerCase() !== 'button';
        })
        const promises = Promise.all(filteredElements.map(el => this.#fadeOut(el, timeout)))
            .then((list) => {
                list.forEach((el) => {
                    el.remove();
                })
            })
        return promises;

    }

    #fadeContainer(container, timeout = 1000) {
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

        window.addEventListener('click', (e) => {
            const isClickInsideNavbar = this.navbar.contains(e.target);
            if (!isClickInsideNavbar && !this.navbar.classList.contains('scrolled')) {
                this.navbar.classList.add('scrolled');
            }

            if (isClickInsideNavbar) {
                if (e.target === this.addBtn || e.target.closest(this.selectors.addBtn)) {
                    this.postForm.classList.toggle('active');
                } else if (e.target === this.homeBtn || e.target.closest(this.selectors.homeBtn)) {
                    if (isShowingAll) {
                        this.btnShowAll.textContent = 'Prikaži sve';
                        this.#hideAllItems(this.section, 1000)
                            .then(() => {
                                this.renderEntityCards();
                                isShowingAll = false;
                                this.btnShowAll.disabled = false;
                                this.btnShowAll.classList.remove('disactivated')
                            })
                    }
                }
            }
        })

        this.btnWrapper.addEventListener('click', (e) => {
            const btnIndex = parseInt(e.target.getAttribute('data-js-btn-index'));
            this.index = btnIndex;
            this.renderFormGroups();
        })

        this.navbarBtn.addEventListener('click', () => {
            this.navbar.classList.toggle('scrolled');
        })


        this.btnShowAll.addEventListener('click', () => {
            if (!isShowingAll) {
                this.btnShowAll.classList.add('disactivated')
                this.btnShowAll.textContent = 'Sakrij sve';
                this.btnShowAll.disabled = true;
                this.#hideAllItems(this.container, 1000)
                this.#fadeContainer(this.container, 1000)
                    .then(() => {
                        this.renderGridItems();
                        this.renderHeaderGridItem();
                        isShowingAll = true;
                    })
            } else if (isShowingAll) {
                this.btnShowAll.textContent = 'Prikaži sve';
                this.btnShowAll.classList.remove('disactivated')

                this.btnShowAll.disabled = false;
                this.#hideAllItems(this.section, 1000)
                    .then(() => {
                        this.renderEntityCards();
                        this.btnShowAll.disabled = false;
                        this.btnShowAll.classList.remove('disactivated')
                    })
            }
        });

    }
}

new CRUD();
new ReflectGradient();
