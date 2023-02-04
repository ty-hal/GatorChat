import Footer from "../components/Footer";
import Message from "../components/Message";
import { useAtomValue } from "jotai";

const Home = () => {
  // const dark = useAtomValue(darkAtom);

  return (
    <div>
      <Message
        username="Ty Halpen"
        messageContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus. Phasellus hendrerit pretium eleifend. Phasellus tempor venenatis pharetra. Quisque id blandit ipsum, imperdiet porttitor ante. Sed nec ipsum sapien. Vivamus in hendrerit ante, a mollis sapien. Curabitur felis orci, scelerisque posuere pretium quis, pretium sit amet mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus rutrum, urna quis dignissim semper, nulla lacus malesuada augue, at maximus purus orci sit amet justo. Nunc pretium odio finibus metus sodales rhoncus."
        messageDate="3:54 PM"
        likesCount={12}
      />

      <Message
        username="Steven Miller"
        messageContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl. Ut iaculis gravida nibh nec lobortis. Praesent sollicitudin ornare faucibus. Phasellus iaculis neque sit amet risus bibendum faucibus."
        messageDate="10:25 PM"
        likesCount={145}
      />

      <Message
        username="Dev Patel"
        messageContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex."
        messageDate="10:25 PM"
        likesCount={2}
      />

      <Message
        username="Baron Swango"
        messageContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis felis, feugiat nec feugiat eget, blandit ut ex. Sed lacus purus, porta ut scelerisque vel, scelerisque eu nisl."
        messageDate="10:25 PM"
        likesCount={3}
      />

      <Footer />
    </div>
  );
};

export default Home;
