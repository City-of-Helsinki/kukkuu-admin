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

type ImageUploadFieldProps = {
  name?: string;
  edit: boolean;
  image: string;
  source: string;
  helperText: string;
};

const ImageUploadField = ({
  name,
  edit,
  image,
  source,
  helperText,
}: ImageUploadFieldProps) => {
  const translate = useTranslate();

  return (
    <ImageInput
      name={name || source}
      format={edit ? formatImage : undefined}
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
      <ImageField source={edit ? source : 'src'} title="title" />
    </ImageInput>
  );
};

export default ImageUploadField;
