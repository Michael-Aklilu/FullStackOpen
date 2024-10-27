import { useState, useEffect } from "react";
import phoneBookService from "./services/phonebook";

const Notification = ({ isVisible, name, setIsVisible }) => {
  const style = {
    borderStyle: "solid",
    color: "green",
    fontSize: "20px",
    backgroundColor: "lightGrey",
    width: "22em",
    borderRadius: "1em",
    padding: "0.5em",
  };
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  }, [isVisible]);

  if (isVisible) {
    return <div style={style}>Added {name} </div>;
  }
};

const ErrorMessage = ({ showError, setShowError, name }) => {
  const style = {
    borderStyle: "solid",
    color: "red",
    fontSize: "20px",
    backgroundColor: "lightGrey",
    width: "22em",
    borderRadius: "1em",
    padding: "0.5em",
  };
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  }, [showError]);

  if (showError) {
    return (
      <div style={style}>
        Information of {name} has already been removed from the server
      </div>
    );
  }
};

const DeleteContact = (event, person, setPersons, persons) => {
  event.preventDefault();

  const userInput = window.confirm(`Delete ${person.name}?`);

  if (userInput) phoneBookService.removeContact(person, setPersons, persons);
};

const Persons = ({ persons, newSearch, searchedPeople, setPersons }) => {
  return (
    <div style={{ listStyleType: "none" }}>
      {newSearch === ""
        ? persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button
                onClick={(event) =>
                  DeleteContact(event, person, setPersons, persons)
                }
              >
                Delete
              </button>
            </li>
          ))
        : searchedPeople.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button
                onClick={(event) =>
                  DeleteContact(event, person, setPersons, persons)
                }
              >
                Delete
              </button>
            </li>
          ))}
    </div>
  );
};

const PersonForm = ({
  setNewName,
  setNewNumber,
  newName,
  newNumber,
  persons,
  setPersons,
  setIsVisible,
  setNotificationName,
  setShowError,
  setErrorFound,
  errorFound,
}) => {
  const HandleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const AddPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (isDuplicate) {
      const userInput = window.confirm(
        `${newName} is already added to the phonebook,replace the old number with a new one?`
      );

      if (userInput) {
        const toUpdate = persons.find((person) => person.name === newName);
        phoneBookService.updateContact(
          toUpdate,
          newNumber,
          setPersons,
          persons,
          setIsVisible,
          setShowError,
          setNotificationName,
          setErrorFound
        );
        if (errorFound) {
          phoneBookService.addContact(
            personObj,
            setPersons,
            persons,
            setIsVisible
          );
        }
      }
    } else {
      phoneBookService.addContact(personObj, setPersons, persons, setIsVisible);
    }

    setNotificationName(newName);
    setNewName("");
    setNewNumber("");
  };
  return (
    <>
      <div>
        Name: <input value={newName} onChange={HandleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={HandleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={AddPerson}>
          add
        </button>
      </div>
    </>
  );
};

const Filter = ({ setNewSearch, setSearchedPeople, persons, newsearch }) => {
  const handleSearchValue = (event) => {
    setNewSearch(event.target.value);
    setSearchedPeople(
      persons.filter((person) =>
        person.name.toLowerCase().includes(newsearch.toLowerCase())
      )
    );
  };
  return (
    <div>
      Filter shown with{" "}
      <input newsearch={newsearch} onChange={handleSearchValue} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [searchedPeople, setSearchedPeople] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationName, setNotificationName] = useState("");
  const [showError, setShowError] = useState(false);

  const [errorFound, setErrorFound] = useState(false);

  const Hook = () => {
    phoneBookService.getAll(setPersons);
  };
  useEffect(Hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage
        setShowError={setShowError}
        showError={showError}
        name={notificationName}
      />
      <br />
      <Notification
        name={notificationName}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Filter
        newsearch={newSearch}
        persons={persons}
        setNewSearch={setNewSearch}
        setSearchedPeople={setSearchedPeople}
      />
      <br />
      <div>
        <h2>Add a new</h2>
        <PersonForm
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          persons={persons}
          setPersons={setPersons}
          newName={newName}
          newNumber={newNumber}
          setIsVisible={setIsVisible}
          setNotificationName={setNotificationName}
          setShowError={setShowError}
          setErrorFound={setErrorFound}
          errorFound={errorFound}
        />

        <h2>Numbers</h2>
        <Persons
          persons={persons}
          searchedPeople={searchedPeople}
          newSearch={newSearch}
          setPersons={setPersons}
        />
      </div>
    </div>
  );
};

export default App;
