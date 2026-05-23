import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
      <p className="text-gray-400 text-xl mb-8">Page not found</p>
      <Link to="/" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg transition-colors">
        Go Home
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
