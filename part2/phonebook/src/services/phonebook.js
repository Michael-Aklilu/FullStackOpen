import axios from "axios";

const getAll = (setPerson) => {
  axios.get("http://localhost:3001/persons").then((contact) => {
    setPerson(contact.data);
    return contact.data;
  });
};

const addContact = (person, setPerson, persons, setIsVisible) => {
  const url = "http://localhost:3001/persons";
  axios.post(url, person).then((contact) => {
    const newPersons = persons.concat(contact.data);
    setPerson(newPersons);
    setIsVisible(true);
    return contact.data;
  });
};

const removeContact = (person, setPerson, persons) => {
  const urlToRemove = `http://localhost:3001/persons/${person.id}`;

  axios.delete(urlToRemove).then(() => {
    const updatedPersons = persons.filter((p) => p.id !== person.id);
    setPerson(updatedPersons);
    return updatedPersons.data;
  });
};

const updateContact = (
  person,
  number,
  setPerson,
  persons,
  setIsVisible,
  setShowError,
  setNotificationName,
  setErrorFound
) => {
  const urlToUpdate = `http://localhost:3001/persons/${person.id}`;

  const baseUrl = "http://localhost:3001/persons";

  const updatedPerson = { ...person, number: number };
  axios
    .put(urlToUpdate, updatedPerson)
    .then(() => {
      const newPerson = persons.filter((p) => p.id !== person.id);
      const updatedPersons = newPerson.concat(updatedPerson);
      setPerson(updatedPersons);
      setIsVisible(true);
      axios.get(baseUrl);
    })
    .catch(() => {
      setShowError(true);
      setErrorFound(true);
    });
};
export default { getAll, addContact, removeContact, updateContact };
