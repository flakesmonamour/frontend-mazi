import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonationPage from './pages/DonationPage';
import AboutPage from './pages/AboutPage';
import ImpactPage from './pages/ImpactPage';
import OrganizationProfileForm from './pages/OrganizationProfileForm.js';
import PostStoryPage from './pages/PostStoryPage';
import ManageBeneficiariesPage from './pages/ManageBeneficiariesPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-green-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/post-story" element={<PostStoryPage />} />
            <Route
              path="/beneficiary-list"
              element={<ManageBeneficiariesPage/>} />
            <Route
              path="/donate"
              element={
                <PrivateRoute>
                  <DonationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/organization-profile"
              element={
                <PrivateRoute>
                  <OrganizationProfileForm />
                </PrivateRoute>
              }
            />
            {/* Test without PrivateRoute if needed */}
            <Route
              path="/post-story"
              element={
                <PrivateRoute>
                  <PostStoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-beneficiaries"
              element={
                <PrivateRoute>
                  <ManageBeneficiariesPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
