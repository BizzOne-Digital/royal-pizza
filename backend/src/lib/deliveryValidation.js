const https = require("https");

const ALLOWED_CITY = "georgetown";

function normalize(value) {
  return (value || "").toString().trim().toLowerCase();
}

function looksLikeGeorgetownInText(address) {
  const normalizedAddress = normalize(address);
  if (!normalizedAddress) return false;

  const georgetownTokens = ["georgetown", "georgetown on", "georgetown ontario", "l7g"];
  return georgetownTokens.some((token) => normalizedAddress.includes(token));
}

function extractAddressComponent(components, types) {
  const component = components.find((item) => types.some((type) => item.types.includes(type)));
  return component ? component.long_name : "";
}

function parseGeocodingResponse(body) {
  if (!body || !body.results || body.results.length === 0) {
    return null;
  }

  const result = body.results[0];
  const components = result.address_components || [];
  const allComponentNames = components.flatMap((component) => [component.long_name, component.short_name].filter(Boolean));

  return {
    city: extractAddressComponent(components, ["locality", "postal_town", "administrative_area_level_3", "administrative_area_level_2"]),
    province: extractAddressComponent(components, ["administrative_area_level_1"]),
    country: extractAddressComponent(components, ["country"]),
    allComponents: allComponentNames,
  };
}

function isAllowedLocation(location) {
  if (!location) return false;

  return (
    normalize(location.city) === ALLOWED_CITY ||
    (Array.isArray(location.allComponents) && location.allComponents.some((name) => normalize(name).includes(ALLOWED_CITY)))
  );
}

async function validateDeliveryAddress(address, fallbackText = "") {
  const resolvedAddress = `${address || ""} ${fallbackText || ""}`.trim();

  if (!resolvedAddress) {
    return {
      allowed: false,
      message: "Sorry, we currently deliver only within Georgetown.",
    };
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (apiKey) {
    try {
      const encodedAddress = encodeURIComponent(resolvedAddress);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

      const response = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        }).on("error", reject);
      });

      const location = parseGeocodingResponse(response);
      const fallbackAllowed = looksLikeGeorgetownInText(resolvedAddress);

      if (location && isAllowedLocation(location)) {
        return {
          allowed: true,
          message: "Address is within Georgetown.",
        };
      }

      if (fallbackAllowed) {
        return {
          allowed: true,
          message: "Address is within Georgetown.",
        };
      }

      return {
        allowed: false,
        message: "Sorry, we currently deliver only within Georgetown.",
      };
    } catch (error) {
      console.error("❌ Google Geocoding lookup failed:", error.message);
    }
  }

  const fallbackAllowed = looksLikeGeorgetownInText(resolvedAddress);
  return {
    allowed: fallbackAllowed,
    message: fallbackAllowed
      ? "Address is within Georgetown."
      : "Sorry, we currently deliver only within Georgetown.",
  };
}

module.exports = {
  validateDeliveryAddress,
  isAllowedLocation,
};
