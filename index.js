document.getElementById('colorPicker').addEventListener('input', function() {
    const selectedColor = this.value;
    document.getElementById('colorPicker').style.backgroundColor = selectedColor;
});

document.getElementById('getColorScheme').addEventListener('click', function() {
    const color = document.getElementById('colorPicker').value.substring(1); // Remove '#' from color value
    const mode = document.getElementById('modeSelect').value;
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const palette = document.getElementById('palette');
            palette.innerHTML = ''; // Clear existing palette

            const paletteCodes = document.getElementById('palette-codes');
            paletteCodes.innerHTML = ''; // Clear existing palette

            data.colors.forEach((colorObj) => {
                const hexValue = colorObj.hex.value

                // colors
                const colorDiv = document.createElement('div');
                colorDiv.style.backgroundColor = hexValue;
                colorDiv.title = hexValue; // Tooltip to show color code
                palette.appendChild(colorDiv);

                // color codes
                const colorCodesDiv = document.createElement('div');
                colorCodesDiv.style.cursor = "pointer";
                colorCodesDiv.textContent = hexValue;

                colorCodesDiv.onclick = function () {
                    // Write hexValue to clipboard
                    navigator.clipboard.writeText(hexValue).then(() => {
                        // Change text content to "Copied"
                        colorCodesDiv.textContent = "Copied ✓";
                        
                        // Use setTimeout to delay the next steps
                        setTimeout(() => {
                            // Add fade-out class
                            colorCodesDiv.classList.add('fade-out');
                            
                            // After the fade-out animation completes, reset text and remove class
                            setTimeout(() => {
                                colorCodesDiv.textContent = hexValue;
                                colorCodesDiv.classList.remove('fade-out');
                            }, 500); // Matches the animation duration
                        }, 500); // 2 seconds of displaying "Copied"
                    }).catch(error => {
                        console.error('Could not copy text:', error);
                    });
                };
                paletteCodes.appendChild(colorCodesDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching color scheme:', error);
        });
});
