export const calculatePaginationData = (totalItems, perPage, page) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(page, totalPages);

  return {
    page: safePage,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };
};
