interface IMyPhotoProps {
  size: number;
  url: string;
  alt: string;
}

const imgParams = (url: string, size: number, otherParams?: string) => `${url}?w=${size * 2}${otherParams || ""}`;

export const MyPhoto: React.FC<IMyPhotoProps> = ({ size, url, alt }) => (
  <div className="text-center">
    <picture>
      <source type="image/webp" srcSet={imgParams(url, size, `&fm=webp`)} />
      <img width={size} height={size} src={imgParams(url, size)} alt={alt} />
    </picture>
    {/* texting jsx - so I don't have to create a whole full component (separate css file) for a basic case, single file components style */}
    <style jsx>{`
      img {
        width: ${size}px;
        border-radius: 50%;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        margin: 0;
      }
    `}</style>
  </div>
);
