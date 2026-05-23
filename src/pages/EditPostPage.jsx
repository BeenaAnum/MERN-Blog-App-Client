import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

const CATEGORIES = ['Technology','Lifestyle','Travel','Food','Health','Business','Education','Other'];

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'Other', tags: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/posts/${id}`).then(({ data }) => {
      setForm({ title: data.title, content: data.content, category: data.category, tags: data.tags?.join(', ') || '' });
      if (data.coverImage) setPreview(data.coverImage);
    }).catch(() => navigate('/'));
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append('coverImage', image);
      await axiosInstance.put(`/posts/${id}`, formData);
      Swal.fire({ icon: 'success', title: 'Post Updated!', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
      navigate(`/blog/${id}`);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: err.response?.data?.message, background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-8">Edit Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm block mb-2">Cover Image</label>
              {preview && <img src={preview} alt="Preview" className="w-full h-52 object-cover rounded-xl mb-3"/>}
              <input type="file" accept="image/*" onChange={handleImage}
                className="block w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 file:cursor-pointer"/>
            </div>
            <div>
              <label className="text-gray-300 text-sm block mb-2">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Tags</label>
                <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"/>
              </div>
            </div>
            <div>
              <label className="text-gray-300 text-sm block mb-2">Content *</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required rows={14}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"/>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)} className="flex-1 border border-white/10 hover:border-white/30 text-gray-400 py-3 rounded-lg transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditPostPage;
