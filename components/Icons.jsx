import Image from "next/image";
import AppLogo from "../assets/app_logo.png";
import Wave from "../assets/svg/wave.svg";
export const IconGoogle = (props) => {
  return (
    <Image
      alt=""
      src={"https://www.svgrepo.com/show/475656/google-color.svg"}
      width={props.width}
      height={props.height}
    />
  );
};

export const IconTwitter = (props) => {
  return (
    <Image
      alt=""
      src={"https://www.svgrepo.com/show/475689/twitter-color.svg"}
      width={props.width}
      height={props.height}
    />
  );
};

export const IconFacebook = (props) => {
  return (
    <Image
      alt=""
      src={"https://www.svgrepo.com/show/448224/facebook.svg"}
      width={props.width}
      height={props.height}
    />
  );
};

export const AppIcon = (props) => {
  return (
    <Image src={AppLogo} alt="img" width={props.width} height={props.height} />
  );
};

export const IconWave = (props) => {
  return <Wave width={props.width} height={props.width} />;
};

export const IconSearch = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={props.width}
      height={props.width}
      fill="#16a34a"
    >
      <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
    </svg>
  );
};

export const IconBell = (props) => {
  return (
    <Image
      alt=""
      src={"https://fruitask.com/assets/flat/icon/v1/solid/svg/fi-sr-bell.svg"}
      width={props.width}
      height={props.height}
      className="fill-green-600"
    />
  );
};

export const IconProfile = (props) => {
  return (
    <Image
      alt=""
      src={props.imgUrl}
      width={props.width}
      height={props.height}
      className="rounded-full border"
    />
  );
};
