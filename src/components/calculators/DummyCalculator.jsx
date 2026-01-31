import { FaTools } from 'react-icons/fa';
import Header from '../common/Header';

const DummyCalculator = ({ title, icon }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-24">
            <Header
                icon={icon}
                title={title}
                subtitle="We're currently building this calculator to help you with your financial planning."
            />

            <div className="glass-card rounded-3xl p-8 md:p-12 w-full max-w-3xl text-center animate-fade-in-up delay-100">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTools className="text-4xl text-primary-400 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                    Our team is working hard to bring you a premium {title.toLowerCase()} experience.
                    Stay tuned for updates!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/10 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DummyCalculator;
