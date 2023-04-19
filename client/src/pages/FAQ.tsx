import { useState } from "react";
import Accordion from "../components/FAQsAccordion";
import Footer from "../components/Footer";

const FAQ = () => {
  const [index, setIndex] = useState(0);

  const FAQs = [
    {
      id: 1,
      question: "How do I sign up for an account?",
      answer:
        "To sign up for an account, click on the 'Register' button on the navigation bar or the footer of the homepage. You will be prompted to enter your name, UFL email address, major, password, and an optional profile picture. Once you have submitted this information, you will receive an email to confirm your account.",
    },
    {
      id: 2,
      question: "How do I log in to my account?",
      answer:
        "To log in to your account, click on the 'Sign In' button on the navigation bar or the footer of the homepage. Enter your UFL email address and password, and click 'Sign In'.",
    },
    {
      id: 3,
      question: "What do I do if I forget my password?",
      answer:
        "If you forget your password, click on the 'Forgot password' link on the sign in page. Enter the UFL email address associated with your account and click 'Send email.' You will receive an email with instructions on how to reset your password.",
    },
    {
      id: 4,
      question: "How do I navigate the website?",
      answer:
        "The website is organized into sections and threads. You can access different sections by clicking on them on the home page. Within each section, you will find various sub-sections or threads that you can communicate and engage in.",
    },
    {
      id: 5,
      question: "How do I create a new thread?",
      answer:
        "To create a new thread, click on the 'Create a thread' button within the section you would like to post in. Enter a title and message for your thread, and click 'Create thread'.",
    },
    {
      id: 6,
      question: "How do I post a reply to a thread?",
      answer:
        "To post a reply to a thread, click on the thread you would like to reply to. Enter your message in the text box at the bottom of the thread and click the blue submit button.",
    },
    {
      id: 7,
      question: "How do I edit or delete my thread or message?",
      answer:
        "To edit or delete your thread or message, click on the three dots at the bottom of the thread or message. Then click on 'Edit' or 'Delete'.",
    },
    {
      id: 8,
      question: "How do I report a post?",
      answer:
        "To report a post, click on the three dots at the bottom of the post you would like to report. Then click on the 'Report'.",
    },
    {
      id: 9,
      question: "How do I contact the website administrators?",
      answer:
        "You can contact the website administrators by clicking on the 'Contact Us' button on the footer of the website. Fill out the contact form with your name, email address, and message, and click 'Submit'.",
    },
    {
      id: 10,
      question: "How can I keep my account secure?",
      answer:
        "To keep your account secure, make sure to use a strong password and never share your password with anyone. Also, be sure to log out of your account when you are finished using the website.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 dark:bg-gray-900">
      <h1 className="pt-4 text-center text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <div className="flex h-auto flex-col items-center rounded-xl py-6">
        {FAQs.map((FAQs) => {
          return (
            <Accordion
              key={FAQs.id}
              question={FAQs.question}
              id={FAQs.id}
              answer={FAQs.answer}
              index={index}
              setIndex={setIndex}
              onClick={() => setIndex(0)}
            ></Accordion>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
export default FAQ;
