import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from './components';
import { ModalManagementService } from './features/modals';
import { ProtectedRoute } from './features/users';
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

(async () => {
  ModalManagementService.init();
})();

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex w-full h-full justify-center items-center">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<CoursesPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
