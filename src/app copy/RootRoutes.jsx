import React from 'react'
import { Redirect } from 'react-router-dom'

import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import dernekRoutes from './views/dernek/dernekRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/anasayfa" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
   // ...dashboardRoutes,
    ...dernekRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
