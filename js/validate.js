document.addEventListener('DOMContentLoaded', function () {
    var registrationForm = document.getElementById('registrationForm');
    var alertDanger = document.querySelector('.alert-danger');
    var alertSuccess = document.querySelector('.alert-success');
    var alertInfo = document.querySelector('.alert-info');

    alertDanger.style.display = 'none';
    alertSuccess.style.display = 'none';
    alertInfo.style.display = 'none';

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        resetAlerts();

        var isValid = validateForm();

        var successMessage = '';

        if (isValid) {
            successMessage += 'Je werd geregistreerd.<br>';
            if (gridCheckNewsletter.checked) {
                successMessage += 'Je bent geabonneerd op onze nieuwsbrief.';
            }
        
            var selectedPayment = getSelectedPaymentMethod();
        
            showAlert(successMessage, 'success');
            showAlert('Je betalingswijze is ' + selectedPayment + '.', 'info')
        }
    });

    function resetAlerts() {
        alertDanger.classList.remove('show');
        alertSuccess.classList.remove('show');
        alertInfo.classList.remove('show');
    }

    function showAlert(message, type) {
        var alertElement;
    
        if (type === 'danger') {
            alertElement = alertDanger;
        } else if (type === 'success') {
            alertElement = alertSuccess;
        } else if (type === 'info') {
            alertElement = alertInfo;
        }
    
        alertElement.querySelector('p').innerHTML = message;
        alertElement.style.display = 'block';
        alertElement.classList.add('show');
    }

    function validateForm() {
        var firstname = document.getElementById('firstname').value.trim();
        var name = document.getElementById('name').value.trim();
        var username = document.getElementById('username').value.trim();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value.trim();
        var repeatpassword = document.getElementById('repeatpassword').value.trim();
        var address = document.getElementById('address').value.trim();
        var stateSelect = document.getElementById('state');
        var state = stateSelect.options[stateSelect.selectedIndex].value.trim();
        var zipcode = document.getElementById('zipcode').value.trim();
        var gridCheckAccept = document.getElementById('gridCheckAccept');

        var errorMessages = '';

        errorMessages += checkEmptyField(firstname, 'Voornaam');
        errorMessages += checkEmptyField(name, 'Naam');
        errorMessages += checkEmptyField(username, 'Gebruikersnaam');
        errorMessages += checkEmail(email);
        errorMessages += checkPassword(password);
        errorMessages += checkEmptyField(repeatpassword, 'Herhaal wachtwoord');
        errorMessages += checkPasswordMatch(password, repeatpassword, 'Je wachtwoorden komen niet overeen.');
        errorMessages += checkEmptyField(address, 'Adres');
        if (state === 'Kies een provincie') {
            errorMessages += 'Provincie is vereist.<br>';
        }
        errorMessages += checkZipcode(zipcode);

        if (!gridCheckAccept.checked) {
            errorMessages += 'Je moet de algemene voorwaarden accepteren.<br>';
        }

        if (errorMessages !== '') {
            showAlert(errorMessages, 'danger');
            return false;
        }

        return true;
    }

    function checkEmptyField(value, fieldName) {
        if (value === '') {
            return 'Het veld ' + fieldName + ' is vereist.<br>';
        }
        return '';
    }

    function checkEmail(email) {
        var emailRegex = /^[A-Za-z0-9_][A-Za-z0-9_.-]*@[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]+$/;
    
        if (email === '') {
            return 'Het veld email is vereist.<br>';
        } else if  (!emailRegex.test(email)) {
            return 'Ongeldig e-mailadres.<br>';
        }
        return '';
    }

    function checkPassword(password) {
        if (password === '') {
            return 'Het veld Wachtwoord is vereist.<br>';
        } else if (password.length < 7) {
            return 'Het wachtwoord moet minstens 7 tekens lang zijn.<br>';
        }
        return '';
    }

    function checkPasswordMatch(password, repeatpassword, errorMessage) {
        if (password !== repeatpassword) {
            return errorMessage + '<br>';
        }
        return '';
    }

    function checkZipcode(zipcode) {
        if (zipcode === '') {
            return 'Het veld postcode is vereist.<br>';
        } else if (zipcode < 1000 || zipcode > 9999) {
            return 'De waarde van postcode moet tussen 1000 en 9999 liggen.<br>';
        }
        return '';
    }

    function getSelectedPaymentMethod() {
        var selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        return selectedPayment ? selectedPayment.id : 'Niet geselecteerd';
    }
});
