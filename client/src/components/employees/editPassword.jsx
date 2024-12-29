import { useDispatch, useSelector } from 'react-redux';
import { AddIcon, CencalIcon } from '../../assets/images';
import { useEffect, useState } from 'react';
import UsersService from '../../services/users';
import { ErrorAlert } from '../';
import { editUserFail } from '../../slice/allUsers';
const EditPassword = ({ editPassword, setEditPassword, refreshUsers = null, isOpen = false }) => {
  const { editUserData } = useSelector(state => state.users)
  const [id, setId] = useState(editUserData?.id);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { error } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
      setId(editUserData?.id);
    }, [editPassword])

  const updatePassword = async () => {
    try {
      const res = await UsersService.updatePassword(id, oldPassword, newPassword);
      if (refreshUsers) refreshUsers();
      setEditPassword(false);
    } catch (err) {
		dispatch(editUserFail(err.response.data));
    }
  }


  
	return (
		<div
			className={` ${
				editPassword ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className={`relative ${!isOpen ? 'md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[400px]' : ''} transform w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px] text-light-texxColor dark:text-dark-textColor`}>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Parolni ozgartirish
					</h3>
				</div>
				<hr className='my-[22px]' />
				<div>
					<label
						htmlFor='editOldPassword'
						className='text-[16px] font-normal mb-2'
					>
						Eski Parol
					</label>
					<input
            onChange={(e) => setOldPassword(e.target.value)}
						type='text'
						id='editOldPassword'
						className=' mt-2 mb-3 flex flex-col w-full rounded h-[50px] dark:bg-dark-input
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
						htmlFor='editNewPassword'
						className='text-[16px] font-normal mb-2'
					>
						Yangi Parol
					</label>
					<input
            onChange={(e) => setNewPassword(e.target.value)}
						type='text'
						id='editNewPassword'
						className=' mt-2 mb-3 flex flex-col w-full rounded h-[50px] dark:bg-dark-input
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
				<div className='fixed bottom-[35px] px-[20px] translate-x-[-20px] w-full bg-light-background dark:bg-dark-background'>
					<div className='flex flex-col flex-col-reverse gap-4 sm:flex-row'>
						<button
							className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
							onClick={() => setEditPassword(false)}
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button onClick={updatePassword} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
			{error && <ErrorAlert errorType={'users'}/>}
		</div>
	);
};

export default EditPassword;
