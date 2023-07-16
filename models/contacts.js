const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

// const listContacts = async () => {};

// const getContactById = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => { };

// const removeContact = async (contactId) => {};

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((item) => item.id === contactId);
  return contactById || null;
}

async function addContact(data) {
  const allContacts = await listContacts();

  const newContact = { id: nanoid(), ...data };
  allContacts.push(newContact);

  console.log("contactsPath", contactsPath);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  delete body.id;

  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("contacts[index]", contacts[index]);
  return contacts[index];
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
