document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('sex').value;
    const birthDate = document.getElementById('dob').value;
    const identifierSystem = document.getElementById('docType').value;
    const identifierValue = document.getElementById('docNumber').value;
    const phone = document.getElementById('mobile').value;
    const email = document.getElementById('userEmail').value;
    const address = document.getElementById('street').value;
    const city = document.getElementById('town').value;
    const postalCode = document.getElementById('zip').value;

    // Crear el objeto Patient en formato FHIR
    const patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: [firstName],
            family: lastName
        }],
        gender: gender,
        birthDate: birthDate,
        identifier: [{
            system: identifierSystem,
            value: identifierValue
        }],
        telecom: [{
            system: "phone",
            value: phone,
            use: "home"
        }, {
            system: "email",
            value: email,
            use: "home"
        }],
        address: [{
            use: "home",
            line: [address],
            city: city,
            postalCode: postalCode,
            country: "Colombia"
        }]
    };

    // Enviar los datos a un servidor FHIR (puedes cambiar la URL por la tuya)
    fetch('https://hl7-fhir-ehr.onrender.com/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
        alert('Paciente creado exitosamente!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al crear el paciente.');
    });
});
