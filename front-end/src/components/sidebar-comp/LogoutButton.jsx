import { BiLogOut } from 'react-icons/bi'

function LogoutButton() {
  return (
    //stays at the bottom of the sidebar
    <div className='flex p-2 justify-between items-center mt-auto text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl'>
      <p className="font-bold">Logout</p>
      <BiLogOut className="w-6 h-6 self-end" />
    </div>
  )
}

export default LogoutButton
