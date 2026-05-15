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
    tableSvgWidth = 260;
    isDragging = false;
    index = 1;
    startX = 0;
    firstCardWidth = 350;
    isShowingAll = false;
    svgNs = "http://www.w3.org/2000/svg";
    endpoints = [
        'http://localhost:3000/ucenik_has_staratelj',
        'http://localhost:3000/ucenik',
        'http://localhost:3000/mesto',
        'http://localhost:3000/osnovna_skola',
        'http://localhost:3000/opstina',
        'http://localhost:3000/odeljenje_has_ucenik',
        'https://dario.ginder.ucim.in.rs/odeljenje/api/proba.php',
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
        erDiagramBlock: '[data-js-er-diagram-block]',
        erDiagramCanvas: '[data-js-er-diagram-canvas]',
        erDiagramTable: '[data-js-table]'
    }

    constructor() {
        getIcons({
            icons: { Home, ChevronLeft, ChevronRight, Menu, Plus, InfoCircle, HelpCircle }
        });

        this.root = document.querySelector(this.selectors.root);
        this.infoBlock = document.querySelector(this.selectors.infoBlock);
        this.erdBlock = document.querySelector(this.selectors.erDiagramBlock);
        this.erdCanvas = this.erdBlock.querySelector(this.selectors.erDiagramCanvas);
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
        this.#renderSvgTable();
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
                        this.section.appendChild(this.createBtnEl('button', 'disactivated', 'Prikaži sve', true, 'data-js-show-all'));
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
        const btnSubmit = this.createBtnEl('submit', 'activated', 'Pošalji', false, 'data-js-submit-btn', this.postFormContainer.children.length + 2);
        this.postFormContainer.appendChild(btnSubmit);
        this.postFormContainer.appendChild(wrapper);
    }

    createBtnEl(type = 'submit', className = '', text = 'Pošalji', isTransparent = false, selector = 'data-js', i = 1) {
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

        if (className) {
            btn.classList.add(className);
            setTimeout(() => {
                btn.classList.remove(className);
            }, 10);
        }

        return btn;
    }

    #createTablePlane(x, y, quantity, index) {
        const rect = document.createElementNS(this.svgNs, "rect");
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('height', quantity * 30);
        rect.setAttribute('data-js-table', index);
        rect.classList.add('table');
        rect.classList.add('animation');
        return rect;
    }

    #createTableRelationLine(x0, y0, x1, y1) {
        const line = document.createElementNS(this.svgNs, "path");
        const midpointX = x0 + ((x1 - x0) / 2);
        line.setAttribute('d', `
                M ${x0},${y0} L ${midpointX},${y0} L ${midpointX},${y1} ${x1},${y1}
            `);
        line.classList.add('relation');
        return line;
    }

    #createTableHeader(x0, y, title) {
        const header = document.createElementNS(this.svgNs, "text");
        const x1 = x0 + this.tableSvgWidth;
        const rectCenterX = x0 + this.tableSvgWidth / 2;
        header.setAttribute('x', rectCenterX);
        header.setAttribute('y', y);
        header.setAttribute('text-anchor', 'middle');
        header.classList.add('header');

        header.textContent = title;
        return header;
    }

    #createTableP(x, y, title, padding = 20, textAnchor = "start") {
        const p = document.createElementNS(this.svgNs, "text");
        p.setAttribute('text-anchor', textAnchor);
        if (textAnchor === "start") {
            p.setAttribute('x', x + padding);
        } else if (textAnchor === "end") {
            p.setAttribute('x', x + this.tableSvgWidth - padding);
        }
        p.setAttribute('y', y);
        p.textContent = title;
        return p;
    }

    #createTableSvg(obj) {
        const quantity = Object.keys(obj).length;
        this.erdCanvas.appendChild(this.#createTablePlane(obj.x, obj.y, quantity, obj.index));
        this.erdCanvas.appendChild(this.#createTableHeader(obj.x, obj.y + 30, obj.title));

        let i = 70;
        for (const [key, value] of Object.entries(obj)) {
            if (!['title', 'x', 'y', 'index'].includes(key)) {
                if (value?.foreignKey) {
                    const ref = Object.values(tables).filter(o => value.references.index === o.index);
                    this.erdCanvas.appendChild(this.#createTableRelationLine(obj.x + this.tableSvgWidth, obj.y + i - 5, ref[0].x, ref[0].y + 65));
                }
                this.erdCanvas.appendChild(this.#createTableP(obj.x, obj.y + i, key, 20));
                this.erdCanvas.appendChild(this.#createTableP(obj.x, obj.y + i, value.type, 20, "end"));
                i += 30;
            }
        }

    }

    #renderSvgTable() {
        for (const [key, value] of Object.entries(tables)) {
            this.#createTableSvg(value);

        }
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
        wrapper.setAttribute('data-js-btn-wrapper', '')
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

    #createTableShemeEl(data) {
        const tableSheme = document.createElement('table-sheme');
        tableSheme.data = data;
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
        for (const [key, value] of Object.entries(tables)) {
            const tableShemeEl = this.#createTableShemeEl(value);
            tableShemeEl.classList.add('disactivated');
            this.erdBlock.append(tableShemeEl);
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

    #showAllItems(container, filter = true, isHtmlCollection = true) {
        const elements = this.#conditionalfilterItems([...container.children], filter, ['div', 'defs']);
        console.log(elements)
        const promises = Promise.all(elements.map(el => this.#fadeIn(el)));
        return promises;
    }

    #conditionalfilterItems(array = [], condition = true, els = []) {
        return condition ? array.filter(el => !els.includes(el.tagName.toLowerCase())) : array;
    }

    #hideAllItems(container, filter = true, isHtmlCollection = true) {
        const elements = this.#conditionalfilterItems([...container.children], filter, ['div', 'defs']);
        console.log(elements)

        const promises = Promise.all(elements.map(el => this.#fadeOut(el)))
            .then((list) => {
                list.forEach((el) => {
                    console.log(el)
                    el.remove();
                })

            })
        return promises;
    }

    #fadeContainer(container, timeout = 1000) {
        return new Promise(resolve => {
            void container.offsetWidth;
            container.classList.toggle('disactivated');

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

    #showDataGrid(btn) {
        this.#fadeContainer(this.container)
        this.#fadeOut(btn, 500)
        this.#hideAllItems(this.container)
            .then(() => {
                btn.remove();
                this.renderGridItems();
                this.renderHeaderGridItem();
                this.#showAllItems(this.section)
                    .then(() => {
                        this.section.style.overflowX = 'auto';
                        this.isShowingAll = true;
                    });
            })
    }

    #hideDataGrid() {
        this.section.style.overflowX = 'hidden';
        this.#hideAllItems(this.section)
            .then(() => {
                this.renderEntityCards();
                this.isShowingAll = false;
                this.section.appendChild(this.createBtnEl('button', 'disactivated', 'Prikaži sve', true, 'data-js-show-all'));
            })
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
            const isNumberBtn = e.target.matches(this.selectors.numberBtn);
            if (!isClickInsideNavbar && !this.navbar.classList.contains('scrolled')) {
                this.navbar.classList.add('scrolled');
            }

            if (isNumberBtn) {
                const btnIndex = parseInt(e.target.getAttribute('data-js-btn-index'));
                this.index = btnIndex;
                const btnWrapper = this.postForm.querySelector(this.selectors.btnWrapper);
                [...btnWrapper.children].forEach(btn => {
                    btn.disabled = true;
                });
                this.#hideAllItems(this.section)
                    .then(() => {
                        this.#fetchData();
                    })
                this.#hideAllItems(this.postFormContainer, false)
                    .then(() => {
                        this.renderFormGroups();
                    });
            }

            if (e.target.matches(this.selectors.erDiagramTable)) {
                const tableIndex = parseInt(e.target.getAttribute('data-js-table'));
                this.index = tableIndex;
                this.#fadeOut(this.erdBlock)
                    .then(() => {
                        this.#fadeOut(this.infoBlock)

                        this.#hideAllItems(this.section)
                            .then(() => {
                                this.#fetchData();
                            })
                        this.#hideAllItems(this.postFormContainer, false)
                            .then(() => {
                                this.renderFormGroups();
                            });
                    })
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
                    this.#showDataGrid(e.target);
                } else if (this.isShowingAll) {
                    this.#hideDataGrid();
                }
            }

            if (isClickInsideNavbar) {
                if (e.target === this.addBtn || e.target.closest(this.selectors.addBtn)) {
                    this.postForm.classList.toggle('active');
                } else if (e.target === this.homeBtn || e.target.closest(this.selectors.homeBtn)) {
                    if (!this.isShowingAll) {
                        const btn = this.section.querySelector('[data-js-show-all]');
                        this.#showDataGrid(btn);
                    }
                    else if (this.isShowingAll) {
                        this.#hideDataGrid();
                    }
                } else if (e.target === this.infoBtn || e.target.closest(this.selectors.infoBtn)) {
                    const tableRects = this.erdBlock.querySelectorAll(this.selectors.erDiagramTable);
                    if (!this.infoBlock.classList.contains('disactivated')) {
                        this.#fadeOut(this.erdBlock)
                            .then(() => {
                                this.#fadeOut(this.infoBlock)
                            })
                    } else {
                        this.#fadeIn(this.infoBlock)
                            .then(() => {
                                this.#fadeIn(this.erdBlock)
                            })

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
