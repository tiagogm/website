import { Layout } from "../components/layout/Layout";
import { ContactLinks } from "../components/contacts/ContactLinks/ContactLinks";

const ContactsPage = () => (
  <Layout>
    <Layout.Title space={64}>Contacts</Layout.Title>
    <Layout.Main space={128}>
      <ContactLinks />
    </Layout.Main>
    <Layout.LinkBack to="/" />
  </Layout>
);

export default ContactsPage;
