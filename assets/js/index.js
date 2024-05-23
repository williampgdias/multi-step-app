$(document).ready(function () {
    $('.phoneNumberInput').mask('(00) 00000-0000');

    // Button to the second step
    $('.first-step-button').click(function (e) {
        e.preventDefault();

        if (handleFormSubmission()) {
            handleChangeSteps('#first-step', '#second-step');
            highlightCurrentStep('#steps-number-1', '#steps-number-2');
        }
    });

    // Button to the third step
    $('#second-step .btn').click(function () {
        highlightCurrentStep('#steps-number-2', '#steps-number-3');
    });

    // Button to select plan for the second step
    $('.select-plan').click(function () {
        handlePlanSelection('.select-plan', this);
    });

    // Button to change between Monthly and Yearly
    $('#toggle').click(function () {
        toggleCheckbox(
            '#monthly',
            '#yearly',
            'var(--marine-blue)',
            'var(--cool-gray)'
        );
    });

    // Execute a function on page load to set initial state based on checkbox
    toggleCheckbox(
        '#monthly',
        '#yearly',
        'var(--marine-blue)',
        'var(--cool-gray)'
    );
});

function highlightCurrentStep(currentStep, nextStep) {
    $(currentStep).removeClass('active');
    $(nextStep).addClass('active');
}

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

function handlePlanSelection(className, clickedElement) {
    $(className).removeClass('active');
    $(clickedElement).addClass('active');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function toggleCheckbox(month, year, firstColor, secondColor) {
    if ($('#toggle').is(':checked')) {
        $(year).css('color', firstColor);
        $(month).css('color', secondColor);

        // Change the prices between month and year dynamically
        $('.arcadeYear').text('$90/yr');
        $('.advancedYear').text('$120/yr');
        $('.proYear').text('$150/yr');

        $('.freeMonths').css('display', 'block');
    } else {
        $(year).css('color', secondColor);
        $(month).css('color', firstColor);

        // Change the prices between month and year dynamically
        $('.arcadeYear').text('$9/mo');
        $('.advancedYear').text('$12/mo');
        $('.proYear').text('$15/mo');

        $('.freeMonths').css('display', 'none');
    }
}
