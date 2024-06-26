import React, { useState, useEffect } from "react";
import { Favorite, Refresh} from '@mui/icons-material';
import { Menu, MenuItem, Badge, CircularProgress } from '@mui/material';
import styled from 'styled-components';

import axiosCall from '@/utils/api-call';
import CONFIG from '@/config';
import { NotificationType } from "@/types";
import { useRouter } from "next/navigation";


const ITEM_HEIGHT = 48;


// Styled Components ==============================================================

const StyledFavorite = styled(Favorite)`
  cursor: pointer;
  margin-right: 1em;
`;

let LoadingBlock = styled.div`
  height: 4em;
  width: 10em;
  display: grid;
  place-items: center;
`;

let NotificationBlock = styled.div`
  /* border-bottom: 1px solid #8a8a8a; */
  width: 100%;
  padding: 0;
  margin: 0;
`;


let ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  ================================================================================


export default function Notification({}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationType[]|null>(null);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [err, setErr] = useState<string|null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement|null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log('rendering...');

  return (
    <>
      <Badge
        badgeContent={newNotificationsCount} color="primary"
        max={10}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledFavorite onClick={handleClick}/>
      </Badge>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          },
        }}
      >{
          err !== null ?
            <MenuItem key="err" onClick={fetchNotifications}>
              <ErrorBlock>
                <p> {err} </p>
                <Refresh  />
              </ErrorBlock>
            </MenuItem> :
            notifications == null ?
            <MenuItem key={"fetching"} onClick={handleClose}>
              <LoadingBlock><CircularProgress /></LoadingBlock>
            </MenuItem> : notifications.length===0 ?
            <MenuItem>No notifications</MenuItem> :

                notifications.map(notif => 
                  <MenuItem
                    key={notif.id} onClick={() => redirectFromNotifictaion(notif.id, notif.url)}
                    style={{backgroundColor: notif.sent?"white":"#a8f0ec"}}
                  >
                    <NotificationBlock >{notif.text}</NotificationBlock>
                  </MenuItem>
              )
          }
      </Menu>
    </>
  );
  
  function handleClick(event: any){
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  function handleClose(){
    setAnchorEl(null);
    setOpen(false);
  };

  function fetchNotifications() {
    
    setNewNotificationsCount(0);
    setNotifications(null);
    return axiosCall('GET', `${CONFIG.API_DOMAIN}/notifications/get-notifs`)
      .then(({ data }) => {
        if (data.success) {
          setErr(null);
          setNotifications(data.notifications);
          setNewNotificationsCount(data.new_count);
        } else {
          setErr('Some error occured');
        }
      })
      .catch(error => {
        setErr('Connection error.');
      });
  }

  function redirectFromNotifictaion(notif_id: string, redirect_url: string) {
    return axiosCall('POST', `${CONFIG.API_DOMAIN}/notifications/set-seen`, { id: notif_id })
      .then(({ data }) => {
        console.log(data);
      }).catch(err => {
        console.log('Error:', err);
      }).finally(() => {
        setAnchorEl(null);
        setOpen(false);
        router.push(redirect_url);
      });
  }
}
