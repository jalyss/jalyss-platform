import React from "react";
import { useTranslation } from "react-i18next";

function Select({
  label,
  data,
  width,
  valueLabel,
  value,
  onChange,
  name,
  placeholder,
  viewLabel,
  editMode
}) {
    const {t}=useTranslation()
  return (
    <div>
      <label className="form-label">{t(label)}</label>
      <select
        style={{ width }}
        className="form-control rounded"
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={!editMode}
      >
        <option >No Option</option>
        {data.map((elem, i) => (
          <option key={i} value={elem[valueLabel]}>
            {elem[viewLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
