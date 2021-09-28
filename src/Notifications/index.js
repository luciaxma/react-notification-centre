import React, { Component, Fragment } from 'react';

import "./Styles.css";
import NotificationCard from "./NotificationCard";

class Notifications extends Component {
  constructor (props) {
    super(props);

    this.state = {
      show: false,
      loading: true,
      data: props.data,
      activeNotification: null,
      showDetails: false
    };
  }

  componentDidMount () {
    // Simulate loading while fetching data
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  toggleNotifications = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  handleOnClick = (index) => {

    const data = [...this.state.data];

    // Mark notification as read
    data[index].read = true;

    this.setState({ activeNotification: data[index], data, showDetails: true });
  }

  handleMarkAllAsRead = () => {

    const data = [...this.state.data];

    data.map(notification => {
      notification.read = true;
    })

    this.setState({ data });
  }

  handleNotificationDetailsBack = () => {
    this.setState({ showDetails: false });
  }

  render () {
    const { activeNotification, data, loading, show, showDetails } = this.state;

    let unreadCount = 0;

    const notificationsList = data.map((notification, index) => {
      if (!notification.read) {
        unreadCount++;
      }

      return (
        <NotificationCard
          data={notification}
          key={index}
          onClick={() => this.handleOnClick(index)}
        />
      )
    });

    const detailsState = showDetails ? "active" : "hidden";

    return (
      <div>
        {/* Notification icon */}
        <div
          className="notifications-icon"
          onClick={this.toggleNotifications}
        >
          <span class="material-icons">
            notifications_none
          </span>

          {/* Count */}
          {unreadCount > 0 && (
            <div
              className="notifications-count"
              style={unreadCount >= 100 ? { fontSize: '7px' } : null}
            >
              {unreadCount < 100 ? unreadCount : '99+'}
            </div>
          )}
        </div>

        {/* Container */}
        {show && (
          <div className="notifications-wrapper">
            <div className="notifications-container">
              <div className="notifications-header">
                <div className="notifications-header-title">Notifications</div>

                {data.length > 0 && (
                  <div className="notifications-header-link-right" onClick={this.handleMarkAllAsRead}>
                    Mark all as read
                  </div>
                )}
              </div>

              <div className="notifications-items">
                {data.length > 0 ? (
                  <Fragment>

                    {/* Show spinner if loading */}
                    {loading ? (
                      <div className="notifications-loader">
                        <div>Loading...</div>
                      </div>
                    ) : (
                      notificationsList
                    )}
                  </Fragment>
                ) : (
                  <div className="notifications-empty">
                    <div>No Notifications</div>
                  </div>
                )}
              </div>
            </div>

            {/* Notification details */}
            <div className={`notification-details-container ${detailsState}`}>
              <div className="notifications-header notification-details">
                <span class="material-icons notification-details-back-btn" onClick={this.handleNotificationDetailsBack}>arrow_back</span>
                <div className="notifications-header-title">{activeNotification && activeNotification.title}</div>
              </div>
              <div className="notification-details-content-text">
                <div>{activeNotification && activeNotification.receivedTime}</div>
                <br />
                <div>{activeNotification && activeNotification.message}</div>
              </div>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
