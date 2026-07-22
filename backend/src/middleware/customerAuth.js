const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

module.exports = async function customerAuthMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided." });
    }
    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "customer") {
      return res.status(401).json({ message: "Invalid token." });
    }
    const customer = await Customer.findById(decoded.id).select("-password");
    if (!customer) return res.status(401).json({ message: "Customer not found." });
    req.customer = customer;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Non-blocking variant: if a valid customer token is present, attaches req.customer;
// otherwise continues as a guest. Used on the public order-creation endpoint.
module.exports.optional = async function optionalCustomerAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) return next();
    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "customer") return next();
    const customer = await Customer.findById(decoded.id).select("-password");
    if (customer) req.customer = customer;
    next();
  } catch {
    next();
  }
};
