document.addEventListener("DOMContentLoaded", function() {
    const addVisitorButton = document.getElementById('add-visitor');
    const nextStepButton = document.getElementById('next-step');
    const visitorContainer = document.querySelector('.visitor');
    let visitorCount = 1;

    // Function to create a new visitor section
    function createVisitorSection(count) {
        const visitorInfo = document.createElement('div');
        visitorInfo.className = 'visitor-info';
        visitorInfo.innerHTML = `
            <label for="visitor${count}">Visitor ${count}:</label>
            <input type="text" id="visitor${count}" placeholder="Enter full name" aria-required="true">
            <div class="visitor-type">
                <label><input type="radio" name="visitor${count}-type" value="adult" checked> Adult</label>
                <label><input type="radio" name="visitor${count}-type" value="child"> Child</label>
            </div>
        `;
        return visitorInfo;
    }

    // Add visitor button click event
    addVisitorButton.addEventListener('click', function() {
        visitorCount++;
        const newVisitorInfo = createVisitorSection(visitorCount);
        visitorContainer.insertBefore(newVisitorInfo, addVisitorButton);
    });

    // Next step button click event
    nextStepButton.addEventListener('click', function(event) {
        event.preventDefault();

        const visitorInfos = document.querySelectorAll('.visitor-info');
        let allFilled = true;

        visitorInfos.forEach(info => {
            const textInput = info.querySelector('input[type="text"]');
            const radioInputs = info.querySelectorAll('input[type="radio"]');
            const isRadioSelected = Array.from(radioInputs).some(radio => radio.checked);

            if (textInput.value.trim() === "") {
                allFilled = false;
                textInput.style.borderColor = 'red';
            } else {
                textInput.style.borderColor = '';
            }

            if (!isRadioSelected) {
                allFilled = false;
                info.querySelector('.visitor-type').style.border = '1px solid red';
            } else {
                info.querySelector('.visitor-type').style.border = '';
            }
        });

        if (allFilled) {
            // Collect visitor data
            const visitorData = Array.from(visitorInfos).map(info => ({
                name: info.querySelector('input[type="text"]').value.trim(),
                type: info.querySelector('input[type="radio"]:checked').value
            }));
            localStorage.setItem('visitorData', JSON.stringify(visitorData));
            window.location.href = "nextStep.html"; // Replace with actual URL
        } else {
            alert("Please fill out all visitor names and select Adult/Child for each.");
        }
    });

    // Dynamic input feedback
    visitorContainer.addEventListener('input', function(event) {
        if (event.target.type === 'text') {
            event.target.style.borderColor = event.target.value.trim() === '' ? 'red' : '';
        }
    });

    visitorContainer.addEventListener('change', function(event) {
        if (event.target.type === 'radio') {
            const visitorType = event.target.closest('.visitor-type');
            visitorType.style.border = Array.from(visitorType.querySelectorAll('input[type="radio"]')).some(radio => radio.checked) ? '' : '1px solid red';
        }
    });
});