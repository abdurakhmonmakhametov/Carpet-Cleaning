import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddUserIcon, SettingIcon } from "../../assets/images";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, isMobile}) => {
  const [role, setRole] = useState('')
  const location = useLocation();
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    if(user) {
      setRole(user?.role?.role)
    }
    }, [user])

  return (
    <div>
      <div
      className={`${isOpen ? 'w-[250px] p-4' : 'md:w-[70px] w-0'} 
        h-screen fixed flex flex-col
        ${isMobile ? 'fixed z-20' : 'p-2'} dark:bg-dark-primary bg-gray-900
        transition-all duration-300 ease-in-out`}
    >
      
      {role === 'ADMIN' && (
        <div>
          <Link to={'/add-employee'}>
            <button className={`mb-2 h-[50px] w-full flex items-center gap-5 ${isOpen ? "pl-3" : "pl-0 justify-center"} text-dark-textColor sm:hover:bg-gray-500 sm:hover:dark:bg-dark-background rounded ${location.pathname === '/add-employee' ? 'bg-light-primary dark:bg-dark-textColor dark:text-light-textColor' : ''}`}>
              <AddUserIcon />
              {isOpen && <p>Hodim qo'shish</p>}
            </button>
          </Link>
          <Link to={'/settings'}>
            <button className={`mb-2 h-[50px] w-full flex items-center gap-5 ${isOpen ? "pl-3" : "pl-0 justify-center"} text-dark-textColor sm:hover:bg-gray-500 sm:hover:dark:bg-dark-background rounded ${location.pathname === '/settings' ? 'bg-light-primary dark:bg-dark-textColor dark:text-light-textColor' : ''}`}>
              <SettingIcon />
              {isOpen && <p>Sozlamalar</p>}
            </button>
          </Link>
        </div>
      )}
    </div>
      <div
      className={`${isOpen ? 'w-[250px]' : 'md:w-[70px] w-0'} 
        h-screen
        ${isMobile ? 'fixed z-10' : ''} dark:bg-dark-primary bg-gray-900
        transition-all duration-300 ease-in-out`}
    ></div>
    </div>
  );
};

export default Sidebar;
