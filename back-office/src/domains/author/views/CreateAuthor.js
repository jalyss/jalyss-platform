import React from 'react'

function CreateAuthor() {
    return (
        <div>
            <div className='container'>
                <div className='d-flex  justify-content-center'>
            <div className='card ' style={{width:600 }}>
            <div className='container'>
                <form>
                    <div class="form-group mt-3">
                        <label >Name AR</label>
                        <input type="text" class="form-control mt-2 " style={{width:300}} placeholder="باللغة العربية" />
                    </div>
                    <div class="form-group mt-3">
                        <label >Biography AR</label>
                        <textarea class="form-control mt-2"  rows="3"></textarea>
                    </div>
                    <div class="form-group mt-3">
                        <label >Name EN</label>
                        <input type="text" class="form-control mt-2" style={{width:300}}  placeholder="English language" />
                    </div>
                    <div class="form-group mt-3">
                        <label >biography EN</label>
                        <textarea class="form-control mt-2 mb-3"  rows="3"></textarea>
                    </div>
                    <button className='btn btn-primary mb-3'> ADD Author</button>
                </form>
                </div>
            </div>
            </div>
            </div>
        </div>

    )
}

export default CreateAuthor
