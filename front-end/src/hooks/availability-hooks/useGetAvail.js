import {useState, useEffect} from "react";
import toast from 'react-hot-toast';

function useGetAvail() {
    const [loading, setLoading] = useState(false);
    const [avails, setAvails] = useState([]);

    const getAvail = async() => {
        setLoading (true)
        try {
            const res = await fetch("/api/availability");
            
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (Array.isArray(data.avails)) {
                setAvails(data.avails);
            } else {
                throw new Error("Data format error: expected an array of avails");
            }
             
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAvail();
    }, []);

    // may not need this, because after create avail,
    // immediately go to edit avail page
    // const refetchAvail = async() => {
    //     console.log("Refetching availability");
    //     await getAvail();
    // };

    return { loading, avails };
}

export default useGetAvail;