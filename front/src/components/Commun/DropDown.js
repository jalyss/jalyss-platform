import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";

function DropDown({content1,content2,content3}) {
  return (
    <Dropdown>
    <Dropdown.Toggle
      className="ellipsis-btn dropdownToggleBlogCard"
      style={{ all: "unset" }}
    >
      <span>&#8942;</span>
    </Dropdown.Toggle>
    <Dropdown.Menu size="sm" title="">
   
        <Dropdown.Item>{content1}</Dropdown.Item>
        <Dropdown.Item>{content2}</Dropdown.Item>
    

      <Dropdown.Item>{content3}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default DropDown
