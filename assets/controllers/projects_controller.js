import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "modalTitle", "modalImage", "modalDescription"];

    connect() {
        // Récupère toutes les cartes
        const cards = document.querySelectorAll('.card');

        // Attache les événements
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('touchmove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseout', () => this.handleLeave(card));
            card.addEventListener('touchend', () => this.handleLeave(card));
            card.addEventListener('touchcancel', () => this.handleLeave(card));
            card.addEventListener('click', (e) => this.openModal(e, card));
        });
    }

    handleMove(event, card) {
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
        let rotateX = ((tp - 50) / 2) * -1;
        let rotateY = ((lp - 50) / 1.5) * 0.5;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handleLeave(card) {
        card.style.transform = '';
    }

    openModal(event, card) {
        // Accès aux éléments du modal
        const modal = document.querySelector('[data-projects-target="modal"]');
        const modalTitle = document.querySelector('[data-projects-target="modalTitle"]');
        const modalImage = document.querySelector('[data-projects-target="modalImage"]');
        const modalDescription = document.querySelector('[data-projects-target="modalDescription"]');

        // Données depuis la card
        const titleCard = card.querySelector('h3')?.innerText || '';
        const image = card.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        const description = card.querySelector('.projects-description')?.innerText || '';
        const projectLink = card.querySelector('.link-project')?.getAttribute('href') || '#';

        // Injection dans le modal
        modalTitle.innerText = titleCard;
        modalImage.src = image;
        modalDescription.innerHTML = `
        <p class="mb-4">${description}</p>
        <a href="${projectLink}" target="_blank" class="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Voir le projet
        </a>
        `;

        modal.classList.remove("hidden");
    }


    closeModal() {
        const modal = document.querySelector('[data-projects-target="modal"]');
        if (modal) modal.classList.add("hidden");
    }
}
