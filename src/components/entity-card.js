import styles from './entity-card.css?inline';

export class entityCard extends HTMLElement {
    static observedAttributes = ['title', 'if', 'min-length', 'max-length', 'icon'];

}
