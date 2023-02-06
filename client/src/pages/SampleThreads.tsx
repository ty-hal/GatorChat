import Footer from "../components/Footer";
import Thread from "../components/Thread";

const SampleThreads = () => {
  // Would do an API call here to get messages
  const threads = [
    {
      id: 1,
      username: "Ty Halpen",
      title: "I am just a title",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien. Curabitur felis orci, scelerisque posuere pretium quis, pretium sit amet mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus rutrum, urna quis dignissim semper, nulla lacus malesuada augue, at maximus purus orci sit amet justo. Nunc pretium odio finibus metus sodales rhoncus.",
      messageDate: "3:54 PM",
      likesCount: 12,
      messagesCount: 2,
    },
    {
      id: 2,
      username: "John Doe",
      title:
        "You stand in the presence of Daenerys Stormborn of House Targaryen",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien.",
      messageDate: "12:54 PM",
      likesCount: 122,
      messagesCount: 32,
    },
    {
      id: 3,
      username: "Arya Stark",
      title: "My needle",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus.",
      messageDate: "5:54 AM",
      likesCount: 0,
      messagesCount: 0,
    },
    {
      id: 4,
      username: "Joffrey Baratheon",
      title:
        "They say Stannis never smiles. I'll give him a Red smile, from ear to ear",
      messageContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex.",
      messageDate: "8:54 AM",
      likesCount: 9,
      messagesCount: 99,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl p-10">
        {threads.map((threads) => {
          return (
            <Thread
              key={threads.id}
              id={threads.id}
              username={threads.username}
              threadTitle={threads.title}
              threadContent={threads.messageContent}
              threadDate={threads.messageDate}
              likesCount={threads.likesCount}
              messagesCount={threads.messagesCount}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default SampleThreads;
