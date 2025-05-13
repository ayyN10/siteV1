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

    activeSelection = null;

    frontstacks = [
        {
            label: 'HTML',
            image: 'images/skills/html-logo.svg',
            size: 100,
            bgColor: '#E44D26',
            textColor: '#fff',
            trophy: 'platine.png'
        },
        {
            label: 'JS',
            image: 'images/skills/javascript-logo.svg',
            size: 70,
            bgColor: '#F7DF1E',
            textColor: '#000',
            trophy: 'platine.png'
        },
        {
            label: 'VueJS',
            image: 'images/skills/vue-logo.svg',
            size: 50,
            bgColor: '#42B883',
            textColor: '#fff',
            trophy: 'argent.png'
        },
        {
            label: 'Tailwinds',
            image: 'images/skills/tailwind-logo.svg',
            size: 70,
            bgColor: '#38B2AC',
            textColor: '#fff',
            trophy: 'or.png'
        },
        {
            label: 'jQuery',
            image: 'images/skills/jquery-logo.svg',
            size: 70,
            bgColor: '#0769AD',
            textColor: '#fff',
            trophy: 'platine.png'
        },
        {
            label: 'React Native',
            image: 'images/skills/react-logo.svg',
            size: 50,
            bgColor: '#61DAFB',
            textColor: '#000',
            trophy: 'bronze.png'
        },
        {
            label: 'ThreeJS',
            image: 'images/skills/three-js-logo.svg',
            size: 50,
            bgColor: '#000000',
            textColor: '#fff',
            trophy: 'bronze.png'
        },
        {
            label: 'Bootstrap',
            image: 'images/skills/bootstrap-logo.svg',
            size: 70,
            bgColor: '#563d7c',
            textColor: '#fff',
            trophy: 'argent.png'
        },
        {
            label: 'GSAP',
            image: 'images/skills/gsap-logo.png',
            size: 70,
            bgColor: '#F3F3F3',
            textColor: '#000',
            trophy: 'argent.png'
        },
        {
            label: 'CSS',
            image: 'images/skills/css-logo.svg',
            size: 100,
            bgColor: '#264de4',
            textColor: '#fff',
            trophy: 'platine.png'
        },
        {
            label: 'SCSS',
            image: 'images/skills/scss-logo.png',
            size: 100,
            bgColor: '#C6538C',
            textColor: '#fff',
            trophy: 'platine.png'
        },
    ];

    backstacks = [
        {
            label: 'Symfony',
            image: 'images/skills/symfony-logo.svg',
            size: 70,
            bgColor: '#000000',
            textColor: '#fff',
            trophy: 'or.png'
        },
        {
            label: 'XML',
            image: 'images/skills/xml-logo.png',
            size: 50,
            bgColor: '#F16529',
            textColor: '#fff',
            trophy: 'argent.png'
        },
        {
            label: 'SQL',
            image: 'images/skills/sql-logo.png',
            size: 50,
            bgColor: '#336791',
            textColor: '#fff',
            trophy: 'or.png'
        },
        {
            label: 'PHP',
            image: 'images/skills/php-logo.svg',
            size: 100,
            bgColor: '#777BB4',
            textColor: '#fff',
            trophy: 'platine.png'
        },
        {
            label: 'Github',
            image: 'images/skills/github-logo.svg',
            size: 100,
            bgColor: '#181717',
            textColor: '#fff',
            trophy: 'or.png'
        },
        {
            label: 'Laravel',
            image: 'images/skills/laravel-logo.png',
            size: 50,
            bgColor: '#FF2D20',
            textColor: '#fff',
            trophy: 'argent.png'
        },
        {
            label: 'API Platform',
            image: 'images/skills/api-logo.png',
            size: 50,
            bgColor: '#009688',
            textColor: '#fff',
            trophy: 'or.png'
        },
        {
            label: 'Sulu',
            image: 'images/skills/sulu-logo.svg',
            size: 50,
            bgColor: '#000000',
            textColor: '#fff',
            trophy: 'bronze.png'
        },
        {
            label: 'Tag Manager',
            image: 'images/skills/tag-logo.svg',
            size: 50,
            bgColor: '#18e8e8',
            textColor: '#000000',
            trophy: 'argent.png'
        },
        {
            label: 'OVH',
            image: 'images/skills/ovh-logo.png',
            size: 50,
            bgColor: '#2c65dc',
            textColor: '#fff',
            trophy: 'argent.png'
        },
    ];

    connect() {

        // Définition des cercles pour le Front-end
        this.createOrbit('cercle-front', [
            {
                radius: 200,
                rotationDuration: 20,
                circles: this.frontstacks.slice(0, 5)
            },
            {
                radius: 400,
                rotationDuration: 20,
                circles: this.frontstacks.slice(5, 11)

            }
        ]);

        // Définition des cercles pour le Back-end
        this.createOrbit('cercle-back', [
            {
                radius: 200,
                rotationDuration: 20,
                circles: this.backstacks.slice(0, 4)
            },
            {
                radius: 400,
                rotationDuration: 20,
                circles: this.backstacks.slice(4, 10)
            }
        ]);

        this.createFrontStackBlocs();
        this.createBackStackBlocs();
        this.createBlocsMobilesStacks();
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

                circleContainer.addEventListener('click', () => {
                    if (this.activeSelection === circleData.label) {
                        // 🔁 Si on re-clique sur l’élément déjà sélectionné
                        this.activeSelection = null;
                    } else {
                        this.activeSelection = circleData.label;
                    }
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

    createFrontStackBlocs() {
        const container = document.getElementById('cercle-front');

        this.frontstacks.forEach(bloc => {
            const stackDiv = document.createElement('div');
            stackDiv.style.display = 'none';
            stackDiv.style.alignItems = 'center';
            stackDiv.style.gap = '8px'; // espace entre l'image et le texte

            // Style global
            stackDiv.style.backgroundColor = '#fff';
            stackDiv.style.color = '#000';
            stackDiv.style.padding = '6px 12px';
            stackDiv.style.margin = '5px';
            stackDiv.style.borderRadius = '8px';
            stackDiv.style.fontWeight = 'bold';
            stackDiv.style.position = 'absolute';

            // Image du trophée
            if (bloc.trophy) {
                const trophyImg = document.createElement('img');
                trophyImg.src = `images/common/${bloc.trophy}`;
                trophyImg.alt = 'trophée';
                trophyImg.style.width = '20px';
                trophyImg.style.height = '20px';
                stackDiv.appendChild(trophyImg);
            }

            // Label texte
            const labelSpan = document.createElement('span');
            labelSpan.textContent = bloc.label;
            stackDiv.appendChild(labelSpan);

            container.appendChild(stackDiv);
        });
    }

    createBackStackBlocs() {
        const container = document.getElementById('cercle-back');

        this.backstacks.forEach(bloc => {
            const stackDiv = document.createElement('div');
            stackDiv.style.display = 'none';
            stackDiv.style.alignItems = 'center';
            stackDiv.style.gap = '8px';

            // Style identique
            stackDiv.style.backgroundColor = '#fff';
            stackDiv.style.color = '#000';
            stackDiv.style.padding = '6px 12px';
            stackDiv.style.margin = '5px';
            stackDiv.style.borderRadius = '8px';
            stackDiv.style.fontWeight = 'bold';
            stackDiv.style.position = 'absolute';

            // Image du trophée
            if (bloc.trophy) {
                const trophyImg = document.createElement('img');
                trophyImg.src = `images/common/${bloc.trophy}`;
                trophyImg.alt = 'trophée';
                trophyImg.style.width = '20px';
                trophyImg.style.height = '20px';
                stackDiv.appendChild(trophyImg);
            }

            // Label texte
            const labelSpan = document.createElement('span');
            labelSpan.textContent = bloc.label;
            stackDiv.appendChild(labelSpan);

            container.appendChild(stackDiv);
        });
    }

    createBlocsMobilesStacks() {
        const mobileStacksFront = document.getElementById('mobile-stacks-front');
        const mobileStacksBack = document.getElementById('mobile-stacks-back');

        this.frontstacks.forEach(bloc => {
            const stackDiv = document.createElement('div');
            stackDiv.style.display = 'flex';
            stackDiv.style.alignItems = 'center';
            stackDiv.style.gap = '8px'; // espace entre l'image et le texte

            // Style global
            stackDiv.style.backgroundColor = '#fff';
            stackDiv.style.color = '#000';
            stackDiv.style.padding = '6px 12px';
            stackDiv.style.margin = '5px';
            stackDiv.style.borderRadius = '8px';
            stackDiv.style.fontWeight = 'bold';
            stackDiv.style.position = 'relative';

            // Image du trophée
            if (bloc.trophy) {
                const trophyImg = document.createElement('img');
                trophyImg.src = `images/common/${bloc.trophy}`;
                trophyImg.alt = 'trophée';
                trophyImg.style.width = '20px';
                trophyImg.style.height = '20px';
                stackDiv.appendChild(trophyImg);
            }

            // Label texte
            const labelSpan = document.createElement('span');
            labelSpan.textContent = bloc.label;
            stackDiv.appendChild(labelSpan);

            mobileStacksFront.appendChild(stackDiv);
        });

        this.backstacks.forEach(bloc => {
            const stackDiv = document.createElement('div');
            stackDiv.style.display = 'flex';
            stackDiv.style.alignItems = 'center';
            stackDiv.style.gap = '8px';

            // Style identique
            stackDiv.style.backgroundColor = '#fff';
            stackDiv.style.color = '#000';
            stackDiv.style.padding = '6px 12px';
            stackDiv.style.margin = '5px';
            stackDiv.style.borderRadius = '8px';
            stackDiv.style.fontWeight = 'bold';

            // Image du trophée
            if (bloc.trophy) {
                const trophyImg = document.createElement('img');
                trophyImg.src = `images/common/${bloc.trophy}`;
                trophyImg.alt = 'trophée';
                trophyImg.style.width = '20px';
                trophyImg.style.height = '20px';
                stackDiv.appendChild(trophyImg);
            }

            // Label texte
            const labelSpan = document.createElement('span');
            labelSpan.textContent = bloc.label;
            stackDiv.appendChild(labelSpan);

            mobileStacksBack.appendChild(stackDiv);
        });
    }


    styleCenterCircle() {
        const centerCircles = document.querySelectorAll('.center-circle');
        centerCircles.forEach(centerCircle => {
            centerCircle.style.backgroundColor = this.centerBgColorValue || '#000';
            centerCircle.style.color = this.centerTextColorValue || '#fff';
        });
    }

    toggleAnimation(event) {
        const checkbox = event.currentTarget;

        if (checkbox.id === 'front-toggle') {
            if (checkbox.checked) {
                document.getElementById('cercle-front').style.display = 'flex';
                document.getElementById('mobile-stacks-front').style.display = 'none';
            } else {
                document.getElementById('cercle-front').style.display = 'none';
                document.getElementById('mobile-stacks-front').style.display = 'flex';
            }
        } else {
            if (checkbox.checked) {
                document.getElementById('cercle-back').style.display = 'flex';
                document.getElementById('mobile-stacks-back').style.display = 'none';
            } else {
                document.getElementById('cercle-back').style.display = 'none';
                document.getElementById('mobile-stacks-back').style.display = 'flex';
            }
        }
    }
}
