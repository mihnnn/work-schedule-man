import React, { useEffect, useState } from 'react';

// List of time zones
const timeZones = [
  'Pacific/Midway', 'Pacific/Honolulu', 'America/Juneau', 'America/Los_Angeles', 'America/Tijuana',
  'America/Denver', 'America/Phoenix', 'America/Chihuahua', 'America/Mazatlan', 'America/Chicago',
  'America/Regina', 'America/Mexico_City', 'America/Monterrey', 'America/Guatemala', 'America/New_York',
  'America/Indiana/Indianapolis', 'America/Bogota', 'America/Lima', 'America/Halifax', 'America/Caracas',
  'America/La_Paz', 'America/Santiago', 'America/St_Johns', 'America/Sao_Paulo', 'America/Argentina/Buenos_Aires',
  'America/Guyana', 'America/Godthab', 'Atlantic/Azores', 'Atlantic/Cape_Verde', 'Europe/Dublin', 'Europe/Lisbon',
  'Europe/London', 'Africa/Casablanca', 'Africa/Monrovia', 'Etc/UTC', 'Europe/Belgrade', 'Europe/Bratislava',
  'Europe/Budapest', 'Europe/Ljubljana', 'Europe/Prague', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Warsaw',
  'Europe/Zagreb', 'Europe/Brussels', 'Europe/Copenhagen', 'Europe/Madrid', 'Europe/Paris', 'Europe/Amsterdam',
  'Europe/Berlin', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Vienna', 'Africa/Algiers', 'Europe/Bucharest',
  'Africa/Cairo', 'Europe/Helsinki', 'Europe/Kiev', 'Europe/Riga', 'Europe/Sofia', 'Europe/Tallinn', 'Europe/Vilnius',
  'Europe/Athens', 'Europe/Istanbul', 'Europe/Minsk', 'Asia/Jerusalem', 'Africa/Harare', 'Europe/Moscow', 'Asia/Kuwait',
  'Asia/Riyadh', 'Africa/Nairobi', 'Asia/Baghdad', 'Asia/Tehran', 'Asia/Muscat', 'Asia/Baku', 'Asia/Tbilisi',
  'Asia/Yerevan', 'Asia/Kabul', 'Asia/Yekaterinburg', 'Asia/Karachi', 'Asia/Tashkent', 'Asia/Calcutta', 'Asia/Colombo',
  'Asia/Katmandu', 'Asia/Almaty', 'Asia/Dhaka', 'Asia/Novosibirsk', 'Asia/Rangoon', 'Asia/Bangkok', 'Asia/Ho_Chi_Minh', 'Asia/Jakarta',
  'Asia/Krasnoyarsk', 'Asia/Shanghai', 'Asia/Chongqing', 'Asia/Hong_Kong', 'Asia/Urumqi', 'Asia/Kuala_Lumpur',
  'Asia/Singapore', 'Asia/Taipei', 'Australia/Perth', 'Asia/Irkutsk', 'Asia/Ulaanbaatar', 'Asia/Seoul', 'Asia/Tokyo',
  'Asia/Yakutsk', 'Australia/Darwin', 'Australia/Adelaide', 'Australia/Melbourne', 'Australia/Sydney', 'Australia/Brisbane',
  'Australia/Hobart', 'Asia/Vladivostok', 'Pacific/Guam', 'Pacific/Port_Moresby', 'Asia/Magadan', 'Asia/Srednekolymsk',
  'Pacific/Noumea', 'Pacific/Fiji', 'Asia/Kamchatka', 'Pacific/Majuro', 'Pacific/Auckland', 'Pacific/Tongatapu'
];

const TimeZoneDropdown = ( {defaultTz } ) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredTimeZones, setFilteredTimeZones] = useState(timeZones);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTimeZones(timeZones.filter(tz => tz.toLowerCase().includes(value.toLowerCase())));
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }
  const handleTimeZoneSelect = (timeZone) => {
    setInputValue(timeZone);
    setIsOpen(false);
  };

  useEffect(() => {
    if (defaultTz) {
      setInputValue(defaultTz);
    }
  }, [defaultTz]);

  return (
    <div className="relative inline-block text-left w-full">
      <input
        className="focus:ring-0 focus:ring-offset-0 dark:!text-darkgray-900 !text-emphasis w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleDropdownToggle}
        onBlur={handleDropdownBlur}
        placeholder="Select timezone"
      />
      {isOpen && (
        <div className=" border-subtle absolute right-0 mt-2 w-full rounded-md shadow-lg max-h-60 overflow-auto z-10 bg-[#222]">
          <div className="py-1">
            {filteredTimeZones.map((timeZone, index) => (
              <button
                key={index}
                onClick={() => handleTimeZoneSelect(timeZone)}
                className="block px-4 py-2 text-sm text-emphasis hover:bg-gray-400 hover:bg-opacity-30 w-full text-left"
              >
                {timeZone}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeZoneDropdown;
