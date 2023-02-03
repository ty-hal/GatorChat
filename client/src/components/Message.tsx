interface IMessage {
  username: string;
  profilePicture?: string;
  messageContent: string;
  messageDate: string;
  likesCount?: number;
}

const Message = (props: IMessage) => {
  return (
    <div>
      {props.username} posted {props.messageContent} at {props.messageDate} and
      it has {props.likesCount} likes!
    </div>
  );
};

export default Message;
