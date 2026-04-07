import type { Type } from "../../generated/prisma/client.js";

export interface Tag {
  id: number,
  name: string,
  type: Type
}

export interface Service {
  id: number;
    name: string;
    basePrice: number;
    durationMin: number;
    imgUrl: string,
    isActive: boolean,
    tags: Tag[]
}
export interface ServiceWithTags {
  id: number;
  name: string;
  basePrice: number;
  durationMin: number;
  imgUrl: string;
  isActive: boolean;
  serviceTags: {
    tag: {
      id: number;
      name: string;
      type: Type;
    };
  }[];
};

export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
export interface paginatedServiceResult {
  pagination: Pagination;
  data: Service[];
}

export interface ServiceFilter {
  tag?: string | undefined;
  isFeatured?: boolean | undefined;
}