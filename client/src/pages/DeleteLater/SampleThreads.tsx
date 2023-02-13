import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Thread from "../../components/Thread";

type ThreadType = {
  thread_id: number,
  user_id: number,
  username: string,
  section_id: number,
  thread_title: string,
  content: string,
  CreationDate: string,
  UpdatedOn: string,
  likes: number,
  messageCount: number
}

const SampleThreads = () => {
  const [threads, setThreads] = useState<ThreadType[]>([])
  const location = useLocation()
  const { section_id } = location.state
  useEffect(() => {
    fetch(`http://localhost:9000/api/section/${section_id}/threads`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setThreads(data)
      })
  }, [section_id])

  // Would do an API call here to get threads
  // const threads = [
  //   {
  //     id: 1,
  //     username: "Ty Halpen",
  //     title: "I am just a title",
  //     messageContent:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien. Curabitur felis orci, scelerisque posuere pretium quis, pretium sit amet mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus rutrum, urna quis dignissim semper, nulla lacus malesuada augue, at maximus purus orci sit amet justo. Nunc pretium odio finibus metus sodales rhoncus.         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien. Curabitur felis orci, scelerisque posuere pretium quis, pretium sit amet mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus rutrum, urna quis dignissim semper, nulla lacus malesuada augue, at maximus purus orci sit amet justo. Nunc pretium odio finibus metus sodales rhoncus.",
  //     messageDate: "3:54 PM",
  //     likesCount: 12,
  //     messagesCount: 2,
  //   },
  //   {
  //     id: 2,
  //     username: "John Doe",
  //     title:
  //       "You stand in the presence of Daenerys Stormborn of House Targaryen",
  //     messageContent:
  //       "My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead– murdered by my brother-in-law, Hank Schrader. Hank has been building a meth empire for over a year now, and using me as his chemist. Shortly after my 50th birthday, he asked that I use my chemistry knowledge to cook methamphetamine, which he would then sell using connections that he made through his career with the DEA. I was... astounded. I... I always thought Hank was a very moral man, and I was particularly vulnerable at the time – something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me in on a ride-along and showed me just how much money even a small meth operation could make. And I was weak. I didn't want my family to go into financial ruin, so I agreed. Hank had a partner, a businessman named Gustavo Fring. Hank sold me into servitude to this man. And when I tried to quit, Fring threatened my family. I didn't know where to turn. Eventually, Hank and Fring had a falling-out. Things escalated. Fring was able to arrange – uh, I guess... I guess you call it a \"hit\" - on Hank, and failed, but Hank was seriously injured. And I wound up paying his medical bills, which amounted to a little over $177,000. Upon recovery, Hank was bent on revenge. Working with a man named Hector Salamanca, he plotted to kill Fring. The bomb that he used was built by me, and he gave me no option in it. I have often contemplated suicide, but I'm a coward. I wanted to go to the police, but I was frightened. Hank had risen to become the head of the Albuquerque DEA. To keep me in line, he took my children. For three months, he kept them. My wife had no idea of my criminal activities, and was horrified to learn what I had done. I was in hell. I hated myself for what I had brought upon my family. Recently, I tried once again to quit, and in response, he gave me this. [Walt points to the bruise on his face left by Hank in \"Blood Money.\"] I can't take this anymore. I live in fear every day that Hank will kill me, or worse, hurt my family. All I could think to do was to make this video and hope that the world will finally see this man for what he really is.",
  //     messageDate: "12:54 PM",
  //     likesCount: 122,
  //     messagesCount: 32,
  //   },
  //   {
  //     id: 3,
  //     username: "Arya Stark",
  //     title: "My needle",
  //     messageContent:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus.",
  //     messageDate: "5:54 AM",
  //     likesCount: 0,
  //     messagesCount: 0,
  //   },
  //   {
  //     id: 4,
  //     username: "Jon Snow",
  //     title:
  //       "They say Stannis never smiles. I'll give him a Red smile, from ear to ear",
  //     messageContent:
  //       "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come.",
  //     messageDate: "8:54 AM",
  //     likesCount: 9,
  //     messagesCount: 99,
  //   },
  // ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center rounded-xl p-10">
        {threads.map((thread) => {
          return (
            <Thread
              key={thread.thread_id}
              id={thread.thread_id}
              username={thread.username}
              threadTitle={thread.thread_title}
              threadContent={thread.content}
              threadDate={new Date(thread.CreationDate).toLocaleString()}
              likesCount={thread.likes ? thread.likes : 0}
              messagesCount={thread.messageCount ? thread.messageCount : 0}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default SampleThreads;
