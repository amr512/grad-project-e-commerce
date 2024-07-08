
export default function formatCurrency(value, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: (currency).toUpperCase(),
        maximumFractionDigits: 2
    }).format(value/100);
}