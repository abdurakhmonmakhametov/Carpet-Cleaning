import React, { useEffect, useState } from 'react';
import { AddIcon, CencalIcon } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import CustomersService from '../../services/customers';
import { editCustomersFail } from '../../slice/customers';

const EditType = ({ editType, setEditType, refreshCustomers }) => {
	const [newType, setNewType] = useState('');
  const [id, setId] = useState('');
  const { editCustomerData } = useSelector(state => state.customers);
  const dispatch = useDispatch()

  const updateType = async() => {
    try {
      const res = await CustomersService.updateType(id, newType);
      if (refreshCustomers) refreshCustomers();
      setEditType(false);
    } catch (err) {
		dispatch(editCustomersFail(err.response.data));
    }
  };
  
  useEffect(() => {
    if (editCustomerData) {
      setNewType(editCustomerData?.type);
      setId(editCustomerData?.id);
    }
  }, [editType]);

	return (
		<div
			className={` ${
				editType ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div
				className={`relative transform md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[300px] w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]`}
			>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Mijoz turini ozgartirish
					</h3>
				</div>
				<hr className='my-[22px]' />
				<div>
					<label htmlFor='type' className='text-[16px] font-normal'>
						Mijoz Turi
					</label>
					<select
						value={newType}
						onChange={(e) => setNewType(e.target.value)}
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
				<div className='fixed bottom-[35px] px-[20px] translate-x-[-20px] w-full bg-light-background dark:bg-dark-background'>
					<div className='flex flex-col flex-col-reverse gap-4 sm:flex-row'>
						<button
							className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
							onClick={() => setEditType(false)}
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button onClick={updateType} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditType;
