export interface User {
  id: string;
  email: string;
  name: string;
  divisi: string;
  vote? : {
    id: string;
    userId: string;
    candidateId: string;
    createdAt: string;
  };
}

export interface Candidate {
  id: string;
  name: string;
  vision: string[] | string;
  mission: string[] | string;
  divisi: string;
  kelas: string;
  jurusan: string;
  image?: string;
  href?: string;
}

export interface Vote {
  id: string;
  userId: string;
  candidateId: string;
  createdAt: string;
}

export interface VoteStats {
  totalUsers: number;
  votedUsers: number;
  notVotedUsers: number;
}

export interface VotePercentage {
  votedPercentage: string;
  notVotedPercentage: string;
}

export interface CurrentUser {
  message?:string;
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface WinnerCandidates {
  name: string;
  percentage: number;
    image: string;
  division?: string;
}