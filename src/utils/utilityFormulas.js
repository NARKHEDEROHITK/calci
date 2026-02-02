// Utility formulas for Utility Calculators

// 1. Discount Calculator
export const calculateDiscount = (originalPrice, discountRate) => {
    const discountAmount = originalPrice * (discountRate / 100);
    const finalPrice = originalPrice - discountAmount;

    return {
        discountAmount: Math.round(discountAmount * 100) / 100,
        finalPrice: Math.round(finalPrice * 100) / 100,
        savings: Math.round(discountAmount * 100) / 100
    };
};

// 2. Fuel Cost Calculator
export const calculateFuelCost = (distance, mileage, pricePerLiter) => {
    // Fuel Needed = Distance / Mileage
    const fuelNeeded = distance / mileage;
    const cost = fuelNeeded * pricePerLiter;

    return {
        totalCost: Math.round(cost),
        fuelConsumed: fuelNeeded.toFixed(2),
        costPerKm: (cost / distance).toFixed(2)
    };
};

// 3. Electricity Bill Estimator
export const calculateElectricity = (units, ratePerUnit) => {
    // Simple Slab Logic or Flat Rate? Let's use Flat Rate for general utility, 
    // or a simple tiered logic (common: 0-100 x, 100+ y).
    // For specific generic tool, flat rate or simple input is best.

    const totalBill = units * ratePerUnit;

    return {
        totalBill: Math.round(totalBill),
        unitsConsumed: units
    };
};

// 4. Tip Calculator
export const calculateTip = (billAmount, tipPercent, splitCount = 1) => {
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / splitCount;

    return {
        tipAmount: Math.round(tipAmount),
        totalAmount: Math.round(totalAmount),
        perPerson: Math.round(perPerson)
    };
};

// 5. Unit Converter
export const convertUnits = (value, type, fromUnit, toUnit) => {
    // Basic conversion logic
    let result = 0;

    if (type === 'length') {
        // Base unit: Meters
        const toMeters = {
            m: 1,
            km: 1000,
            cm: 0.01,
            mm: 0.001,
            ft: 0.3048,
            inch: 0.0254,
            yard: 0.9144,
            mile: 1609.34
        };
        const inMeters = value * toMeters[fromUnit];
        result = inMeters / toMeters[toUnit];

    } else if (type === 'weight') {
        // Base unit: kg
        const toKg = {
            kg: 1,
            g: 0.001,
            mg: 0.000001,
            lb: 0.453592,
            oz: 0.0283495
        };
        const inKg = value * toKg[fromUnit];
        result = inKg / toKg[toUnit];

    } else if (type === 'temp') {
        // Special logic for C, F, K
        if (fromUnit === toUnit) return value;

        let inCelsius = value;
        if (fromUnit === 'F') inCelsius = (value - 32) * 5 / 9;
        if (fromUnit === 'K') inCelsius = value - 273.15;

        if (toUnit === 'C') result = inCelsius;
        if (toUnit === 'F') result = (inCelsius * 9 / 5) + 32;
        if (toUnit === 'K') result = inCelsius + 273.15;
    }

    return parseFloat(result.toFixed(4));
};

// 6. Percentage Calculator
export const calculateGeneralPercentage = ({ type, x, y }) => {
    // Type 1: What is x% of y?
    // Type 2: x is what % of y?
    // Type 3: Increase/Decrease from x to y?

    let result = 0;

    switch (type) {
        case 'percentOf':
            result = (x / 100) * y;
            break;
        case 'isPercentOf':
            result = (x / y) * 100;
            break;
        case 'change':
            result = ((y - x) / x) * 100;
            break;
        default:
            result = 0;
    }

    return parseFloat(result.toFixed(2));
};
