interface IMyPhotoProps {
  size: number;
  src: string;
  alt: string;
}

export const MyPhoto: React.FC<IMyPhotoProps> = ({ size, src, alt }) => (
  <div className="text-center">
    <img src={src} alt={alt} />
    {/* texting jsx - so I don't have to create a whole full component (separate css file) for a basic case */}
    <style jsx>{`
      img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        margin: 0;
      }
    `}</style>
  </div>
);
