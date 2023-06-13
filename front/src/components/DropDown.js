import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";

function DropDown() {
  return (
    <Dropdown>
    <Dropdown.Toggle
      className="ellipsis-btn dropdownToggleBlogCard"
      style={{ all: "unset" }}
    >
      <span>&#8942;</span>
    </Dropdown.Toggle>
    <Dropdown.Menu size="sm" title="">
      <>
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Update</Dropdown.Item>
      </>

      <Dropdown.Item>Save</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default DropDown
