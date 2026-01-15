
import React from 'react';
import { Paper } from '../types';
import { FileText, Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface PaperCardProps {
  paper: Paper;
  onView: (paper: Paper) => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, onView }) => {
  return (
    <div 
      className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onView(paper)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
          <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
          {paper.type}
        </span>
      </div>
      
      <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-3 group-hover:text-indigo-600 transition-colors">
        {paper.title}
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <User className="w-4 h-4" />
          <span className="truncate">{paper.author}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <Calendar className="w-4 h-4" />
          <span>{paper.uploadDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {paper.keywords.slice(0, 3).map((kw, i) => (
          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" /> {kw}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-indigo-600 font-semibold text-sm">
        View Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default PaperCard;
