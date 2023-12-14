import React, { useState } from 'react'
import '../../assets/styles/filters.css'
import { IoIosArrowDropdown } from 'react-icons/io'

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="accordion">
      <div
        className={`accordion-toggle ${isOpen && 'accordion-toggle-active'}`}
        onClick={toggleAccordion}
      >
        <h6 className="m-0">{title}</h6>
        <IoIosArrowDropdown size={25} className={isOpen && 'arrow-icon'} />
      </div>
      <div
        className={`accordion-content ${isOpen && 'open'}`}
        aria-expanded={isOpen}
      >
        {content}
      </div>
    </div>
  )
}

export default Accordion
