import { Controller } from '@hotwired/stimulus';
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "../import/SplitText.js";

export default class extends Controller {
    sectionActive;

    connect() {
        gsap.registerPlugin(MotionPathPlugin, SplitText);

        const items = document.querySelectorAll(".menu > div");

        this.showMenu(items);
        this.menuText(items);
        this.clickMenu(items);
        this.menuActive(items);
    }

    showMenu(items){
        items.forEach(menuBtn => {
            menuBtn.addEventListener("mouseenter", () => {
                console.log(menuBtn);
                items.forEach(item => {
                   item.classList.replace("translate-x-52", "translate-x-0");
                });
            });

            document.querySelector(".menu").addEventListener("mouseleave", () => {
                items.forEach(item => {
                    if (!item.classList.contains("active")) {
                        item.classList.replace("translate-x-0", "translate-x-52");
                    }
                });
            });
        });
    }

    clickMenu(items) {
        items.forEach((item) => {
            item.addEventListener("click", () => {
                items.forEach((item) => item.classList.remove("active"));
                item.classList.add("active");

                // Déclencher l'animation lors de l'activation
                if (item.timeline) {
                    item.timeline.play();
                }
            });
        });
    }

    menuActive(items) {
        items.forEach((item) => {
            item.addEventListener("click", () => {
                console.log(item);

                if (item.classList.contains("active")) {
                    // Vérifie si l'élément section existe avant d'y accéder
                    const section = document.querySelector("#section-" + item.id);
                    if (section) {
                        this.sectionActive?.classList.remove("show");
                        this.sectionActive = section;
                        this.sectionActive.classList.add("show"); // Affiche la nouvelle
                    }
                }
            });
        });
        console.log(items);
    }

    menuText(items) {
        items.forEach((item) => {
            const textContainer = item.querySelector(".text-container");
            const textElement = textContainer?.querySelector("p");

            if (textElement) {
                const split = new SplitText(textElement, { type: "chars" });
                const letters = split.chars;

                const tl = gsap.timeline({ paused: true }) // Timeline en pause par défaut
                    .set(letters, { opacity: 1 })
                    .to(letters, {
                        duration: 1,
                        ease: "power2.out",
                        motionPath: {
                            path: [
                                { x: 0, y: 0 },
                                { x: -50, y: -20 },
                                { x: -40, y: -50 },
                                { x: 0, y: -60 },
                                { x: 40, y: -50 },
                                { x: 50, y: -20 },
                                { x: 25, y: 20 },
                                { x: 10, y: 50 },
                                { x: 0, y: 70 }
                            ],
                            curviness: 1.5,
                            autoRotate: true
                        },
                        stagger: 0.1
                    })
                    .to(letters, { rotation: 0, duration: 0.5, ease: "power1.out" }, "-=0.6")
                    .to(letters[letters.length - 1], { rotation: 0, duration: 0.1 }, "-=0.1");

                // Stocker la timeline sur l'élément
                item.timeline = tl;

                // Éviter de jouer l'animation si l'élément est actif
                item.addEventListener("mouseenter", () => {
                    if (item.classList.contains("active")) return;
                    tl.play();
                });

                item.addEventListener("mouseleave", () => {
                    if (item.classList.contains("active")) return;
                    tl.reverse();
                });

                // Jouer l'animation si actif au chargement
                if (item.classList.contains("active")) {
                    tl.play();
                }
            }
        });
    }
}