import { FormGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";
import { entityCard } from "../components/entity-card";
import { EntityGridItem } from "../components/entity-grid-item";
import { TableSheme } from "../components/table-sheme";
import { ReflectGradient } from "./reflect-gradient";
import { getIcons, Home, ChevronLeft, ChevronRight, Menu, Plus, InfoCircle, HelpCircle } from '@boxicons/js';
import * as tables from '../config/table-js-config';
import {
    columnsWidth, ucenikFormFields,
    ucenikHasStarateljFormFields, mestoFormFields,
    osnovnaSkolaFormFields, opstinaFormFields,
    odeljenjeHasUcenikFormFields,
    odeljenjeFormFields, starateljFormFields, ulicaFormFields, smerFormFields,
    skolskaGodinaFormFields
} from "../config/data-grid-config";

class CRUD {
    isDragging = false;
    index = 7;
    startX = 0;
    firstCardWidth = 350;
    isShowingAll = false;
    endpoints = [
        'http://localhost:3000/ucenik_has_staratelj',
        'http://localhost:3000/ucenik',
        'http://localhost:3000/mesto',
        'http://localhost:3000/osnovna_skola',
        'http://localhost:3000/opstina',
        'http://localhost:3000/odeljenje_has_ucenik',
        'https://dario.ginder.ucim.in.rs/odeljenje',
        'http://localhost:3000/ulica',
        'http://localhost:3000/staratelj',
        'http://localhost:3000/smer',
        'http://localhost:3000/skolska_godina'
    ]
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
        btnWrapper: '[data-js-btn-wrapper]',
        numberBtn: '[data-js-btn-index]',
        searchList: '[data-js-search-list]',
        suggestion: '[data-js-suggestion]',
        infoBlock: '[data-js-info-block]',
    }

    constructor() {
        getIcons({
            icons: { Home, ChevronLeft, ChevronRight, Menu, Plus, InfoCircle, HelpCircle }
        });

        this.root = document.querySelector(this.selectors.root);
        this.infoBlock = document.querySelector(this.selectors.infoBlock);
        this.navbar = document.querySelector(this.selectors.navbar);
        this.homeBtn = this.navbar.querySelector(this.selectors.homeBtn)
        this.addBtn = this.navbar.querySelector(this.selectors.addBtn);
        this.infoBtn = this.navbar.querySelector(this.selectors.infoBtn);
        this.navbarBtn = this.navbar.querySelector(this.selectors.navbarBtn);
        this.section = this.root.querySelector(this.selectors.section);
        this.container = this.section.querySelector('.container');
        this.postForm = this.root.querySelector(this.selectors.postForm);
        this.postFormContainer = this.postForm.querySelector(this.selectors.postFormContainer);
        this.searchList = this.root.querySelector(this.selectors.searchList);
        this.renderFormGroups();
        this.#fetchData();
        this.bindEvents();

    }




    #fetchData() {
        fetch(`${this.endpoints[this.index - 1]}`)
            .then(response => response.json())
            .then(data => {
                this.data = data;
                this.#fadeContainer(this.container, 500)
                this.#hideAllItems(this.container, 1000)
                    .then(() => {
                        this.renderEntityCards();
                        this.isShowingAll = false;
                        this.section.appendChild(this.createBtnEl('button', 'Prikaži sve', true, 'data-js-show-all'));
                    })
            })

    }

    createFormGroup(i) {
        const formGroup = document.createElement('form-group');
        formGroup.style.setProperty('--i', `${i}`);
        formGroup.classList.add('animation');
        formGroup.classList.add('activated');
        setTimeout(() => {
            formGroup.classList.remove('activated');
        }, 10);
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
                this.renderFormItems(ucenikHasStarateljFormFields);
                break;
            case 2:
                this.renderFormItems(ucenikFormFields);
                break;
            case 3:
                this.renderFormItems(mestoFormFields);
                break;
            case 4:
                this.renderFormItems(osnovnaSkolaFormFields);
                break;
            case 5:
                this.renderFormItems(opstinaFormFields);
                break;
            case 6:
                this.renderFormItems(odeljenjeHasUcenikFormFields);
                break;
            case 7:
                this.renderFormItems(odeljenjeFormFields);
                break;
            case 8:
                this.renderFormItems(ulicaFormFields);
                break;
            case 9:
                this.renderFormItems(starateljFormFields);
                break;
            case 10:
                this.renderFormItems(smerFormFields);
                break;
            case 11:
                this.renderFormItems(skolskaGodinaFormFields);
                break;

        }
    }

    renderFormItems(array) {
        let i = 0;
        array.forEach(obj => {
            const el = this.createFormGroup(i);
            this.updateAttrs(el, obj);
            this.postFormContainer.appendChild(el);
            i += 1;
        })
        this.renderBtnBlock();
    }

    renderBtnBlock() {
        const wrapper = this.createBtnWrapper();
        const btnSubmit = this.createBtnEl('submit', 'Pošalji', false, 'data-js-submit-btn', this.postFormContainer.children.length + 2);
        btnSubmit.classList.add('activated');
        this.postFormContainer.appendChild(btnSubmit);
        this.postFormContainer.appendChild(wrapper);

        setTimeout(() => {
            btnSubmit.classList.remove('activated');
        }, 10);
    }

    createBtnEl(type = 'submit', text = 'Pošalji', isTransparent = false, selector = 'data-js', i = 2) {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('animation');
        btn.textContent = text;
        btn.style.setProperty('--i', `${i}`);
        btn.setAttribute('type', type);
        if (isTransparent) {
            btn.classList.add('btn-transparent');
        }

        btn.setAttribute(selector, '');

        return btn;
    }

    createBtnWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('btn-wrapper');
        wrapper.classList.add('animation');
        wrapper.classList.add('activated');
        wrapper.style.setProperty('--i', `${this.postFormContainer.children.length + 2}`);
        let i = (this.index - 1 <= 0) ? this.index : this.index - 1
        const finish = i + 2;
        for (i; i <= finish; i++) {
            const btn = document.createElement('button');
            btn.setAttribute('data-js-btn-index', i);
            btn.setAttribute('type', 'button');
            btn.textContent = `${i}`;
            wrapper.appendChild(btn);
        }
        setTimeout(() => {
            wrapper.classList.remove('activated');
        }, 10);
        return wrapper;
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

    createGridItem(data, i) {
        const gridItem = document.createElement('entity-grid-item');
        gridItem.style.setProperty('--i', `${i}`);
        gridItem.data = data;
        return gridItem;
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

    createHeaderGridItem() {
        const header = document.createElement('header');
        header.style.setProperty('--i', `2`);
        this.gridWidth = 0;
        const actionCellWidth = 108;
        let i = 0;
        for (const key of Object.keys(this.data[0])) {
            const width = key.length * 16 + 32;
            if (!columnsWidth[i]) {
                columnsWidth[i] = width;
            }
            else if (columnsWidth[i] < width) {
                columnsWidth[i] = width;
            }

            this.gridWidth += width;
            header.innerHTML += `<p>${key}</p>`;
            i++;
        }
        header.innerHTML += `<p>promeniti</p>`;
        header.innerHTML += `<p>obrisati</p>`;
        columnsWidth.push(actionCellWidth);
        columnsWidth.push(actionCellWidth);

        this.gridWidth += actionCellWidth;
        document.documentElement.style.setProperty('--grid-width', this.gridWidth / 16 + 'rem');
        return header;
    }

    #createTableShemeEl(data, j) {
        const tableSheme = document.createElement('table-sheme');
        tableSheme.data = data;
        tableSheme.style.setProperty('--i', `${j}`);
        return tableSheme;
    }

    renderGridItems() {
        let j = 0;
        this.data.slice(0, 10).forEach((data, i) => {
            const gridItem = this.createGridItem(data, j);
            gridItem.classList.add('animation');
            gridItem.classList.add('disactivated');
            this.section.append(gridItem);
            j += 5;
        });
    }

    #renderTableShemeEls() {
        let j = 0;
        for (const [key, value] of Object.entries(tables)) {
            console.log(value)
            const tableShemeEl = this.#createTableShemeEl(value, j);
            tableShemeEl.classList.add('animation');
            tableShemeEl.classList.add('disactivated');
            this.infoBlock.append(tableShemeEl);
        }

    }

    #fadeIn(el) {
        return new Promise(resolve => {
            void el.offsetWidth;
            el.classList.remove('disactivated');
            const onEnd = e => {
                if (e.target !== el) return;
                el.removeEventListener('transitionend', onEnd);
                resolve(el);
            };

            el.addEventListener('transitionend', onEnd);
        });
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

    #showAllItems(container, timeout = 1000, filter = true) {
        const elements = [...container.children];

        const promises = Promise.all(elements.map(el => this.#fadeIn(el, timeout)));
        return promises;
    }

    #hideAllItems(container, timeout = 1000, filter = true) {
        const elements = [...container.children];
        const filteredElements = [];
        if (filter) {
            filteredElements.push(...elements.filter(el => {
                return el.tagName.toLowerCase() !== 'div';
            }));
        } else {
            filteredElements.push(...elements);
        }
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

        window.addEventListener('data-send', (e) => {
            console.log(e.detail)
            this.searchList.parentElement.classList.remove('disactivated');
            this.searchList.innerHTML = e.detail.data.map((item) => {
                let textContent = ''
                let id = '';
                for (const [key, value] of Object.entries(item)) {
                    textContent += `${key} : ${value}, `
                    if (key === 'id' + e.detail.title) {
                        id = value;
                    }
                }
                return `<li data-js-suggestion="${id}" data-js-table="${e.detail.title}" class="disactivated">${textContent}</li>`;
            }).join('');
        })

        window.addEventListener('blur', (e) => {
            this.searchList.parentElement.classList.add('disactivated')
        }, { capture: true })

        window.addEventListener('click', (e) => {
            const isClickInsideNavbar = this.navbar.contains(e.target);
            if (!isClickInsideNavbar && !this.navbar.classList.contains('scrolled')) {
                this.navbar.classList.add('scrolled');
            }

            if (e.target.matches(this.selectors.numberBtn)) {
                const btnIndex = parseInt(e.target.getAttribute('data-js-btn-index'));
                this.index = btnIndex;
                this.#hideAllItems(this.section, 500)
                    .then(() => {
                        this.#fetchData();
                    })
                this.#hideAllItems(this.postFormContainer, 500, false)
                    .then(() => {
                        this.renderFormGroups();
                    });
            }

            if (e.target.matches(this.selectors.suggestion)) {
                console.log(e)
                document.dispatchEvent(new CustomEvent('suggestion-selected', {
                    detail: e.target.attributes,
                    bubbles: true,
                    composed: true
                }));

            }

            if (e.target.matches(this.selectors.btnShowAll)) {
                if (!this.isShowingAll) {
                    this.#fadeContainer(this.container, 500)
                    this.#fadeOut(e.target, 500)
                    this.#hideAllItems(this.container, 1000)
                        .then(() => {
                            e.target.remove();
                            this.renderGridItems();
                            this.renderHeaderGridItem();
                            this.#showAllItems(this.section, 1000)
                                .then(() => {
                                    this.section.style.overflowX = 'auto';
                                    this.isShowingAll = true;
                                });
                        })
                } else if (this.isShowingAll) {
                    this.#hideAllItems(this.section, 1000)
                        .then(() => {
                            this.renderEntityCards();
                            this.section.style.overflowX = 'hidden';
                            this.isShowingAll = false;
                            this.section.appendChild(this.createBtnEl('button', 'Prikaži sve', true, 'data-js-show-all', 1000));
                        })
                }
            }

            if (isClickInsideNavbar) {
                if (e.target === this.addBtn || e.target.closest(this.selectors.addBtn)) {
                    this.postForm.classList.toggle('active');
                } else if (e.target === this.homeBtn || e.target.closest(this.selectors.homeBtn)) {
                    if (!isShowingAll) {
                        const btn = this.section.querySelector('[data-js-show-all]');
                        this.#fadeOut(btn, 500);
                        this.#fadeContainer(this.container, 500)
                        this.#hideAllItems(this.container, 1000)
                            .then(() => {
                                btn.remove();
                                this.renderGridItems();
                                this.renderHeaderGridItem();
                                this.#showAllItems(this.section, 1000)
                                    .then(() => {
                                        this.section.style.overflowX = 'auto';
                                        isShowingAll = true;
                                    });
                            })
                    }
                    else if (isShowingAll) {
                        this.#hideAllItems(this.section, 1000)
                            .then(() => {
                                this.renderEntityCards();
                                this.section.style.overflowX = 'hidden';
                                isShowingAll = false;
                                this.section.appendChild(this.createBtnEl('button', 'Prikaži sve', true, 'data-js-show-all', 1000));
                            })
                    }
                } else if (e.target === this.infoBtn || e.target.closest(this.selectors.infoBtn)) {
                    if (this.infoBlock.classList.contains('active')) {
                        this.#hideAllItems(this.infoBlock, 500)
                            .then(() => {
                                this.infoBlock.classList.remove('active');
                            })
                    } else {
                        console.log("ds")
                        this.#renderTableShemeEls();
                        this.infoBlock.classList.add('active');
                        this.#showAllItems(this.infoBlock, 500)

                    }

                }
            }
        })

        this.navbarBtn.addEventListener('click', () => {
            this.navbar.classList.toggle('scrolled');
        })



    }
}

window.crud = new CRUD();
new ReflectGradient();
