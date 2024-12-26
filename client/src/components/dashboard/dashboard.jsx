import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserFail, getUserStart, getUserSuccess } from '../../slice/auth'
import AuthService from '../../services/auth'
import { Navbar } from '..'
import { Sidebar } from '..'

const Dashboard = ({darkMode, isDark}) => {
  const {loggedIn} = useSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sideBarHandler = () => setIsOpen((prev) => !prev);

  const userEnter = async () => {
		dispatch(getUserStart());
		try {
			const res = await AuthService.getCurrentUser();
			dispatch(getUserSuccess(res));
		} catch (err) {
			dispatch(getUserFail(err.response.data.message));
		}
  };

  useEffect(() => {
    if(loggedIn) {
      userEnter()
    }
  }, [loggedIn])

  useEffect(() => {
    if(!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])

  return (
		<div className=''>
			<Navbar
				isOpen={isOpen}
				sideBarHandler={sideBarHandler}
				darkMode={darkMode}
				isDark={isDark}
			/>
			<div className='min-h-screen flex mt-[65px] relative'>
				<Sidebar isOpen={isOpen} isMobile={isMobile}/>
				<div className='w-full h-full p-5 font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
					<Outlet />
				</div>
			</div>
		</div>
  );

}

export default Dashboard
