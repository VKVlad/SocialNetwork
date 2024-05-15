const cloud_name = "dbb1stbmp";
const upload_preset = "orjkpus0";

export const uploadToCloud = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "post",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed with status: ${res.status}`);
    }

    const fileData = await res.json();

    return fileData.url;
  } else {
    console.log("error.......");
  }
};
