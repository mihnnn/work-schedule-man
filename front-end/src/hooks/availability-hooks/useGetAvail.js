import {useState, useEffect} from "react";
import toast from 'react-hot-toast';

function useGetAvail() {
    const [loading, setLoading] = useState(false);
    const [avails, setAvails] = useState([]);

    const getAvail = async() => {
        setLoading (true)
        try {
            const res = await fetch("/api/availability");
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setAvails(data.avails);
             
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