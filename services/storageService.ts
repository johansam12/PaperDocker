
import { User, Paper } from '../types';

const USERS_KEY = 'papervault_users';
const PAPERS_KEY_PREFIX = 'papervault_papers_';

export const storageService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = storageService.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getPapers: (username: string): Paper[] => {
    const data = localStorage.getItem(`${PAPERS_KEY_PREFIX}${username}`);
    return data ? JSON.parse(data) : [];
  },

  savePaper: (username: string, paper: Paper) => {
    const papers = storageService.getPapers(username);
    papers.unshift(paper);
    localStorage.setItem(`${PAPERS_KEY_PREFIX}${username}`, JSON.stringify(papers));
  },

  deletePaper: (username: string, paperId: string) => {
    const papers = storageService.getPapers(username);
    const updated = papers.filter(p => p.id !== paperId);
    localStorage.setItem(`${PAPERS_KEY_PREFIX}${username}`, JSON.stringify(updated));
  }
};
