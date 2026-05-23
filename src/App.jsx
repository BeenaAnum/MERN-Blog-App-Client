import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoute';
import Footer from './components/common/Footer';
import HomePage       from './pages/HomePage';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage   from './pages/EditPostPage';
import DashboardPage  from './pages/DashboardPage';
import ProfilePage    from './pages/ProfilePage';
import AdminPage      from './pages/AdminPage';
import NotFoundPage   from './pages/NotFoundPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />

        {/* Protected Routes */}
        <Route path="/create"   element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile"   element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin"    element={<AdminRoute><AdminPage /></AdminRoute>} />

        {/* 404 Fallback */}
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;