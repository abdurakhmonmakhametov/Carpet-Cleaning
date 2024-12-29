import React, { useEffect, useState } from 'react'
import { AddIcon, CencalIcon } from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux';
import CustomersService from '../../services/customers';
import { editCustomersFail } from '../../slice/customers';
import ErrorAlert from '../ui/errorAlert';

const EditAddress = ({editAddress, setEditAddress, refreshCustomers}) => {
  const [newAddress, setNewAddress] = useState('');
  const [id, setId] = useState('');
  const { editCustomerData } = useSelector(state => state.customers);
  const { error } = useSelector(state => state.customers);
  const dispatch = useDispatch()
  
  const updateAddress = async() => {
    try {
      const res = await CustomersService.updateAddress(id, newAddress);
      if (refreshCustomers) refreshCustomers();
      setEditAddress(false);
    } catch (err) {
      dispatch(editCustomersFail(err.response.data));
    }
  };
  
  useEffect(() => {
    setNewAddress(editCustomerData?.address);
    setId(editCustomerData?.id);
  }, [editAddress]);
  
  return (
    <div
          className={` ${
            editAddress ? 'fixed' : 'hidden'
          } inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
        >
          <div className={`relative transform md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[300px] w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]`}>
            <div className='flex items-center justify-between'>
              <h3 className='font-normal font-gilroy'>
                Manzilni ozgartirish
              </h3>
            </div>
            <hr className='my-[22px]' />
            <div>
              <label
                htmlFor='editNewLogin'
                className='text-[16px] font-normal mb-2'
              >
                Manzil
              </label>
              <input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
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
                  onClick={() => setEditAddress(false)}
                >
                  <CencalIcon />
                  <p>Bekor qilish</p>
                </button>
                <button  onClick={updateAddress} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
                  <AddIcon />
                  <p>Saqlash</p>
                </button>
              </div>
            </div>
          </div>
          {error && <ErrorAlert errorType={'customers'}/>}
        </div>
  )
}

export default EditAddress