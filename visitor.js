
    document.addEventListener("DOMContentLoaded", function() {
        // Get the next step button
        const nextStepButton = document.getElementById('next-step');

        // Add click event listener to the next step button
        nextStepButton.addEventListener('click', function(event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get all visitor input fields
            const visitorInputs = [
                document.getElementById('visitor1'),
                document.getElementById('visitor2'),
                document.getElementById('visitor3'),
                document.getElementById('visitor4')
            ];

            let allFilled = true; // Flag to check if all fields are filled

            // Validate each input field
            visitorInputs.forEach(input => {
                if (input.value.trim() === "") {
                    allFilled = false;
                    input.style.borderColor = 'red'; // Highlight empty fields
                } else {
                    input.style.borderColor = ''; // Reset valid fields
                }
            });

            // If all fields are filled, proceed to the next step
            if (allFilled) {
                // Here you can redirect to the next page or perform any action
                // For example, to proceed to the next page:
                window.location.href = "nextStep.html"; // Change to the actual next step URL
            } else {
                alert("Please fill out all visitor name fields."); // Alert the user
            }
        });
    });