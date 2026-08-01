const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "..", "..", "logs", "mail.log");

function logToFile(line) {
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
  } catch {
    // logging is best-effort, never block order flow on it
  }
}

let transporter = null;

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

async function sendNewOrderEmail(order) {
  const t = getTransporter();
  if (!t) {
    const msg = "Email notification skipped: EMAIL_USER/EMAIL_PASS not configured in .env";
    console.error("❌", msg);
    logToFile(`SKIPPED - ${msg}`);
    return;
  }

  const itemsList = order.items
    .map((i) => `${i.quantity}x ${i.name}${i.size ? ` (${i.size})` : ""} - $${(i.price * i.quantity).toFixed(2)}`)
    .join("\n");

  const recipient = process.env.NOTIFY_EMAIL || process.env.EMAIL_USER;

  try {
    await t.sendMail({
      from: `"Royal Pizza and Sub" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: `New Order — ${order.customer.name} — $${order.total.toFixed(2)}`,
      text: [
        `New ${order.orderType} order received.`,
        ``,
        `Customer: ${order.customer.name}`,
        `Phone: ${order.customer.phone}`,
        order.orderType === "delivery" ? `Address: ${order.deliveryAddress}` : "",
        `Payment: ${order.paymentMethod}`,
        ``,
        `Items:`,
        itemsList,
        ``,
        `Subtotal: $${order.subtotal.toFixed(2)}`,
        `Tax: $${order.tax.toFixed(2)}`,
        `Total: $${order.total.toFixed(2)}`,
        order.notes ? `\nNotes: ${order.notes}` : "",
      ].filter(Boolean).join("\n"),
    });
    console.log(`✅ Order notification email sent to ${recipient}`);
    logToFile(`SENT - order for "${order.customer.name}" ($${order.total.toFixed(2)}) -> ${recipient}`);
  } catch (err) {
    if (err.responseCode === 535 || err.code === "EAUTH") {
      const msg = `Email auth error — check EMAIL_USER/EMAIL_PASS (Gmail App Password) in .env: ${err.message}`;
      console.error("❌", msg);
      logToFile(`FAILED (AUTH) - ${msg}`);
    } else {
      console.error("❌ Email send error:", err.message);
      logToFile(`FAILED - ${err.message}`);
    }
  }
}

module.exports = { sendNewOrderEmail };
