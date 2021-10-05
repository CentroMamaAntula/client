import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import PrintLayout from 'src/layouts/PrintLayout';

import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import KinesiologyView from 'src/views/kinesiology/KinesiologyView';
import MentalView from 'src/views/mentalHealth/MentalView';
import NursingView from './views/nursing/NursingView';
import XrayView from './views/x-ray/XrayView';
import LaboratoryView from './views/laboratory/LaboratoryView';
import StatiticsView from './views/statitics/StatiticsView';

import Epicrisis from './views/print/epicrisis';
import ClinicHistory from './views/print/clinicHistory';
import NutritionView from './views/nutrition/NutritionView';
import HemotherapyView from './views/hemotherapy/HemotherapyView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'triage', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'nursing', element: <NursingView /> },
      { path: 'nutrition', element: <NutritionView /> },
      { path: 'mental_health', element: <MentalView /> },
      { path: 'internment', element: <CustomerListView /> },
      { path: 'kinesiology', element: <KinesiologyView /> },
      { path: 'laboratory', element: <LaboratoryView /> },
      { path: 'hemotherapy', element: <HemotherapyView /> },
      { path: 'statitics', element: <StatiticsView /> },
      { path: 'xray', element: <XrayView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'print',
    element: <PrintLayout />,
    children: [
      { path: 'epicrisis', element: <Epicrisis /> },
      { path: 'clinic_history', element: <ClinicHistory /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
