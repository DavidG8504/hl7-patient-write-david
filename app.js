document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const paciente = document.getElementById('paciente').value;
  const consulta = document.getElementById('consulta').value;
  const medico = document.getElementById('medico').value;
  const cedula = document.getElementById('cedula').value;
  const dx = document.getElementById('dx').value;
  const proc = document.getElementById('proc').value;
  const just = document.getElementById('just').value;
  const fechaCita = document.getElementById('fechaCita').value;
  const hora = document.getElementById('hora').value;

  const serviceRequestData = {
    paciente,
    consulta,
    medico,
    cedula,
    diagnostico: dx,
    procedimiento: proc,
    justificacion: just,
    fechaCita,
    hora
  };

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
    if (data._id) {
      alert('Solicitud médica creada exitosamente. ID: ' + data._id);
    } else {
      alert('Solicitud enviada pero no se recibió ID.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al enviar la solicitud: ' + error.message);
  });
});
