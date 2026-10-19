import {
  MemberRole,
  TemplateKey,
} from './enums';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  /** Total number of pages derived from total / limit. Always present in API responses. */
  totalPages: number;
}

/** Standard envelope for all successful API responses. */
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

/** Shape of error bodies returned by the API on non-2xx responses. */
export interface ApiErrorDetail {
  field?: string;
  message: string;
}

/** Top-level error wrapper included in non-2xx API responses. */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
    requestId?: string;
  };
}

export interface ProfileDto {
  id: string;
  fullName: string;
  avatarUrl?: string;
  primaryRole?: TemplateKey;
  locale: string;
  timezone: string;
  createdAt: string;
}

export interface WorkspaceDto {
  id: string;
  ownerId: string;
  name: string;
  template: TemplateKey;
  icon?: string;
  color?: string;
  currency: string;
  createdAt: string;
}

export interface WorkspaceMemberDto {
  workspaceId: string;
  userId: string;
  role: MemberRole;
  joinedAt: string;
  user?: ProfileDto;
}
