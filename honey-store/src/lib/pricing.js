
export const TAXES = 10;
export const DELIVERY_THRESHOLD = 500;
export const DELIVERY_FEE = 50;

export function calculateDelivery(subtotal) {
    return subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};

export function calculateGrandTotal(subtotal) {
    return subtotal + TAXES + calculateDelivery(subtotal);
};