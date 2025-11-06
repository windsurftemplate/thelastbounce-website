/**
 * The Last Bounce - Verification Client
 *
 * Connects to the Vercel API to verify product authenticity
 */

// API Configuration
const API_URL = 'https://api.thelastbounce.com';
// For local testing, uncomment:
// const API_URL = 'http://localhost:3000';

/**
 * Sample data for testing
 */
const SAMPLE_DATA = {
  proof: 'SGVsbG8gV29ybGQh',
  root: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  nullifier: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  tagSignature: 'c2lnbmF0dXJlZGF0YQ==',
  challenge: 'Y2hhbGxlbmdlZGF0YQ==',
  tagUid: 'E004012345678910'
};

/**
 * Verify product with API
 */
async function verifyProduct(data) {
  const response = await fetch(`${API_URL}/api/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      proof: data.proof,
      publicInputs: [data.root, data.nullifier],
      tagSignature: data.tagSignature,
      challenge: data.challenge,
      tagUid: data.tagUid
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Check API health
 */
async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const health = await response.json();
    console.log('API Health:', health);
    return health.status === 'ok';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}

/**
 * Update UI with verification result
 */
function displayResult(result) {
  const container = document.getElementById('result-container');
  const statusIcon = document.getElementById('status-icon');
  const statusTitle = document.getElementById('status-title');
  const statusMessage = document.getElementById('status-message');
  const proofStatus = document.getElementById('proof-status');
  const tagAuthStatus = document.getElementById('tag-auth-status');
  const rootStatus = document.getElementById('root-status');
  const timestamp = document.getElementById('timestamp');

  // Show result container
  container.classList.remove('hidden');

  // Update status
  if (result.authentic) {
    container.className = 'verify-card result-card result-success';
    statusIcon.textContent = '✅';
    statusTitle.textContent = 'Product Authenticated';
    statusMessage.textContent = 'This product has been verified as authentic using cryptographic proof.';
  } else {
    container.className = 'verify-card result-card result-warning';
    statusIcon.textContent = '⚠️';
    statusTitle.textContent = 'Verification Failed';
    statusMessage.textContent = result.error || 'Could not verify product authenticity. This may indicate a counterfeit.';
  }

  // Update details if available
  if (result.details) {
    proofStatus.innerHTML = result.details.proofValid
      ? '<span class="status-valid">✅ Valid</span>'
      : '<span class="status-invalid">❌ Invalid</span>';

    tagAuthStatus.innerHTML = result.details.tagAuthValid
      ? '<span class="status-valid">✅ Valid</span>'
      : '<span class="status-invalid">❌ Invalid</span>';

    rootStatus.innerHTML = result.details.rootValid
      ? '<span class="status-valid">✅ Valid</span>'
      : '<span class="status-invalid">❌ Invalid</span>';
  }

  // Update timestamp
  if (result.timestamp) {
    const date = new Date(result.timestamp);
    timestamp.textContent = date.toLocaleString();
  }

  // Scroll to result
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Show error message
 */
function displayError(error) {
  const container = document.getElementById('result-container');
  const statusIcon = document.getElementById('status-icon');
  const statusTitle = document.getElementById('status-title');
  const statusMessage = document.getElementById('status-message');
  const detailsSection = document.getElementById('result-details');

  container.classList.remove('hidden');
  container.className = 'verify-card result-card result-error';
  detailsSection.style.display = 'none';

  statusIcon.textContent = '❌';
  statusTitle.textContent = 'Error';

  // Parse error message
  let message = 'An error occurred during verification. ';

  if (error.message.includes('429')) {
    message += 'Too many requests. Please try again in a minute.';
  } else if (error.message.includes('500')) {
    message += 'Server error. Please try again later.';
  } else if (error.message.includes('Failed to fetch')) {
    message += 'Could not connect to API. Please check your internet connection.';
  } else {
    message += error.message;
  }

  statusMessage.textContent = message;

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Reset form and hide results
 */
function resetForm() {
  const form = document.getElementById('verify-form');
  const container = document.getElementById('result-container');

  form.reset();
  container.classList.add('hidden');

  // Scroll back to form
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Load sample data into form
 */
function loadSampleData() {
  document.getElementById('proof').value = SAMPLE_DATA.proof;
  document.getElementById('root').value = SAMPLE_DATA.root;
  document.getElementById('nullifier').value = SAMPLE_DATA.nullifier;
  document.getElementById('tag-signature').value = SAMPLE_DATA.tagSignature;
  document.getElementById('challenge').value = SAMPLE_DATA.challenge;
  document.getElementById('tag-uid').value = SAMPLE_DATA.tagUid;
}

/**
 * Validate form input
 */
function validateInput(data) {
  // Check all fields are filled
  if (!data.proof || !data.root || !data.nullifier || !data.tagSignature || !data.challenge || !data.tagUid) {
    throw new Error('All fields are required');
  }

  // Validate hex format for root and nullifier
  if (!data.root.startsWith('0x') || data.root.length !== 66) {
    throw new Error('Merkle root must be a valid hex string (0x + 64 chars)');
  }

  if (!data.nullifier.startsWith('0x') || data.nullifier.length !== 66) {
    throw new Error('Nullifier must be a valid hex string (0x + 64 chars)');
  }

  // Validate base64 format (basic check)
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  if (!base64Regex.test(data.proof)) {
    throw new Error('Proof must be valid base64');
  }
  if (!base64Regex.test(data.tagSignature)) {
    throw new Error('Tag signature must be valid base64');
  }
  if (!base64Regex.test(data.challenge)) {
    throw new Error('Challenge must be valid base64');
  }

  return true;
}

/**
 * Set loading state
 */
function setLoading(loading) {
  const button = document.getElementById('verify-button');
  const buttonText = document.getElementById('button-text');
  const spinner = document.getElementById('button-spinner');

  if (loading) {
    button.disabled = true;
    buttonText.textContent = 'Verifying...';
    spinner.classList.remove('hidden');
  } else {
    button.disabled = false;
    buttonText.textContent = 'Verify Product';
    spinner.classList.add('hidden');
  }
}

/**
 * Initialize event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check API health on load
  checkHealth();

  // Form submission
  const form = document.getElementById('verify-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      proof: document.getElementById('proof').value.trim(),
      root: document.getElementById('root').value.trim(),
      nullifier: document.getElementById('nullifier').value.trim(),
      tagSignature: document.getElementById('tag-signature').value.trim(),
      challenge: document.getElementById('challenge').value.trim(),
      tagUid: document.getElementById('tag-uid').value.trim()
    };

    try {
      // Validate input
      validateInput(data);

      // Set loading state
      setLoading(true);

      // Call API
      const result = await verifyProduct(data);

      // Display result
      displayResult(result);

    } catch (error) {
      console.error('Verification error:', error);
      displayError(error);
    } finally {
      setLoading(false);
    }
  });

  // Load sample data button
  const loadSampleBtn = document.getElementById('load-sample');
  loadSampleBtn.addEventListener('click', loadSampleData);

  // Verify another button
  const verifyAnotherBtn = document.getElementById('verify-another');
  verifyAnotherBtn.addEventListener('click', resetForm);
});
