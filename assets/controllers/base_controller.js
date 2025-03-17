import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        const loader = document.querySelector(".loader");
        const audio = new Audio("/sounds/ps3-slim-boot.mp3");
        const buttonStart = document.querySelector("#button-start");

        buttonStart.addEventListener("click", () => {
                audio.play().catch(() => console.log("Lecture audio en attente d'interaction utilisateur."));
                loader.classList.add("pointer-events-none");
                loader.classList.replace("opacity-100", "opacity-0");
                setTimeout(() => {
                    document.querySelector("#section-me").classList.add("show");
                }, 2000);
            },
            { once: true }
        );
    }
}
