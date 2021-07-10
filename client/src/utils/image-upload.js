export const checkImage = (file) => {
  if (!file) {
    return "File does not exist.";
  }

  if (file.size > 1024 * 1024) {
    return "The largest image size is 1mb.";
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return "Image format is incorrect.";
  }

  return '';
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    formData.append("file", item.camera ? item.camera : item);
    formData.append("upload_preset", "efxjficn");
    formData.append("cloud_name", "devat-channel");

    const res = await fetch("https://api.cloudinary.com/v1_1/devat-channel/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
