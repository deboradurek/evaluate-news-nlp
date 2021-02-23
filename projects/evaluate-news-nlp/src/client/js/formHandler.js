// Event Listener to Form
document.querySelector('form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const dataURL = document.getElementById('url-to-analyse').value;

  //   Check if a valid URL was put into the form field
  if (Client.checkForURL(dataURL)) {
    // Change button display attributes for process of loading
    const buttonSubmit = document.getElementById('btn-submit');
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.setAttribute('value', 'Loading...');
    // Send URL and Update UI
    requestAnalyseURL({ dataURL }).then((parsedData) => {
      updateUI(parsedData);
      // Change button display attributes back to original
      buttonSubmit.removeAttribute('disabled');
      buttonSubmit.setAttribute('value', 'Submit');
    });
  } else {
    alert('Invalid URL. Please try again!');
  }
}

// Function to POST URL, points to local server
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

// Function to Update UI with retrieved WebAPI data
function updateUI(parsedData) {
  // Update display for results container
  document.getElementById('results-ctn').classList.remove('display-result-none');
  document.getElementById('results-ctn').classList.add('display-result-block');

  // Update results container with data
  document.getElementById(
    'confidence'
  ).innerHTML = `<p><strong>Level of Confidence:</strong> ${parsedData.confidence}%</p>`;
  document.getElementById(
    'subjectivity'
  ).innerHTML = `<p><strong>Subjectivity:</strong> ${parsedData.subjectivity}</p>`;
  document.getElementById(
    'agreement'
  ).innerHTML = `<p><strong>Agreement:</strong> ${parsedData.agreement}</p>`;
  document.getElementById('irony').innerHTML = `<p><strong>Irony:</strong> ${parsedData.irony}</p>`;
}

export { handleSubmit };
