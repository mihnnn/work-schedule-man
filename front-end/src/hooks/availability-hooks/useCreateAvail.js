import { useState } from "react";
import toast from 'react-hot-toast';

function useCreateAvail() {
    const [loading, setLoading] = useState(false);

    const createAvail = async ({title} ) => {
        setLoading(true);
        try {
            const res = await fetch('/api/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                }),
            });
            
            if (!res.ok) {
                // Handle non-JSON error response
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const data = await res.json(); 
            toast.success(`Availability ${title} created successfully`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#333',
                }
            });
            return data;
        } catch(error) {
            console.error(error);
            toast.error('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return { createAvail, loading}
}

export default useCreateAvail;