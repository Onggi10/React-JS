import React from "react";

function NameList() {
  const name = ["Onggi", "Jejes", "Silvi", "Sanjaya"];

  const person = [
    {
      id: 1,
      name: "Saya",
      age: 20,
      skill: "html",
    },
    {
      id: 2,
      name: "Onggi",
      age: 22,
      skill: "css",
    },
    {
      id: 3,
      name: "Sanjaya",
      age: 24,
      skill: "Next JS",
    },
  ];

  const nameList = name.map((name, index) => (
    <h1 key={index}>
      {index} {name}
    </h1>
  ));
  return <div>{nameList}</div>;
}
export default NameList;
