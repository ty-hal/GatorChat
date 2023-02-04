interface IProps {
  image?: {
    file: string;
  };
  class?: string;
}
const ProfilePicture = (props: IProps) => {
  var profilePic = new Image();
  if (!props.image) {
    // If there is no image, return default image
    return (
      <svg
        className="absolute -left-1 h-12 w-12 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    );
  }
  profilePic.src = props.image.file;
  if (document.getElementById("profilePicture")) {
    let img = document.getElementById("profilePicture") as HTMLImageElement;
    if (img !== null) {
      img.src = profilePic.src;
    }
  }

  return <img id="profilePicture" src="" alt="image" className={props.class} />;
};

export default ProfilePicture;
