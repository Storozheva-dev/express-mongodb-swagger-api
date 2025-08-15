import { Router } from 'express';
import {
  getContactByIdController,
  getAllContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

// всі контакти
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

// по айді
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

// пост
contactsRouter.post('/', ctrlWrapper(createContactController));

// оноалення
contactsRouter.patch('/:contactId', ctrlWrapper(updateContactController));

// видалення
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
