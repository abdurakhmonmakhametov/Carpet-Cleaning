import { useEffect, useState } from "react";
import { AddIcon, CencalIcon } from "../../assets/images"
import { useSelector } from "react-redux";
import CustomersService from "../../services/customers";

const EditFullName = ({editFullName, setEditFullName, refreshCustomers}) => {
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [id, setId] = useState('');
  const { editCustomerData } = useSelector(state => state.customers);

  const updateFullName = async () => {
    try {
        const res = await CustomersService.updateFullName(id, newName, newSurname);
        if (refreshCustomers) refreshCustomers();
        setEditFullName(false);
    } catch (err) {
        console.log(err);
    }
}

  useEffect(() => {
      setNewName(editCustomerData?.name);
      setNewSurname(editCustomerData?.surname);
      setId(editCustomerData?.id);
    }, [editFullName])

  return (
    <div
          className={` ${
            editFullName ? 'fixed' : 'hidden'
          } inset-0 z-[110] bg-black bg-opacity-50 flex items-center justify-center`}
        >
          <div className={`relative transform md:rounded sm:max-w-[47%] md:max-w-[42%] lg:max-w-[27%] xl:max-w-[23%] sm:h-[400px] w-[100%] h-[100%] font-semibold bg-light-background dark:bg-dark-background z-50 shadow-lg p-[20px]`}>
            <div className='flex items-center justify-between'>
              <h3 className='font-normal font-gilroy'>
                Ismni ozgartirish
              </h3>
            </div>
            <hr className='my-[22px]' />
            <div>
              <label
                htmlFor='editName'
                className='text-[16px] font-normal mb-2'
              >
                Ism
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type='text'
                id='editName'
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
            <div>
              <label
                htmlFor='surname'
                className='text-[16px] font-normal mb-2'
              >
                Familiya
              </label>
              <input
                value={newSurname}
                onChange={(e) => setNewSurname(e.target.value)}
                type='text'
                id='surname'
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
            <div className='fixed bottom-[35px] px-[20px] translate-x-[-20px] w-full bg-light-background dark:bg-dark-background'>
              <div className='flex flex-col flex-col-reverse gap-4 sm:flex-row'>
                <button className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
                                onClick={() => setEditFullName(false)}>
                  <CencalIcon />
                  <p>Bekor qilish</p>
                </button>
                <button onClick={updateFullName} className='rounded h-[50px] w-full flex items-center justify-center gap-2 font-gilroy font-normal text-[16px] bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>
                  <AddIcon />
                  <p>Saqlash</p>
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditFullName