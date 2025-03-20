import { Controller } from '@hotwired/stimulus';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "../import/SplitText.js";

gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    connect() {
        gsap.registerPlugin(SplitText);

        const elements = document.querySelectorAll("#section-me h1, #section-me h2, #section-me h3");
        const paragraphs = document.querySelectorAll("#section-me p");
        const buttons = document.querySelectorAll("#section-me a");

        // Animation des titres
        elements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Animation des paragraphes avec SplitText ou fallback
        paragraphs.forEach((el) => {
            let split;
            try {
                split = new SplitText(el, { type: "words,chars" });
                console.log("SplitText fonctionne :", split.chars);
            } catch (error) {
                console.warn("SplitText non disponible, fallback activé");
                el.innerHTML = el.textContent.split("").map(char => `<span class="char">${char}</span>`).join("");
                split = { chars: el.querySelectorAll(".char") };
            }

            gsap.from(split.chars, {
                opacity: 0,
                y: 20,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Animation des boutons
        buttons.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }
}
