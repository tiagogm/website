import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";

const renderOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
};

export const RichText: React.FC<{ content }> = ({ content }) => {
  return <>{documentToReactComponents(content, renderOptions)}</>;
};
