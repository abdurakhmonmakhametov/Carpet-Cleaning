// import React from 'react'
// import { CallIcon, ProfileCircleIcon, RightCloseIcon } from '../assets/images'
// import { useSelector } from 'react-redux'

// const InnerSidebar = ({sideBarLvl, innerSidebarHandler}) => {
//     const {user} = useSelector(state => state.auth)

//   return (
//     <div className={`absolute transform transition-transform duration-300 top-0 right-0 z-50 w-full h-screen max-w-[400px] dark:bg-dark-primary bg-white shadow-leftLightShadow dark:shadow-leftDarkShadow p-5 ${
// 				sideBarLvl === 1 ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className='flex items-center justify-between'>
// 			<div></div>
// 			<button onClick={() => innerSidebarHandler(0)}>
// 				<RightCloseIcon className='text-light-primary dark:text-white' />
// 			</button>
// 		</div>
//         <hr className='my-[22px]' />
// 			<div className='flex flex-col gap-[25px] sm:gap-[20px]'>
// 				<button className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
// 					<div className='flex flex-row gap-4 '>
//                         <ProfileCircleIcon />
// 					    <p>Ism va familiya</p>
// 					</div>
//                         <p className='opacity-50'>{user?.name} {user?.surname}</p>
// 				</button>
// 				<button className='flex justify-between font-normal text-light-textColor dark:text-dark-textColor font-gilroy'>
// 					<div className='flex flex-row gap-4 '>
//                         <CallIcon />
// 					    <p>Telefon raqam</p>
// 					</div>
//                     <p className='opacity-40'>{user?.phoneNumber}</p>
// 				</button>
// 			</div> 
//     </div>
//   )
// }

// export default InnerSidebar