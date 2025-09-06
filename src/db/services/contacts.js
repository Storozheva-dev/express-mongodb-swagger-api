import ContactCollection from '../models/Contact.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId, ...filter }).select(
    '-__v',
  );

  const contactsCount = await ContactCollection.countDocuments({
    userId,
    ...filter,
  });

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id, userId) => {
  return ContactCollection.findOne({ _id: id, userId }).select('-__v');
};

export const createContact = async (contactData) => {
  return ContactCollection.create(contactData);
};

export const updateContactById = async (id, updateData, userId) => {
  return ContactCollection.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
  }).select('-__v');
};

export const deleteContactById = async (id, userId) => {
  return ContactCollection.findOneAndDelete({ _id: id, userId }).select('-__v');
};
