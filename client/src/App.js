import {Routes, Route} from 'react-router-dom'
import { Dashboard, Employee, Login, Settings } from './components/'
import { useEffect, useState } from 'react'
import { getItem } from './helpers/persistance-storage'
import AuthService from './services/auth'
import { useDispatch } from 'react-redux'
import { signUserSuccess } from './slice/auth'

const App = () => {
  const dispatch = useDispatch()
  const [isDark, setIsDark] = useState(()=>{
    return getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement;
    if(isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light');
    }
  }, [isDark])

  const darkMode = () => setIsDark((prev) => !prev);

  const getUser = async () => {
		try {
			const res = await AuthService.getUser()
			dispatch(signUserSuccess(res.user))
      console.log(res.response.data);
      
		} catch (err) {
			console.log(err);		
		}
	}


  useEffect(() => {
		const bearer = getItem('bearer')
    console.log(bearer);
		if (bearer) getUser()
	}, [])

  return (
    <div>
      <div className="dark:bg-dark-background bg-light-background">
      <Routes>
          <Route
            path="/"
            element={<Dashboard darkMode={darkMode} isDark={isDark} />}
          >
            <Route path="settings" element={<Settings />} />
            <Route path="add-employee" element={<Employee />} />
          </Route>
          <Route path="/login" element={<Login darkMode={darkMode} isDark={isDark} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
