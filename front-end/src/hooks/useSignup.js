import { useState } from 'react'
import toast from 'react-hot-toast';


const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({email, displayName, username, password, confirmPassword}) => {
        const success = handleInputErrors({email, displayName, username, password, confirmPassword});

        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({email, displayName, username, password, confirmPassword})
            })

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }

}

function handleInputErrors({email, displayName, username, password, confirmPassword}) {
    if (!email || !displayName || !username || !password || !confirmPassword) {
        toast.error('All fields are required');
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false
    }

    return true
}

export default useSignup
