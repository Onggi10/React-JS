import React from "react";
import Person from "./Person";

function NameList() {
  const person = [
    {
      id: 1,
      name: "Saya",
      age: 20,
      skill: "html",
    },
    {
      id: 1,
      name: "Onggi",
      age: 22,
      skill: "css",
    },
    {
      id: 1,
      name: "Sanjaya",
      age: 24,
      skill: "Next JS",
    },
  ];

  const personList = person.map(person => <Person person={person}/>);
  return (
    <div>
      {personList}
    </div>
  );
}
export default NameList;
