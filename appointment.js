import adminjs from "adminjs";
import appointmentModel from "./models/appointment.js";

import { after, before } from "./hooks/upload-image.js";

/** @type {adminjs.ResourceOptions} */
const options = {
  properties: {
    imagePath: {
      isVisible: false,
    },
    uploadImage: {
      components: {
        edit: adminjs.bundle("./components/upload-image.edit.tsx"),
        list: adminjs.bundle("./components/upload-image.list.tsx"),
      },
    },
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(
          response,
          request,
          context
        );
        return uploadAfterHook(modifiedResponse, request, context);
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context);
        return uploadBeforeHook(modifiedRequest, context);
      },
    },
    edit: {
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(
          response,
          request,
          context
        );
        return uploadAfterHook(modifiedResponse, request, context);
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context);
        return uploadBeforeHook(modifiedRequest, context);
      },
    },
    show: {
      isVisible: false,
    },
  },
};

module.exports = {
  options,
  resource: Company,
};
