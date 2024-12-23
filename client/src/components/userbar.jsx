import { useNavigate } from "react-router-dom";
import { RightCloseIcon, DarkInIcon, LightInIcon, ProfileCircleIcon, Logout, CallIcon } from "../assets/images"
import { logoutUser } from "../slice/auth";
import { useDispatch, useSelector } from "react-redux";

const UserBar = ({isDark, darkMode, closeHandler, isOpen}) => {
	const {user} = useSelector(state => state.auth)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const logoutHandler = () => {
		navigate('/');
		dispatch(logoutUser());
	};
	return (
		<div
			className={`absolute transform transition-transform duration-300 top-0 right-0 z-50 w-full h-screen max-w-[400px] dark:bg-dark-primary bg-white shadow-leftLightShadow dark:shadow-leftDarkShadow p-5 ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className='flex items-center justify-between'>
				<button onClick={darkMode}>
					{isDark ? (
						<LightInIcon className='dark:text-dark-iconColor' />
					) : (
						<DarkInIcon />
					)}
				</button>
				<button onClick={closeHandler}>
					<RightCloseIcon className='text-light-primary dark:text-white' />
				</button>
			</div>
			<hr className='my-[22px]' />
			<div className='flex flex-col gap-[25px] sm:gap-[20px]'>
				<button className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
					<div className='flex flex-row gap-4 '>
						<ProfileCircleIcon />
						<p>Ism va familiya</p>
					</div>
					<p className='opacity-50'>
						{user?.name} {user?.surname}
					</p>
				</button>
				<button className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
					<div className='flex flex-row gap-4 '>
						<CallIcon />
						<p>Telefon raqam</p>
					</div>
					<p className='opacity-40'>{user?.phoneNumber}</p>
				</button>
				<button
					onClick={logoutHandler}
					className='flex flex-row items-center gap-4 font-normal text-red-500 dark:text-red-700 font-gilroy'
				>
					<Logout />
					<p>Chiqish</p>
				</button>
			</div>
		</div>
	);
}

export default UserBar