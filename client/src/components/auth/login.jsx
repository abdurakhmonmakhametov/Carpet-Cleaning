import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUserStart, signUserSuccess, signUserFail } from "../../slice/auth"
import AuthService from "../../services/auth"
import { LoginBtnIcon, LightInIcon, DarkInIcon, PasswordIcon, LoginIcon } from "../../assets/images"
import { styles } from "../../util/style"
import '../styles/login.css'
import { ErrorAlert } from "../"

const Login = ({darkMode, isDark}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const {loggedIn, error} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errorDisplayer = () => {
	Object.keys(error?.details).map((item) => {
		if (item === "password") {
			setPasswordError(true)
		}
		if (item === "username") {
			setUsernameError(true)
		}
	})
  }

  

  const loginHandler = async(e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {username, password}
    try {
      const res = await AuthService.postUser(user)
      dispatch(signUserSuccess(res.data))
      navigate('/')
    } catch (err) {
      dispatch(signUserFail(err.response.data))
    }
  }
  
  useEffect(() => {
    if(loggedIn) navigate('/')
  }, [loggedIn])
  

  return (
		<div className='container flex flex-col items-center relative justify-center w-full h-screen mx-auto sm:px-[24px] px-[10px] gap-[10px]'>
			<h1
				className={`text-4xl font-bold font-gilroy ${styles.textColors}`}
			>
				Xush Kelibsiz!
			</h1>
			<p
				className={`font-normal font-gilroy text-center mb-8 ${styles.textColors}`}
			>
				Tizimga kirish uchun login va parolingizni kiriting
			</p>
			<form
				action=''
				className='flex flex-col gap-[20px] w-full max-w-[350px]'
				autoComplete='off'
			>
				<div className='relative'>
					<input
						type='text'
						id='username'
						className={`
							${usernameError ? 'border border-red-500' : ''}
							rounded 
							loginInput 
							dark:bg-dark-input 
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
     						text-light-textColor`}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label
						htmlFor='username'
						className={`inputLabel ${
							username
								? 'inputLabel-focus dark:text-dark-primary text-light-primary'
								: ''
						}`}
					>
						Login
					</label>
					<LoginIcon className='loginIcon text-[#6B7280]'/>
				</div>

				<div className='relative'>
					<input
						type='password'
						id='password'
						autoComplete='new-password'
						className={`
							${passwordError ? 'border border-red-500' : ''}
							rounded 
							loginInput 
							dark:bg-dark-input 
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
     						text-light-textColor`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label
						htmlFor='password'
						className={`inputLabel mr-[20px] ${
							password
								? 'inputLabel-focus dark:text-dark-primary text-light-primary'
								: ''
						}`}
					>
						Parol
					</label>
					<PasswordIcon className='loginIcon text-[#6B7280]'/>
				</div>
				<button
					type='submit'
					onClick={loginHandler}
					className='text-white rounded text-[18px] dark:bg-dark-primary bg-light-primary flex items-center justify-center gap-[10px] hover:bg-primaryHover loginBtn'
				>
					Kirish
					<LoginBtnIcon />
				</button>
			</form>
			{error && <ErrorAlert errorDisplayer={errorDisplayer} setPasswordError={setPasswordError} setUsernameError={setUsernameError} errorType={'auth'}/>}
			<div className='absolute top-0 right-0 z-10 p-4'>
				<button onClick={darkMode}>
					{isDark ? (
						<LightInIcon className='dark:text-light-iconColor'/>
					) : (
						<DarkInIcon />
					)}
				</button>
			</div>
		</div>
  );
}

export default Login