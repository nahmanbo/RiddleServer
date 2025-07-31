import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Middleware to authenticate requests using JWT
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.warn("No valid Bearer token found.");
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    console.log(`✅ Token valid. Authenticated as: ${user.name} (id=${user.id}, role=${user.role})`);
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}
