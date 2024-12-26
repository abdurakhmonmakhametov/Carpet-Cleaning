import { useEffect, useState } from 'react';
import { AddIcon, CencalIcon } from '../../assets/images';
import { useSelector } from 'react-redux';
import UsersService from '../../services/users';

const EditLogin = ({ editLogin, setEditLogin, refreshUsers = null, isOpen = false }) => {
  const { editUserData } = useSelector(state => state.users)
  const [id, setId] = useState(editUserData?.id);
  const [newLogin, setNewLogin] = useState(editUserData?.username);

  useEffect(() => {
      setNewLogin(editUserData?.username);
      setId(editUserData?.id);
    }, [editLogin])

  const updateLogin = async () => {
    try {
      const res = await UsersService.updateUsername(id, newLogin);
      if (refreshUsers) refreshUsers();
      setEditLogin(false);
    } catch (err) {
      console.log(err);
    }
  }
  
	return (
		<div
			className={` ${
				editLogin ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className={`relative transform ${!isOpen ? 'md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[300px]' : ''} w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]`}>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Loginni ozgartirish
					</h3>
				</div>
				<hr className='my-[22px]' />
				<div>
					<label
						htmlFor='editNewLogin'
						className='text-[16px] font-normal mb-2'
					>
						Login
					</label>
					<input
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
						type='text'
						id='editNewLogin'
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
							onClick={() => setEditLogin(false)}
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button  onClick={updateLogin} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditLogin;
