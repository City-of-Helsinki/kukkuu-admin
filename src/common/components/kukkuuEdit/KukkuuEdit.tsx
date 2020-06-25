import { Edit } from 'react-admin';
import { styled } from '@material-ui/core/styles';

const KukkuuEdit = styled(Edit)({
  '&> .MuiToolbar-regular  ': {
    justifyContent: 'flex-start',
  },
});

export default KukkuuEdit;
