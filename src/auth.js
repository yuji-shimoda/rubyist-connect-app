import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

async function getUsers(accessToken) {
  try {
    const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/users', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw res.error;
    } else {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function useProvideAuth() {
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState(null);
  const [rubyists, setRubyists] = React.useState([]);

  useEffect(() => {
    const f = async () => {
      if (accessToken) {
        await getUsers(accessToken)
          .then((res) => {
            setRubyists(res.users);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    f();
  }, [accessToken, user]);

  async function login() {
    const githubAuth = getAuth(app);
    const provider = new GithubAuthProvider();
    await signInWithPopup(githubAuth, provider)
      .then((res) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        setUser(res.user);
        setAccessToken(res.user.accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function logout() {
    const githubAuth = getAuth(app);
    await signOut(githubAuth)
      .then((res) => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    accessToken,
    user,
    rubyists,
    login,
    logout,
  };
}
