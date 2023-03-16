import path from "path";
import fs from "fs";
import adminjs from "adminjs";

/** @type {adminjs.After<adminjs.ActionResponse>} */
export const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    const filePath = path.join(
      "uploads",
      record.id().toString(),
      uploadImage.name
    );
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    await record.update({ profilePhotoLocation: `/${filePath}` });
  }
  return response;
};

/** @type {adminjs.Before} */
export const before = async (request, context) => {
  if (request.method === "post") {
    const { uploadImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};
