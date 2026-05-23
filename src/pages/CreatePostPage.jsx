import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Other'];

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'Other', tags: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Cleanly silence the browser's favicon 404 warning log on component mount
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'data:image/x-icon;,';
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      return Swal.fire({ 
        icon: 'warning', 
        title: 'Missing fields', 
        text: 'Title and content are required', 
        background: '#0f172a', 
        color: '#e2e8f0', 
        confirmButtonColor: '#10b981' 
      });
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      // Explicitly append fields to guarantee a reliable text payload structure
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('category', form.category);
      formData.append('tags', form.tags);
      
      // Note: 'coverImage' must match the key name inside your backend's upload.single('coverImage') middleware!
      if (image) {
        formData.append('coverImage', image);
      }

      const { data } = await axiosInstance.post('/posts', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' // Required for file processing across your server pipeline
        }
      });

      Swal.fire({ 
        icon: 'success', 
        title: 'Post Published!', 
        background: '#0f172a', 
        color: '#e2e8f0', 
        timer: 1500, 
        showConfirmButton: false 
      });
      
      // Redirect to the newly built blog post details view using the server-returned ID
      navigate(`/blog/${data._id}`);
    } catch (err) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: err.response?.data?.message || 'Failed to create post. Verify your backend server connection.', 
        background: '#0f172a', 
        color: '#e2e8f0', 
        confirmButtonColor: '#10b981' 
      });
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-8">Create New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Cover Image Section */}
            <div>
              <label className="text-gray-300 text-sm block mb-2">Cover Image (optional)</label>
              {preview && (
                <img src={preview} alt="Preview" className="w-full h-52 object-cover rounded-xl mb-3 border border-white/10" />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImage}
                className="block w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 file:cursor-pointer transition-colors"
              />
            </div>

            {/* Title Section */}
            <div>
              <label className="text-gray-300 text-sm block mb-2">Title *</label>
              <input 
                type="text"
                value={form.title} 
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))} 
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Write a compelling title..."
              />
            </div>

            {/* Category + Tags Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Category</label>
                <select 
                  value={form.category} 
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Tags (comma separated)</label>
                <input 
                  type="text"
                  value={form.tags} 
                  onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="react, mern, tutorial"
                />
              </div>
            </div>

            {/* Content Textarea Section */}
            <div>
              <label className="text-gray-300 text-sm block mb-2">Content *</label>
              <textarea 
                value={form.content} 
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))} 
                required 
                rows={14}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                placeholder="Write your post content here..."
              />
            </div>

            {/* Form Actions Button Control Group */}
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="flex-1 border border-white/10 hover:border-white/30 text-gray-400 py-3 rounded-lg transition-colors bg-transparent"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage;