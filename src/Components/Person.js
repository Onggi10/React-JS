import React from 'react'

function Person({person}) {
  return (
    <div>
      <h2>
        Hallo I`M {person.name}. My Age is : {person.age}. My Skill :{" "}
        {person.skill} and i`m a profesional
      </h2>
    </div>
  );
}

export default Person
