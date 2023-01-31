interface IProps {
  image: {
    file: string;
  };
  class: string;
}

const ProfilePicture = (props: IProps) => {
  var profilePic = new Image();
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
