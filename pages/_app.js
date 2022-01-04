import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '../store/notification-content';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        {/* ANY HAED TAG WE ADD HERE WILL BE APPLIED TO ALL THE PAGES */}
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp
