import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../assets/styles/carousel.css'


function CarouselImages({ images }) {
  return (
    <Carousel>
      {images.map((image) => (
        <Carousel.Item>
          <img src={image} class="d-block w-100 image-carousel"   alt="Wild Landscape" />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselImages
