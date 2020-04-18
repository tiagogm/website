import {} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const RichText: React.FC<{ content }> = ({ content }) => {
  return <>{documentToReactComponents(content)}</>;
};
