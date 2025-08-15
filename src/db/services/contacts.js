import ContactCollection from '../models/Contact.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (id) => {
  return await ContactCollection.findById(id);
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
