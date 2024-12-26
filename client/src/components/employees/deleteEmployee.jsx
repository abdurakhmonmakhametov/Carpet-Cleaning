import { BlockUserIcon, CencalIcon } from "../../assets/images";
import { useDispatch } from "react-redux";
import {
	createUserFail,
	createUserStart,
	createUserSuccess,
} from "../../slice/allUsers";
import UsersService from "../../services/users";

const DeleteEmployee = ({deleteEmployerEditor, setDeleteEmployerEditor, id, name, surname, role, refreshUsers}) => {
	const dispatch = useDispatch();
	const deleteEmployer = async() => {
		dispatch(createUserStart());
		try {
			await UsersService.deleteUser(id);
			dispatch(createUserSuccess(id));
			setDeleteEmployerEditor(false);
			refreshUsers();
		} catch (err) {
			dispatch(createUserFail(err.response.data));
		}
	}	

  return (
		<div className={`${deleteEmployerEditor ? 'fixed' : 'hidden'} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}>
			<div className='relative rounded font-gilroy transform w-[80%] flex justify-between flex-col sm:w-[35%] h-[300px] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className="flex flex-col items-center justify-center h-full">
					<h3 className="text-[25px]">{`${role}`}</h3>
					<p className="text-[30px]">{`${name} ${surname}`}</p>
				</div>
				<div className='flex flex-col flex-col-reverse justify-center gap-4 md:flex-row'>
					<button onClick={() => setDeleteEmployerEditor(false)}
						className='rounded h-[50px] flex items-center w-full justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-500 dark:bg-light-background text-dark-textColor dark:text-light-textColor px-4'
					>
						<CencalIcon />
						<p>Bekor qilish</p>
					</button>
					<button onClick={deleteEmployer}
						className='rounded h-[50px] flex items-center w-full justify-center gap-2 font-gilroy font-normal text-[16px] bg-red-500 dark:bg-red-700 text-dark-textColor dark:text-light-textColor px-4'
					>
						<BlockUserIcon />
						<p>Ochirish</p>
					</button>
				</div>
			</div>
		</div>
  );
}

export default DeleteEmployee