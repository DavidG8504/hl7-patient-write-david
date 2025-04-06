document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const paciente = document.getElementById('paciente').value;
  const consulta = document.getElementById('consulta').value;
  const medico = document.getElementById('medico').value;
  const cedula = document.getElementById('cedula').value;
  const dx = document.getElementById('dx').value;
  const proc = document.getElementById('proc').value;
  const just = document.getElementById('just').value;
  const fechaCita = document.getElementById('fechaCita').value;
  const hora = document.getElementById('hora').value;

  // Construcción del objeto FHIR ServiceRequest
  const serviceRequestData = {
    resourceType: "ServiceRequest",
    status: "active",
    intent: "order",
    subject: {
      identifier: {
        system: "http://hl7.org/fhir/sid/col-cc",
        value: cedula
      },
      display: paciente
    },
    code: {
      text: proc
    },
    reasonCode: [{
      text: dx
    }],
    supportingInfo: [{
      display: just
    }],
    authoredOn: new Date().toISOString(),
    requester: {
      display: medico
    },
    occurrenceDateTime: `${fechaCita}T${hora}`
  };

  // Mostrar en consola para verificar
  console.log(serviceRequestData);

  // Enviar la solicitud al backend (usa tu endpoint aquí)
  fetch('https://hl7-fhir-ehr-david.onrender.com/service-request/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    alert('Solicitud médica creada exitosamente. ID: ' + data._id);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al enviar la solicitud: ' + error.message);
  });
});
