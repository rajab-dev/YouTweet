import { Router } from "express"; 
import { changecurrentpassword, counttweetlikes, dislikevideo, editpersonalinfo, getcurrentuser, getuser, getuserchannelprofile, getwatchhistory, homepage, jk, likedvideospage, likevideo, loginuser, logoutuser, mychannelpage, mycontent, otherpersontweetpage, postcomment, postweet, refreshaccesstoken, registeruser, renderregisterpage, search, searchpage, showeditpersonalpage, showotherpersonchannel, showpasswordchange, subscribechannel, test, tweet, tweetdislike, tweetlike, updateaccountdetails, updateuseravatar, updateusercoverimage, uploadvideo, uploadvideopost, userhistory, videodetailpage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js"





const router = Router();

router.route("/register").post(
  upload.fields([
      {
      name:"avatar",
      maxCount:1  
      },
      {
        name: "coverimage",
        maxCount: 1,
      }
  ]),
  registeruser
)

router.route("/sign-up").get(renderregisterpage)


router.route("/login").post(loginuser)

router.route("/logout").post(verifyjwt, logoutuser)

router.route("/refresh-token").post(refreshaccesstoken)

router.route("/change-password").post(verifyjwt, changecurrentpassword)

router.route("/current-user").get(verifyjwt, getcurrentuser)

router.route("/update-account").post(verifyjwt,updateaccountdetails)

router.route("/update-avatar").post(verifyjwt,
 upload.single("avatar"), updateuseravatar)

router.route("/update-coverimage").post(verifyjwt,
  upload.single("coverimage"), updateusercoverimage)

router.route("/c/:username").get(verifyjwt,getuserchannelprofile)

router.route("/watchhistory").get(verifyjwt,getwatchhistory )
router.route("/home").get(verifyjwt, homepage )
router.route("/my-channel").get(verifyjwt, mychannelpage )
router.route("/upload-video").get(verifyjwt, uploadvideo )
router.route("/upload-video-post").post(
  
  upload.fields([
    {
    name:"video",
    maxCount:1  
    },
    {
      name: "thumbnail",
      maxCount: 1,
    }
]),
  
 verifyjwt ,uploadvideopost )

router.route("/video/:video_id").get(verifyjwt,videodetailpage )
router.route("/subscribe/:channelid").get(verifyjwt, subscribechannel)
router.route("/channel/:channelname").get(verifyjwt, showotherpersonchannel)
router.route("/video/like/:videoid").get(verifyjwt, likevideo)
router.route("/video/dislike/:videoid").get(verifyjwt, dislikevideo)
router.route("/post/comment").post(verifyjwt, postcomment)
router.route("/history").get(verifyjwt, userhistory)
router.route("/liked-videos").get(verifyjwt, likedvideospage)
// router.route("/search").post(verifyjwt, search)
router.route("/search").get(verifyjwt, searchpage)
router.route("/my-channel/tweet").get(verifyjwt, tweet)
router.route("/post/tweet").post(verifyjwt, postweet)
router.route("/liketweet/:tweetid").get(verifyjwt, tweetlike)
router.route("/disliketweet/:tweetid").get(verifyjwt, tweetdislike)
router.route("/countlike").post( counttweetlikes )
router.route("/:otheruserid/tweets").get(verifyjwt, otherpersontweetpage )
router.route("/editpersonalinfo").get(verifyjwt, showeditpersonalpage )
router.route("/editpersonalinfo").post(verifyjwt, editpersonalinfo )
router.route("/change-password").get(verifyjwt, showpasswordchange)
// router.route("/liketweet/:user")

// router.route("/jk").get( jk )
router.route("/getuser").get(verifyjwt, getuser)
router.route("/mycontent").get(verifyjwt, mycontent)





router.route("/testing").get(test)

export default router