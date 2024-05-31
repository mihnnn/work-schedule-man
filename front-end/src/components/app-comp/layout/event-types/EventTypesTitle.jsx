import React from 'react';
import EventCreationModal from './EventCreationModal';
import { useAuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function EventTypesHeader() {
    const { authUser: { username } } = useAuthContext();
    const navigate = useNavigate();


    const handleOpenModal = () => {
        if (document.querySelector('#my_modal_3')) {
            navigate('/app/event-types?dialog=new&eventPage=' + username);
        } else {
            navigate('/app/event-types?dialog=new&eventPage=' + username, { state: { modal: true } });
        }
    };

    return (
        <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
            <header className='flex w-full max-w-full items-center truncate'>
                <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
                    <h3 className='text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden'>
                        Event Types
                    </h3>
                    <p className='text-gray-100 hidden text-sm md:block'>
                        Create events to share for people to book on your calendar.
                    </p>
                </div>

                <div className='fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto'>
                    <button
                        className='btn btn-outline bg-white text-black'
                        onClick={handleOpenModal}>
                        + {" "} New
                    </button>
                    <EventCreationModal />
                </div>
            </header>
        </div>
    );
}

export default EventTypesHeader;
