const test = require("node:test");
const assert = require("node:assert/strict");
const { validateDeliveryAddress } = require("../src/lib/deliveryValidation");

test("accepts Georgetown addresses in fallback mode", async () => {
  const result = await validateDeliveryAddress("123 Main St, Georgetown, ON", "");

  assert.equal(result.allowed, true);
});

test("rejects non-Georgetown addresses in fallback mode", async () => {
  const result = await validateDeliveryAddress("123 Main St, Toronto, ON", "");

  assert.equal(result.allowed, false);
  assert.match(result.message, /Georgetown/);
});
