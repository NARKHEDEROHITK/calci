/**
 * Utility functions for formatting values across calculators
 */

/**
 * Format a number as Indian Rupees currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Format months into years and months display
 * @param {number} months - Number of months
 * @returns {string} Formatted time string like "5y 3m" or "5 years"
 */
export const formatTime = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years}y ${remainingMonths}m`;
};

/**
 * Calculate slider progress percentage for styling
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Progress percentage (0-100)
 */
export const getSliderProgress = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
};

/**
 * Get slider background style with gradient progress
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {object} Style object for slider background
 */
export const getSliderStyle = (value, min, max) => {
    const progress = getSliderProgress(value, min, max);
    return {
        background: `linear-gradient(to right, #667eea 0%, #764ba2 ${progress}%, rgba(255, 255, 255, 0.08) ${progress}%, rgba(255, 255, 255, 0.08) 100%)`
    };
};
