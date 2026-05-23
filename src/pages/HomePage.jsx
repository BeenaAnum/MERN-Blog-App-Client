// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axiosInstance from '../api/axiosInstance';
// import BlogCard from '../components/blog/BlogCard';
// import Loader from '../components/common/Loader';

// const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Other'];

// const HomePage = () => {
//   const [posts,    setPosts]    = useState([]);
//   const [loading,  setLoading]  = useState(true);
//   const [search,   setSearch]   = useState('');
//   const [category, setCategory] = useState('');
//   const [page,     setPage]     = useState(1);
//   const [pages,    setPages]    = useState(1);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit: 9 };
//       if (search)   params.search   = search;
//       if (category) params.category = category;
//       const { data } = await axiosInstance.get('/posts', { params });
//       setPosts(data.posts);
//       setPages(data.pages);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPosts(); }, [page, category]);

//   const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchPosts(); };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">

//       {/* Hero */}
//       <section className="relative py-24 px-4 text-center overflow-hidden">
//         <div className="absolute inset-0 bg-linear-to-br from-emerald-900/20 via-transparent to-teal-900/20 pointer-events-none"/>
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">
//             <span className="gradient-text">Explore Ideas</span><br/>
//             <span className="text-white">That Matter</span>
//           </h1>
//           <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
//             Stories, insights, and tutorials from a community of curious minds.
//           </p>

//           {/* Search bar */}
//           <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search posts..."
//               className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
//             />
//             <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg transition-colors font-medium">
//               Search
//             </button>
//           </form>
//         </motion.div>
//       </section>

//       {/* Category Filter */}
//       <section className="max-w-7xl mx-auto px-4 mb-8">
//         <div className="flex flex-wrap gap-2">
//           {CATEGORIES.map(cat => (
//             <button
//               key={cat}
//               onClick={() => { setCategory(cat === 'All' ? '' : cat); setPage(1); }}
//               className={`px-4 py-1.5 rounded-full text-sm transition-colors border ${
//                 (category === cat || (cat === 'All' && !category))
//                   ? 'bg-emerald-500 text-white border-emerald-500'
//                   : 'border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Posts Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-16">
//         {loading ? <Loader /> : (
//           <>
//             {posts.length === 0
//               ? <div className="text-center text-gray-500 py-20">No posts found.</div>
//               : (
//                 <motion.div
//                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   initial="hidden" animate="visible"
//                   variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
//                 >
//                   {posts.map(post => (
//                     <motion.div key={post._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
//                       <BlogCard post={post} />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )
//             }

//             {/* Pagination */}
//             {pages > 1 && (
//               <div className="flex justify-center gap-2 mt-10">
//                 {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
//                   <button
//                     key={p} onClick={() => setPage(p)}
//                     className={`w-9 h-9 rounded-lg text-sm transition-colors ${
//                       page === p ? 'bg-emerald-500 text-white' : 'border border-white/10 text-gray-400 hover:border-emerald-500/50'
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

// export default HomePage;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import BlogCard from '../components/blog/BlogCard';
import Loader from '../components/common/Loader';

const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Other'];

const HomePage = () => {
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [page,     setPage]     = useState(1);
  const [pages,    setPages]    = useState(1);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search)   params.search   = search;
      if (category) params.category = category;
      const { data } = await axiosInstance.get('/posts', { params });
      setPosts(data.posts);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [page, category]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchPosts(); };

  // 🛠️ Motion Variants to stagger parent-to-child components on mount
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 75, damping: 15 } 
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900/20 via-transparent to-teal-900/20 pointer-events-none"/>
        
        {/* 🛠️ Upgraded with coordinated entry animations */}
        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading Accent Elements */}
          <motion.h1 
            variants={textItemVariants}
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight"
          >
            <span className="gradient-text bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Explore Ideas
            </span>
            <br/>
            <span className="text-white">That Matter</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            variants={textItemVariants}
            className="text-gray-400 text-xl mb-10 max-w-xl mx-auto font-light"
          >
            Stories, insights, and tutorials from a community of curious minds.
          </motion.p>

          {/* Search bar wrapper container */}
          <motion.form 
            variants={textItemVariants}
            onSubmit={handleSearch} 
            className="flex gap-2 max-w-lg mx-auto bg-white/5 p-1.5 rounded-xl border border-white/10 backdrop-blur-md focus-within:border-emerald-500/50 transition-all duration-300 shadow-xl"
          >
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 bg-transparent px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none text-sm"
            />
            <button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg transition-all font-medium text-sm cursor-pointer shadow-md shadow-emerald-900/20 active:scale-98"
            >
              Search
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat === 'All' ? '' : cat); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors border ${
                (category === cat || (cat === 'All' && !category))
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? <Loader /> : (
          <>
            {posts.length === 0
              ? <div className="text-center text-gray-500 py-20">No posts found.</div>
              : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden" animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                >
                  {posts.map(post => (
                    <motion.div key={post._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              )
            }

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                      page === p ? 'bg-emerald-500 text-white' : 'border border-white/10 text-gray-400 hover:border-emerald-500/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;