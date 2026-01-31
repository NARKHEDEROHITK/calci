export const calculateBMI = (weight, heightCm) => {
    if (!weight || !heightCm) return { bmi: 0, status: 'Unknown', color: 'text-white' };

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);

    let status = '';
    let color = '';

    if (bmi < 18.5) {
        status = 'Underweight';
        color = 'text-yellow-400';
    } else if (bmi < 25) {
        status = 'Normal';
        color = 'text-emerald-400';
    } else if (bmi < 30) {
        status = 'Overweight';
        color = 'text-orange-400';
    } else {
        status = 'Obese';
        color = 'text-red-500';
    }

    return { bmi, status, color };
};

export const calculateBMR = (gender, weight, heightCm, age) => {
    // Mifflin-St Jeor
    // Men: 10W + 6.25H - 5A + 5
    // Women: 10W + 6.25H - 5A - 161
    if (!weight || !heightCm || !age) return 0;

    let bmr = (10 * weight) + (6.25 * heightCm) - (5 * age);

    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    return bmr;
};

export const calculateIdealWeight = (gender, heightCm) => {
    // Men: 50 + 0.9 * (Height cm - 152)
    // Women: 45.5 + 0.9 * (Height cm - 152)
    if (!heightCm) return { min: 0, max: 0, ideal: 0 };

    const base = gender === 'male' ? 50 : 45.5;
    const ideal = base + 0.9 * (heightCm - 152);

    // Range typically +/- 10% or just a small buffer
    return {
        ideal,
        min: ideal * 0.9,
        max: ideal * 1.1
    };
};

export const calculateAge = (dob) => {
    if (!dob) return { years: 0, months: 0, days: 0 };

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
};

export const calculateBodyFat = (gender, waist, neck, height, hip = 0) => {
    // US Navy Formula
    // All inputs in cm
    if (!waist || !neck || !height) return 0;

    if (gender === 'male') {
        // 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        // Ensure waist - neck > 0
        if (waist - neck <= 0) return 0;
        return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        // 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        if (!hip) return 0;
        if (waist + hip - neck <= 0) return 0;
        return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
};

export const calculateCalorieNeeds = (bmr, activityLevel) => {
    const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };

    return bmr * (multipliers[activityLevel] || 1.2);
};

export const getAllCalorieNeeds = (bmr) => {
    if (!bmr) return [];
    return [
        { name: 'Sedentary', calories: Math.round(bmr * 1.2), fill: '#94a3b8' },
        { name: 'Light', calories: Math.round(bmr * 1.375), fill: '#2dd4bf' },
        { name: 'Moderate', calories: Math.round(bmr * 1.55), fill: '#fbbf24' },
        { name: 'Active', calories: Math.round(bmr * 1.725), fill: '#f87171' },
        { name: 'Very Active', calories: Math.round(bmr * 1.9), fill: '#a855f7' }
    ];
};

export const getBodyFatCategory = (percentage, gender) => {
    if (!percentage) return { category: 'Unknown', color: '#94a3b8' };

    // Simple categorization
    // Women: Essential 10-13, Athletes 14-20, Fitness 21-24, Average 25-31, Obese 32+
    // Men: Essential 2-5, Athletes 6-13, Fitness 14-17, Average 18-24, Obese 25+

    if (gender === 'female') {
        if (percentage < 10) return { category: 'Low', color: '#facc15' };
        if (percentage < 14) return { category: 'Essential', color: '#4ade80' };
        if (percentage < 21) return { category: 'Athletes', color: '#2dd4bf' };
        if (percentage < 25) return { category: 'Fitness', color: '#60a5fa' };
        if (percentage < 32) return { category: 'Average', color: '#a78bfa' };
        return { category: 'Obese', color: '#f87171' };
    } else {
        if (percentage < 2) return { category: 'Low', color: '#facc15' };
        if (percentage < 6) return { category: 'Essential', color: '#4ade80' };
        if (percentage < 14) return { category: 'Athletes', color: '#2dd4bf' };
        if (percentage < 18) return { category: 'Fitness', color: '#60a5fa' };
        if (percentage < 25) return { category: 'Average', color: '#a78bfa' };
        return { category: 'Obese', color: '#f87171' };
    }
};

export const calculateWaterIntake = (weight, activityLevel) => {
    if (!weight) return 0;

    // Basic: 0.033 L per kg
    let intake = weight * 0.033;

    // Add based on activity
    const activityAdditions = {
        sedentary: 0,
        light: 0.3,
        moderate: 0.5,
        active: 0.8,
        very_active: 1.2
    };

    return intake + (activityAdditions[activityLevel] || 0);
};
