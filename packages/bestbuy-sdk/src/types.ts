export type BestbuyPaginationResponse<T> = T & {
  from: number;
  to: number;
  currentPage: number;
  total: number;
  totalPages: number;
  queryTime: string;
  totalTime: string;
  partial: boolean;
  canonicalUrl: string;
};

export type BestbuyRecommendationResponse<T> = {
  metadata: {
    context: { canonicalUrl: string };
    resultSet: { count: number };
  };
  results: Array<T>;
};
