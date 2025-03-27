import {Controller} from '@hotwired/stimulus';

export default class extends Controller {

    connect() {
        const buttonSend = document.getElementById('button-send');

        buttonSend.addEventListener('click', (event) => {
            this.submitForm(event)
        });
    }

    submitForm(event) {
        event.preventDefault();

        const form = event.target.closest('form');
        const formData = new FormData(form);

        console.log(formData);

        fetch('/contact/send', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.message = 'Message envoyé avec succès';
                    this.title
                } else {
                    this.message = 'Une erreur est survenue lors de l\'envoi du message';
                }
            })
            .catch(error => console.error('Erreur:', error));
    }
}
