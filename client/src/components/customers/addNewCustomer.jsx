import { useEffect, useState } from 'react'
import { AddIcon, CencalIcon } from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerFail, createCustomerStart, createCustomerSuccess } from '../../slice/customers';
import CustomersService from '../../services/customers';
import ErrorAlert from '../ui/errorAlert';
import EditCustomer from './editCustomer';

const AddNewCustomer = ({ isExists, setIsExists, customerPhoneNumber, setEditCustomerDataOpen, setAddCustomerEditor }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(customerPhoneNumber);
    const [extraPhoneNumber, setExtraPhoneNumber] = useState('');
    const [language, setLanguage] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.customers);

    const addNewCustomerHandler = async (e) => {
        e.preventDefault(createCustomerStart());
        const customers = {
            name,
            surname,
            phoneNumber,
            ...(extraPhoneNumber ? { extraPhoneNumber } : {}),
            language,
            type,
            address,
            notes
        }
        try {
            const res = await CustomersService.createCustomer(customers)
            dispatch(createCustomerSuccess(res.data));
            setIsExists(true);
            setEditCustomerDataOpen(true);
			setAddCustomerEditor(false);
        } catch (err) {
            dispatch(createCustomerFail(err.response.data));
        }
    }

    useEffect(() => {
        setPhoneNumber(customerPhoneNumber);
    }, [customerPhoneNumber]);

  return (
		<div
			className={` ${
				!isExists ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded font-gilroy transform sm:max-w-[70%] w-[100%] sm:max-h-[700px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='h-[80%] overflow-scroll scrollbar-none md:overflow-hidden md:h-[100%] p-[10px]'>
					<h3 className='text-2xl font-semibold font-gilroy'>
						Hodim qo'shish
					</h3>
					<div className='grid grid-cols-1 gap-4 mt-[35px] sm:gap-5 sm:grid-cols-2'>
						<div>
							<label
								htmlFor='name'
								className='text-[16px] font-normal'
							>
								Ism
							</label>
							<input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
								type='text'
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
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
								type='text'
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
								value={phoneNumber}
								onChange={(e) =>
									setPhoneNumber(e.target.value)
								}
								type='tel'
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
								htmlFor='phone'
								className='text-[16px] font-normal'
							>
								Qoshimcha Telefon raqam
							</label>
							<input
                                value={extraPhoneNumber}
                                onChange={(e) => setExtraPhoneNumber(e.target.value)}
								type='tel'
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
								htmlFor='language'
								className='text-[16px] font-normal'
							>
								Mijoz so`zlashuv tili
							</label>
							<select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
								id='language'
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
								<option value=''></option>
								<option value='UZ'>Uz</option>
								<option value='RU'>Ru</option>
								<option value='EN'>En</option>
							</select>
						</div>
						<div>
							<label
								htmlFor='type'
								className='text-[16px] font-normal'
							>
								Mijoz Turi
							</label>
							<select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
								id='type'
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
								<option value=''></option>
								<option value='COST'>Narx</option>
								<option value='PREMIUM'>Premium</option>
								<option value='QUALITY'>Sifat</option>
								<option value='BLOCK'>Qora Ro'yxat</option>
							</select>
						</div>
						<div>
							<label
								htmlFor='address'
								className='text-[16px] font-normal mb-2'
							>
								Manzil
							</label>
							<input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
								type='text'
								id='address'
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
								htmlFor='notes'
								className='text-[16px] font-normal'
							>
								Mijoz izohi
							</label>
							<input
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
								type='text'
								id='notes'
								className='flex flex-col mb-[50px] mt-2 w-full rounded h-[50px] dark:bg-dark-input
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
							onClick={() => setIsExists(true)}
							className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button onClick={addNewCustomerHandler} className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
            {error && <ErrorAlert errorType={'customers'}/>}
		</div>
  );
}

export default AddNewCustomer