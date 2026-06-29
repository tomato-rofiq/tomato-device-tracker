// this file contains functions to interact with the Google Apps Script backend

import { log } from './logger';

const GAS_URL = import.meta.env.VITE_GAS_URL;

// all our actions need to send data in the request body (at minimum the action field),
// and GET requests don't have a body, POST is the only practical choice.
export async function gasRequest<T>(action: string, payload?: object): Promise<T> {
  const started = performance.now();
  log.debug('gasRequest →', action, payload ?? {});
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action, ...payload }),
    });
    if (!response.ok) throw new Error(`GAS request failed: ${response.status}`);
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    log.debug('gasRequest ←', action, `${Math.round(performance.now() - started)}ms`);
    return json;
  } catch (err) {
    log.error('gasRequest failed', action, err);
    throw err;
  }
}

