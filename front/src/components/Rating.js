import { AiFillStar } from 'react-icons/ai'

function Rating({ rate, onChangeRate, disabled }) {
  const stars = ['1', '2', '3', '4', '5']

  return (
    <div className='d-flex'>
      {stars.map((star) => (
        <span key={star} onClick={() => !disabled && onChangeRate(star)}>
          <AiFillStar fill={star <= rate ? '#edcc3f' : '#d4d4d4'} />
        </span>
      ))}
    </div>
  )
}

export default Rating
