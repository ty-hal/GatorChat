import Footer from "../../components/Footer";
import Thread from "../../components/Thread2";
import Message from "../../components/Message2";
import MessageBox from "../../components/MessageBox";

const SampleThread1 = () => {
  // Would do an API call here to get thread and messages
  const thread = {
    id: 2,
    username: "John Doe",
    title: "Breaking Bad thing",
    messageContent:
      "My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead– murdered by my brother-in-law, Hank Schrader. Hank has been building a meth empire for over a year now, and using me as his chemist. Shortly after my 50th birthday, he asked that I use my chemistry knowledge to cook methamphetamine, which he would then sell using connections that he made through his career with the DEA. I was... astounded. I... I always thought Hank was a very moral man, and I was particularly vulnerable at the time – something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me in on a ride-along and showed me just how much money even a small meth operation could make. And I was weak. I didn't want my family to go into financial ruin, so I agreed. Hank had a partner, a businessman named Gustavo Fring. Hank sold me into servitude to this man. And when I tried to quit, Fring threatened my family. I didn't know where to turn. Eventually, Hank and Fring had a falling-out. Things escalated. Fring was able to arrange – uh, I guess... I guess you call it a \"hit\" - on Hank, and failed, but Hank was seriously injured.",
    messageDate: "12:54 PM",
    likesCount: 122,
    messagesCount: 32,
  };

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
      <div className="flex flex-col items-center px-4 pt-4">
        <Thread
          key={thread.id}
          id={thread.id}
          username={thread.username}
          threadTitle={thread.title}
          threadContent={thread.messageContent}
          threadDate={thread.messageDate}
          likesCount={thread.likesCount}
          messagesCount={thread.messagesCount}
        />
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
        <div className="text-white">
          Steven put the message/chat box thing here
          <div> okay!!!</div>
          <MessageBox className = ""></MessageBox>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SampleThread1;
