// this file contains functions to interact with the Google Apps Script backend

const GAS_URL = import.meta.env.VITE_GAS_URL;

// all our actions need to send data in the request body (at minimum the action field), 
// and GET requests don't have a body, POST is the only practical choice. 
export async function gasRequest<T>(action: string, payload?: object): Promise<T> {
  const response = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
  });
  if (!response.ok) throw new Error(`GAS request failed: ${response.status}`);
  return response.json();
}
