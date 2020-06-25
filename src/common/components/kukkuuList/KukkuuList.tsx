import { List } from 'react-admin';
import { styled } from '@material-ui/core/styles';

const KukkuuList = styled(List)({
  '&> .MuiToolbar-regular ': {
    justifyContent: 'left',
  },
});

export default KukkuuList;
