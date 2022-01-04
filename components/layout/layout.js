import React, { Fragment, useContext } from 'react'
import NotificationContext from '../../store/notification-content';
import Notification from '../notification/notification'
import Header from './main-header'

const Layout = (props) => {

    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;

    return (
        <Fragment>
            <Header />
            <main>
                {props.children}
            </main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status} />
            )}
        </Fragment>
    )
}

export default Layout
