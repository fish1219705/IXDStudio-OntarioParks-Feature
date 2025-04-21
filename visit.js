document.addEventListener("DOMContentLoaded", function () {
    // Visit type selection
    const visitTypeItems = document.querySelectorAll(".visit-type-item");
    const visitTypePrompt = document.getElementById("visit-type-prompt");

    visitTypeItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class from all items
            visitTypeItems.forEach(i => i.classList.remove("active"));
            // Add active class to clicked item
            this.classList.add("active");
            // Update prompt with selected visit type
            const visitType = this.querySelector("span").textContent;
            visitTypePrompt.textContent = `Visit Type: ${visitType}`;
        });
    });

    // Adult and child input increment/decrement
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");

    incrementButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            let value = parseInt(input.value);
            input.value = value + 1;
            updateButtonState(targetId);
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            let value = parseInt(input.value);
            if (value > 0) {
                input.value = value - 1;
            }
            updateButtonState(targetId);
        });
    });

    function updateButtonState(targetId) {
        const input = document.getElementById(targetId);
        const decrementButton = document.querySelector(`.decrement[data-target="${targetId}"]`);
        decrementButton.disabled = parseInt(input.value) === 0;
    }

    // Initialize button states
    updateButtonState("adults");
    updateButtonState("children");
});

const customSelect = document.querySelector(".custom-select");
const selectedOption = customSelect.querySelector(".selected-option");
const optionsList = customSelect.querySelector(".options");
const hiddenInput = customSelect.querySelector("#park-select-value");

selectedOption.addEventListener("click", () => {
    const isOpen = optionsList.style.display === "none";
    optionsList.style.display = isOpen ? "block" : "none";
    customSelect.setAttribute("aria-expanded", isOpen);
});

optionsList.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        selectedOption.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        optionsList.style.display = "none";
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
        optionsList.style.display = "none";
    }
});

document.querySelector("#park-select").addEventListener("change", () => {
    const value = document.getElementById("park-select-value").value;
    document.querySelector(".selected-option").classList.toggle("invalid", !value);
});