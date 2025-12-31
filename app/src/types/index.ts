export interface Comment {
  author: string;
  body: string;
}

export interface Post {
  _id: string;
  author: string;
  title: string;
  tags: string[];
  body: string;
  date: string;
  comments?: Comment[];
}

export interface PostSummaryData {
  _id: string;
  author: string;
  title: string;
  tags?: string[];
  date: string;
}

