// skills_controller.js
import { Controller } from '@hotwired/stimulus';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    connect() {

        this.frontOrbit();
        this.backOrbit();
    }

    frontOrbit() {
        const orbits = [
            {
                radius: 150,
                rotationDuration: 10,
                circles: [
                    { label: 'HTML', image: 'html-logo.png', size: 50 },
                    { label: 'CSS', image: 'css-logo.png', size: 50 },
                ]
            },
            {
                radius: 250,
                rotationDuration: 15,
                circles: [
                    { label: 'HTML', image: 'html-logo.png', size: 50 },
                    { label: 'CSS', image: 'css-logo.png', size: 50 },
                ]
            }
        ];

        const container = document.getElementById('cercle-front');

        orbits.forEach((orbit, orbitIndex) => {
            const orbitWrapper = document.createElement('div');
            orbitWrapper.classList.add('orbit-wrapper');
            container.appendChild(orbitWrapper);

            orbit.circles.forEach((circleData, i) => {
                const angle = (i / orbit.circles.length) * Math.PI * 2;
                const x = orbit.radius * Math.cos(angle);
                const y = orbit.radius * Math.sin(angle);

                // Création du conteneur
                const circleContainer = document.createElement('div');
                circleContainer.classList.add('circle-container');
                circleContainer.style.transform = `translate(${x}px, ${y}px)`;

                // Création du cercle avec image
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.width = circleData.size + 'px';
                circle.style.height = circleData.size + 'px';

                const img = document.createElement('img');
                img.src = circleData.image;
                img.alt = circleData.label;
                circle.appendChild(img);

                // Création du texte
                const label = document.createElement('div');
                label.classList.add('circle-label');
                label.textContent = circleData.label;

                circleContainer.appendChild(circle);
                circleContainer.appendChild(label);
                orbitWrapper.appendChild(circleContainer);

                // Interactions au survol
                circleContainer.addEventListener('mouseenter', () => {
                    gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
                });

                circleContainer.addEventListener('mouseleave', () => {
                    gsap.to(label, { opacity: 0, y: 20, duration: 0.3 });
                });
            });

            gsap.to(orbitWrapper, {
                rotation: 360,
                duration: orbit.rotationDuration,
                repeat: -1,
                ease: 'linear'
            });
        });
    }

    backOrbit() {
        const orbits = [
            {
                radius: 150,
                rotationDuration: 10,
                circles: [
                    { label: 'PHP', image: 'html-logo.png', size: 50 },
                    { label: 'SYMFONY', image: 'css-logo.png', size: 50 },
                ]
            },
            {
                radius: 250,
                rotationDuration: 15,
                circles: [
                    { label: 'XML', image: 'html-logo.png', size: 50 },
                    { label: 'API', image: 'css-logo.png', size: 50 },
                ]
            }
        ];

        const container = document.getElementById('cercle-back');

        orbits.forEach((orbit, orbitIndex) => {
            const orbitWrapper = document.createElement('div');
            orbitWrapper.classList.add('orbit-wrapper');
            container.appendChild(orbitWrapper);

            orbit.circles.forEach((circleData, i) => {
                const angle = (i / orbit.circles.length) * Math.PI * 2;
                const x = orbit.radius * Math.cos(angle);
                const y = orbit.radius * Math.sin(angle);

                // Création du conteneur
                const circleContainer = document.createElement('div');
                circleContainer.classList.add('circle-container');
                circleContainer.style.transform = `translate(${x}px, ${y}px)`;

                // Création du cercle avec image
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.width = circleData.size + 'px';
                circle.style.height = circleData.size + 'px';

                const img = document.createElement('img');
                img.src = circleData.image;
                img.alt = circleData.label;
                circle.appendChild(img);

                // Création du texte
                const label = document.createElement('div');
                label.classList.add('circle-label');
                label.textContent = circleData.label;

                circleContainer.appendChild(circle);
                circleContainer.appendChild(label);
                orbitWrapper.appendChild(circleContainer);

                // Interactions au survol
                circleContainer.addEventListener('mouseenter', () => {
                    gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
                });

                circleContainer.addEventListener('mouseleave', () => {
                    gsap.to(label, { opacity: 0, y: 20, duration: 0.3 });
                });
            });

            gsap.to(orbitWrapper, {
                rotation: 360,
                duration: orbit.rotationDuration,
                repeat: -1,
                ease: 'linear'
            });
        });
    }
}