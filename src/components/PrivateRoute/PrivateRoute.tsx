import React, {useEffect, useState} from "react";
import {refreshToken} from "../../api/userApi.ts";
import {Navigate} from "react-router-dom";
import {Spin} from "antd";
import {tokenManager} from "../../api/TokenManager.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {logout, setAuthorized} from "../../store/authSlice.ts";

export const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized)

  useEffect(() => {
    const checkAuth = async () => {
      const refresh = localStorage.getItem('refreshToken');
      if (!refresh) {
        dispatch(logout())
        setLoading(false);
        return
      }

      try {
        const tokens = await refreshToken({refreshToken: refresh});
        tokenManager.setAccessToken(tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken);
        dispatch(setAuthorized(true))
      } catch (error) {
        console.error(error);
        localStorage.removeItem('refreshToken');
        tokenManager.clearAccessToken()
        dispatch(logout())
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [dispatch])

  if (loading) {
    return <Spin tip="Идет загрузка..."></Spin>
  }

  return (
    isAuthorized
      ? <>{children}</>
      : <Navigate to='/login' replace />
  )
}