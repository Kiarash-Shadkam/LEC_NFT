/**
 * Robust image download helper for iframe and browser environments.
 * Fixes the issue where browser iframe restrictions cause downloads to save HTML fallback
 * or corrupted headers that fail to open in Windows/Mac photo viewers.
 */

export async function downloadFileAsBinary(url: string, defaultFilename: string): Promise<boolean> {
  try {
    // 1. Fetch the raw resource
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    // 2. Extract as raw binary array buffer
    const arrayBuffer = await response.arrayBuffer();

    // 3. Determine MIME type (enforce image/jpeg for JPGs, application/zip for ZIPs)
    let mimeType = 'image/jpeg';
    if (defaultFilename.endsWith('.zip')) {
      mimeType = 'application/zip';
    } else if (defaultFilename.endsWith('.json')) {
      mimeType = 'application/json';
    } else if (defaultFilename.endsWith('.png')) {
      mimeType = 'image/png';
    }

    // 4. Create explicit typed binary Blob
    const blob = new Blob([arrayBuffer], { type: mimeType });
    const blobUrl = window.URL.createObjectURL(blob);

    // 5. Trigger download via synthetic anchor
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = blobUrl;
    anchor.download = defaultFilename;
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    }, 4000);

    return true;
  } catch (error) {
    console.error('Download helper error:', error);
    // Fallback: open directly in a new window/tab so user can right-click 'Save image as'
    window.open(url, '_blank');
    return false;
  }
}

export function openImageInNewTab(url: string) {
  const win = window.open();
  if (win) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Quantum Engraving Collection - High Res View</title>
          <style>
            body { margin: 0; background: #05070d; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            img { max-width: 95vw; max-height: 95vh; object-fit: contain; box-shadow: 0 10px 40px rgba(0,0,0,0.8); border-radius: 8px; }
          </style>
        </head>
        <body>
          <img src="${url}" alt="Master Asset" />
        </body>
      </html>
    `);
    win.document.close();
  } else {
    window.open(url, '_blank');
  }
}
