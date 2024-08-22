import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase"
import { loginFail, loginSuccess } from "../../../store/user/userSlice";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function GoogleOAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(app);
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const googleResponse = await signInWithPopup(auth, provider)
            console.log(googleResponse);
            const res = await fetch("/auth/google", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: googleResponse.user.displayName,
                    email: googleResponse.user.email,
                    googlePhotoURL: googleResponse.user.photoURL,
                })
            })
            const data = await res.json();

            if (!data.error) {
                dispatch(loginSuccess(data));
                navigate('/');
                toast.success("Logged in successfully with Google");
            } else {
                dispatchEvent(loginFail(data.error));
            }
        } catch (error) {
            
        }
    }
    return (
        <button 
            className="btn btn-outline bg-[#222] w-[48%]"
            onClick={handleGoogleClick}
        >
            <span className="fab fa-google mr-2"></span>
            Google
        </button>
    )
}

export default GoogleOAuth;