// skills_controller.js
import {Controller} from '@hotwired/stimulus';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class extends Controller {
    static values = {
        centerBgColor: String,
        centerTextColor: String
    };

    connect() {
        this.createOrbit('cercle-front', [
            {
                radius: 150,
                rotationDuration: 10,
                circles: [
                    {label: 'HTML', image: 'html-logo.png', size: 50, bgColor: '#E44D26'},
                    {label: 'CSS', image: 'css-logo.png', size: 50, bgColor: '#1572B6'}
                ]
            },
            {
                radius: 250,
                rotationDuration: 15,
                circles: [
                    {label: 'JavaScript', image: 'js-logo.png', size: 50, bgColor: '#F7DF1E'},
                    {label: 'Vue.js', image: 'vue-logo.png', size: 50, bgColor: '#42B883'}
                ]
            }
        ]);

        this.createOrbit('cercle-back', [
            {
                radius: 150,
                rotationDuration: 10,
                circles: [
                    {label: 'PHP', image: 'php-logo.png', size: 50, bgColor: '#777BB4'},
                    {label: 'Symfony', image: 'symfony-logo.png', size: 50, bgColor: '#000000'}
                ]
            },
            {
                radius: 250,
                rotationDuration: 15,
                circles: [
                    {label: 'XML', image: 'xml-logo.png', size: 50, bgColor: '#F16529'},
                    {label: 'API', image: 'api-logo.png', size: 50, bgColor: '#00A4E4'}
                ]
            }
        ]);

        this.styleCenterCircle();
    }

    createOrbit(containerId, orbits) {
        const container = document.getElementById(containerId);
        const centerCircle = container.querySelector('.center-circle');

        const addedLabels = new Set();
        orbits.forEach(orbit => {
            orbit.circles.forEach(circleData => {
                if (!addedLabels.has(circleData.label)) {
                    addedLabels.add(circleData.label);
                    const labelEl = document.createElement('div');
                    labelEl.classList.add('center-label');
                    labelEl.setAttribute('data-label', circleData.label);
                    labelEl.textContent = circleData.label;
                    labelEl.style.position = 'absolute';
                    labelEl.style.left = '50%';
                    labelEl.style.top = '50%';
                    labelEl.style.transform = 'translate(-50%, -50%)';
                    labelEl.style.fontSize = '0px';
                    labelEl.style.transition = 'font-size 0.3s ease-in-out';
                    centerCircle.appendChild(labelEl);
                }
            });
        });

        orbits.forEach(orbit => {
            const orbitWrapper = document.createElement('div');
            orbitWrapper.classList.add('orbit-wrapper');
            container.appendChild(orbitWrapper);

            orbit.circles.forEach((circleData, i) => {
                const angle = (i / orbit.circles.length) * Math.PI * 2;
                const x = orbit.radius * Math.cos(angle);
                const y = orbit.radius * Math.sin(angle);

                const circleContainer = document.createElement('div');
                circleContainer.classList.add('circle-container');
                circleContainer.style.transform = `translate(${x}px, ${y}px)`;

                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.width = circleData.size + 'px';
                circle.style.height = circleData.size + 'px';

                const img = document.createElement('img');
                img.src = circleData.image;
                img.alt = circleData.label;
                circle.appendChild(img);

                circleContainer.appendChild(circle);
                orbitWrapper.appendChild(circleContainer);

                // Interaction au survol
                circleContainer.addEventListener('mouseenter', () => {
                    const allCenterLabels = centerCircle.querySelectorAll('.center-label');
                    allCenterLabels.forEach(label => {
                        gsap.to(label, {fontSize: "0px", duration: 0.3});
                    });

                    const targetLabel = centerCircle.querySelector(`.center-label[data-label="${circleData.label}"]`);
                    if (targetLabel) {
                        gsap.to(targetLabel, {fontSize: "14px", duration: 0.3});
                    }

                    // Changement de couleur de fond du cercle central
                    gsap.to(centerCircle, {
                        backgroundColor: circleData.bgColor,
                        color: '#fff', // Texte en blanc pour meilleure lisibilité
                        duration: 0.3
                    });
                });

                circleContainer.addEventListener('mouseleave', () => {
                    const allCenterLabels = centerCircle.querySelectorAll('.center-label');
                    allCenterLabels.forEach(label => {
                        gsap.to(label, {fontSize: "0px", duration: 0.3});
                    });

                    // Retour à la couleur initiale
                    gsap.to(centerCircle, {
                        backgroundColor: this.centerBgColorValue || '#000',
                        color: this.centerTextColorValue || '#fff',
                        duration: 0.3
                    });
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

    styleCenterCircle() {
        const centerCircles = document.querySelectorAll('.center-circle');
        centerCircles.forEach(centerCircle => {
            centerCircle.style.backgroundColor = this.centerBgColorValue || '#000';
            centerCircle.style.color = this.centerTextColorValue || '#fff';
        });
    }
}
