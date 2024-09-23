import { set } from "mongoose";
import { useState } from "react";
import toast from 'react-hot-toast';

function useGetAvailById() {
    const [loading, setLoading ] = useState(false);
    const [availData, setAvailData] = useState(null);

    const getAvailById = async (availId) => {
        setLoading (true);
        try {
            const res = await(fetch(`/api/availability/${availId}`));
            const data = await res.json();
            console.log(data)
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            setAvailData(data);
            
        } catch (error) {
            console.error(error);
            toast.error("An error occurred: " + error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, availData, getAvailById};
}

export default useGetAvailById;