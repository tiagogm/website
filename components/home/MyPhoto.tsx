import Image from "next/image";

interface IMyPhotoProps {
  size: number;
  url: string;
  alt: string;
}

export const MyPhoto: React.FC<IMyPhotoProps> = ({ size, url, alt }) => (
  <div className="text-center">
    <Image
      src={url}
      width={size}
      height={size}
      alt={alt}
      quality={100}
      className="my-photo"
      style={{
        borderRadius: "50%",
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        margin: 0,
      }}
    />
  </div>
);
