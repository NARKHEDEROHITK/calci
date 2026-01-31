import { getSliderStyle } from '../../utils/formatters';

const CalculatorInput = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = '',
    prefix = '',
    helperText = ''
}) => {
    const handleChange = (e) => {
        const newValue = Number(e.target.value);
        if (newValue >= 0) { // Basic non-negative validation
            onChange(newValue);
        }
    };

    return (
        <div className="mb-6">
            <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                <span>{label}</span>
                <div className="flex items-center">
                    {prefix && <span className="text-white font-semibold text-base mr-1">{prefix}</span>}
                    <span className="text-white font-semibold text-base">{value}</span>
                    {unit && <span className="text-white font-semibold text-base ml-1">{unit}</span>}
                </div>
            </label>
            <input
                type="range"
                className="range-slider w-full"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                style={getSliderStyle(value, min, max)}
            />
            <div className="relative mt-3">
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">
                        {prefix}
                    </span>
                )}
                <input
                    type="number"
                    className={`w-full py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all ${prefix ? 'pl-10' : 'pl-4'} ${unit ? 'pr-10' : 'pr-4'}`}
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                />
                {unit && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">
                        {unit}
                    </span>
                )}
            </div>
            {helperText && <p className="text-xs text-white/40 mt-1">{helperText}</p>}
        </div>
    );
};

export default CalculatorInput;
