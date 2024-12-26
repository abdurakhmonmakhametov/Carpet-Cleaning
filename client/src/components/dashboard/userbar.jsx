import { useNavigate } from "react-router-dom";
import { RightCloseIcon, DarkInIcon, LightInIcon, ProfileCircleIcon, CallIcon, LogoutIcon, PasswordIcon, LoginIcon, RoleIcon } from "../../assets/images";
import { getUserFail, getUserStart, getUserSuccess, logoutUser } from "../../slice/auth";
import { useDispatch, useSelector } from "react-redux";
import EditFullName from "../employees/editFullName";
import EditLogin from "../employees/editLogin";
import EditPassword from "../employees/editPassword";
import EditPhoneNumber from "../employees/editPhoneNumber";
import { useEffect, useState } from "react";
import { editUser } from "../../slice/allUsers";
import AuthService from "../../services/auth";

const UserBar = ({isDark, darkMode, closeHandler, isOpen}) => {
	const [editFullName, setEditFullName] = useState(false);
	const [editLogin, setEditLogin] = useState(false);
	const [editPassword, setEditPassword] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user} = useSelector(state => state.auth)
	if(isOpen){
		dispatch(editUser(user));
	}

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
	if(isOpen){
		userEnter();
	}
  }, [editFullName, editLogin, editPassword, editPhoneNumber]);

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
				
				<button onClick={() => setEditFullName(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
					<div className='flex flex-row gap-4 '>
						<ProfileCircleIcon />
						<p>Ism va familiya</p>
					</div>
					<p className='opacity-50'>
						{user?.name} {user?.surname}
					</p>
				</button>
				<button onClick={() => setEditPhoneNumber(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
					<div className='flex flex-row gap-4 '>
						<CallIcon />
						<p>Telefon raqam</p>
					</div>
					<p className='opacity-40'>{user?.phoneNumber}</p>
				</button>


					<button onClick={() => setEditLogin(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<LoginIcon />
							<p>Login</p>
						</div>
						<p className='opacity-40'>{user?.username}</p>
					</button>
					<button onClick={() => setEditPassword(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<PasswordIcon />
							<p>Parol</p>
						</div>
						<p className='opacity-40'>********</p>
					</button>


				<button
					onClick={logoutHandler}
					className='flex flex-row items-center gap-4 font-normal text-red-500 dark:text-red-700 font-gilroy'
				>
					<LogoutIcon />
					<p>Chiqish</p>
				</button>
			</div>
			<EditFullName
				editFullName={editFullName}
				setEditFullName={setEditFullName}
				isOpen={isOpen}
			/>
			<EditLogin
				editLogin={editLogin}
				setEditLogin={setEditLogin}
				isOpen={isOpen}
			/>
			<EditPassword
				editPassword={editPassword}
				setEditPassword={setEditPassword}
				isOpen={isOpen}
			/>
			<EditPhoneNumber
				editPhoneNumber={editPhoneNumber}
				setEditPhoneNumber={setEditPhoneNumber}
				isOpen={isOpen}
			/>
		</div>
	);
}

export default UserBar
