export const formatCurrency = (value: number, currency = 'INR') => {
try {
return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value);
} catch {
return `${currency} ${value.toFixed(2)}`;
}
};


export const toLocalDate = (epochSeconds: number) => new Date(epochSeconds * 1000);


export const formatTime = (d: Date) => d.toLocaleTimeString();
export const formatDate = (d: Date) => d.toLocaleDateString();