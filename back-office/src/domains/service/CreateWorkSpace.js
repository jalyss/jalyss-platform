import React, { useEffect, useState } from "react";
import "../../assets/styles/WorkSpaceCreation.css"

export default function CreateWorkSpace() {
  return (
    <div className="container">

<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" />
  </div>
  <div class="form-group">
  <label for="exampleFormControlInput1">Capacity</label>
    <input type="number" class="form-control" id="exampleFormControlInput1" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Price</label>
    <input type="number" class="form-control" id="exampleFormControlInput1"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Discription</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Amenities</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Image file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>
</form>
<button type="submit" class="btn btn-primary mb">Add the Space</button>
</div>
  );
}

