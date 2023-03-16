import React from "react";
import Label from "adminjs";
import Box from "adminjs";
import DropZone from "adminjs";
import DropZoneItem from "adminjs";

const Edit = (props) => {
  const { property, onChange, record } = props;

  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);
  };

  const uploadedPhoto = record.params.profilePhotoLocation;
  const photoToUpload = record.params[property.name];

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />}
    </Box>
  );
};

export default Edit;
