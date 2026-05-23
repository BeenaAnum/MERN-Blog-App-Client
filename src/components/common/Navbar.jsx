// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Swal from 'sweetalert2';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Logout?',
//       text: 'Are you sure you want to logout?',
//       icon: 'question',
//       background: '#0f172a',
//       color: '#e2e8f0',
//       showCancelButton: true,
//       confirmButtonColor: '#10b981',
//       cancelButtonColor: '#475569',
//       confirmButtonText: 'Yes, logout',
//     }).then(result => {
//       if (result.isConfirmed) { logout(); navigate('/'); }
//     });
//   };

//   return (
//     <nav className="sticky top-0 z-50 glass border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">

//           <Link to="/" className="text-2xl font-bold gradient-text">
//             📝 MERN Blog
//           </Link>

//           <div className="flex items-center gap-4">
//             <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
//               Home
//             </Link>

//             {user ? (
//               <>
//                 <Link to="/create" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
//                   + New Post
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
//                   Dashboard
//                 </Link>
//                 {user.role === 'admin' && (
//                   <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition-colors text-sm">
//                     Admin
//                   </Link>
//                 )}
//                 <Link to="/profile">
//                   {user.profilePic
//                     ? <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"/>
//                     : <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">{user.name?.[0]?.toUpperCase()}</div>
//                   }
//                 </Link>
//                 <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors text-sm">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
//                   Login
//                 </Link>
//                 <Link to="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Controls mobile drawer visibility

  const handleLogout = () => {
    setIsOpen(false); // Close drawer if open
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      background: '#0f172a',
      color: '#e2e8f0',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Yes, logout',
    }).then(result => {
      if (result.isConfirmed) { 
        logout(); 
        navigate('/'); 
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold gradient-text">
            📝 MERN Blog
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition-colors text-sm">
                    Admin
                  </Link>
                )}
                <Link to="/create" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                  + New Post
                </Link>
                <Link to="/profile" className="flex items-center">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"/>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN PANEL --- */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950 px-4 pt-2 pb-4 space-y-3 shadow-xl">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block text-gray-300 hover:text-emerald-400 py-2 text-base font-medium"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)} 
                className="block text-gray-300 hover:text-emerald-400 py-2 text-base font-medium"
              >
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)} 
                  className="block text-amber-400 hover:text-amber-300 py-2 text-base font-medium"
                >
                  Admin
                </Link>
              )}
              <Link 
                to="/profile" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center gap-3 py-2 border-t border-white/5 mt-2"
              >
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"/>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="text-gray-300 text-base font-medium">My Profile</span>
              </Link>
              <Link 
                to="/create" 
                onClick={() => setIsOpen(false)} 
                className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-2"
              >
                + New Post
              </Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-left text-gray-400 hover:text-red-400 py-2 text-base font-medium pt-2 border-t border-white/5"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 border-t border-white/5 space-y-2">
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="block text-center text-gray-300 hover:text-emerald-400 py-2 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)} 
                className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;