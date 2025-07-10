
export function generateNextId(array) {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

export function logger(req, res, next) {
    console.log(`Got request: method = ${req.method}, url = ${req.url}`);
    next();
}
  