import React from 'react';

function KeyValueStyled({ label, value }) {
  return (
    <div className="d-flex flex-wrap  gap-2 mt-2 ">
      <div style={{ fontWeight: "bold" }}>{label} :</div>
      {Array.isArray(value) ? (
        
        value.map((el, index) => <pre className="d-flex" key={index}>{el} {value.length === 1 || el === value[value.length-1]? "" :","}</pre>)
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}

export default KeyValueStyled;
