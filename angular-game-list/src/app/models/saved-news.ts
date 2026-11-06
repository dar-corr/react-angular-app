export interface SavedNews {
  id: number;
  title: string;
  savedAt: string;
  readAt: string | null;
}

export interface ReadingHistoryEntry {
  newsId: number;
  title: string;
  readAt: string;
}
