import { BlockUserIcon, CencalIcon } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import CustomersService from "../../services/customers";
import { createCustomerFail, createCustomerStart, createCustomerSuccess } from "../../slice/customers";

const DeleteCustomers = ({deleteCustomerEditor, setDeleteCustomerEditor, refreshCustomers, setEditCustomerDataOpen}) => {
	const { editCustomerData } = useSelector(state => state.customers)
	
	const dispatch = useDispatch();
	const deleteCustomer = async() => {
		dispatch(createCustomerStart());
		try {
			await CustomersService.deleteCustomer(editCustomerData?.id);
			dispatch(createCustomerSuccess(editCustomerData?.id));
			setDeleteCustomerEditor(false);
			setEditCustomerDataOpen(false);
			refreshCustomers();
		} catch (err) {
			dispatch(createCustomerFail(err?.response?.data));
		}
	}	
  return (
		<div className={`${deleteCustomerEditor ? 'fixed' : 'hidden'} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}>
			<div className='relative rounded font-gilroy transform w-[80%] flex justify-between flex-col sm:w-[35%] h-[300px] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className="flex flex-col items-center justify-center h-full">
					<p className="text-[30px]">{`${editCustomerData?.name} ${editCustomerData?.surname}`}</p>
				</div>
				<div className='flex flex-col flex-col-reverse justify-center gap-4 md:flex-row'>
					<button onClick={() => setDeleteCustomerEditor(false)}
						className='rounded h-[50px] flex items-center w-full justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-500 dark:bg-light-background text-dark-textColor dark:text-light-textColor px-4'
					>
						<CencalIcon />
						<p>Bekor qilish</p>
					</button>
					<button onClick={deleteCustomer}
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

export default DeleteCustomers