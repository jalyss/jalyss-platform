import axios from "axios";

export const uploadFileAxios = async (image, fnProgress, fnError) => {
  let configs = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  if ( fnProgress) {
    configs = {
      ...configs,
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        fnProgress(Math.round((100 * data.loaded) / data.total));
      },
    };
  }
  try {
    const response = await axios.post(
      `${process.env.SERVER_UPLOAD_CONFIG}/upload`,
      image,
      configs
    );
    return response
  } catch (error) {
    console.log(error);
    if (fnError) {
      const { code } = error?.response?.data;
      switch (code) {
        case "FILE_MISSING":
          fnError("Please select a file before uploading!");
          break;
        default:
          fnError("Sorry! Something went wrong. Please try again later");
          break;
      }
    }
  }
};
