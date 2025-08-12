import ContactCollection from '../models/Contact.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (id) => {
  return await ContactCollection.findById(id);
};
