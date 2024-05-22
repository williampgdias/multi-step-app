$(document).ready(function () {
    $('.phoneNumberInput').mask('(00) 00000-0000');

    $('.first-step-button').click(function (e) {
        e.preventDefault();
        handleFormSubmission();

        $('#first-step').css('display', 'none');
        $('#second-step').css('display', 'block');
    });
});

function handleFormSubmission() {
    const nameInput = $('.nameInput').val();
    const emailInput = $('.emailInput').val();
    const phoneNumberInput = $('.phoneNumberInput').val();

    if (nameInput == '') {
        $('.errorTextName').css('display', 'block');
        $('.nameInput').css('borderColor', 'hsl(354, 84%, 57%)');
    } else {
        $('.errorTextName').css('display', 'none');
        $('.nameInput').css('borderColor', '');
    }

    if (emailInput == '') {
        $('.errorTextEmail').css('display', 'block');
        $('.emailInput').css('borderColor', 'hsl(354, 84%, 57%)');
    } else {
        $('.errorTextEmail').css('display', 'none');
        $('.emailInput').css('borderColor', '');
    }

    if (phoneNumberInput == '') {
        $('.errorTextPhone').css('display', 'block');
        $('.phoneNumberInput').css('borderColor', 'hsl(354, 84%, 57%)');
    } else {
        $('.errorTextPhone').css('display', 'none');
        $('.phoneNumberInput').css('borderColor', '');
    }
}
