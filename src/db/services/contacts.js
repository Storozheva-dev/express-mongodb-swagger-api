import ContactCollection from '../models/Contact.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find(filter).select('-__v');

  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

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

export const getContactById = async (id) => {
  return await ContactCollection.findById(id).select('-__v');
};

// для методу пост
export const createContact = async (contactData) => {
  const newContact = await ContactCollection.create(contactData);
  return newContact;
};

// оновлюєм
export const updateContactById = async (id, updateData) => {
  const updatedContact = await ContactCollection.findByIdAndUpdate(
    id,
    updateData,
    { new: true },
  );
  return updatedContact;
};

// видалеяєм
export const deleteContactById = async (id) => {
  const deletedContact = await ContactCollection.findByIdAndDelete(id);
  return deletedContact;
};
