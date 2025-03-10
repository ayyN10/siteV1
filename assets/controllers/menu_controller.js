import { Controller } from '@hotwired/stimulus';
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "../import/SplitText.js";

export default class extends Controller {
    connect() {
        gsap.registerPlugin(MotionPathPlugin, SplitText);

        const items = document.querySelectorAll(".menu > div");

        items.forEach((item) => {
            const textContainer = item.querySelector(".text-container");
            const textElement = textContainer?.querySelector("p");

            if (textElement) {
                const split = new SplitText(textElement, { type: "chars" });
                const letters = split.chars;

                // Créez une timeline pour l'animation
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

                // Déclencher l'animation au hover
                item.addEventListener("mouseenter", () => {
                    tl.play(); // Joue l'animation
                });

                item.addEventListener("mouseleave", () => {
                    tl.reverse(); // Inverse l'animation (retour à l'état initial)
                });

                // Déclencher l'animation avec une classe active
                if (item.classList.contains("active")) {
                    tl.play(); // Joue l'animation si la classe active est présente
                }
            }
        });
    }
}