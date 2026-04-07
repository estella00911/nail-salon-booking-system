import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { paginatedServiceResult, Pagination, Service, ServiceFilter } from "./service.interface.js";

export const getAllServices = async(filter?: ServiceFilter): Promise<Service[]> => {
  const where = buildServiceWhere(filter);

  
  const services = await prisma.service.findMany({
    where,
    orderBy: serviceOrderBy,
    select: serviceSelect,
  });

  const data = mapService(services);
  return data;
}

export const getPaginatedServices = async(
  page: number, 
  pageSize: number,
  filter?: ServiceFilter
): Promise<paginatedServiceResult> => {

  const where = buildServiceWhere(filter);
  
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [total, services] = await Promise.all([
    prisma.service.count({ where }),
    prisma.service.findMany({
      where,
      skip, 
      take,
      orderBy: serviceOrderBy,
      select: serviceSelect,
    })
  ]);
  const data:Service[] = mapService(services);
  const pagination: Pagination = {
    page,
    pageSize,
    total, 
    totalPages: Math.ceil(total / pageSize)
  }
  return {pagination, data} as paginatedServiceResult;
}

export const getServiceById = async (id: number): Promise<Service> => {
  const service = await prisma.service.findUnique({
    where: { id },
    select: serviceSelect,
  });

  if (!service) {
    throw new AppError(ERROR_CODES.SERVICE.NOT_FOUND);
  }

  const data: Service = {
    id: service.id,
    name: service.name,
    basePrice: service.basePrice,
    durationMin: service.durationMin,
    imgUrl: service.imgUrl,
    isActive: service.isActive,
    tags: service.serviceTags.map((st) => ({
      id: st.tag.id,
      name: st.tag.name,
      type: st.tag.type,
    })),
  };

  return data;
};

const mapService = (services:ServiceRowWithTags[]): Service[] => {
  return services.map((service) => ({
      id: service.id,
      name: service.name,
      basePrice: service.basePrice,
      durationMin: service.durationMin,
      imgUrl: service.imgUrl,
      isActive: service.isActive,
      tags: service.serviceTags.map((st) => ({
        id: st.tag.id,
        name: st.tag.name,
        type: st.tag.type,
      }))
    }));
}

const buildServiceWhere = (filter?: ServiceFilter): Prisma.ServiceWhereInput => {
  return {
    isActive: true,

    ...(filter?.isFeatured !== undefined && {
      isFeatured: filter.isFeatured,
    }),
    ...(filter?.tag !== undefined && {
      serviceTags: {
        some: {
          tag: {
            slug: filter.tag
          }
        }
      }
    })
  }
}

const serviceOrderBy = [
  { isFeatured: "desc" },
  { featureOrder: "asc" },
  { createdAt: "desc" },
] satisfies Prisma.ServiceOrderByWithRelationInput[];

const serviceSelect = {
  id: true,
  name: true,
  basePrice: true,
  durationMin: true,
  imgUrl: true,
  isActive: true,
  serviceTags: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  },
} satisfies Prisma.ServiceSelect;

type ServiceRowWithTags = Prisma.ServiceGetPayload<{select: typeof serviceSelect;}>;