type Props = {
  image?:
    | {
        file: string;
      }
    | string;
  className?: string;
};

const ProfilePicture: React.FC<Props> = ({ image, className }) => {
  var profilePic = new Image();
  // if (image === "") console.log("EMPTY");
  // else console.log("NOT EMPTY");

  if (!image || image === "") {
    // If there is no image, return default image
    return (
      <svg
        id="profilePicture"
        className={
          className ? className : "h-10 w-10 text-gray-400 sm:h-12 sm:w-12"
        }
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
          // transform="translate(-1.6, 0)"
          transform={className ? "translate(0, 2)" : "translate(-1.6, 0)"}
        ></path>
      </svg>
    );
  }
  if (typeof image === "object") {
    profilePic.src = image.file;
  } else {
    profilePic.src = image;
  }

  return (
    <img
      id="profilePicture"
      src={profilePic.src}
      alt=""
      className={className}
    />
  );
};

export default ProfilePicture;
