import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomersStart, getCustomersFail, getCustomersSuccess } from '../../slice/customers'
import CustomersService from '../../services/customers'
import Loader from '../ui/loader'
import { EditUserIcon } from '../../assets/images'
import AddCustomers from './addCustomer'
import EditCustomer from './editCustomer'

const Customers = () => {
  const [addCustomerEditor, setAddCustomerEditor] = useState(false)
  const [editCustomerDataOpen, setEditCustomerDataOpen] = useState(false);
  const {customers, isLoading} = useSelector(state => state.customers)
  const dispatch = useDispatch()
  const getCustomersHandler = async() => {
    dispatch(getCustomersStart());
    try {
      const res = await CustomersService.getCustomers();
      dispatch(getCustomersSuccess(res.data))
    } catch (err) {
      dispatch(getCustomersFail())
    }
  }

  useEffect(() => {
    getCustomersHandler();
  }, [])

  return (
    <div>
			<div className='flex flex-wrap justify-between'>
				<h2 className='text-2xl font-semibold font-gilroy'>
					Mijozlar
				</h2>
				<div className='flex justify-center gap-4 addEmployeeBtn'>
					<button onClick={() => setAddCustomerEditor(true)}
						className='rounded h-[50px] w-full font-gilroy font-medium bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
					>
						Mijoz qoshish
					</button>
				</div>
			</div>
			<div>
				{!customers || isLoading ? (
					<div className='pb-5 d-flex justify-content-center vh-100 align-items-center'>
						<Loader />
					</div>
				) : (
					customers?.map((customer, indx) => (
						<div key={indx} className='flex justify-between p-4 mt-5 border rounded'>
							<div>
								<h3>{customer?.name} {customer?.surname}</h3>
                <p>{customer?.language}</p>
                <p>{customer?.type}</p>
                <p>{customer?.phoneNumber}</p>
				<p>{customer?.extraPhoneNumber}</p>
                <p>{customer?.address}</p>
                <p>{customer?.notes}</p>
							</div>
							<div className='flex flex-col'>
								<button className='rounded h-[50px] w-[56px] mb-2 bg-green-200 dark:bg-green-300 flex items-center justify-center'>
									<EditUserIcon className='dark:text-green-700' />
								</button>
							</div>
						</div>
					))
				)}
			</div>
      <AddCustomers addCustomerEditor={addCustomerEditor} setAddCustomerEditor={setAddCustomerEditor} setEditCustomerDataOpen={setEditCustomerDataOpen}/>
	  <EditCustomer editCustomerDataOpen={editCustomerDataOpen} setEditCustomerDataOpen={setEditCustomerDataOpen} refreshCustomers={getCustomersHandler}/>
		</div>
  )
}

export default Customers