import { useState } from "react";
import AccordionUI from "../components/AccordionUI";

const Accordion = () => {
  const [index, setIndex] = useState(0);

  const FAQs = [
    {
      id: 1,
      question: "How do I sign up for an account?",
      answer:
        "To sign up for an account, click on the 'Sign Up' button on the homepage. You will be prompted to enter your name, email address, and a password. Once you have submitted this information, you will receive an email to confirm your account.",
    },
    {
      id: 2,
      question: "How do I log in to my account?",
      answer:
        "To log in to your account, click on the 'Log In' button on the homepage. Enter your email address and password, and click 'Log In'.",
    },
    {
      id: 3,
      question: "What do I do if I forget my password?",
      answer:
        "If you forget your password, click on the 'Forgot Password' link on the log in page. Enter the email address associated with your account and click 'Submit.' You will receive an email with instructions on how to reset your password.",
    },
    {
      id: 4,
      question: "How do I navigate the website?",
      answer:
        "The website is organized into forums and threads. You can access different forums by clicking on the links at the top of the page. Within each forum, you will find various threads that you can participate in.",
    },
    {
      id: 5,
      question: "How do I start a new thread?",
      answer:
        "To start a new thread, click on the 'New Thread' button within the forum you would like to post in. Enter a title and message for your thread, and click 'Post'.",
    },
    {
      id: 6,
      question: "How do I post a reply to a thread?",
      answer:
        "To post a reply to a thread, click on the thread you would like to reply to. Enter your message in the text box provided and click 'Post Reply'.",
    },
    {
      id: 7,
      question: "How do I edit or delete my post?",
      answer:
        "To edit or delete a post, click on the post you would like to edit or delete. Click on 'Edit' or 'Delete' button on the top right corner of the post.",
    },
    {
      id: 8,
      question: "How do I report a post?",
      answer:
        "To report a post, click on the post you would like to report. Click on the 'Report' button on the top right corner of the post.",
    },
    {
      id: 9,
      question: "How do I contact the website administrator?",
      answer:
        "You can contact the website administrator by clicking on the 'Contact Us' button on the homepage. Fill out the contact form with your name, email address, and message, and click 'Submit'.",
    },
    {
      id: 10,
      question: "How can I keep my account secure?",
      answer:
        "To keep your account secure, make sure to use a strong password and never share your password with anyone. Also, be sure to log out of your account when you are finished using the website.",
    },
  ];

  return (
    <div className="pb-16 bg-gray-50 dark:bg-gray-900">
      <h1 className="leading-tight tracking-tight text-gray-900 dark:text-white text-4xl font-semibold pt-4 text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col items-center p-10 rounded-xl h-auto">
        {FAQs.map((FAQs) => {
          return (
            <AccordionUI
              title={FAQs.question}
              id={FAQs.id}
              children={FAQs.answer}
              index={index}
              setIndex={setIndex}
              onClick={() => setIndex(0)}
            ></AccordionUI>
          );
        })}
      </div>
    </div>
  );
};
export default Accordion;
