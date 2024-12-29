import React, { useState } from 'react';
import { AddIcon, CencalIcon } from '../../assets/images';
import CustomersService from '../../services/customers';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersFail, getCustomersStart, getCustomerSuccess } from '../../slice/customers';
import AddNewCustomer from './addNewCustomer';
import ErrorAlert from '../ui/errorAlert';

const AddCustomers = ({ addCustomerEditor, setAddCustomerEditor, setEditCustomerDataOpen, refreshCustomers }) => {
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const [isExists, setIsExists] = useState(true);
    const { error } = useSelector((state) => state.customers);

    const customerExistsHandler = async() => {
        dispatch(getCustomersStart());
        try {
            const res = await CustomersService.getByPhone(customerPhoneNumber);
            dispatch(getCustomerSuccess(res.data));
            setEditCustomerDataOpen(true);
            setAddCustomerEditor(false);
        } catch (err) {
            if (err.response?.data?.details?.error?.includes('does not exist')) {
                setIsExists(false);
            }
            dispatch(getCustomersFail(err.response.data));
        }
    }
    
	return (
		<div
			className={` ${
				addCustomerEditor ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div className='relative md:rounded font-gilroy transform sm:max-w-[70%] w-[100%] sm:max-h-[700px] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]'>
				<div className='h-[80%] overflow-scroll scrollbar-none md:overflow-hidden md:h-[100%] p-[10px]'>
					<h3 className='text-2xl font-semibold font-gilroy'>
						Mijoz qo'shish
					</h3>
					<div className='grid items-center grid-cols-1 gap-4 mt-[35px] sm:gap-5'>
						<div>
							<label
								htmlFor='customerNumber'
								className='text-[16px] font-normal mb-2'
							>
								Mijoz raqami
							</label>
							<input
                                value={customerPhoneNumber}
                                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
								type='tel'
								autoComplete='off'
								id='customerNumber'
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
							onClick={() => setAddCustomerEditor(false)}
							className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button onClick={customerExistsHandler} className='rounded h-[50px] flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
			<AddNewCustomer isExists={isExists} setIsExists={setIsExists} customerPhoneNumber={customerPhoneNumber} setEditCustomerDataOpen={setEditCustomerDataOpen} setAddCustomerEditor={setAddCustomerEditor} refreshCustomers={refreshCustomers}/>
            {error && <ErrorAlert errorType={'customers'}/>}
		</div>
	);
};

export default AddCustomers;
