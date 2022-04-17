import React, {
    // useContext,
    useEffect,
    useState,
} from 'react'
import { Redirect, useLocation } from 'react-router-dom'
// import AppContext from "app/appContext";
import useAuth from 'app/hooks/useAuth'
import { db } from 'config'
import SnackbarUtils from 'app/views/dernek/components/SnackbarUtils'

// const getUserRoleAuthStatus = (pathname, user, routes) => {
//   const matched = routes.find((r) => r.path === pathname);

//   const authenticated =
//     matched && matched.auth && matched.auth.length
//       ? matched.auth.includes(user.role)
//       : true;
//   console.log(matched, user);
//   return authenticated;
// };

const AuthGuard = ({ children }) => {
    const {
        logout,
        isAuthenticated,
        user
    } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()

    // const { routes } = useContext(AppContext);
    // const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user, routes);
    // let authenticated = isAuthenticated && isUserRoleAuthenticated;

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE
    let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        let unlisten = () => { };
        if (user) unlisten = db.collection('users').doc(user.id).onSnapshot((snapshot) => {
            if (accessToken !== snapshot.data().JWT) {
                logout();
                SnackbarUtils.error('Hesabınıza başkası tarafından giriş yapıldı!')
            }

            if (snapshot.data().status === 0) {
                logout();
                SnackbarUtils.error('Hesabınız silinmiştir!')
            }
        })

        return () => {
            unlisten();
        }
    }, [logout, user])


    if (authenticated) return <>{children}</>
    else {
        return (
            <Redirect
                to={{
                    pathname: '/session/signin',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

export default AuthGuard
