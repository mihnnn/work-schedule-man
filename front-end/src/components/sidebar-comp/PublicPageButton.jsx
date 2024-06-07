import { LuExternalLink } from "react-icons/lu";

function PublicPageButton() {
  return (
    //stays at the bottom of the sidebar
    <div
      className='flex p-2 items-center mt-auto text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl'
    >
        <div>
          <LuExternalLink className='w-6 h-6 mr-2 self-end' />
          <span className='font-bold'>View public page</span>
        </div>
    </div>
  )
}

export default PublicPageButton
