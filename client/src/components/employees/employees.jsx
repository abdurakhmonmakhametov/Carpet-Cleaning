import React, { useEffect, useState } from 'react'
import { EditUserIcon } from '../../assets/images'
import { AddEmployee, EditEmployee } from '../'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersFail, getUsersStart, getUsersSuccess } from '../../slice/allUsers'
import UsersService from '../../services/users'
import Loader from '../ui/loader'

const Employee = () => {
  const [addEmployeeEditor, setAddEmployeeEditor] = useState(false)
  const [editEmployeeEditor, setEditEmployeeEditor] = useState(false)
  const [editEmployerId, setEditEmployerId] = useState(null)
  
  const setEditorHandler = () => setAddEmployeeEditor((prev) => !prev)
  
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state) => state.users)
  
  const allUsersHandler = async() => {
    dispatch(getUsersStart())
    try {
      const res = await UsersService.getUsers()
      dispatch(getUsersSuccess(res.data))
    } catch (err) {
      dispatch(getUsersFail(err.response.data))
    }
  }

  const editEmployerHandler = (id) => {
	setEditEmployeeEditor(true)
	setEditEmployerId(id)
  }

  useEffect(() => {
    allUsersHandler()
  }, [])
  
  return (
		<div>
			<div  className='flex flex-wrap justify-between'>
				<h2 className='text-2xl font-semibold font-gilroy'>
					Hodimalar
				</h2>
				<div className='flex justify-center gap-4 addEmployeeBtn'>
					<button
						onClick={setEditorHandler}
						className='rounded h-[50px] w-full font-gilroy font-medium bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'
					>
						Hodim qoshish
					</button>
				</div>
			</div>
			<div>
				{!users || isLoading ? (
					<div className='pb-5 d-flex justify-content-center vh-100 align-items-center'>
						<Loader />
					</div>
				) : (
					users?.map((user, indx) => (
						<div onClick={() => editEmployerHandler(user?.id)} key={indx} className='flex justify-between p-4 mt-5 border rounded'>
							<div>
								<h3 className='font-semibold'>
									{user?.role?.role}
								</h3>
								<p>{user?.name}</p>
								<p>{user?.surname}</p>
								<p>{user?.username}</p>
								<p>{user?.phoneNumber}</p>
							</div>
						</div>
					))
				)}
			</div>
			<AddEmployee
				addEmployeeEditor={addEmployeeEditor}
				setAddEmployeeEditor={setAddEmployeeEditor}
			/>
			<EditEmployee
				editEmployeeEditor={editEmployeeEditor}
				setEditEmployeeEditor={setEditEmployeeEditor}
				id={editEmployerId}
				refreshUsers={allUsersHandler}
			/>
		</div>
  );
}

export default Employee