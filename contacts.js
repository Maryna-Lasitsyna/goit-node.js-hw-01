const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Путь к файлу с контактами
const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

// Функция для получения списка контактов
const listContacts = async () => {
  //  Возвращает массив контактов.
  const data = await fs.readFile(contactsPath, "utf-8");
  // Преобразуем JSON данные в объект
  return JSON.parse(data);
};
console.log(listContacts);

// Функция для получения контакта по его идентификатору
const getContactById = async (contactId) => {
  // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};
console.log(getContactById);

// Функция для удаления контакта по его идентификатору
const removeContact = async (contactId) => {
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};
console.log(removeContact);

// Функция для добавления нового контакта
const addContact = async (data) => {
  //  Возвращает объект добавленного контакта.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
console.log(addContact);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
