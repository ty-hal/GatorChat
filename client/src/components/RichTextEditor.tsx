import { useCallback, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "../App";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import Blockquote from "@tiptap/extension-blockquote";

type Props = {
  setText?: React.Dispatch<React.SetStateAction<string>>;
  textContent?: string;
  charLimit?: number;
};

const MenuBar = ({ editor }: any) => {
  const [textDropdown, setTextDropdown] = useState<boolean>(false);
  const [paragraphDropdown, setParagraphDropdown] = useState<boolean>(false);
  const [alignDropdown, setAlignDropdown] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [emojiPicker, toggleEmojiPicker] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  // Add emoji
  useEffect(() => {
    if (currentEmoji) {
      console.log(currentEmoji);
      editor.commands.insertContent(currentEmoji);
    }
  }, [currentEmoji]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    let url = window.prompt("URL", previousUrl);

    console.log(previousUrl, url);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();

    console.log(editor.getAttributes("link").href);
  }, [editor]);
  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      console.log(window.innerWidth);

      editor.commands.setYoutubeVideo({
        src: url,
        width:
          window.innerWidth > 1100 ? 640 : window.innerWidth > 650 ? 320 : 160,
        height:
          window.innerWidth > 1100 ? 480 : window.innerWidth > 650 ? 240 : 120,
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="mt-2 flex w-full flex-wrap rounded-t-lg border-x border-t border-gray-600 bg-slate-400 dark:bg-slate-600">
      {/* Undo and Redo */}
      <div className="flex border-r border-gray-700 px-1 sm:space-x-1">
        {/* Undo  */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 cursor-pointer rounded-md fill-black py-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" />
          </svg>
        </button>
        {/* Redo  */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 cursor-pointer rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z" />
          </svg>
        </button>
      </div>
      {/* Text Styling */}
      <div className="flex border-x border-gray-700 pr-1 sm:space-x-1 sm:p-1">
        {/* Dropdown */}
        <div className="flex  w-8 items-center sm:w-10 lg:hidden">
          <div className="relative inline-block text-left">
            <div
              className="flex cursor-pointer justify-center"
              id="menu-button"
              onClick={() => {
                setTextDropdown(!textDropdown);
                setAlignDropdown(false);
                setParagraphDropdown(false);
              }}
              title="Text style"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 rounded-md fill-black p-1 dark:fill-white  sm:h-8 sm:w-8"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
                </svg>
              </div>
              <div className="relative -left-2">
                {!textDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
                  </svg>
                )}
                {textDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z" />
                  </svg>
                )}
              </div>
            </div>
            {textDropdown && (
              <div
                className="absolute -left-1 z-10 mt-1  flex origin-top-right cursor-pointer rounded-md border border-gray-600 bg-slate-400 p-1  ring-black ring-opacity-5 focus:outline-none dark:border-gray-900 dark:bg-slate-600"
                role="menu"
                id="dropdown-content"
                onClick={() => setTextDropdown(!textDropdown)}
              >
                {/* Bold  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("bold")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <title>Bold</title>

                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
                </svg>

                {/* Italic  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("italic")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <title>Italic</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
                </svg>
                {/* Underline */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("underline")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <title>Underline</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
                </svg>
                {/* Strikethrough  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("strike")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <title>Strikethrough</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" />
                </svg>
                {/* Code */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("code")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <title>Code</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z" />
                </svg>

                {/* Clear marks */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
                  onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                  <title>Clear marks</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Bold  */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700  sm:h-8 sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
          </svg>
        </button>
        {/* Italic  */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
          </svg>
        </button>
        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
          </svg>
        </button>
        {/* Strikethrough  */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Strikethrough"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" />
          </svg>
        </button>
        {/* Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Code"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z" />
          </svg>
        </button>

        {/* Clear marks */}
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear marks"
          className="hidden lg:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z" />
          </svg>
        </button>
      </div>
      {/* Formatting  */}
      <div className="flex border-x border-gray-700 pr-1 sm:space-x-1 sm:p-1">
        {/* Dropdown */}
        <div className="flex w-8 items-center sm:w-10 lg:hidden">
          <div className="relative inline-block text-left">
            <div
              className="flex cursor-pointer justify-center"
              id="menu-button"
              onClick={() => {
                setParagraphDropdown(!paragraphDropdown);
                setTextDropdown(false);
                setAlignDropdown(false);
              }}
              title="Text format"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 rounded-md fill-black p-1 dark:fill-white  sm:h-8 sm:w-8"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" />
                </svg>
              </div>
              <div className="relative -left-2">
                {!paragraphDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
                  </svg>
                )}
                {paragraphDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z" />
                  </svg>
                )}
              </div>
            </div>
            {paragraphDropdown && (
              <div
                className="absolute -left-1 z-10 mt-1  flex origin-top-right cursor-pointer rounded-md border border-gray-600 bg-slate-400 p-1  ring-black ring-opacity-5 focus:outline-none dark:border-gray-900 dark:bg-slate-600"
                role="menu"
                id="dropdown-content"
                onClick={() => setParagraphDropdown(!paragraphDropdown)}
              >
                {/* Paragraph */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("paragraph")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <title>Paragraph</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" />
                </svg>
                {/* H1  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("heading", { level: 1 })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <title>H1</title>
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" />
                </svg>
                {/* H2  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("heading", { level: 2 })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <title>H2</title>
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" />
                </svg>
                {/* H3  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("heading", { level: 3 })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <title>H3</title>
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" />
                </svg>
                {/* Blockquote */}
                <svg
                  fill="#000000"
                  viewBox="0 0 36 36"
                  className={
                    editor.isActive("blockquote")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  version="1.1"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                >
                  <title>Blockquote</title>
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M11.86,16.55a4.31,4.31,0,0,0-2.11.56,14.44,14.44,0,0,1,4.36-6,1.1,1.1,0,0,0-1.4-1.7c-4,3.25-5.78,7.75-5.78,10.54A5.08,5.08,0,0,0,10,24.58a4.4,4.4,0,0,0,1.88.44,4.24,4.24,0,1,0,0-8.47Z"
                      className="clr-i-outline clr-i-outline-path-1"
                    ></path>
                    <path
                      d="M23,16.55a4.29,4.29,0,0,0-2.11.56,14.5,14.5,0,0,1,4.35-6,1.1,1.1,0,1,0-1.39-1.7c-4,3.25-5.78,7.75-5.78,10.54a5.08,5.08,0,0,0,3,4.61A4.37,4.37,0,0,0,23,25a4.24,4.24,0,1,0,0-8.47Z"
                      className="clr-i-outline clr-i-outline-path-2"
                    ></path>{" "}
                    <rect
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                      fill-opacity="0"
                    ></rect>{" "}
                  </g>
                </svg>
                {/* Horizontal Rule  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive("horizontalRule")
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                >
                  <title>Blockquote</title>

                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z" />
                </svg>

                {/* Clear nodes  */}
                <svg
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="h-6 w-6 rounded-md fill-black  p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
                  onClick={() => editor.chain().focus().clearNodes().run()}
                >
                  <title>Clear formatting</title>
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="white"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="ic_fluent_clear_formatting_24_filled"
                        fill=""
                        fillRule="nonzero"
                        className="fill-black dark:fill-white"
                      >
                        {" "}
                        <path d="M17.5,12 C20.5375661,12 23,14.4624339 23,17.5 C23,20.5375661 20.5375661,23 17.5,23 C14.4624339,23 12,20.5375661 12,17.5 C12,14.4624339 14.4624339,12 17.5,12 Z M3,19 L11.1741301,19.000839 C11.3444377,19.7213878 11.6346696,20.395589 12.0225923,21.0012092 L3,21 C2.44771525,21 2,20.5522847 2,20 C2,19.4871642 2.38604019,19.0644928 2.88337887,19.0067277 L3,19 Z M15.0930472,14.9662824 L15.0237993,15.0241379 L14.9659438,15.0933858 C14.8478223,15.2638954 14.8478223,15.4914871 14.9659438,15.6619968 L15.0237993,15.7312446 L16.7933527,17.5006913 L15.0263884,19.2674911 L14.968533,19.3367389 C14.8504114,19.5072486 14.8504114,19.7348403 14.968533,19.9053499 L15.0263884,19.9745978 L15.0956363,20.0324533 C15.2661459,20.1505748 15.4937377,20.1505748 15.6642473,20.0324533 L15.7334952,19.9745978 L17.5003527,18.2076913 L19.2693951,19.9768405 L19.338643,20.0346959 C19.5091526,20.1528175 19.7367444,20.1528175 19.907254,20.0346959 L19.9765019,19.9768405 L20.0343574,19.9075926 C20.1524789,19.737083 20.1524789,19.5094912 20.0343574,19.3389816 L19.9765019,19.2697337 L18.2073527,17.5006913 L19.9792686,15.7312918 L20.0371241,15.6620439 C20.1552456,15.4915343 20.1552456,15.2639425 20.0371241,15.0934329 L19.9792686,15.024185 L19.9100208,14.9663296 C19.7395111,14.848208 19.5119194,14.848208 19.3414098,14.9663296 L19.2721619,15.024185 L17.5003527,16.7936913 L15.7309061,15.0241379 L15.6616582,14.9662824 C15.5155071,14.8650354 15.3274181,14.8505715 15.1692847,14.9228908 L15.0930472,14.9662824 L15.0930472,14.9662824 Z M16.0009262,3 C16.5790869,3 17.028058,3.48583239 16.999911,4.04804907 L16.987817,4.16138954 L16.742517,5.66138954 C16.653384,6.20643427 16.1392814,6.57602377 15.5942367,6.48689078 C15.0881237,6.40412444 14.7332961,5.9549302 14.7565535,5.45478856 L14.7687354,5.33861046 L14.8241095,5 L11.432,5 L9.672,16 L10,16 C10.5128358,16 10.9355072,16.3860402 10.9932723,16.8833789 L11,17 C11,17.5128358 10.6139598,17.9355072 10.1166211,17.9932723 L10,18 L7,18 C6.44771525,18 6,17.5522847 6,17 C6,16.4871642 6.38604019,16.0644928 6.88337887,16.0067277 L7,16 L7.647,16 L9.407,5 L5.84621647,5 L5.73511131,5.66483181 C5.64407722,6.20956223 5.12868824,6.57735578 4.58395781,6.48632169 C4.0781367,6.40179003 3.72487851,5.95136054 3.74988077,5.45130308 L3.76246793,5.33516819 L4.01314447,3.83516819 C4.08698095,3.39334494 4.44361349,3.05975771 4.87894231,3.00722806 L4.99946616,3 L16.0009262,3 Z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Paragraph  */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Paragraph"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" />
          </svg>
        </button>
        {/* H1  */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="H1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" />
          </svg>
        </button>
        {/* H2  */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="H2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" />
          </svg>
        </button>
        {/* H3  */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="H3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" />
          </svg>
        </button>
        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Blockquote"
        >
          <svg
            fill="#000000"
            viewBox="0 0 36 36"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11.86,16.55a4.31,4.31,0,0,0-2.11.56,14.44,14.44,0,0,1,4.36-6,1.1,1.1,0,0,0-1.4-1.7c-4,3.25-5.78,7.75-5.78,10.54A5.08,5.08,0,0,0,10,24.58a4.4,4.4,0,0,0,1.88.44,4.24,4.24,0,1,0,0-8.47Z"
                className="clr-i-outline clr-i-outline-path-1"
              ></path>
              <path
                d="M23,16.55a4.29,4.29,0,0,0-2.11.56,14.5,14.5,0,0,1,4.35-6,1.1,1.1,0,1,0-1.39-1.7c-4,3.25-5.78,7.75-5.78,10.54a5.08,5.08,0,0,0,3,4.61A4.37,4.37,0,0,0,23,25a4.24,4.24,0,1,0,0-8.47Z"
                className="clr-i-outline clr-i-outline-path-2"
              ></path>{" "}
              <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>{" "}
            </g>
          </svg>
        </button>
        {/* Horizontal Rule  */}
        <button
          id="horizontal-rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
          className={
            editor.isActive("horizontalRule")
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z" />
          </svg>
        </button>
        {/* Clear nodes  */}
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="hidden lg:block"
          title="Clear formatting"
        >
          <svg
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="h-6 w-6 rounded-md fill-black  p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g stroke="none" strokeWidth="1" fill="white" fillRule="evenodd">
                {" "}
                <g
                  id="ic_fluent_clear_formatting_24_filled"
                  fill=""
                  fillRule="nonzero"
                  className="fill-black dark:fill-white"
                >
                  {" "}
                  <path d="M17.5,12 C20.5375661,12 23,14.4624339 23,17.5 C23,20.5375661 20.5375661,23 17.5,23 C14.4624339,23 12,20.5375661 12,17.5 C12,14.4624339 14.4624339,12 17.5,12 Z M3,19 L11.1741301,19.000839 C11.3444377,19.7213878 11.6346696,20.395589 12.0225923,21.0012092 L3,21 C2.44771525,21 2,20.5522847 2,20 C2,19.4871642 2.38604019,19.0644928 2.88337887,19.0067277 L3,19 Z M15.0930472,14.9662824 L15.0237993,15.0241379 L14.9659438,15.0933858 C14.8478223,15.2638954 14.8478223,15.4914871 14.9659438,15.6619968 L15.0237993,15.7312446 L16.7933527,17.5006913 L15.0263884,19.2674911 L14.968533,19.3367389 C14.8504114,19.5072486 14.8504114,19.7348403 14.968533,19.9053499 L15.0263884,19.9745978 L15.0956363,20.0324533 C15.2661459,20.1505748 15.4937377,20.1505748 15.6642473,20.0324533 L15.7334952,19.9745978 L17.5003527,18.2076913 L19.2693951,19.9768405 L19.338643,20.0346959 C19.5091526,20.1528175 19.7367444,20.1528175 19.907254,20.0346959 L19.9765019,19.9768405 L20.0343574,19.9075926 C20.1524789,19.737083 20.1524789,19.5094912 20.0343574,19.3389816 L19.9765019,19.2697337 L18.2073527,17.5006913 L19.9792686,15.7312918 L20.0371241,15.6620439 C20.1552456,15.4915343 20.1552456,15.2639425 20.0371241,15.0934329 L19.9792686,15.024185 L19.9100208,14.9663296 C19.7395111,14.848208 19.5119194,14.848208 19.3414098,14.9663296 L19.2721619,15.024185 L17.5003527,16.7936913 L15.7309061,15.0241379 L15.6616582,14.9662824 C15.5155071,14.8650354 15.3274181,14.8505715 15.1692847,14.9228908 L15.0930472,14.9662824 L15.0930472,14.9662824 Z M16.0009262,3 C16.5790869,3 17.028058,3.48583239 16.999911,4.04804907 L16.987817,4.16138954 L16.742517,5.66138954 C16.653384,6.20643427 16.1392814,6.57602377 15.5942367,6.48689078 C15.0881237,6.40412444 14.7332961,5.9549302 14.7565535,5.45478856 L14.7687354,5.33861046 L14.8241095,5 L11.432,5 L9.672,16 L10,16 C10.5128358,16 10.9355072,16.3860402 10.9932723,16.8833789 L11,17 C11,17.5128358 10.6139598,17.9355072 10.1166211,17.9932723 L10,18 L7,18 C6.44771525,18 6,17.5522847 6,17 C6,16.4871642 6.38604019,16.0644928 6.88337887,16.0067277 L7,16 L7.647,16 L9.407,5 L5.84621647,5 L5.73511131,5.66483181 C5.64407722,6.20956223 5.12868824,6.57735578 4.58395781,6.48632169 C4.0781367,6.40179003 3.72487851,5.95136054 3.74988077,5.45130308 L3.76246793,5.33516819 L4.01314447,3.83516819 C4.08698095,3.39334494 4.44361349,3.05975771 4.87894231,3.00722806 L4.99946616,3 L16.0009262,3 Z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
      {/* Align  */}
      <div className="flex border-x border-gray-700 pr-1 sm:space-x-1 sm:p-1">
        {/* Dropdown Menu */}
        <div className="flex w-8 items-center sm:w-10 lg:hidden">
          <div className="relative inline-block text-left">
            <div
              className="flex cursor-pointer justify-center"
              id="menu-button"
              onClick={() => {
                setAlignDropdown(!alignDropdown);
                setParagraphDropdown(false);
                setTextDropdown(false);
              }}
              title="Alignment"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 rounded-md fill-black p-1 dark:fill-white  sm:h-8 sm:w-8"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
                </svg>
              </div>
              <div className="relative -left-2">
                {!alignDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
                  </svg>
                )}
                {alignDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z" />
                  </svg>
                )}
              </div>
            </div>
            {alignDropdown && (
              <div
                className="absolute -left-1 z-10 mt-1 flex origin-top-right cursor-pointer rounded-md border border-gray-600 bg-slate-400  p-1 ring-black ring-opacity-5 focus:outline-none  dark:border-gray-900 dark:bg-slate-600"
                role="menu"
                id="dropdown-content"
                onClick={() => setAlignDropdown(!alignDropdown)}
              >
                {/* Left Align  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive({ textAlign: "left" })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                >
                  <title>Align left</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
                </svg>
                {/* Center Align  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive({ textAlign: "center" })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <title>Align center</title>

                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
                </svg>
                {/* Right Align  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive({ textAlign: "right" })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                >
                  <title>Align right</title>

                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" />
                </svg>
                {/* Justify Content  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={
                    editor.isActive({ textAlign: "justify" })
                      ? "h-6 w-6 rounded-md bg-gray-200 fill-black p-1 dark:bg-gray-700 dark:fill-white sm:h-8 sm:w-8"
                      : "h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                >
                  <title>Justify</title>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        {/* Left Align  */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Align left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
          </svg>
        </button>
        {/* Center Align  */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Align center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
          </svg>
        </button>
        {/* Right Align  */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Align right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" />
          </svg>
        </button>
        {/* Justify Content  */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:block"
              : "hidden lg:block"
          }
          title="Justify"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" />
          </svg>
        </button>
      </div>
      {/* List  */}
      <div className="flex border-x border-gray-700 p-1 sm:space-x-1">
        {/* Bullet List  */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "rounded-md bg-gray-200 dark:bg-gray-700"
              : ""
          }
          title="Bullet list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
          </svg>
        </button>
        {/* Ordered List  */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "rounded-md bg-gray-200 dark:bg-gray-700"
              : ""
          }
          title="Ordered list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
          </svg>
        </button>
      </div>
      {/* Extra  */}
      <div className="flex border-l border-gray-700 p-1 sm:space-x-1">
        {/* Link  */}
        <button onClick={setLink} title="Hyperlink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
          </svg>
        </button>
        {/* Image  */}
        <button
          onClick={addImage}
          disabled={!editor.can().chain().focus().setImage().run()}
          title="Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </button>
        {/* YouTube */}
        <button id="add" onClick={addYoutubeVideo} title="YouTube video">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 rounded-md fill-black p-1 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700 sm:h-8  sm:w-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19.606 6.995c-.076-.298-.292-.523-.539-.592C18.63 6.28 16.5 6 12 6s-6.628.28-7.069.403c-.244.068-.46.293-.537.592C4.285 7.419 4 9.196 4 12s.285 4.58.394 5.006c.076.297.292.522.538.59C5.372 17.72 7.5 18 12 18s6.629-.28 7.069-.403c.244-.068.46-.293.537-.592C19.715 16.581 20 14.8 20 12s-.285-4.58-.394-5.005zm1.937-.497C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5v-7l6 3.5-6 3.5z" />
          </svg>
        </button>
        {/* Emoji */}
        <div className="relative flex" id="emoji">
          <button
            type="button"
            id="emoji-button"
            className=" "
            title="Emoji"
            onClick={(e) => {
              e.stopPropagation();
              toggleEmojiPicker(!emojiPicker);
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              stroke-width="1.3"
              className="h-6 w-6 rounded-md fill-none stroke-black p-1 hover:bg-gray-200  dark:stroke-white dark:hover:bg-gray-700 sm:h-8 sm:w-8"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {emojiPicker && (
            <div className="absolute right-0 top-10 z-10" id="emoji-selector">
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e: { native: React.SetStateAction<null> }) => {
                  setCurrentEmoji(e.native);
                  toggleEmojiPicker(!emojiPicker);
                }}
                categories={[
                  "frequent",
                  "people",
                  "nature",
                  "foods",
                  "activity",
                  "places",
                  "objects",
                  "symbols",
                ]}
                theme={darkMode === true ? "dark" : "light"}
                onClickOutside={(e: any) => {
                  e.stopPropagation();
                  toggleEmojiPicker(false);
                }}
                autoFocus={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const RichTextEditor: React.FC<Props> = ({
  setText,
  textContent,
  charLimit,
}) => {
  let characterLimit = charLimit ? charLimit : 4000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Text",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
      Typography,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "w-1/2 lg:w-1/3 mx-auto m-1",
        },
      }),
      Dropcursor,
      Link.configure({
        autolink: true,
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-300 underline cursor-pointer",
        },
      }),
      Underline,
      Youtube.configure({
        width:
          window.innerWidth > 1100 ? 640 : window.innerWidth > 650 ? 320 : 160,
        height:
          window.innerWidth > 1100 ? 480 : window.innerWidth > 650 ? 240 : 120,
      }),
      Blockquote,
    ],
    content: textContent ? textContent : "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (setText) {
        setText(html);
      }
    },
  });

  return (
    <div
      id="RTE-text"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation()
      }
    >
      <div id="menu-bar">
        <MenuBar editor={editor} />
      </div>
      <div id="editor">
        <EditorContent
          editor={editor}
          id="editor-content"
          className="mx-auto w-full cursor-text rounded-b-lg border border-gray-600 bg-gray-50 p-2  text-gray-900 dark:border-gray-600
        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:dark:border-blue-600 "
        />
      </div>
      <div
        className="mx-auto my-2 w-full text-right text-gray-400"
        id="char-count"
      >
        {editor?.storage?.characterCount.characters()}/{characterLimit}{" "}
        characters
      </div>
    </div>
  );
};
