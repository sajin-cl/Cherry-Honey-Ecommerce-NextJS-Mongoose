
export const TAXES = 10;
export const DELIVERY_THRESHOLD = 500;
export const DELIVERY_FEE = 50;

export function calculateDelivery(subtotal) {
    return subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};

export function calculateGrandTotal(subtotal) {
    return subtotal + TAXES + calculateDelivery(subtotal);
};

/**
 * Calculates a price multiplier when the selected weight differs from the
 * product's base weight. Shared across Navbar, ProductCard, ProductDetailClient.
 * @param {string} selected - Selected weight string (e.g. "1kg", "250g")
 * @param {string} base     - Product's base weight (e.g. "500g")
 * @returns {number} multiplier
 */
export function getMultiplier(selected, base) {
    const s = String(selected).toLowerCase().trim();
    const b = String(base || "500g").toLowerCase().trim();
    if (s === b) return 1.0;

    const getVal = (str) => {
        const num = parseFloat(str);
        const isKg = str.includes("kg") || str.includes("kilogram");
        return isKg ? num * 1000 : num;
    };

    const sVal = getVal(s);
    const bVal = getVal(b);
    if (isNaN(sVal) || isNaN(bVal) || bVal === 0) return 1.0;

    const ratio = sVal / bVal;
    if (Math.abs(ratio - 2.0) < 0.1) return 1.8;
    if (Math.abs(ratio - 4.0) < 0.1) return 3.4;
    return ratio;
};