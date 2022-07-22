import { Route, Routes, BrowserRouter } from 'react-router-dom'

import PublicRoute from 'routes/PublicRoute'
import PrivateRoute from 'routes/PrivateRoute'

import SignInPage from 'pages/sign-in'
import ForgotPasswordPage from 'pages/forgot-password'
import RecoveryPasswordPage from 'pages/recovery-password'
import NotFoundPage from 'pages/not-found'
import CampaignPage from 'pages/campaigns'
import ProfilePage from 'pages/profile'
import WebPage from 'pages/web'
import ActivityPage from 'pages/activity'
import CreatePage from 'pages/campaign-create'
import PublishersPage from 'pages/campaign-create/publishers'
import CampaignFormPage from 'pages/campaign-create/form'
import CampaignMediaPage from 'pages/campaign-create/media'
import EditPage from 'pages/campaign-edit'
import CampaignEditFormPage from 'pages/campaign-edit/form'
import PublishersEditPage from 'pages/campaign-edit/publishers'
import EditMediaPage from 'pages/campaign-edit/media'
import CampaignOrderPage from 'pages/order'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path='auth/sign-in'
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path='auth/forgot-password'
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path='auth/recovery-password/:token'
        element={
          <PublicRoute>
            <RecoveryPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path='/'
        element={
          <PublicRoute>
            <WebPage />
          </PublicRoute>
        }
      />

      <Route
        path='activity'
        element={
          <PrivateRoute>
            <ActivityPage />
          </PrivateRoute>
        }
      />

      <Route
        path='campaigns'
        element={
          <PrivateRoute>
            <CampaignPage />
          </PrivateRoute>
        }
      />
      <Route
        path='campaigns/create'
        element={
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        }
      >

        <Route index element={<CampaignFormPage />} />
        <Route path='publishers' element={<PublishersPage />} />
        <Route path='media' element={<CampaignMediaPage />} />

      </Route>

      <Route
        path='campaigns/:id'
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      >
        <Route index path='edit' element={<CampaignEditFormPage />} />
        <Route path='publishers' element={<PublishersEditPage />} />
        <Route path='media' element={<EditMediaPage />} />
        <Route path='order' element={<CampaignOrderPage />} />
      </Route>

      <Route
        path='profile'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
)

export default Router
