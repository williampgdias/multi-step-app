$(document).ready(function () {
    $('.phoneNumberInput').mask('(00) 00000-0000');

    // Button to the second step
    $('#first-step .btn').click(function (e) {
        e.preventDefault();

        if (handleFormSubmission()) {
            handleChangeSteps('#first-step', '#second-step');
            highlightCurrentStep('#steps-number-1', '#steps-number-2');
        }
    });

    // Button to the third step
    handleButtonsStage(
        '#second-step .btn',
        '#second-step',
        '#third-step',
        '#steps-number-2',
        '#steps-number-3'
    );

    // Button to the fourth step
    handleButtonsStage(
        '#third-step .btn',
        '#third-step',
        '#fourth-step',
        '#steps-number-3',
        '#steps-number-4'
    );

    // Button to GO BACK to the FIRST-PAGE
    $('#second-step .back-link').click(function () {
        handleChangeSteps('#second-step', '#first-step');
        highlightCurrentStep('#steps-number-2', '#steps-number-1');
    });

    // Button to GO BACK to the SECOND-PAGE
    $('#third-step .back-link').click(function () {
        handleChangeSteps('#third-step', '#second-step');
        highlightCurrentStep('#steps-number-3', '#steps-number-2');
    });

    // Button to GO BACK to the THIRD-PAGE
    $('#fourth-step .back-link').click(function () {
        handleChangeSteps('#fourth-step', '#third-step');
        highlightCurrentStep('#steps-number-4', '#steps-number-3');
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

function handleButtonsStage(
    currentClassName,
    currentStep,
    nextStep,
    currentStepsNumber,
    nextStepsNumber
) {
    $(currentClassName).click(function () {
        handleChangeSteps(currentStep, nextStep);
        highlightCurrentStep(currentStepsNumber, nextStepsNumber);
    });
}

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
        $('.emailInput').css('borderColor', 'var(--strawberry-red)');
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
    const borderColor = 'var(--strawberry-red)';

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
        changeSubscriptionState('.arcadeYear', '$90/yr');
        changeSubscriptionState('.advancedYear', '$120/yr');
        changeSubscriptionState('.proYear', '$150/yr');

        // Change the third-step (add-ons) price
        changeSubscriptionState('.addOnsOnline', '$10/yr');
        changeSubscriptionState('.addOnsStorage', '$20/yr');
        changeSubscriptionState('.addOnsProfile', '$20/yr');

        $('.freeMonths').css('display', 'block');
    } else {
        $(year).css('color', secondColor);
        $(month).css('color', firstColor);

        // Change the prices between month and year dynamically
        changeSubscriptionState('.arcadeYear', '$9/mo');
        changeSubscriptionState('.advancedYear', '$12/mo');
        changeSubscriptionState('.proYear', '$15/mo');

        // Change the third-step (add-ons) price
        changeSubscriptionState('.addOnsOnline', '$1/mo');
        changeSubscriptionState('.addOnsStorage', '$2/mo');
        changeSubscriptionState('.addOnsProfile', '$2/mo');

        $('.freeMonths').css('display', 'none');
    }
}

function changeSubscriptionState(className, newText) {
    $(className).text(newText);
}
