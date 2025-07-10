//====================================
// Middleware: Logs each incoming HTTP request
//====================================
export function logger(req, res, next) {
    console.log(`Incoming request: method = ${req.method}, url = ${req.url}`);
    next(); // Pass control to the next middleware/route handler
  }

  