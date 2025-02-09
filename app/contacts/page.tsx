import { ContactLinks } from "./ContactLinks";
import { AppLayout } from "../../components/layout/AppLayout";

const ContactsPage = () => (
  <AppLayout>
    <AppLayout.Title space={64}>Contacts</AppLayout.Title>
    <AppLayout.Main space={128}>
      <ContactLinks />
    </AppLayout.Main>
    <AppLayout.LinkBack to="/" />
  </AppLayout>
);

export default ContactsPage;
