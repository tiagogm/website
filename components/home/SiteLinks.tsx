import { LinkRainbow } from "@/components/layout/LinkRainbow";

const AllLinks = [
  { url: "/about", title: "About me" },
  { url: "/contacts", title: "Contacts" },
  { url: "/notes", title: "Notes on software" },
];

const isProduction = process.env.NODE_ENV === "production";
const Links = isProduction ? AllLinks.filter((l) => l.url !== "/notes") : AllLinks;

const SiteLink = ({ url, title }) => (
  <li key={url}>
    <LinkRainbow to={url}>
      <h4>{title}</h4>
    </LinkRainbow>
  </li>
);

export const SiteLinks = () => <ul className="unstyled text-center">{Links.map(SiteLink)}</ul>;
