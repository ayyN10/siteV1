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
        // Définition des cercles pour le Front-end
        this.createOrbit('cercle-front', [
            {
                radius: 200,
                rotationDuration: 20,
                circles: [
                    {
                        label: 'HTML',
                        image: 'images/skills/html-logo.svg',
                        size: 100,
                        bgColor: '#E44D26',
                        textColor: '#fff'
                    },
                    {
                        label: 'JS',
                        image: 'images/skills/javascript-logo.svg',
                        size: 70,
                        bgColor: '#F7DF1E',
                        textColor: '#000'
                    },
                    {
                        label: 'VueJS',
                        image: 'images/skills/vue-logo.svg',
                        size: 50,
                        bgColor: '#42B883',
                        textColor: '#fff'
                    },
                    {
                        label: 'Tailwinds',
                        image: 'images/skills/tailwind-logo.svg',
                        size: 70,
                        bgColor: '#38B2AC',
                        textColor: '#fff'
                    },
                    {
                        label: 'jQuery',
                        image: 'images/skills/jquery-logo.svg',
                        size: 70,
                        bgColor: '#0769AD',
                        textColor: '#fff'
                    },
                    {
                        label: 'React Native',
                        image: 'images/skills/react-logo.svg',
                        size: 50,
                        bgColor: '#61DAFB',
                        textColor: '#000'
                    }
                ]
            },
            {
                radius: 400,
                rotationDuration: 20,
                circles: [
                    {
                        label: 'ThreeJS',
                        image: 'images/skills/three-js-logo.svg',
                        size: 50,
                        bgColor: '#000000',
                        textColor: '#fff'
                    },
                    {
                        label: 'Bootstrap',
                        image: 'images/skills/bootstrap-logo.svg',
                        size: 70,
                        bgColor: '#563d7c',
                        textColor: '#fff'
                    },
                    {
                        label: 'GSAP',
                        image: 'images/skills/gsap-logo.png',
                        size: 70,
                        bgColor: '#F3F3F3',
                        textColor: '#000'
                    },
                    {
                        label: 'CSS',
                        image: 'images/skills/css-logo.svg',
                        size: 100,
                        bgColor: '#264de4',
                        textColor: '#fff'
                    },
                    {
                        label: 'SCSS',
                        image: 'images/skills/scss-logo.png',
                        size: 100,
                        bgColor: '#C6538C',
                        textColor: '#fff'
                    },
                ]
            }
        ]);

        // Définition des cercles pour le Back-end
        this.createOrbit('cercle-back', [
            {
                radius: 200,
                rotationDuration: 20,
                circles: [
                    {
                        label: 'Symfony',
                        image: 'images/skills/symfony-logo.svg',
                        size: 70,
                        bgColor: '#000000',
                        textColor: '#fff'
                    },
                    {
                        label: 'XML',
                        image: 'images/skills/xml-logo.png',
                        size: 50,
                        bgColor: '#F16529',
                        textColor: '#fff'
                    },
                    {
                        label: 'SQL',
                        image: 'images/skills/sql-logo.png',
                        size: 50,
                        bgColor: '#336791',
                        textColor: '#fff'
                    },
                    {
                        label: 'PHP',
                        image: 'images/skills/php-logo.svg',
                        size: 100,
                        bgColor: '#777BB4',
                        textColor: '#fff'
                    },

                ]
            },
            {
                radius: 400,
                rotationDuration: 20,
                circles: [
                    {
                        label: 'Laravel',
                        image: 'images/skills/laravel-logo.png',
                        size: 50,
                        bgColor: '#FF2D20',
                        textColor: '#fff'
                    },
                    {
                        label: 'FAST API',
                        image: 'images/skills/api-logo.png',
                        size: 50,
                        bgColor: '#009688',
                        textColor: '#fff'
                    },
                    {
                        label: 'Sulu',
                        image: 'images/skills/sulu-logo.svg',
                        size: 50,
                        bgColor: '#000000',
                        textColor: '#fff'
                    }
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

                    // Changement de couleur de fond et de texte du cercle central
                    gsap.to(centerCircle, {
                        backgroundColor: circleData.bgColor,
                        color: circleData.textColor || '#fff',
                        duration: 0.3
                    });
                });

                circleContainer.addEventListener('mouseleave', () => {
                    const allCenterLabels = centerCircle.querySelectorAll('.center-label');
                    allCenterLabels.forEach(label => {
                        gsap.to(label, {fontSize: "0px", duration: 0.3});
                    });

                    // Retour aux couleurs initiales définies dans les valeurs du controller
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
