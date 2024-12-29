import React, { useEffect, useState } from 'react';
import { AddIcon, CencalIcon } from '../../assets/images';
import CustomersService from '../../services/customers';
import { useSelector } from 'react-redux';

const EditLanguage = ({ editLanguage, setEditLanguage, refreshCustomers }) => {
	const [newLanguage, setNewLangauge] = useState('');
  const [id, setId] = useState('');
  const { editCustomerData } = useSelector(state => state.customers);

  const updateLanguage = async() => {
    try {
      const res = await CustomersService.updateLanguage(id, newLanguage);
      if (refreshCustomers) refreshCustomers();
      setEditLanguage(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      setNewLangauge(editCustomerData?.language);
      setId(editCustomerData?.id);
  }, [editLanguage]);
  
	return (
		<div
			className={` ${
				editLanguage ? 'fixed' : 'hidden'
			} inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
		>
			<div
				className={`relative transform md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[300px] w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]`}
			>
				<div className='flex items-center justify-between'>
					<h3 className='font-normal font-gilroy'>
						Tilni ozgartirish
					</h3>
				</div>
				<hr className='my-[22px]' />
				<div>
					<label
						htmlFor='language'
						className='text-[16px] font-normal'
					>
						Mijoz so`zlashuv tili
					</label>
					<select
						value={newLanguage}
						onChange={(e) => setNewLangauge(e.target.value)}
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
				<div className='fixed bottom-[35px] px-[20px] translate-x-[-20px] w-full bg-light-background dark:bg-dark-background'>
					<div className='flex flex-col flex-col-reverse gap-4 sm:flex-row'>
						<button
							className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
							onClick={() => setEditLanguage(false)}
						>
							<CencalIcon />
							<p>Bekor qilish</p>
						</button>
						<button onClick={updateLanguage} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
							<AddIcon />
							<p>Saqlash</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditLanguage;
