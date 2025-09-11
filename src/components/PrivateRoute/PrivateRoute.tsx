import React, {useEffect, useState} from "react";
import {refreshToken, setAuthToken} from "../../api/userApi.ts";
import {Navigate} from "react-router-dom";
import {Spin} from "antd";

export const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const refresh = localStorage.getItem('refreshToken');
      if (!refresh) {
        setLoading(false);
        setIsAuth(false);
        return
      }

      try {
        const tokens = await refreshToken({refreshToken: refresh});
        setAuthToken(tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        setIsAuth(true);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('refreshToken');
        setAuthToken(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [])

  if (loading) {
    return <Spin tip="Идет загрузка..."></Spin>
  }

  return (
    isAuth
      ? <>{children}</>
      : <Navigate to='/login' replace />
  )
}