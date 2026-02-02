import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | CalcHub` : 'CalcHub - All-in-One Calculator Suite';

        // Update Meta Tags
        const setMetaTag = (name, content) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        if (description) {
            setMetaTag('description', description);
        }

        if (keywords) {
            setMetaTag('keywords', keywords);
        }

        // Cleanup function reset to default (optional)
        return () => {
            // We can choose to reset or leave it. Usually leaving it is fine as the next component will overwrite it.
        };
    }, [title, description, keywords]);

    return null; // This component changes the Head, doesn't render anything
};

export default SEO;
