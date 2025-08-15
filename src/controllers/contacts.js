import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../db/services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const data = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully retrieved all contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully retrieved contact by id',
    data,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavorite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Missing required fields');
  }
  const newContact = await createContact({
    name,
    phoneNumber,
    email,
    isFavorite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

//  оновлюю
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  const updatedContact = await updateContactById(contactId, updateData);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

// деліт
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactById(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
