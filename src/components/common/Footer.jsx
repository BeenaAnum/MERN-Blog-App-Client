// 
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  // 🛠️ Array definition for social media links utilizing clean SVG icons
  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/beena-anum-2b2963254',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'X (Twitter)',
      href: 'https://x.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 🛠️ Modified Grid System to hold 4 clean columns on desktop views */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold gradient-text">
              📝 MERN Blog
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              A place to share ideas, stories, and tutorials with a community of curious minds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/',        label: 'Home' },
                { to: '/create',    label: 'Write a Post' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/login',     label: 'Login' },
                { to: '/register',  label: 'Register' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education'].map(cat => (
                <Link
                  key={cat}
                  to={`/?category=${cat}`}
                  className="text-xs bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 px-3 py-1 rounded-full transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* 🛠️ Brand New Connect / Socials Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect With Us</h4>
            <ul className="space-y-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2.5 group"
                  >
                    <span className="text-gray-500 group-hover:text-emerald-400 transition-colors">
                      {social.icon}
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p className="text-gray-500 text-xs">
              © {year} MERN Blog. All rights reserved By Beena Anum.
            </p>
            <p className="text-gray-600 text-xs hidden sm:block">|</p>
            <p className="text-gray-600 text-xs">
              Built with <span className="text-emerald-500 font-medium">MongoDB · Express · React · Node.js</span>
            </p>
          </div>

          {/* 🛠️ Inline Social Action Icons at the Bottom Right corner */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label + "-bottom"}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-400 transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;