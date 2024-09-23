const http = require('http');
const https = require('https');
const url = require('url');

function checkConnection(uri) {
  return new Promise((resolve, reject) => {
    // Parse the URI to get its components
    const parsedUrl = url.parse(uri);
    const protocol = parsedUrl.protocol;

    // Choose the appropriate module based on the protocol
    const requestModule = protocol === 'https:' ? https : http;

    // Record the start time for measuring response time
    const startTime = process.hrtime();
    let isResolved = false;

    const timeout = 5000; // Set a timeout limit of 5 seconds

    // Set up a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        req.abort(); // Abort the request
        resolve('terrible'); // Resolve with 'terrible' after timeout
      }
    }, timeout);

    // Make the HTTP(S) GET request
    const req = requestModule.get(parsedUrl, (res) => {
      // Calculate the elapsed time since the request started
      const elapsedTime = process.hrtime(startTime);
      const elapsedMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6; // Convert to milliseconds

      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeoutId); // Clear the timeout

        // Determine the connection quality based on elapsed time
        if (elapsedMs <= 500) {
          resolve('good');
        } else if (elapsedMs <= 5000) {
          resolve('fine');
        } else {
          resolve('terrible');
        }
      }

      // Consume response data to free up memory
      res.on('data', () => {});
      res.on('end', () => {});
    });

    // Handle any errors during the request
    req.on('error', (err) => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeoutId); // Clear the timeout
        resolve('terrible'); // Resolve with 'terrible' on error
      }
    });
  });
}

// Test
checkConnection('https://www.baidu.com/')
  .then((result) => {
    console.log(`Test 1 (Baidu): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 1 (Baidu) Error: ${error}`);
  });

// Test
checkConnection('https://portfolio-evansxu214.vercel.app/about')
  .then((result) => {
    console.log(`Test 2 (portfolio): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 2 (portfolio) Error: ${error}`);
  });

// Test
checkConnection('')
  .then((result) => {
    console.log(`Test 3 (Non-existent): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 3 (Non-existent) Error: ${error}`);
  });
