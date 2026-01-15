
import React, { useState } from 'react';
import { Paper } from '../types';
import { geminiService } from '../services/geminiService';
import { X, Upload, Loader2, Sparkles, FileType } from 'lucide-react';
import Logo from './Logo';

interface PaperUploadProps {
  onClose: () => void;
  onUpload: (paper: Paper) => void;
}

const PaperUpload: React.FC<PaperUploadProps> = ({ onClose, onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    type: 'Conference' as Paper['type'],
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const analysis = await geminiService.analyzePaper(formData.title, formData.abstract || "A research paper.");

    const newPaper: Paper = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      author: formData.author,
      abstract: analysis.professionalAbstract,
      keywords: analysis.keywords,
      uploadDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      type: formData.type,
      fileUrl: file ? URL.createObjectURL(file) : '',
    };

    onUpload(newPaper);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <Logo className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Vault Deposit</h2>
              <p className="text-slate-500 text-sm font-medium">Add a new publication to PaperVault</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Paper Title</label>
              <input
                required
                type="text"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#0088AA]/10 focus:border-[#0088AA] outline-none transition-all font-medium"
                placeholder="Full academic title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Author(s)</label>
              <input
                required
                type="text"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#0088AA]/10 focus:border-[#0088AA] outline-none transition-all font-medium"
                placeholder="Principal investigators"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Paper Type</label>
              <select
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#0088AA]/10 focus:border-[#0088AA] outline-none transition-all appearance-none font-medium"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Paper['type'] })}
              >
                <option value="Conference">Conference Paper</option>
                <option value="Journal">Journal Article</option>
                <option value="Preprint">Preprint / ArXiv</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Research File</label>
              <label className="flex items-center justify-center w-full px-5 py-3.5 bg-[#0088AA]/5 border border-dashed border-[#0088AA]/30 rounded-2xl cursor-pointer hover:bg-[#0088AA]/10 hover:border-[#0088AA] transition-all">
                <Upload className="w-5 h-5 text-[#006699] mr-3" />
                <span className="text-sm text-slate-600 truncate font-semibold">{file ? file.name : 'Choose PDF/DOCX'}</span>
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Abstract / Summary</label>
              <span className="text-[10px] text-[#0088AA] font-bold flex items-center gap-1 bg-[#0088AA]/10 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> AI Enhancement
              </span>
            </div>
            <textarea
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#0088AA]/10 focus:border-[#0088AA] outline-none transition-all h-32 resize-none font-medium leading-relaxed"
              placeholder="Paste existing abstract or a brief overview for AI analysis..."
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3.5 text-slate-400 font-bold hover:text-slate-600 transition-colors"
            >
              Discard
            </button>
            <button
              disabled={loading}
              type="submit"
              className="bg-[#006699] hover:bg-[#004466] disabled:bg-slate-300 text-white px-10 py-3.5 rounded-2xl font-bold shadow-xl shadow-[#006699]/20 flex items-center gap-3 transition-all transform active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Encrypting...
                </>
              ) : (
                <>
                  <FileType className="w-5 h-5" />
                  Deposit Paper
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaperUpload;
