document.addEventListener('DOMContentLoaded', () => {
    const fetchPrograms = async () => {
        try {
            const response = await fetch('/api/programs');
            const programs = await response.json();
            const programList = document.getElementById('program-list');
            programList.innerHTML = ''; // Clear previous programs
            programs.forEach(program => {
                const programDiv = document.createElement('div');
                programDiv.classList.add('program');
                programDiv.innerHTML = `
                    <h3>${program.name}</h3>
                    <p><strong>Organizing Date:</strong> ${program.organizing_date}</p>
                    <p><strong>Venue:</strong> ${program.venue}</p>
                    <p><strong>Details:</strong> ${program.details}</p>
                    <img src="${program.image}" alt="Program Image">
                `;
                programList.appendChild(programDiv);
            });
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        try {
            const response = await fetch('/api/start-program', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            if (response.ok) {
                console.log('Program started successfully');
                form.reset();
                fetchPrograms(); // Refresh program list
                alert('Program started successfully!');
            } else {
                console.error('Failed to start program:', response.statusText);
            }
        } catch (error) {
            console.error('Error starting program:', error);
        }
    };

    const programForm = document.getElementById('program-form');
    programForm.addEventListener('submit', handleFormSubmit);

    fetchPrograms();
});
