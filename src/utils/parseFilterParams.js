export const parseFilterParams = (query) => {
  const filter = {};

  const allowedTypes = ['work', 'home', 'personal'];
  if (query.type && allowedTypes.includes(query.type)) {
    filter.contactType = query.type;
  }

  if (query.isFavourite !== undefined) {
    const fav = query.isFavourite.toString().toLowerCase().trim();
    if (fav === 'true') filter.isFavourite = true;
    if (fav === 'false') filter.isFavourite = false;
  }

  return filter;
};
