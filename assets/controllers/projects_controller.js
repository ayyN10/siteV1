import {Controller} from '@hotwired/stimulus';

export default class extends Controller {

    connect() {
        const cards = document.querySelectorAll('.card');
        const styleElement = document.querySelector('.hover');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card, styleElement));
            card.addEventListener('touchmove', (e) => this.handleMove(e, card, styleElement));
            card.addEventListener('mouseout', () => this.handleLeave(card, styleElement));
            card.addEventListener('touchend', () => this.handleLeave(card, styleElement));
            card.addEventListener('touchcancel', () => this.handleLeave(card, styleElement));
            card.addEventListener('click', (e) => this.openModal(e, card));
        });
    }

    handleMove(event, card, styleElement) {
        event.preventDefault();

        let posX = event.offsetX || event.touches?.[0]?.clientX || 0;
        let posY = event.offsetY || event.touches?.[0]?.clientY || 0;
        let width = card.offsetWidth;
        let height = card.offsetHeight;

        let px = Math.abs(Math.floor((100 / width) * posX) - 100);
        let py = Math.abs(Math.floor((100 / height) * posY) - 100);
        let pa = 50 - px + (50 - py);

        let lp = 50 + (px - 50) / 1.5;
        let tp = 50 + (py - 50) / 1.5;
        let pxSpark = 50 + (px - 50) / 7;
        let pySpark = 50 + (py - 50) / 7;
        let opacity = 20 + Math.abs(pa) * 1.5;
        let rotateX = ((tp - 50) / 2) * -1;
        let rotateY = ((lp - 50) / 1.5) * 0.5;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        styleElement.innerHTML = `
            .card:hover:before { background-position: ${lp}% ${tp}%; }
            .card:hover:after { background-position: ${pxSpark}% ${pySpark}%; opacity: ${opacity / 100}; }
        `;
    }

    handleLeave(card, styleElement) {
        styleElement.innerHTML = '';
        card.style.transform = '';
    }

    openModal(event, card) {
        // Récupération des informations du projet
        const title = card.querySelector('h3').innerText;
        const image = card.style.backgroundImage.replace('url("', '').replace('")', '');
        const description = "Description du projet " + title;

        // Remplissage du modal
        this.modalTitleTarget.innerText = title;
        this.modalImageTarget.src = image;
        this.modalDescriptionTarget.innerText = description;

        // Affichage du modal
        this.modalTarget.classList.remove("hidden");
    }

    closeModal() {
        this.modalTarget.classList.add("hidden");
    }
}
