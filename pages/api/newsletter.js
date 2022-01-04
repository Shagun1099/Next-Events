import { insertDocument, UseMONGO } from '../../helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    UseMONGO(async (db) => {
      try {
        await insertDocument(db, 'emails', { email: userEmail });

        res.status(201).json({ message: "Signed Up!!" });
      } catch (e) {
        res.status(500).json({ message: "Inserting document failed!" });
      }
    });
  }
}

export default handler;