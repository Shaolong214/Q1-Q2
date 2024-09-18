const http = require('http');
const https = require('https');
const url = require('url');

function checkConnection(uri) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(uri);
    const protocol = parsedUrl.protocol;
    const requestModule = protocol === 'https:' ? https : http;

    const startTime = process.hrtime();
    let isResolved = false;

    const timeout = 5000; // 5 seconds

    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        req.abort();
        resolve('terrible');
      }
    }, timeout);

    const req = requestModule.get(parsedUrl, (res) => {
      const elapsedTime = process.hrtime(startTime);
      const elapsedMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6; // Convert to milliseconds

      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeoutId);

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

    req.on('error', (err) => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeoutId);
        resolve('terrible');
      }
    });
  });
}

// Test with a fast-responding URI
checkConnection('https://www.google.com')
  .then((result) => {
    console.log(`Test 1 (Google): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 1 (Google) Error: ${error}`);
  });

// Test with a slower URI (you can find or simulate one)
checkConnection('https://www.goodschools.com.au/compare-schools/search/in-victoria')
  .then((result) => {
    console.log(`Test 2 (Example): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 2 (Example) Error: ${error}`);
  });

// Test with an unreachable URI
checkConnection('https://portfolio-evansxu214.vercel.app/about')
  .then((result) => {
    console.log(`Test 3 (Non-existent): Connection is ${result}`);
  })
  .catch((error) => {
    console.error(`Test 3 (Non-existent) Error: ${error}`);
  });

