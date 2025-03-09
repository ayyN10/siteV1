import { Controller } from '@hotwired/stimulus';
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default class extends Controller {
    connect() {
        document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(MotionPathPlugin);

            const items = document.querySelectorAll(".menu > div");

            items.forEach((item, index) => {
                const text = item.querySelector(".text-container");

                if (text) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top center",
                            toggleActions: "play none none none"
                        }
                    })
                        .set(text, { opacity: 1, x: -50, y: 0 }) // Départ à gauche
                        .to(text, {
                            duration: 1,
                            motionPath: {
                                path: [
                                    { x: -50, y: -40 }, // Monte en haut
                                    { x: 0, y: 70 }    // Redescend en bas
                                ],
                                curviness: 5
                            },
                            ease: "power2.out"
                        })
                        .to(text, { opacity: 1, duration: 0.5 });
                }
            });
        });

    }
}
