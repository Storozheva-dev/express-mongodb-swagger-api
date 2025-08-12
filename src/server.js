import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './db/services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // всі контакти
  app.get('/contacts', async (req, res) => {
    try {
      const data = await getAllContacts();
      return res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving contacts',
        error: error.message,
      });
    }
  });

  // по айді
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const data = await getContactById(contactId);

      if (!data) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      return res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error retrieving contact',
        error: error.message,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Contact not found',
    });
  });

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
