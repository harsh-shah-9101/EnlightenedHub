import { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 animate-slide-up px-6 py-3 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        } text-white`}>
            {message}
        </div>
    );
}