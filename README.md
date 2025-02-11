# Node.js Server Crash on Large POST Requests

This repository demonstrates a common Node.js error where a server crashes when receiving large POST requests.  The issue stems from not handling potential request body overflows.  The solution implements a check to limit request body size and gracefully handle oversized requests, preventing server crashes. 

## Bug

The `bug.js` file contains the vulnerable code that crashes upon receiving a large POST request.  The lack of body size checks allows the request body to grow indefinitely, eventually exceeding memory limits. 

## Solution

The `bugSolution.js` file presents a corrected version.  It incorporates a check for the request body size. If the size exceeds a defined limit (1MB in this case), the server responds with a 413 error (Request Entity Too Large) and prevents a crash.

## How to Reproduce

1. Clone the repository.
2. Run `npm install` to install necessary packages (there are none, this is just a standard practice).
3. Execute `node bug.js`.
4. Send a large POST request to `http://localhost:3000` using a tool like Postman or curl.

Observe that the original server will crash.  Then run `node bugSolution.js` and repeat step 4 to see the improved error handling. 