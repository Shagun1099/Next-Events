import { getAllDocuments, insertDocument, UseMONGO } from '../../../helpers/db-utils';

const handler = async (req, res) => {

  const eventId = req.query.eventId;


  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email || !name || !text || !email.includes('@')) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newComment = { name, email, text, eventId };

    UseMONGO(async (db) => {

      try {
        const result = await insertDocument(db, 'comments', newComment);

        newComment._id = result.insertedId;

        res.status(201).json({ message: "Added Comment!!", Comment: newComment });
      } catch (e) {
        res.status(500).json({ message: "Inserting document failed!" });
      }
    });

  }

  if (req.method === 'GET') {
    UseMONGO(async (db) => {
      try {
        const result = await getAllDocuments(db, 'comments', { _id: -1 }, { eventId: eventId });
        res.status(200).json({ comments: result });
      }
      catch (e) {
        res.status(500).json({ message: "Getting comments failed!" });
      }
    })
  }

}

export default handler;