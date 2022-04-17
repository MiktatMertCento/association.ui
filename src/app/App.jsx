import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import { Store } from './redux/Store'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './views/dernek/components/SnackbarUtils.tsx'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <GlobalCss />
                        <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <SnackbarUtilsConfigurator />
                            <BrowserRouter basename={process.env.PUBLIC_URL}>
                                <Router history={history}>
                                    <AuthProvider>
                                        <MatxSuspense>
                                            <Switch>
                                                {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                                {sessionRoutes.map((item, i) => (
                                                    <Route
                                                        key={i}
                                                        path={item.path}
                                                        component={item.component}
                                                    />
                                                ))}
                                                {/* AUTH PROTECTED DASHBOARD PAGES */}
                                                <AuthGuard>
                                                    <MatxLayout />{' '}
                                                    {/* RETURNS <Layout1/> component */}
                                                </AuthGuard>
                                            </Switch>
                                        </MatxSuspense>
                                    </AuthProvider>
                                </Router>
                            </BrowserRouter>
                        </SnackbarProvider>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
