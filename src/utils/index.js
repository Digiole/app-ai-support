
export const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);


  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  //console.log("FETCH ", response.headers.get('X-Custom-Usage'));
  return response;

}


export function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16).substring(2);

  return `id-${timestamp}-${hexadecimalString}`;
}

export function encode(value) {
  // Encode value as UTF-8 bytes
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(value);

  // Convert bytes to base64 string  
  const base64Encoded = btoa(String.fromCharCode(...utf8Bytes));

  // Build RFC 2047 encoded string
  return `=?utf-8?b?${base64Encoded}?=`;

}

export function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true; // URL is valid
  } catch (e) {
    return false; // URL is invalid
  }
}

// Usage Example:
//const url = "https://www.example.com";
//console.log(isValidUrl(url)); // This will log 'true' if the URL is valid, 'false' otherwise.
export async function isUrlOnline(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors' // To avoid CORS issues, but it also means you can't read status
    });

    // If the request was successful, or even if it wasn't but the server responded,
    // the URL is considered 'online'.
    return response.ok || response.type === 'opaque';
  } catch (error) {
    // If there's an error (like a network issue), the URL is 'offline'.
    return false;
  }
}

// Usage Example
//const url = "https://www.example.com";
//isUrlOnline(url).then(isOnline => console.log(isOnline ? 'Online' : 'Offline'));



export const tokenEstimate = (text) => Math.max(text.length / 4 + 10, Math.ceil(text.split(" ").length / 75 * 100));


export function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export function isValidUUID(uuid) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}
