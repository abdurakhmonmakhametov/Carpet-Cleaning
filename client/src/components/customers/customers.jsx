import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomersStart, getCustomersFail, getCustomersSuccess } from '../../slice/customers'
import CustomersService from '../../services/customers'
import Loader from '../ui/loader'
import AddCustomers from './addCustomer'
import EditCustomer from './editCustomer'

const Customers = () => {
  const [addCustomerEditor, setAddCustomerEditor] = useState(false)
  const [editCustomerDataOpen, setEditCustomerDataOpen] = useState(false);
  const {customers, isLoading} = useSelector(state => state.customers)
  const [customerId, setCustomerId] = useState(null);
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

  const editCustomerHandler = (id) => {
	setEditCustomerDataOpen(true);
	setCustomerId(id);
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
						<div onClick={() => editCustomerHandler(customer?.id)} key={indx} className='flex justify-between p-4 mt-5 border rounded'>
							<div>
								<h3>{customer?.name} {customer?.surname}</h3>
                <p>{customer?.language}</p>
                <p>{customer?.type}</p>
                <p>{customer?.phoneNumber}</p>
				<p>{customer?.extraPhoneNumber}</p>
                <p>{customer?.address}</p>
                <p>{customer?.notes}</p>
							</div>
						</div>
					))
				)}
			</div>
      <AddCustomers addCustomerEditor={addCustomerEditor} setAddCustomerEditor={setAddCustomerEditor} setEditCustomerDataOpen={setEditCustomerDataOpen} refreshCustomers={getCustomersHandler}/>
	  <EditCustomer editCustomerDataOpen={editCustomerDataOpen} setEditCustomerDataOpen={setEditCustomerDataOpen} refreshCustomers={getCustomersHandler} customerId={customerId}/>
		</div>
  )
}

export default Customers