
import React, { useState } from 'react';
import { Paper } from '../types';
import { X, ExternalLink, Download, Share2, Trash2, Tag, FileText, Globe, Presentation, FileBox, LayoutTemplate } from 'lucide-react';

interface PaperViewerProps {
  paper: Paper;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const PaperViewer: React.FC<PaperViewerProps> = ({ paper, onClose, onDelete }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions = [
    { name: 'Canva', icon: <LayoutTemplate className="w-5 h-5 text-purple-600" />, color: 'hover:bg-purple-50' },
    { name: 'Word', icon: <FileText className="w-5 h-5 text-blue-600" />, color: 'hover:bg-blue-50' },
    { name: 'PowerPoint', icon: <Presentation className="w-5 h-5 text-orange-600" />, color: 'hover:bg-orange-50' },
    { name: 'Google Slides', icon: <Globe className="w-5 h-5 text-yellow-600" />, color: 'hover:bg-yellow-50' },
    { name: 'PDF', icon: <FileBox className="w-5 h-5 text-red-600" />, color: 'hover:bg-red-50' },
  ];

  const handleExport = (platform: string) => {
    alert(`Exporting "${paper.title}" to ${platform}... This feature is being simulated for PaperDock.`);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Left Side: Meta & Abstract */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              {paper.type}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-4 leading-tight">{paper.title}</h2>
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Author</p>
                <p className="text-slate-700 font-semibold">{paper.author}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Uploaded</p>
                <p className="text-slate-700 font-semibold">{paper.uploadDate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Abstract</h3>
              <p className="text-slate-600 leading-relaxed text-justify italic">
                {paper.abstract}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {paper.keywords.map((kw, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 text-sm hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
                    <Tag className="w-3.5 h-3.5 text-slate-400" /> {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Actions & Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 p-8 border-l border-slate-200 flex flex-col">
          <div className="flex justify-end mb-8">
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-600 transition-colors">
                  <Download className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                </div>
                <span className="font-bold text-slate-700">Source File</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </button>

            <div className="pt-4">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-4">Export to Platform</p>
              <div className="grid grid-cols-1 gap-2">
                {exportOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => handleExport(opt.name)}
                    className={`flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl transition-all ${opt.color} hover:border-slate-300`}
                  >
                    {opt.icon}
                    <span className="text-sm font-semibold text-slate-700">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 p-3 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
              <Share2 className="w-4 h-4" /> Share Access
            </button>
            <button 
              onClick={() => {
                if(confirm('Are you sure you want to delete this paper?')) onDelete(paper.id);
              }}
              className="w-full flex items-center justify-center gap-2 p-3 text-slate-400 hover:text-red-600 font-bold transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete Paper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperViewer;
