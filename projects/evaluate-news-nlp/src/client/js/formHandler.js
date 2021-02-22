// Event Listener to Form
document.querySelector('form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const dataURL = document.getElementById('url-to-analyse').value;
  //   check if a correct URL was put into the form field
  //   Client.checkForName(inputText)
  //   let checkURL = document.getElementById('name').value;
  requestAnalyseURL({ dataURL }).then(updateUI);
}

function updateUI(parsedData) {
  document.getElementById(
    'confidence'
  ).innerHTML = `<p><strong>Level of Confidence:</strong> ${parsedData.confidence}%</p>`;
  document.getElementById(
    'subjectivity'
  ).innerHTML = `<p><strong>Subjectivity:</strong> ${parsedData.subjectivity}</p>`;
  document.getElementById(
    'agreement'
  ).innerHTML = `<p><strong>Agreement:</strong> ${parsedData.agreement}</p>`;
  document.getElementById(
    'irony'
  ).innerHTML = `<p><strong>Irony:</strong> ${parsedData.irony}</p>`;
}

// Function to POST URL
// Points to local server
const requestAnalyseURL = async (data = {}) => {
  const response = await fetch('http://localhost:8081/analyse', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('error', error);
  }
};

export { handleSubmit };
