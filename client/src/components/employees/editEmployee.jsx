import { useEffect, useState } from 'react';
import {
	BlockUserIcon,
	CallIcon,
	LoginIcon,
	PasswordIcon,
	ProfileCircleIcon,
	RightCloseIcon,
	RoleIcon,
} from '../../assets/images';
import {
	DeleteEmployee,
	EditFullName,
	EditLogin,
	EditPassword,
	EditPhoneNumber,
	EditRole,
} from '../';
import UsersService from '../../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../slice/allUsers';

const EditEmployee = ({
	editEmployeeEditor,
	setEditEmployeeEditor,
	id,
	refreshUsers,
}) => {
	const [editFullName, setEditFullName] = useState(false);
	const [editLogin, setEditLogin] = useState(false);
	const [editPassword, setEditPassword] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);
	const [editRole, setEditRole] = useState(false);
	const [deleteEmployerEditor, setDeleteEmployerEditor] = useState(false)

	const dispatch = useDispatch();

	const editUserHandler = async () => {
		try {
			if (editEmployeeEditor) {
				const res = await UsersService.getEditUser(id);
				dispatch(editUser(res.data));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const { editUserData } = useSelector((state) => state.users);

	useEffect(() => {
		editUserHandler();
	}, [
		editEmployeeEditor,
		editFullName,
		editPassword,
		editPhoneNumber,
		editRole,
		editLogin,
		deleteEmployerEditor,
	]);

	return (
		<div
			className={` ${
				editEmployeeEditor ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded transform sm:max-w-[50%] md:max-w-[45%] lg:max-w-[30%] xl:max-w-[25%] w-[100%] sm:max-h-[700px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Hodimni tahrirlash
					</h3>
					<button onClick={() => setEditEmployeeEditor(false)}>
						<RightCloseIcon className='text-light-primary dark:text-white' />
					</button>
				</div>
				<hr className='my-[22px]' />
				<div className='flex flex-col gap-[25px] sm:gap-[20px]'>
					<button
						onClick={() => setEditFullName(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<ProfileCircleIcon />
							<p>Ism va familiya</p>
						</div>
						<p className='opacity-50'>
							{editUserData?.name} {editUserData?.surname}
						</p>
					</button>
					<button
						onClick={() => setEditRole(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<RoleIcon />
							<p>Lavozim</p>
						</div>
						<p className='opacity-40'>{editUserData?.role?.role}</p>
					</button>
					<button
						onClick={() => setEditPhoneNumber(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<CallIcon />
							<p>Telefon raqam</p>
						</div>
						<p className='opacity-40'>
							{editUserData?.phoneNumber}
						</p>
					</button>
					<button
						onClick={() => setEditLogin(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<LoginIcon />
							<p>Login</p>
						</div>
						<p className='opacity-40'>{editUserData?.username}</p>
					</button>
					<button
						onClick={() => setEditPassword(true)}
						className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'
					>
						<div className='flex flex-row gap-4 '>
							<PasswordIcon />
							<p>Parol</p>
						</div>
						<p className='opacity-40'>********</p>
					</button>
					<button onClick={() => setDeleteEmployerEditor(true)} className='flex flex-row items-center gap-4 font-normal text-red-500 dark:text-red-700 font-gilroy'>
						<BlockUserIcon />
						<p>Hodimni ochirish</p>
					</button>
				</div>
			</div>
			<EditFullName
				editFullName={editFullName}
				setEditFullName={setEditFullName}
				refreshUsers={refreshUsers}
			/>
			<EditRole
				editRole={editRole}
				setEditRole={setEditRole}
				refreshUsers={refreshUsers}
			/>
			<EditLogin
				editLogin={editLogin}
				setEditLogin={setEditLogin}
				refreshUsers={refreshUsers}
			/>
			<EditPassword
				editPassword={editPassword}
				setEditPassword={setEditPassword}
				refreshUsers={refreshUsers}
			/>
			<EditPhoneNumber
				editPhoneNumber={editPhoneNumber}
				setEditPhoneNumber={setEditPhoneNumber}
				refreshUsers={refreshUsers}
			/>
			<DeleteEmployee
				deleteEmployerEditor={deleteEmployerEditor}
				setDeleteEmployerEditor={setDeleteEmployerEditor}
				refreshUsers={refreshUsers}
				setEditEmployeeEditor={setEditEmployeeEditor}
			/>
		</div>
	);
};

export default EditEmployee;
