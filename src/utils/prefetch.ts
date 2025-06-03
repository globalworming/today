/**
 * Utility for prefetching the server to reduce cold start latency
 */

// The API endpoint URL from the cloud function
const API_URL = 'https://chat-598109592614.europe-west1.run.app';

/**
 * Initiates a simple prefetch request to warm up the server
 * This helps reduce cold start latency for the first actual user interaction
 */
export const prefetchServer = async (): Promise<void> => {
  try {
    console.log('Warming up server with prefetch request...');
    await fetch(API_URL, { method: 'GET', headers: { 'Authorization': `Bearer AIzaSyCeQaGPWswIuWYCT6ELXc9nvDKn-egonb1` } })
  } catch (error) {
    // Silently ignore errors - we don't want to impact the user experience
    // if the prefetch fails
  }
};

// Run the prefetch immediately when this module is imported
prefetchServer();
