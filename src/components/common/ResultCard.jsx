import { formatCurrency } from '../../utils/formatters';

const ResultCard = ({ label, value, subText, isCurrency = true, className = '' }) => {
    return (
        <div className={`bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform ${className}`}>
            <div className="text-sm text-white/50 uppercase tracking-wide mb-1">{label}</div>
            <div className="text-lg font-bold gradient-text-primary text-white">
                {isCurrency ? formatCurrency(value) : value}
            </div>
            {subText && <div className="text-xs text-white/40 mt-1">{subText}</div>}
        </div>
    );
};

export default ResultCard;
