import MessagesList from './list/MessagesList';
import MessagesDetail from './detail/MessagesDetail';
import MessagesEdit from './edit/MessagesEdit';
import MessagesCreate from './create/MessagesCreate';

const MessagesResource = {
  List: MessagesList,
  Detail: MessagesDetail,
  Edit: MessagesEdit,
  Create: MessagesCreate,
};

export default MessagesResource;
