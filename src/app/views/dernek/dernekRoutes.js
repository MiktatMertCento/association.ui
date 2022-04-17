import React from 'react'

const headenglishRoutes = [
    //root
    {
        path: '/anasayfa',
        component: React.lazy(() => import('./homePage/homePage')),
    },

    //üye işlemleri
    {
        path: '/uye-kayit',
        component: React.lazy(() => import('./user/registerUser')),
    },
    {
        path: '/uye-duzenle',
        component: React.lazy(() => import('./user/editUser')),
    },

    //firma işlemleri
    {
        path: '/firma-kayit',
        component: React.lazy(() => import('./firm/registerFirm')),
    },
    {
        path: '/firma-duzenle',
        component: React.lazy(() => import('./firm/editFirm')),
    },

    //admin işlemleri
    {
        path: '/yonetici-kayit',
        component: React.lazy(() => import('./admin/registerAdmin')),
    },
    {
        path: '/yonetici-duzenle',
        component: React.lazy(() => import('./admin/editAdmin')),
    },

    //tanımlamalar
    {
        path: '/tanimlamalar/uye-tipi',
        component: React.lazy(() => import('./definitions/userTypeRegistration/userTypeRegistration')),
    },
    {
        path: '/tanimlamalar/il',
        component: React.lazy(() => import('./definitions/cityRegistration/cityRegistration')),
    },
    {
        path: '/tanimlamalar/ilce',
        component: React.lazy(() => import('./definitions/countyRegistration/countyRegistration')),
    },
    {
        path: '/tanimlamalar/koy-mahalle',
        component: React.lazy(() => import('./definitions/districtRegistration/districtRegistration')),
    },
    {
        path: '/tanimlamalar/meslek',
        component: React.lazy(() => import('./definitions/professionRegistration/professionRegistration')),
    },
    {
        path: '/tanimlamalar/faaliyet-turu',
        component: React.lazy(() => import('./definitions/activityKindRegistration/activityKindRegistration')),
    },
    {
        path: '/tanimlamalar/kan-grubu',
        component: React.lazy(() => import('./definitions/bloodGroupRegistration/bloodGroupRegistration')),
    },
    {
        path: '/tanimlamalar/medeni-hal',
        component: React.lazy(() => import('./definitions/maritalStatusRegistration/maritalStatusRegistration')),
    },
    {
        path: '/tanimlamalar/ogrenim-durumu',
        component: React.lazy(() => import('./definitions/educationStatusRegistration/educationStatusRegistration')),
    },
    {
        path: '/tanimlamalar/yabanci-dil',
        component: React.lazy(() => import('./definitions/foreignLanguageRegistration/foreignLanguageRegistration')),
    },
]

export default headenglishRoutes
