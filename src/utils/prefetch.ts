/**
 * Utility for prefetching servers to reduce cold start latency
 */

// The API endpoint URLs from the cloud functions
const CHAT_API_URL = 'https://chat-598109592614.europe-west1.run.app';
const LOGIN_API_URL = 'https://login-598109592614.europe-west1.run.app';

/**
 * Creates a minimal loading indicator in the top right corner
 */
const createLoadingIndicator = (serverType: 'chat' | 'login'): HTMLElement => {
  const indicator = document.createElement('div');
  
  // Set positioning and appearance
  Object.assign(indicator.style, {
    position: 'fixed',
    top: '10px',
    left: '10px',
    padding: '6px 12px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    zIndex: '9999',
    transition: 'opacity 0.3s ease'
  });
  
  // Add it to the body
  document.body.appendChild(indicator);
  
  // Initialize countdown
  let secondsLeft = 60;
  
  // Function to update the text content
  function updateText() {
    indicator.textContent = `${serverType} server starting, please wait ${secondsLeft}s`;
  }
  
  // Set initial text
  updateText();
  
  // Function to update the countdown
  function updateCountdown() {
    secondsLeft--;
    updateText();
    
    if (secondsLeft < 0) {
      clearInterval(countdownInterval);
    }
  }
  
  // Set up interval for countdown
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  // Store interval for cleanup
  (indicator as any)._intervals = [countdownInterval];
  
  return indicator;
};

/**
 * Removes the loading indicator with a fade-out effect
 */
const removeLoadingIndicator = (indicator: HTMLElement): void => {
  // Clear any intervals associated with the indicator
  if ((indicator as any)._intervals) {
    (indicator as any)._intervals.forEach((id: number) => clearInterval(id));
  }
  
  // Fade out effect
  indicator.style.opacity = '0';
  
  // Remove from DOM after fade completes
  setTimeout(() => {
    // Node removes itself
    indicator.remove();
  }, 300);
};

/**
 * Initiates a simple prefetch request to warm up a specific server
 * This helps reduce cold start latency for the first actual user interaction
 */
export const prefetchServer = async (serverType: 'chat' | 'login'): Promise<void> => {
  const apiUrl = serverType === 'chat' ? CHAT_API_URL : LOGIN_API_URL;
  
  // Create loading indicator
  const indicator = createLoadingIndicator(serverType);
  
  try {
    console.log(`Warming up ${serverType} server with prefetch request...`);
    const response = await fetch(apiUrl);
    console.log(`${serverType}: ${response.status}`);
  } catch (error) {
    console.error(`Failed to prefetch ${serverType} server:`, error);
  } finally {
    // Remove the indicator when done (whether successful or not)
    removeLoadingIndicator(indicator);
  }
};

/**
 * Initiates prefetch requests to warm up all servers
 */
export const prefetchAllServers = async (): Promise<void> => {
  // Prefetch both servers in parallel
  await Promise.all([
    prefetchServer('chat'),
    prefetchServer('login')
  ]);
};

// Wait for page to fully load before prefetching to avoid blocking initial render
if (document.readyState === 'complete') {
  // If already loaded (rare case), run immediately
  setTimeout(() => prefetchAllServers(), 0);
} else {
  // Otherwise wait for the 'load' event
  window.addEventListener('load', () => {
    // Add a small delay to ensure it happens after critical rendering
    setTimeout(() => prefetchAllServers(), 100);
  });
}
