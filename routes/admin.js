import AdminJSMongoose from "@adminjs/mongoose";
import adminjs from "adminjs";
import AdminJSExpress from "@adminjs/express";
import mongoose from "mongoose";
import adminModel from "../models/admin.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import user from "../models/userModel.js";
import servicesModel from "../models/services.js";
import appointmentModel from "../models/appointment.js";
import doctorModel from "../models/doctor.js";
import pharmacyModel from "../models/pharmacy.js";
import uploadFileFeature from "@adminjs/upload";
import reportModel from "../models/report.js";
dotenv.config();

const sessionStorage = {
  store: new MongoStore({
    mongoUrl: process.env.CONNECTION_URI,
  }),
  secret: "secret",
  saveUninitialized: true,
  resave: false,
};
adminjs.registerAdapter(AdminJSMongoose);
const locale = {
  translations: {
    labels: {
      loginWelcome: "Welcome",
    },
    messages: {
      loginWelcome: "Welcome to Andrew Health Service Admin Panel",
    },
  },
};

const Admin = new adminjs({
  databases: [mongoose],
  rootPath: "/admin",

  resources: [
    user,
    appointmentModel,
    reportModel,
    {
      resource: doctorModel,
      options: {
        properties: {
          profileImage: {
            isVisible: true,
          },
        },
      },
      features: [
        uploadFileFeature({
          provider: { local: { bucket: "uploads" } },
          properties: {
            key: "uploadedFile.path",
            bucket: "uploadedFile.folder",
            mimeType: "uploadedFile.type",
            size: "uploadedFile.size",
            filename: "uploadedFile.filename",
            file: "uploadFile",
          },
        }),
      ],
    },
    {
      resource: pharmacyModel,
      options: {
        properties: {
          uploadedFile: {
            isVisible: false,
          },
        },
      },
      features: [
        uploadFileFeature({
          provider: { local: { bucket: "uploads" } },
          properties: {
            key: "uploadedFile.path",
            bucket: "uploadedFile.folder",
            mimeType: "uploadedFile.type",
            size: "uploadedFile.size",
            filename: "uploadedFile.filename",
            file: "uploadFile",
          },
        }),
      ],
    },
    {
      resource: servicesModel,
      options: {
        properties: {
          uploadedFile: {
            isVisible: false,
          },
        },
      },
      features: [
        uploadFileFeature({
          provider: { local: { bucket: "uploads" } },
          properties: {
            key: "uploadedFile.path",
            bucket: "uploadedFile.folder",
            mimeType: "uploadedFile.type",
            size: "uploadedFile.size",
            filename: "uploadedFile.filename",
            file: "uploadFile",
          },
        }),
      ],
    },
  ],
  locale: locale,

  branding: {
    companyName: "Andrew Health Service",
    softwareBrothers: false,
    logo: "/andrews_health_logo.png",
    withMadeWithLove: false,
  },
});

const router = AdminJSExpress.buildAuthenticatedRouter(
  Admin,
  {
    cookieName: "Doctor",
    cookiePassword: "Doctor",
    authenticate: async (email, password) => {
      const user = await adminModel.findOne({ email });
      if (!user) {
        return null;
      }
      if (password !== user.password) {
        return null;
      }
      return user;
    },
    cookiePassword: "admin",
  },
  null,
  sessionStorage
);

export default router;
