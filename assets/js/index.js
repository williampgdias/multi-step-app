$(document).ready(function () {
    $('.phoneNumberInput').mask('(00) 00000-0000');

    $('.first-step-button').click(function (e) {
        e.preventDefault();
        if (handleFormSubmission()) {
            handleChangeSteps('#first-step', '#second-step');
        }
    });
});

function handleFormSubmission() {
    const nameInput = $('.nameInput').val();
    const emailInput = $('.emailInput').val();
    const phoneNumberInput = $('.phoneNumberInput').val();

    let isValid = true;

    if (handleErrorText(nameInput, '.errorTextName', '.nameInput')) {
        isValid = false;
    }

    if (handleErrorText(emailInput, '.errorTextEmail', '.emailInput')) {
        isValid = false;
    } else if (!isValidEmail(emailInput)) {
        $('.errorTextEmail').text('Please, enter a valid email address.');
        $('.errorTextEmail').css('display', 'block');
        $('.emailInput').css('borderColor', 'hsl(354, 84%, 57%)');
        isValid = false;
    }

    if (
        handleErrorText(
            phoneNumberInput,
            '.errorTextPhone',
            '.phoneNumberInput'
        )
    ) {
        isValid = false;
    }

    return isValid;
}

function handleChangeSteps(currentStep, nextStep) {
    $(currentStep).css('display', 'none');
    $(nextStep).css('display', 'block');
}

function handleErrorText(input, errorClassName, inputClassName) {
    const borderColor = 'hsl(354, 84%, 57%)';

    if (input == '') {
        $(errorClassName).text('This field is required');
        $(errorClassName).css('display', 'block');
        $(inputClassName).css('borderColor', borderColor);
        return true;
    } else {
        $(errorClassName).css('display', 'none');
        $(errorClassName).text('');
        $(inputClassName).css('borderColor', '');
        return false;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
