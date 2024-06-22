import React, { useState, useEffect, useContext } from "react"
import { 
    Bookmark as BookmarkIcon,
    BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';

import CONFIG from '@/config';
import axiosCall from "@/utils/api-call";
import { PopupAgreementContext } from "@/context/PopupAgreementContext";
import { useRouter } from "next/navigation";

interface BookmarkProps {
    quesId: string;
}

export default function Bookmark({ quesId }: BookmarkProps) {
  const [ marked, setMarked ] = useState(null);
  const [bookmarkVis, setBookmarkVis] = useState(false);
  const showPopUp = useContext(PopupAgreementContext);
  const router = useRouter();

  useEffect(() => {
    axiosCall('GET', `${CONFIG.API_DOMAIN}/question/is-bookmarked?quesId=${quesId}`)
      .then((res) => {
        if (res.data.isAuthenticated) {
          setMarked(res.data.marked);
          setBookmarkVis(true);
        }
      });
  }, [ quesId ]);

  return (bookmarkVis && (marked? 
    <BookmarkIcon
      className="bookmark-icon icon"
      onClick={saveBookMark}
      color={marked === null ? 'disabled' : marked === true ? 'primary' : 'action'}
    />: 
    <BookmarkBorderIcon
      className="bookmark-icon icon"
      onClick={saveBookMark}
      color={marked === null ? 'disabled' : marked === true ? 'primary' : 'action'}
    />));

  
async function addBookmark(){
  setMarked(null);
  let res = await axiosCall('POST', `${CONFIG.API_DOMAIN}/question/save-bookmark`, { quesId: quesId });
  if (res.data.err)
    router.push("/")
  console.log("saveBookMark = ", res.data)
  setMarked(res.data.marked);
}
  
  function saveBookMark() {
    if (marked !== null && bookmarkVis) {
      showPopUp({
        content: {
          title: "Bookmark",
          content: marked? "Remove this from bookmarks":"Add this to your bookmarks"
        },
        agreeBtn: "Agree",
        disagreeBtn: "Disagree",
        onAgree: addBookmark,
        onDisagree: async () => { }});
    }
  }

}