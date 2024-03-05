import { Dispatch, SetStateAction, useState } from 'react';


interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}


/**
 * A component that renders a login screen, allowing the user to authenticate themselves.
 * 
 * This component displays a login form with username and password fields
 * 
 * @param props The properties required for the LoginScreen component.
 * @returns A React element that represents either a login form or a sign-out button based on the user's authentication state.
 */


export function LoginScreen(props: loginProps) {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const authenticate = () => {

    if (username === 'admin' && password === 'password') {

    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  } else {
    alert('Invalid credentials')
  }
}


  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <div>
        <form onSubmit={authenticate}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              name="username"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" aria-label="Login">
            Login
          </button>
        </form>
      </div>
    );
  }
}