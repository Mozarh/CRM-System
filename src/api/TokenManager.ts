export const tokenManager = (() => {
    let accessToken: string | null = null;
    return {
      setAccessToken: (token: string | null)=> {
        accessToken = token
      },
      getAccessToken(): string | null {
        return accessToken
      },
      clearAccessToken() {
        accessToken = null
      }
    }
  })()
