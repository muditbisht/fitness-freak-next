import moment from 'moment';
import { Avatar } from '@mui/material';
import {
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';


import BookmarkIcon from '@/components/Bookmark';
import FollowBtn from '@/components/FollowBtn'

import QuestionHeaderMenu from './menu';
import {
    PostedDate, NameDiv, PostedName, StyledQuestionHeader
} from './styled';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuestionHeader {
    question: any;
    user: UserData | null;
}

export default function QuestionHeader({ question, user = null }: QuestionHeader) {
    const router = useRouter();

    return (
        <StyledQuestionHeader>
            <Avatar
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/profile/${question.user._id}`)} 
                alt={`${question.user && question.user.username || 'unknown'}s_profile_image`}
                src={question.user && question.user.profile_image}
                className="avatar"
            />
            <PostedName>
                <NameDiv>
                    {question.user ?
                        <>
                            <Link className="posted-by-name" href={`/profile/${question.user._id || question.user.userId}`}> {question.user.username}</Link>
                            {question.user.is_verified && <CheckCircleIcon color="primary" />}
                        </>
                        : <span className="posted-by-name deleted-name">[deleted]</span>}
                    <FollowBtn
                        type="text"
                        profile={question.user}
                        setIsFollowing={async () => {}}
                    />
                </NameDiv>
                <PostedDate>
                    <span className="posted-on">Posted on</span>
                    <span className="posted-date">{moment(question.posted_at).format('MMMM DD, YYYY')}</span>
                </PostedDate>
            </PostedName>
            <div className="icon-div">
                <BookmarkIcon quesId={question._id} />
                <QuestionHeaderMenu user={user} question={question} />
            </div>
        </StyledQuestionHeader>);

}