import decode from "jwt-decode";

class AuthService {
  // Get the decoded user object from the token
  getUser() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if the token is expired
  isTokenExpired(token) {
    const decoded = decode(token);
    // Compare the token's expiration time with the current time
    if (decoded.exp < Date.now() / 1000) {
      // If the token is expired, remove it from localStorage and return true
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  // Get the token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Perform login by storing the token in localStorage and redirecting to the home page
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Perform logout by removing the token from localStorage and redirecting to the login/signup page
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/userform");
  }
}

export default new AuthService();
