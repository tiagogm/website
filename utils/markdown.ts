import { Remarkable } from "remarkable";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

//load only required langs
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);

//markdown parser with syntax AST and syntax highlight
var md = new Remarkable({
  langPrefix: "hljs language-",
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return "";
  },
});

const parseToHTML = (body: String) => {
  return md.render(body);
};

export const markdownUtils = {
  parseToHTML,
};
