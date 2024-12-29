import { useDispatch, useSelector } from "react-redux";
import { BlockUserIcon, CallIcon, LanguageIcon, LocationIcon, NotesIcon, ProfileCircleIcon, RightCloseIcon, TypeIcon } from "../../assets/images";
import { useEffect, useState } from "react";
import { DeleteCustomers, EditAddressCustomer, EditFullNameCustomer, EditLanguageCustomer, EditNotesCustomer, EditPhoneNumberCustomer, EditTypeCustomer, ErrorAlert } from "..";
import CustomersService from "../../services/customers";
import { editCustomersFail, getCustomerSuccess } from "../../slice/customers";

const EditCustomer = ({ editCustomerDataOpen, setEditCustomerDataOpen, refreshCustomers, customerId }) => {
    const { editCustomerData } = useSelector(state => state.customers)
	const [editFullName, setEditFullName] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);	
	const [editType, setEditType] = useState(false);
	const [editLanguage, setEditLanguage] = useState(false);
	const [editAddress, setEditAddress] = useState(false);
	const [editNotes, setEditNotes] = useState(false);
	const [deleteCustomerEditor, setDeleteCustomerEditor] = useState(false);
	const dispatch = useDispatch();
	const { error } = useSelector(state => state.customers)

	const editCustomerHandler = async() => {
		try {
			if (editCustomerDataOpen) {
				const res = await CustomersService.getById(editCustomerData?.id || customerId);
				dispatch(getCustomerSuccess(res?.data));
			}
		} catch (err) {
			dispatch(editCustomersFail(err?.response?.data));
		}
	};

	useEffect(() => {
		editCustomerHandler();
	}, [editCustomerDataOpen,
		editFullName,
		editPhoneNumber,
		editType,
		editLanguage,
		editAddress,
		editNotes,
		deleteCustomerEditor
	]);

	return (
		<div
			className={` ${
				editCustomerDataOpen ? 'fixed' : 'hidden'
			} inset-0 z-[120] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded transform sm:max-w-[50%] md:max-w-[45%] lg:max-w-[30%] xl:max-w-[25%] w-[100%] sm:max-h-[700px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Mijozni tahrirlash
					</h3>
					<button onClick={() => setEditCustomerDataOpen(false)}>
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
							{editCustomerData?.name} {editCustomerData?.surname}
						</p>
					</button>
					<button onClick={() => setEditLanguage(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
						<div className='flex flex-row gap-4 '>
							<LanguageIcon />
							<p>Mijoz so`zlashuv tili</p>
						</div>
						<p className='opacity-40'>{editCustomerData?.language}</p>
					</button>
					<button onClick={() => setEditType(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
						<div className='flex flex-row gap-4 '>
							<TypeIcon />
							<p>Mijoz Turi</p>
						</div>
						<p className='opacity-40'>{editCustomerData?.type}</p>
					</button>
					<button onClick={() => setEditPhoneNumber(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
						<div className='flex flex-row gap-4 '>
							<CallIcon />
							<p>Telefon raqam</p>
						</div>
						<div className='flex flex-col opacity-40'>
							<p>{editCustomerData?.phoneNumber}</p>
							<p>{editCustomerData?.extraPhoneNumber && (editCustomerData?.extraPhoneNumber)}</p>
						</div>
					</button>
					<button onClick={() => setEditAddress(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
						<div className='flex flex-row gap-4 '>
							<LocationIcon />
							<p>Manzil</p>
						</div>
						<p className='opacity-40'>{editCustomerData?.address}</p>
					</button>
					<button onClick={() => setEditNotes(true)} className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
						<div className='flex flex-row gap-4 '>
							<NotesIcon />
							<p>Mijoz izohi</p>
						</div>
						<p className='opacity-40'>{editCustomerData?.notes}</p>
					</button>
					<button onClick={() => setDeleteCustomerEditor(true)} className='flex flex-row items-center gap-4 font-normal text-red-500 dark:text-red-700 font-gilroy'>
						<BlockUserIcon />
						<p>Mijozni ochirish</p>
					</button>
				</div>
				
			</div>
			<EditFullNameCustomer
				editFullName={editFullName}
				setEditFullName={setEditFullName}
				refreshCustomers={refreshCustomers}
			/>
			<EditPhoneNumberCustomer
				editPhoneNumber={editPhoneNumber}
				setEditPhoneNumber={setEditPhoneNumber}
				refreshCustomers={refreshCustomers}
			/>
			<EditTypeCustomer
				editType={editType}
				setEditType={setEditType}
				refreshCustomers={refreshCustomers}
			/>
			<EditLanguageCustomer
				editLanguage={editLanguage}
				setEditLanguage={setEditLanguage}
				refreshCustomers={refreshCustomers}
			/>
			<EditAddressCustomer
				editAddress={editAddress}
				setEditAddress={setEditAddress}
				refreshCustomers={refreshCustomers}
			/>
			<EditNotesCustomer
				editNotes={editNotes}
				setEditNotes={setEditNotes}
				refreshCustomers={refreshCustomers}
			/>
			<DeleteCustomers 
				deleteCustomerEditor={deleteCustomerEditor}
				setDeleteCustomerEditor={setDeleteCustomerEditor}
				refreshCustomers={refreshCustomers}
				setEditCustomerDataOpen={setEditCustomerDataOpen}
			/>
			{error && <ErrorAlert errorType={'customers'}/>}
		</div>
	);
};

export default EditCustomer;
