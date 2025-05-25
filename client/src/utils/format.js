export const formatCurrency = (value) => {
  // If value is empty or not a number, return empty string
  if (!value || isNaN(value)) return "";

  // Convert to number if it's a string
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Format the number
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};

// Function to clean currency input value
export const cleanCurrencyInput = (value) => {
  // Remove currency symbol, dots, commas and any non-digit characters
  return value.replace(/[^0-9]/g, "");
};
