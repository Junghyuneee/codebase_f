import {countUnreadNotifications, getNotificationList, readNotifications} from "@/api/auth/notification";
import {memo, useEffect, useState} from "react";
import {NavDropdown, Spinner} from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import "./NotificationToggle.css";
import {VscBell, VscBellDot} from "react-icons/vsc";

const NotificationToggle = () => {
    const [showNoti, setShowNoti] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            (async () => {
                const unreadCount = await countUnreadNotifications();
                setUnreadCount(unreadCount.unreadNotis);
                if (showNoti) {
                    const response = await getNotificationList();
                    setNotifications([...response]);
                } else if (notifications.filter(noti => !noti.isRead).length !== 0) {
                    await readNotifications(notifications);
                    setUnreadCount(0);
                }
                setIsLoading(false);
            })();
        }, 500);

        return () => {
            clearTimeout(timer);
            setIsLoading(false); // 타이머가 취소될 때도 로딩 상태를 초기화
            setNotifications([]);  // 상태 초기화
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showNoti]);


    return (
        <NavDropdown
            title={
                <div style={{position: "relative", display: "inline-block"}} className={"d-flex align-items-center"}>
                    {unreadCount > 0?
                        <VscBellDot style={{fontSize: "x-large"}} className={"text-danger"}/>
                        :
                        <VscBell  style={{fontSize: "x-large"}}/>
                    }
                </div>
            }
            id="basic-nav-dropdown"
            show={showNoti}
            onMouseEnter={() => setShowNoti(true)}
            onMouseLeave={() => setShowNoti(false)}
            // drop="start"
        >
            {isLoading ?
                <div className="w-100 text-center p-1">
                    <Spinner className="mx-auto" animation="border" role="status"/>
                </div>
                :
                notifications
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((item) => (
                        <NavDropdown.Item
                            key={item.id}
                            as={"div"}
                            className="border-bottom"
                            style={{backgroundColor: item.isRead ? "white" : "lightyellow"}}
                        >
                            <NotificationItem notification={item}/>
                        </NavDropdown.Item>
                    ))}
        </NavDropdown>
    )
}

export default memo(NotificationToggle);