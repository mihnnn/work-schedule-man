import { LuExternalLink } from "react-icons/lu";
// import { useAuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

function PublicPageButton() {
  // const { authUser: {username} } = useAuthContext();
  const { currentUser: { username } } = useSelector((state) => state.user);
  return (
    //stays at the bottom of the sidebar
    <button
      className='flex p-2 items-center mt-auto cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl hover:font-bold'
      onClick={() => window.open(`http://localhost:3001/${username}`, '_blank')}
    >
          <LuExternalLink className='w-6 h-6 mr-2 self-end' />
          <span className=''>View public page</span>
    </button>
  )
}

export default PublicPageButton
