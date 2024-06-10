import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/auth-hooks/useLogout'

function LogoutButton() {
  const { loading, logout } = useLogout();

  return (
    //stays at the bottom of the sidebar
    <div
      className='flex p-2 items-center text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl hover:font-bold'
      onClick={logout}
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
