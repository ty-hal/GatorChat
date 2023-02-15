import Footer from "../../components/Footer";
import Message from "../../components/OldMessageFormat";

const SampleMessages = () => {
  // Would do an API call here to get messages
  const messages = [
    {
      id: 1,
      username: "Ty Halpen",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien. Curabitur felis orci, scelerisque posuere pretium quis, pretium sit amet mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus rutrum, urna quis dignissim semper, nulla lacus malesuada augue, at maximus purus orci sit amet justo. Nunc pretium odio finibus metus sodales rhoncus.",
      messageDate: "3:54 PM",
      likesCount: 12,
    },
    {
      id: 2,
      username: "Steven Miller",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus.",
      messageDate: "10:25 PM",
      likesCount: 2,
    },
    {
      id: 3,
      username: "Dev Patel",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex.",
      messageDate: "1:25 AM",
      likesCount: 6,
    },
    {
      id: 4,
      username: "Baron Swango",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl.",
      messageDate: "5:25 AM",
      likesCount: 3,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl p-10">
        {messages.map((messages) => {
          return (
            <Message
              key={messages.id}
              id={messages.id}
              username={messages.username}
              messageContent={messages.messageContent}
              messageDate={messages.messageDate}
              likesCount={messages.likesCount}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default SampleMessages;
