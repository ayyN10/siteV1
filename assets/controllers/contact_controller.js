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
                    //message
                } else {
                    //message
                }
            })
            .catch(error => console.error('Erreur:', error));
    }
}
