import { useSelector } from "react-redux";
import { AddIcon, CencalIcon } from "../../assets/images"
import { useEffect, useState } from "react";
import UsersService from "../../services/users";

const EditRole = ({ editRole, setEditRole, refreshUsers }) => {
  const { editUserData } = useSelector(state => state.users)
  const [id, setId] = useState(editUserData.id);
  const [newRole, setNewRole] = useState(editUserData?.role?.role);

  useEffect(() => {
      setNewRole(editUserData?.role?.role);
      setId(editUserData.id);
    }, [editRole])

  const updateRole = async () => {
    try {
      const res = await UsersService.updateRole(id, newRole);
      refreshUsers();
      setEditRole(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
		<div
			className={` ${
				editRole ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded transform sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] w-[100%] sm:h-[300px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Lavozimni ozgartirish
					</h3>
				</div>
				<hr className='my-[22px]' />
				<div>
					<label
						htmlFor='editRole'
						className='text-[16px] font-normal mb-2'
					>
						Lavozim
					</label>
					<select
						name='role'
            value={newRole}
						onChange={(e) => setNewRole(e.target.value)}
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
				</div>
				<div className='fixed bottom-[35px] px-[20px] translate-x-[-20px] w-full bg-light-background dark:bg-dark-background'>
					<div className='flex flex-col flex-col-reverse gap-4 sm:flex-row'>
						<button
							className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
							onClick={() => setEditRole(false)}
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button
							onClick={updateRole}
							className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'
						>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
		</div>
  );
}

export default EditRole