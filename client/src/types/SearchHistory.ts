type HistoryDocuments = {
  userid: string;
  origin: string;
  time: string;
  _id: string;
  data: {
    query: string;
    trackerid?: string;
  };
};

export type SearchHistoryType = {
  _id: string;
  userid: string;
  history: HistoryDocuments[];
};
