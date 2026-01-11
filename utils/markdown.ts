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
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(code).value;
    } catch (err) {}

    return "";
  },
});

const parseToHTML = (body: String) => {
  let html = md.render(body);

  // Post-process HTML to add target="_blank" to external links
  // Match <a href="http(s)://..."> tags and add target and rel attributes
  html = html.replace(/<a href="(https?:\/\/[^"]+)"([^>]*)>/g, (match, url, rest) => {
    // Check if target is already present
    if (rest.includes("target=")) {
      return match;
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer"${rest}>`;
  });

  return html;
};

export const markdownUtils = {
  parseToHTML,
};
