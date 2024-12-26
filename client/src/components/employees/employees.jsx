import React, { useEffect, useState } from 'react'
import { BlockUserIcon, EditUserIcon } from '../../assets/images'
import { AddEmployee, DeleteEmployee, EditEmployee } from '../'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersFail, getUsersStart, getUsersSuccess } from '../../slice/allUsers'
import UsersService from '../../services/users'
import Loader from '../ui/loader'

const Employee = () => {
  const [addEmployeeEditor, setAddEmployeeEditor] = useState(false)
  const [deleteEmployerEditor, setDeleteEmployerEditor] = useState(false)
  const [editEmployeeEditor, setEditEmployeeEditor] = useState(false)
  const setEditorHandler = () => setAddEmployeeEditor((prev) => !prev)

  
  const [deleteEmployerId, setDeleteEmployerId] = useState(null)
  const [deleteEmployerName, setDeleteEmployerName] = useState(null)
  const [deleteEmployerSurname, setDeleteEmployerSurname] = useState(null)
  const [deleteEmployerRole, setDeleteEmployerRole] = useState(null)
  const [editEmployerId, setEditEmployerId] = useState(null)
  
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

  const deleteEmployeHandler = (id, name, surname, role) => {
    setDeleteEmployerEditor(true)
    setDeleteEmployerRole(role)
    setDeleteEmployerId(id)
    setDeleteEmployerName(name)
    setDeleteEmployerSurname(surname)
  }

  useEffect(() => {
    allUsersHandler()
  }, [])
  
  return (
		<div>
			<div className='flex flex-wrap justify-between'>
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
						<div key={indx} className='flex justify-between p-4 mt-5 border rounded'>
							<div>
								<h3 className='font-semibold'>
									{user?.role?.role}
								</h3>
								<p>{user?.name}</p>
								<p>{user?.surname}</p>
								<p>{user?.username}</p>
								<p>{user?.phoneNumber}</p>
							</div>
							<div className='flex flex-col'>
								<button className='rounded h-[50px] w-[56px] mb-2 bg-green-200 dark:bg-green-300 flex items-center justify-center'>
									<EditUserIcon
									onClick={() =>
										editEmployerHandler(
											user?.id,
											user?.name,
											user?.surname,
											user?.role?.role,
											user?.username,
											user?.phoneNumber
										)
									}
									className='dark:text-green-700' />
								</button>
								<button
									onClick={() =>
										deleteEmployeHandler(
											user?.id,
											user?.name,
											user?.surname,
                      user?.role?.role
										)
									}
									className='rounded h-[50px] w-[56px] bg-red-200 flex items-center justify-center'
								>
									<BlockUserIcon className='text-red-500 dark:text-red-700' />
								</button>
							</div>
						</div>
					))
				)}
			</div>
			<AddEmployee
				addEmployeeEditor={addEmployeeEditor}
				setAddEmployeeEditor={setAddEmployeeEditor}
			/>
			<DeleteEmployee
				deleteEmployerEditor={deleteEmployerEditor}
				setDeleteEmployerEditor={setDeleteEmployerEditor}
				id={deleteEmployerId}
				name={deleteEmployerName}
				surname={deleteEmployerSurname}
        		role={deleteEmployerRole}
        		refreshUsers={allUsersHandler}
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