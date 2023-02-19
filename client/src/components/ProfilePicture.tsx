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
  if (!image) {
    // If there is no image, return default image
    return (
      <svg
        className="h-12 w-12 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
          transform="translate(-1.6, 0)"
        ></path>
      </svg>
    );
  }
  if (typeof image === "object") {
    profilePic.src = image.file;
  } else {
    profilePic.src = image;
  }
  if (document.getElementById("profilePicture")) {
    let img = document.getElementById("profilePicture") as HTMLImageElement;
    if (img !== null) {
      img.src = profilePic.src;
    }
  }

  return <img id="profilePicture" src="" alt="" className={className} />;
};

export default ProfilePicture;
