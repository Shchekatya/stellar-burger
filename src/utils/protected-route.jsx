import { Navigate, Outlet, Route } from 'react-router-dom';

export const ProtectedRouteElement=() => {
  const auth=document.cookie
  return (
auth ? <Outlet/> : <Navigate to='/login'/>
  )
}