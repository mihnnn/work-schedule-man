import { useState } from "react";
import toast from "react-hot-toast";

function useDeleteAvail() {
    const [ loading, setLoading ] = useState(false); 
    const deleteAvail = async (availId, title) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/availability/${availId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            toast.success(`Availability "${title}" deleted successfully`, {
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

        } catch (error) {
            console.error(error);
            toast.error('An error occurred: ' + error.message);

        } finally {
            setLoading(false);
        }
    }
    return { deleteAvail, loading };
}

export default useDeleteAvail;