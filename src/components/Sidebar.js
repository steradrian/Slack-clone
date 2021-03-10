import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import AppsIcon from '@material-ui/icons/Apps';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {

    const [channels, loading, error] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);
  
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Slack Clone</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user.displayName}
                    </h3>

                </SidebarInfo>
                <CreateIcon/>

            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved Items" />
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <SidebarOption Icon={FileCopyIcon} title="FileBrowser" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
            <hr />
            
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />

            <SidebarOption Icon={AddIcon} title="Add channel" addChannelOption/>
            
            {channels?.docs.map((doc) => (
                <SidebarOption
                    key={doc.id}
                    id={doc.id}
                    title={doc.data().name}
                />
            ))}

        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--slack-color);
    color: white;
    flex: 0.3;
    border-top: 1px solid #49274b;
    margin-top: 60px;
    max-width: 300px;
    overflow: auto;

    ::-webkit-scrollbar {
        background-color: var(--slack-color);
    }

    ::-webkit-scrollbar-thumb {
        background-color: #49274b;
    }

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        color: #49724b;
        font-size: 18px;
        padding: 8px;
        background-color: white;
        border-radius: 999px;
    }
`;


const SidebarInfo = styled.div`
    flex: 1;
    
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
    `;