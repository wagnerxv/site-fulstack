import type { Event } from "../event/event.interface";

/**
 * Represents a User entity.
 */
export interface User {
  /** Id's id property */
  id: string;
  /** Name's name property */
  name: string;
  /** Picture path for user avatar */
  picturePath: string | null;
  /** Related Event entities */
  events?: Event[];
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new User.
 */
export interface CreateUserDTO {
  /** Name's name property  */
  name: string;
  /** Picture path for user avatar */
  picturePath?: string | null;
}

/**
 * Data transfer object for updating an existing User.
 */
export interface UpdateUserDTO {
  /** Name's name property  */
  name?: string;
  /** Picture path for user avatar */
  picturePath?: string | null;
}

/**
 * Query parameters for fetching User entities
 */
export interface UserQueryParams {
  /** Current page number for pagination */
  page?: number;
  /** Number of items to return per page */
  limit?: number;
  /** Property to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: "asc" | "desc";
  /** Search term for filtering */
  search?: string;
}
