import NotFound from './NotFound'
import JwtLogin from './login/JwtLogin'

const sessionRoutes = [
    /*{
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/session/404',
        component: NotFound,
    },*/

    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
