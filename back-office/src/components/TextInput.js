import React from "react";
import { useTranslation } from "react-i18next";

function TextInput({
  value,
  label,
  onChange,
  name,
  placeholder,
  editMode,
  width,
  required,
  type,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <label className="form-label">{t(label)}</label>
      <input
        type={type}
        required={required ? true : false}
        style={{ width }}
        className="form-control rounded"
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={editMode ? false : true}
      />
    </div>
  );
}

export default TextInput;
