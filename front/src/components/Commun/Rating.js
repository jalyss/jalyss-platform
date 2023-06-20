
import ReactStars from 'react-stars';


function Rating({ rating, onChangeRate,edit }) {


  return (
    <div className='d-flex'>
      <ReactStars
        count={5}
        value={rating}
        onChange={onChangeRate}
        size={24}
        half={false}
        edit={edit}
        color1={'#D3D3D3'}
        color2={'#ffd700'}
      />
    </div>
  )
}




export default Rating
