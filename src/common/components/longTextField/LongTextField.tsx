import { TextField } from 'react-admin';

const LongTextField = (props: any) => {
  return <TextField sx={{ whiteSpace: 'pre-wrap' }} {...props} />;
};

export default LongTextField;
