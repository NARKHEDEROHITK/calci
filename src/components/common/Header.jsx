import { FaChartPie } from 'react-icons/fa';

/**
 * Reusable header component for calculator pages
 * @param {object} props - Component props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Subtitle/description text
 */
const Header = ({ icon: Icon = FaChartPie, title, subtitle }) => {
    return (
        <header className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-2">
                <Icon className="text-3xl md:text-4xl text-primary-500" />
                <h1 className="text-3xl md:text-5xl font-extrabold gradient-text-primary tracking-tight">
                    {title}
                </h1>
            </div>
            <p className="text-base md:text-lg opacity-70">
                {subtitle}
            </p>
        </header>
    );
};

export default Header;
