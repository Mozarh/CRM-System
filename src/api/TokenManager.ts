let accessToken: string | null = null;

export const tokenManager = {
  setAccessToken(token: string | null) {
    accessToken = token
  },
  getAccessToken(): string | null {
    return accessToken
  },
  clearAccessToken() {
    accessToken = null
  }
}
