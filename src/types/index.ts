// Re-export types from calculator module
export type {
  BookmakerInfo,
  TeamNames,
  BookmakerOdds,
  ArbitrageResult,
  Customer,
} from '@/lib/calculator';

// Additional Next.js specific types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
