// utils/csrf.js

// Function to get CSRF token from cookies
export function getCSRFToken() {
    const name = 'csrftoken';
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
  }
  