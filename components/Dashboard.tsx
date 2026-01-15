
import React, { useState, useEffect } from 'react';
import { User, Paper } from '../types';
import { storageService } from '../services/storageService';
import PaperCard from './PaperCard';
import PaperUpload from './PaperUpload';
import PaperViewer from './PaperViewer';
import Logo from './Logo';
import { Plus, Search, LogOut, Layers, Filter, Microscope, GraduationCap, ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [search, setSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Papers');

  useEffect(() => {
    setPapers(storageService.getPapers(user.username));
  }, [user.username]);

  const handlePaperUpload = (newPaper: Paper) => {
    storageService.savePaper(user.username, newPaper);
    setPapers(storageService.getPapers(user.username));
    setIsUploadOpen(false);
  };

  const handleDeletePaper = (paperId: string) => {
    storageService.deletePaper(user.username, paperId);
    setPapers(storageService.getPapers(user.username));
    setSelectedPaper(null);
  };

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()));

    if (activeCategory === 'All Papers') return matchesSearch;
    if (activeCategory === 'Research') return matchesSearch; // For now shows all, could be filtered by tags
    if (activeCategory === 'Conferences') return matchesSearch && p.type === 'Conference';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Modern Design */}
      <aside className="fixed left-0 top-0 h-full w-20 md:w-72 bg-white border-r border-slate-200 z-30 hidden sm:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Logo className="w-10 h-10 drop-shadow-sm" />
          <span className="font-extrabold text-2xl text-slate-800 hidden md:block tracking-tight">PaperVault</span>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-1">
          <button 
            onClick={() => setActiveCategory('All Papers')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeCategory === 'All Papers' ? 'bg-[#0088AA]/10 text-[#006699]' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Layers className="w-5 h-5" />
            <span className="hidden md:block">My Library</span>
          </button>

          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] hidden md:block">Discovery</p>
          </div>

          <button 
            onClick={() => setActiveCategory('Research')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeCategory === 'Research' ? 'bg-[#0088AA]/10 text-[#006699]' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Microscope className="w-5 h-5" />
            <span className="hidden md:block">Research</span>
          </button>

          {/* Sub-menu Conferences */}
          <button 
            onClick={() => setActiveCategory('Conferences')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 ml-0 md:ml-4 rounded-2xl font-bold transition-all ${activeCategory === 'Conferences' ? 'bg-[#0088AA]/10 text-[#006699]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          >
            <div className="hidden md:block">
               <ChevronRight className={`w-3 h-3 transition-transform ${activeCategory === 'Conferences' ? 'rotate-90' : ''}`} />
            </div>
            <GraduationCap className="w-5 h-5" />
            <span className="hidden md:block">Conferences</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006699] to-[#0088AA] flex items-center justify-center text-white font-bold shadow-lg">
              {user.username[0].toUpperCase()}
            </div>
            <div className="hidden md:block overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{user.username}</p>
              <p className="text-xs text-[#0088AA] font-medium">Vault Master</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-20 md:ml-72 p-4 md:p-10 min-h-screen">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {activeCategory}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {filteredPapers.length} publications indexed in your secure vault
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#0088AA] transition-colors" />
              <input 
                type="text" 
                placeholder="Search your vault..." 
                className="pl-11 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-[#0088AA]/10 focus:border-[#0088AA] outline-none w-full lg:w-80 shadow-sm transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-[#006699] hover:bg-[#004466] text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#006699]/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Deposit
            </button>
          </div>
        </header>

        {/* Paper Grid */}
        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredPapers.map(paper => (
              <PaperCard key={paper.id} paper={paper} onView={setSelectedPaper} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
              <Logo className="w-12 h-12 grayscale opacity-20" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800">The vault is quiet</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-sm text-center">
              Your research collection for "{activeCategory}" is currently empty. Start by uploading a paper.
            </p>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 rounded-2xl font-bold transition-all"
            >
              Deposit Research
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {isUploadOpen && (
        <PaperUpload 
          onClose={() => setIsUploadOpen(false)} 
          onUpload={handlePaperUpload}
        />
      )}

      {selectedPaper && (
        <PaperViewer 
          paper={selectedPaper} 
          onClose={() => setSelectedPaper(null)} 
          onDelete={handleDeletePaper}
        />
      )}
    </div>
  );
};

export default Dashboard;
