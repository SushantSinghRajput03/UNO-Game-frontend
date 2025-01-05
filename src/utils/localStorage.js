export const storeUserName = (name) => {
      try {
        localStorage.setItem('userName', name);
      } catch (error) {
        console.error('Error storing user name in localStorage:', error);
      }
    };

    export const getUserName = () => {
      try {
        return localStorage.getItem('userName');
      } catch (error) {
        console.error('Error retrieving user name from localStorage:', error);
        return null;
      }
    };
