import {Routes, Route} from 'react-router-dom'
import { Customers, Dashboard, Employee, Login, Settings } from './components/'
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
			const res = await AuthService.getCurrentUser()
			dispatch(signUserSuccess(res.user))
		} catch (err) {
			console.log(err);
		}
	}


  useEffect(() => {
		const bearer = getItem('bearer')
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
            <Route path="add-customer" element={<Customers />} />
          </Route>
          <Route path="/login" element={<Login darkMode={darkMode} isDark={isDark} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
