import React from 'react';

function KeyValueStyled({ label, value }) {
  return (
    <div className="d-flex flex-wrap gap-2 mt-2 ">
      <div style={{ fontWeight: "bold" }}>{label} :</div>
      {Array.isArray(value) ? (
        
        value.map((el, index) => <div key={index}>{el} ,</div>)
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}

export default KeyValueStyled;
