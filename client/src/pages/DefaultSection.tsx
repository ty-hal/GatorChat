import { useLocation, useNavigate } from "react-router-dom";
import Thread from "./Thread";
import Section from "./Section";
import { useEffect, useState } from "react";

interface Props {
  activeUserID: number;
  checkedCookie: boolean;
}

const DefaultSection: React.FC<Props> = ({ activeUserID, checkedCookie }) => {
  const [embeddedSection, setEmbeddedSection] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { parent_section } = location.state;

  useEffect(() => {
    setEmbeddedSection(parent_section);
  }, [parent_section]);

  const pathname = location.pathname;

  let section_id = "0";
  let section_name = "";
  let thread_id = "0";
  let thread_name = "";

  console.log("Path: " + pathname);

  // Check if the pathname is a Thread
  let regex = /^\/s(?:\/\d+\/[A-Za-z-\d]+)+\/t(?:\/\d+\/[A-Za-z\d.,!?;:'"-]+)$/;
  let match = pathname.match(regex);
  // If pathname is a Thread
  if (match) {
    // Get thread ID
    regex = /\/(\d+)\/*([^\/]*)\/*$/;
    match = pathname.match(regex);
    if (match) thread_id = String(match[1]);
    // Get thread NAME
    regex = /\/([^\/]+)\/*$/;
    match = pathname.match(regex);
    if (match) thread_name = match[1];
    // Get section ID
    regex =
      /\/[A-Za-z-\d]+(?:\/(\d+)\/([A-Za-z-\d]+))+(?=\/t\/\d+\/[A-Za-z\d.,!?;:'"-]+\/?$)/;
    match = pathname.match(regex);
    if (match) {
      section_id = match[1];
      section_name = match[2];
    }
    console.log(
      "Section ID: " + section_id + "  Section Name: " + section_name
    );
    console.log("Thread ID: " + thread_id + "  Thread Name: " + thread_name);

    // Return (render) the Thread
    return (
      <Thread
        activeUserID={activeUserID}
        checkedCookie={checkedCookie}
        thread_name={thread_name}
        thread_id={thread_id}
        section_name={section_name}
        section_id={section_id}
      />
    );
  }

  // Check if the pathname is a Section
  regex = /^\/s(?:\/\d+\/[A-Za-z][\w-]*)+$/;
  match = pathname.match(regex);
  if (!match) {
    navigate(-1);
  } else {
    // If it's a section, get outer section ID
    regex = /\/(\d+)\/*([^\/]*)\/*$/;
    match = pathname.match(regex);
    // If no match or its not a number
    if (!match || !/^\d+$/.test(match[1] || "a")) {
      navigate(-1);
    } else {
      section_id = String(match[1]);
    }
  }

  // If it's a section, get outer section name
  regex = /\/([^\/]+)\/*$/;
  match = pathname.match(regex);
  if (!match || /^[0-9]+$/.test(match[1])) {
    navigate(-1);
  } else {
    section_name = match[1];
  }

  // console.log("Section ID: " + section_id + "  Section Name: " + section_name);

  return (
    <Section
      activeUserID={activeUserID}
      checkedCookie={checkedCookie}
      section_name={section_name}
      section_id={section_id}
      embedded={embeddedSection}
    />
  );
};

export default DefaultSection;
