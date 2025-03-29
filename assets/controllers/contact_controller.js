import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
    message;
    title;

    connect() {
        const buttonSend = document.getElementById('button-send');

        buttonSend.addEventListener('click', (event) => {
            this.submitForm(event)
        });
    }

    submitForm(event) {
        event.preventDefault();
        const audio = new Audio("/sounds/ps3_trophy.mp3");
        const form = event.target.closest('form');
        const formData = new FormData(form);

        fetch('/contact/send', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                audio.play().catch(() => console.log("Lecture audio en attente d'interaction utilisateur."));
                if (data.success) {
                    document.querySelector('#message-mail').innerHTML = 'Je vous répond dans les plus bref délais !'
                    document.querySelector('#title-mail').innerHTML = 'Message envoyé avec succès'
                    document.querySelector('#notif-bloc').classList.replace('-left-96','-left-1')
                } else {
                    document.querySelector('#message-mail').innerHTML = 'Réessayez plus tard !'
                    document.querySelector('#title-mail').innerHTML = 'ERREUR !'
                    document.querySelector('#notif-bloc').classList.replace('-left-96','-left-1')
                }
                setTimeout(() => {
                    document.querySelector('#notif-bloc').classList.replace('-left-1','-left-96')
                }, 5000);
            })
            .catch(error => console.error('Erreur:', error));
    }
}
