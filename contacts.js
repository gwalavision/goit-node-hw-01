import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = () => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    return console.table(JSON.parse(data));
  });
};

const getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    return console.table(
      JSON.parse(data).filter((item) => item.id === Number(contactId))
    );
  });
};

const removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    return console.table(
      JSON.parse(data).filter((item) => item.id !== Number(contactId))
    );
  });
};

const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    const contacts = JSON.parse(data);

    const id = contacts.map((item) => item.id).reverse()[0] + 1;
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const newContacts = JSON.stringify([...contacts, newContact], null, "\t");

    fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) throw err;
      return [
        console.log("Contact added succesfully"),
        console.table(JSON.parse(newContacts)),
      ];
    });
  });
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
