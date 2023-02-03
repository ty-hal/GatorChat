import Footer from "../components/Footer";

import Message from "../components/Message";

const Home = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">
        <Message
          username="Ty Halpen"
          messageContent="I am a test"
          messageDate="3:54 PM"
          likesCount={12}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
