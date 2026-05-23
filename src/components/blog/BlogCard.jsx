// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';

// // const BlogCard = ({ post }) => {
// //   const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
// //     year: 'numeric', month: 'short', day: 'numeric',
// //   });

// //   return (
// //     <motion.div
// //       whileHover={{ y: -4 }}
// //       transition={{ duration: 0.2 }}
// //       className="glass rounded-xl overflow-hidden card-hover group"
// //     >
// //       {post.coverImage && (
// //         <div className="h-48 overflow-hidden">
// //           <img
// //             src={post.coverImage}
// //             alt={post.title}
// //             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //           />
// //         </div>
// //       )}

// //       <div className="p-5">
// //         <div className="flex items-center justify-between mb-3">
// //           <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
// //             {post.category}
// //           </span>
// //           <span className="text-xs text-gray-500">{formattedDate}</span>
// //         </div>

// //         <Link to={`/blog/${post._id}`}>
// //           <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
// //             {post.title}
// //           </h2>
// //         </Link>

// //         <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>

// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             {post.author?.profilePic
// //               ? <img src={post.author.profilePic} alt={post.author.name} className="w-7 h-7 rounded-full object-cover"/>
// //               : <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs text-white font-bold">{post.author?.name?.[0]?.toUpperCase()}</div>
// //             }
// //             <span className="text-gray-400 text-xs">{post.author?.name}</span>
// //           </div>
// //           <div className="flex items-center gap-3 text-gray-500 text-xs">
// //             <span>❤️ {post.likes?.length || 0}</span>
// //             <span>👁 {post.views || 0}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default BlogCard;
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const BlogCard = ({ post }) => {
//   const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric',
//   });

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       // 🛠️ 'flex flex-col h-full' forces the card layout component to stretch out completely uniform
//       className="glass rounded-xl overflow-hidden card-hover group flex flex-col h-full"
//     >
//       {/* 🛠️ Image Containment Section: Always locked to h-48 height boundary */}
//       <div className="h-48 w-full overflow-hidden bg-linear-to-br from-emerald-950/40 to-slate-900 relative border-b border-white/5 shrink-0">
//         {post.coverImage ? (
//           <img
//             src={post.coverImage}
//             alt={post.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           // Dynamic placeholder background layout if no image has been uploaded
//           <div className="absolute inset-0 flex items-center justify-center text-emerald-500/10 text-3xl font-black tracking-widest select-none bg-slate-900/50">
//             MERN BLOG
//           </div>
//         )}
//       </div>

//       {/* 🛠️ Main content container block wrapper */}
//       <div className="p-5 flex flex-col flex-1">
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
//             {post.category || 'General'}
//           </span>
//           <span className="text-xs text-gray-500">{formattedDate}</span>
//         </div>

//         <Link to={`/blog/${post._id}`}>
//           {/* 🛠️ CRITICAL FIXED HEIGHT: min-h-[3.5rem] forces 1-line and 2-line titles to occupy matching grid areas */}
//           <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors min-h-14 flex items-center">
//             <span className="line-clamp-2">{post.title}</span>
//           </h2>
//         </Link>

//         <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10 overflow-hidden">
//           {post.excerpt || 'No description provided.'}
//         </p>

//         {/* 🛠️ FOOTER ALIGNMENT: mt-auto slams this segment perfectly to the base alignment profile */}
//         <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
//           <div className="flex items-center gap-2">
//             {post.author?.profilePic ? (
//               <img src={post.author.profilePic} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-white/10"/>
//             ) : (
//               <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs text-white font-bold">
//                 {post.author?.name?.[0]?.toUpperCase() || 'B'}
//               </div>
//             )}
//             <span className="text-gray-400 text-xs truncate max-w-27.5">{post.author?.name || 'Author'}</span>
//           </div>
          
//           <div className="flex items-center gap-3 text-gray-500 text-xs">
//             <span>❤️ {post.likes?.length || 0}</span>
//             <span>👁 {post.views || 0}</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default BlogCard;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BlogCard = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  // 🛠️ Dynamic generation of the absolute post URL path
  const blogUrl = `${window.location.origin}/blog/${post._id}`;

  // 🛠️ The Share Trigger Handler
  const handleShare = async (e) => {
    e.preventDefault(); // Prevents clicking the button from bubbling up or breaking links
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || `Check out this post: ${post.title}`,
          url: blogUrl,
        });
      } catch (err) {
        console.log('Native share canceled or failed:', err);
      }
    } else {
      // 📋 Fallback behavior: Copy absolute path to device clipboard
      try {
        await navigator.clipboard.writeText(blogUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset banner status text after 2 seconds
      } catch (err) {
        console.error('Could not copy link to clipboard:', err);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      // 🛠️ 'flex flex-col h-full' forces the card layout component to stretch out completely uniform
      className="glass rounded-xl overflow-hidden card-hover group flex flex-col h-full relative"
    >
      {/* 🛠️ Floating Clipboard Copy Success Banner Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-emerald-400"
          >
            🔗 Link Copied!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛠️ Image Containment Section: Always locked to h-48 height boundary */}
      <div className="h-48 w-full overflow-hidden bg-linear-to-br from-emerald-950/40 to-slate-900 relative border-b border-white/5 shrink-0">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Dynamic placeholder background layout if no image has been uploaded
          <div className="absolute inset-0 flex items-center justify-center text-emerald-500/10 text-3xl font-black tracking-widest select-none bg-slate-900/50">
            MERN BLOG
          </div>
        )}
      </div>

      {/* 🛠️ Main content container block wrapper */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
            {post.category || 'General'}
          </span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <Link to={`/blog/${post._id}`}>
          {/* 🛠️ CRITICAL FIXED HEIGHT: min-h-14 forces 1-line and 2-line titles to occupy matching grid areas */}
          <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors min-h-14 flex items-center">
            <span className="line-clamp-2">{post.title}</span>
          </h2>
        </Link>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10 overflow-hidden">
          {post.excerpt || 'No description provided.'}
        </p>

        {/* 🛠️ FOOTER ALIGNMENT: mt-auto slams this segment perfectly to the base alignment profile */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            {post.author?.profilePic ? (
              <img src={post.author.profilePic} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-white/10"/>
            ) : (
              <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs text-white font-bold">
                {post.author?.name?.[0]?.toUpperCase() || 'B'}
              </div>
            )}
            <span className="text-gray-400 text-xs truncate max-w-24">{post.author?.name || 'Author'}</span>
          </div>
          
          {/* 🛠️ Action Row containing Likes, Comments, Views, and the styled Share Button */}
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1" title="Likes">
              ❤️ {post.likes?.length || 0}
            </span>
            
            <span className="flex items-center gap-1" title="Comments">
              💬 {post.comments?.length || post.commentCount || 0}
            </span>

            <span className="flex items-center gap-1" title="Views">
              👁 {post.views || 0}
            </span>
            
            <button 
              onClick={handleShare}
              className="hover:text-emerald-400 text-gray-500 transition-colors p-1 rounded-md hover:bg-white/5 flex items-center justify-center cursor-pointer ml-0.5"
              title="Share post"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-3.5 h-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;