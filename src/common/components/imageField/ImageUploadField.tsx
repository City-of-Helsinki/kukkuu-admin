import React from 'react';
import { ImageInput, ImageField, useTranslate } from 'react-admin';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Box from '@mui/material/Box';

/**
 * Ensure that the preview works after user chooses image from their computer
 * Inspired by:
 * https://github.com/marmelab/react-admin/issues/2077#issuecomment-516821629
 * @param value Url from backend or File from ImageField
 */
function formatImage(value: string | File) {
  if (typeof value === 'string') {
    // Value is null or the url string from the backend,
    // wrap it in an object so the form input can handle it
    return { image: value };
  } else {
    // A new image is selected which results in a value object
    // already having a preview link under the url key
    return value;
  }
}

const ImageUploadField = (props: any) => {
  const translate = useTranslate();

  const { name, edit, image, helperText } = props;
  return (
    <ImageInput
      name={name}
      format={edit && formatImage}
      source={image}
      label={'events.fields.image.label'}
      accept="image/*"
      placeholder={
        <Box display="inline-flex" alignItems="center">
          <InsertPhotoIcon />
          {translate('events.fields.imageInput.label')}
        </Box>
      }
      helperText={helperText}
    >
      <ImageField source="image" title="title" />
    </ImageInput>
  );
};

export default ImageUploadField;
