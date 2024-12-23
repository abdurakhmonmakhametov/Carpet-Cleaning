import React, { useEffect, useState } from 'react'
import { BlockUserIcon, EditUserIcon } from '../assets/images'
import AddEmployee from './addEmployee'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersFail, getUsersStart, getUsersSuccess } from '../slice/allUsers'
import UsersService from '../services/users'
import Loader from './loader'

const Employee = () => {
  const [addEmployeeEditor, setAddEmployeeEditor] = React.useState(false)
  const setEditorHandler = () => setAddEmployeeEditor((prev) => !prev)
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state) => state.users)

  console.log(users, isLoading);
  
  const allUsersHandler = async() => {
    dispatch(getUsersStart())
    try {
      const res = await UsersService.getUsers()
      dispatch(getUsersSuccess(res.data))
      console.log(res.data);
    } catch (err) {
      dispatch(getUsersFail(err.response.data))
    }
  }

  useEffect(() => {
    allUsersHandler()
  }, [])
  
  return (
    <div>
      <div className='flex flex-wrap justify-between'>
        <h2 className='text-2xl font-semibold font-gilroy'>Hodimalar</h2>
        <div className='flex justify-center gap-4 addEmployeeBtn'>
          <button onClick={setEditorHandler} className='rounded h-[50px] font-gilroy font-medium bg-light-primary dark:bg-dark-primary text-dark-textColor px-4'>Hodim qoshish</button>
          <button className='rounded h-[50px] font-gilroy font-medium bg-gray-900 dark:bg-dark-textColor text-dark-textColor dark:text-light-textColor px-4'>Bloklangalar</button>
        </div>
      </div>
      <div>
        {(!users || isLoading) ? (
          <div className='pb-5 d-flex justify-content-center vh-100 align-items-center'>
            <Loader />
          </div>
        ) : (
          users?.map(user => (
            <div className='flex justify-between p-4 mt-5 border rounded'>
            <div>
              <h3 className='font-semibold'>{user?.role?.role}</h3>
              <p>{user?.name}</p>
              <p>+998 913253395</p>
              <p>Kunlik maosh 10 so'm  / KPI: 5 %</p>
            </div>
            <div className='flex flex-col'>
              <button className='rounded h-[50px] w-[56px] mb-2 bg-green-200 dark:bg-green-300 flex items-center justify-center'>
                <EditUserIcon className='dark:text-green-700'/>
              </button>
              <button className='rounded h-[50px] w-[56px] bg-red-200 flex items-center justify-center'>
                <BlockUserIcon className='text-red-500 dark:text-red-700'/>
              </button>
            </div>
          </div>  
          ))
        )}    
      </div>
      <AddEmployee addEmployeeEditor={addEmployeeEditor} setAddEmployeeEditor={setAddEmployeeEditor}/>
    </div>
  )
}

export default Employee