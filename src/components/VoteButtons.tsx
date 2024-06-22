import React,{useState,useEffect, useRef} from "react"

import axiosCall from '@/utils/api-call'
import { notLoggedIn } from "@/utils/helpers";
import CONFIG from '@/config';
import { 
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbDown as ThumbDownAltIcon
} from '@mui/icons-material';
import { UserData, VoteCount } from "@/types";

interface VoteButtonsProps {
  quesId: string;
  isQues: boolean;
  totalCount: VoteCount;
  user: UserData;
}

export default function VoteButtons({quesId, isQues, totalCount, user}: VoteButtonsProps) {
  const [up,setUp]= useState(false);
  const [down,setDown]=useState(false);
  const [clicked, setClicked] = useState(false)
  const totalUpRef=useRef<HTMLSpanElement>(null);
  const totalDownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    axiosCall('POST', `${CONFIG.API_DOMAIN}/Question/votes/byUser`, {quesId : quesId, isQues : isQues})
      .then(res => {
        // console.log("upvotedata = " ,res.data);
        if(res.data.upvote)
            setUp(true);
        else
        if(res.data.downvote)
            setDown(true);
      });
  }, []);
  
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }} className="up-down">
      
      <span ref={totalUpRef} style={{ fontSize: 20 }}>{totalCount ? totalCount.up : null}</span>
      <ThumbUpAltIcon
        // up={up}
        onClick={!user ? notLoggedIn : upvoted}
        color={clicked ? "disabled" : up ? "primary" : "secondary"}
        fontSize="large"
      />

      <span ref={totalDownRef} style={{ fontSize: 20 }}>{totalCount ? totalCount.down : null}</span>
      <ThumbDownAltIcon
        // down={down}
        onClick={!user ? notLoggedIn : downvoted}
        color={clicked ? "disabled" : down ? "secondary" : "primary"}
        fontSize="large"
      />
    </div>
  );

  
  function upvoted(){
    if(!clicked){
    setClicked(true);
    // if(!up===true){
    //     // upRef.current.name='arrow-up-circle';
    //     // downRef.current.name='arrow-down-circle-outline';
    //     const num = Number(totalUpRef.current.innerText) + 1;
    //     totalUpRef.current.innerText = num
    //     if(down){
    //       const num = Number(totalDownRef.current.innerText) - 1;
    //       totalDownRef.current.innerText = num
    //     }
    // }
    // else{
    //     // upRef.current.name='arrow-up-circle-outline';
    //     const num = Number(totalUpRef.current.innerText) - 1;
    //     totalUpRef.current.innerText = num
    // }
     
    //if(!up===true) axios call to add upvote 
    //else axios call to remove upvote
    axiosCall('POST', `${CONFIG.API_DOMAIN}/question/votes/editVote`, {quesId : quesId, up : !up, isQues : isQues})
      .then((res) => {
       
        // setUp false in downvoted function ensures that whatever is the state of upvote whether clicked or unclicked
        // so that we always downvote if downvote button gets clicked.
        // what will happen if we don't do this
        // U represents up
        // D represent down
        // consider the scenario -
        // U->D->U
        // the upstate == true then downstate == true then as upstate == true we will again decrement the
        // vote thinking that someone is removing its upvote rather increment the votes
        // so that's why we need to set state setUp false in downvoted function
        
        if (res.data.success) {
          setDown(false);
          setUp(!up);
          

          totalUpRef.current ? totalUpRef.current.innerText = res.data.vote.upvote: null;
          totalDownRef.current? totalDownRef.current.innerText = res.data.vote.downvote : null;
        } else if(res.data.isAuthenticated===false) {
          notLoggedIn();
        }
        
        setClicked(false);
      });

  }
}
  function downvoted(){
    if(!clicked){
      setClicked(true);
    // downRef.current.disabled = true;
    // upRef.current.disabled = true;
      // if(!down===true){
      //     // downRef.current.name='arrow-down-circle';
      //     // upRef.current.name='arrow-up-circle-outline';
      //     const num = Number(totalDownRef.current.innerText) + 1;
      //     totalDownRef.current.innerText = num
      //     //means upvoted
      //     if(up){
      //       const num = Number(totalUpRef.current.innerText) - 1;
      //       totalUpRef.current.innerText = num
      //     }
      // }
      // else{
      //     // downRef.current.name='arrow-down-circle-outline';
      //     const num = Number(totalDownRef.current.innerText) - 1;
      //     totalDownRef.current.innerText = num
      // }

      //if(!down===true) axios call to add downvote 
      //else axios call to remove downvote
      axiosCall('POST', `${CONFIG.API_DOMAIN}/question/votes/editVote`, {quesId : quesId, down : !down,isQues : isQues})
        .then((res) => {
            // same as above
          if (res.data.success) {
            setUp(false)
            setDown(!down);
            
            totalUpRef.current ? totalUpRef.current.innerText = res.data.vote.upvote: null;
            totalDownRef.current ? totalDownRef.current.innerText = res.data.vote.downvote : null;
          }else if(res.data.isAuthenticated===false) {
            notLoggedIn();
          }
          setClicked(false);
        });
    }
  }
}
