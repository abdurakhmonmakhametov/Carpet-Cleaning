import { useState } from 'react';
import { AddIcon, CencelIcon } from '../assets/images';
import { useDispatch } from 'react-redux';
import {
	createUserFail,
	createUserStart,
	createUserSuccess,
} from '../slice/allUsers';
import UsersService from '../services/users';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ addEmployeeEditor, setAddEmployeeEditor }) => {
	const [role, setRole] = useState('ADMIN');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(role, name, surname, phoneNumber, login, password);

	const addEmployeeHandler = async (e) => {
		e.preventDefault();
		dispatch(createUserStart());
		const employee = {
			name,
			surname,
			password,
			phoneNumber,
			username: login,
			role: { role },
		};
		try {
			const res = await UsersService.createUser(employee);
			dispatch(createUserSuccess(res.data));
			setAddEmployeeEditor(false);
			navigate('/add-employee');
		} catch (err) {
			dispatch(createUserFail(err.response.data));
		}
	};

	return (
		<div
			className={` ${
				addEmployeeEditor ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded font-gilroy transform sm:max-w-[70%] w-[100%] sm:max-h-[700px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='h-[80%] overflow-scroll scrollbar-none md:overflow-hidden md:h-[100%] p-[10px]'>
				<h3 className='text-2xl font-semibold font-gilroy'>
					Hodim qo'shish
				</h3>
				<div className='grid grid-cols-1 gap-4 mt-[35px] sm:gap-5 sm:grid-cols-2'>
					<form autoComplete='off'>
						<label
							htmlFor='role'
							className='text-[16px] font-normal'
						>
							Lavozimni tanlang
						</label>
						<select
							name='role'
							onChange={(e) => setRole(e.target.value)}
							id='role'
							className='mt-2 flex w-full flex-col rounded h-[50px] dark:bg-dark-input
              pt-[13px]
              px-3
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						>
							<option value='ADMIN'>Admin</option>
							<option value='MANAGER'>Meneger</option>
							<option value='OPERATOR'>Operator</option>
							<option value='DRIVER'>Haydovchi</option>
							<option value='WASHER'>Yuvuchi</option>
							<option value='PACKAGER'>Qadoqlovchi</option>
						</select>
					</form>
					<div>
						<label
							htmlFor='name'
							className='text-[16px] font-normal'
						>
							Ism
						</label>
						<input
							type='text'
							onChange={(e) => setName(e.target.value)}
							id='name'
							className='flex mt-2 flex-col w-full rounded h-[50px] dark:bg-dark-input
              px-3 
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						/>
					</div>
					<div>
						<label
							htmlFor='lastname'
							className='text-[16px] font-normal'
						>
							Familiya
						</label>
						<input
							type='text'
							onChange={(e) => setSurname(e.target.value)}
							id='lastname'
							className='flex mt-2 flex-col w-full h-[50px] rounded
              px-3 
							dark:bg-dark-input 
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						/>
					</div>
					<div>
						<label
							htmlFor='phone'
							className='text-[16px] font-normal'
						>
							Telefon raqam
						</label>
						<input
							type='tel'
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
							id='phone'
							className='flex flex-col mt-2 w-full rounded h-[50px] dark:bg-dark-input
              px-3 
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						/>
					</div>
					<div>
						<label
							htmlFor='login'
							className='text-[16px] font-normal'
						>
							Login
						</label>
						<input
							type='text'
							id='login'
							onChange={(e) => setLogin(e.target.value)}
							className='flex flex-col mt-2 w-full rounded h-[50px] dark:bg-dark-input
              px-3 
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='text-[16px] font-normal mb-2'
						>
							Parol
						</label>
						<input
							type='password'
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='new-password'
							id='password'
							className=' mt-2 mb-[50px] flex flex-col w-full rounded h-[50px] dark:bg-dark-input
              px-3 
							bg-light-input 
							hover:dark:bg-dark-inputHover 
							hover:bg-light-inputHover
							hover:dark:text-light-textColor 
							focus:dark:bg-dark-lightInput 
							focus:outline 
							dark:outline-dark-primary 
							outline-light-primary 							
							focus:dark:text-light-textColor 
							focus:text-light-textColor 
							dark:text-dark-textColor 
     						text-light-textColor'
						/>
					</div>
				</div>
				</div>
				<div className='fixed bottom-[35px] z-50 right-0 w-full px-[30px] pt-[30px] bg-light-background dark:bg-dark-background'>
					<div className='flex flex-col flex-col-reverse justify-end gap-4 sm:flex-row'>
						<button
							onClick={() => setAddEmployeeEditor(false)}
							className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
						>
							<CencelIcon />
							<p>Bekor qilish</p>
						</button>
						<button
							onClick={addEmployeeHandler}
							className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'
						>
							<AddIcon />
							<p>Saqlash</p>
						</button>
				</div>
				</div>
			</div>
		</div>
	);
};

export default AddEmployee;
