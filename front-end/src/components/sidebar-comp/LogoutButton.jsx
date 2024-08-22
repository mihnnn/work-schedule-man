import { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
// import useLogout from '../../hooks/local-auth-hooks/useLogout'
import { logout } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function LogoutButton() {
  // const { loading, logout } = useLogout();
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true)
    try {
    const res = await fetch("/auth/logout", {
      method: "POST",
    });
    
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      dispatch(logout());
      navigate('/');
      toast.success("Logged out successfully");
    
    }
  } catch (error) {
    
    console.log("error: ", error);
    toast.error(error);

  } finally {
    setLoading(false);
  }
  }

  return (
    //stays at the bottom of the sidebar
    <div
      className='flex p-2 items-center text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl hover:font-bold'
      onClick={handleLogout}
    >

      {!loading ? (
        <>
          <BiLogOut className='w-6 h-6 mr-2 self-end' />
          <span className=''>Logout</span>
        </>
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  )
}

export default LogoutButton
