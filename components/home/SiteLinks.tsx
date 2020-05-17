import { LinkRainbow } from "../layout/LinkRainbow";

const Links = [
  {
    url: "/about",
    title: "About me",
  },
  {
    url: "/contacts",
    title: "Contacts",
  },
  {
    url: "/notes",
    title: "Notes on software",
  },
];

const SiteLink = ({ url, title }) => (
  <li key={url}>
    <LinkRainbow to={url}>
      <h4>{title}</h4>
    </LinkRainbow>
  </li>
);

export const SiteLinks = () => <ul className="unstyled text-center">{Links.map(SiteLink)}</ul>;
