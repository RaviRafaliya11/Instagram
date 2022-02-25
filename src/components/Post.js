import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsBookmark } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db, storage } from "../Firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import Moment from "react-moment";
import { deleteObject, ref } from "firebase/storage";

export default function Post({ data }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // send comment function
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", data.id, "comments"), {
      comment: commentToSend,
      uid: session.user.uid,
      email: session.user.email,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  // get all comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", data.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, data.id]
  );

  // get all the likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", data.id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, data.id]
  );

  // update data after like and unlike
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // like and dislike functionality
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", data.id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", data.id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // Delete Post
  const DeletePost = async () => {
    if (data.postdata.email === session.user.email) {
      await deleteDoc(doc(db, "posts", data.id));
      const desertRef = ref(storage, `posts/${data.id}/image`);
      await deleteObject(desertRef);
    } else {
      alert("You are not Owner of this Post.");
    }
  };

  // Delete Comment
  const DeleteComment = async (Comment_Id) => {
    await deleteDoc(doc(db, "posts", data.id, "comments", Comment_Id));
  };

  return (
    <div className="my-3 rounded-sm border bg-white">
      {/* ________________________Header________________________ */}
      <div className="flex items-center px-5 py-2">
        <img
          src={data.postdata.profileImg}
          className="mr-2.5 h-9 w-9 rounded-full object-contain p-1 md:h-12 md:w-12"
          alt=""
        />
        <p className="flex-1 font-bold text-gray-800">
          {data.postdata.username}
        </p>

        {session ? (
          <div className="group relative">
            <HiOutlineDotsHorizontal className="h-5 w-5 cursor-pointer text-gray-500" />

            {/* ________________________ Mini Popup ________________________ */}

            <div className="absolute -right-5 z-10 w-48 scale-0 rounded-md border border-gray-300 bg-gray-50 shadow-2xl transition-all duration-300 ease-out group-hover:scale-100">
              <p
                onClick={DeletePost}
                className="w-full cursor-pointer rounded-t-md p-2 text-center font-bold text-red-600 hover:bg-gray-200"
              >
                Delete Post
              </p>
              <p className="w-full cursor-pointer p-2 text-center hover:bg-gray-200">
                Block User
              </p>
              <p className="w-full cursor-pointer rounded-b-md p-2 text-center hover:bg-gray-200">
                Unfollow User
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* ________________________ Post Image ________________________ */}
      <img src={data.postdata.image} className="w-full object-cover" alt="" />

      {/* ________________________ Like Commment and Share Buttons ________________________ */}
      {session && (
        <div className="flex justify-between p-3">
          <div className="flex space-x-4">
            {hasLiked ? (
              <AiFillHeart
                onClick={likePost}
                className="h-7 w-7 cursor-pointer text-[#FD1D1D] transition-all duration-150 ease-out hover:scale-125"
              />
            ) : (
              <AiOutlineHeart
                onClick={likePost}
                className="h-7 w-7 cursor-pointer transition-all duration-150 ease-out hover:scale-125"
              />
            )}

            <BsChat className="h-6 w-6 cursor-pointer transition-all duration-150 ease-out hover:scale-125 " />
            <IoPaperPlaneOutline className="h-[26px] w-[26px] cursor-pointer transition-all duration-150 ease-out hover:scale-125" />
          </div>
          <BsBookmark className="h-6 w-6 cursor-pointer transition-all duration-150 ease-out hover:scale-125 " />
        </div>
      )}

      {/* ________________________ Caption And Comments ________________________ */}

      <div className=" my-2 px-5 line-clamp-3">
        {/* Total Likes */}
        {likes.length > 0 && (
          <p className="my-1 font-bold">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{data.postdata.username} </span>
        {/* Post Caption */}
        {data.postdata.caption}
      </div>

      {/* All Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20  overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={comment.data().userImage}
                  className="h-5 w-5 rounded-full"
                  alt=""
                />
                <p className="mr-1.5 hidden font-bold sm:inline-block">
                  {comment.data().username}
                </p>
              </div>
              <div className="flex flex-1 items-center justify-between text-sm">
                <p className=" break-all">{comment.data().comment}</p>
                {comment.data().email === session?.user.email && (
                  <AiOutlineDelete
                    onClick={() => DeleteComment(comment.id)}
                    className="mx-2 h-5 w-5 flex-none cursor-pointer text-red-600"
                  />
                )}
              </div>
              <Moment
                fromNow
                interval={1000}
                className="hidden pr-5 text-xs sm:inline-block"
              >
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* ________________________ Comment Form  ________________________ */}
      {session && (
        <form className="flex items-center p-4">
          <p className="text-xl">🙂</p>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxlength="90"
            placeholder="Add a comment...."
            className="mx-1 flex-1 rounded border-none bg-gray-100 outline-none focus:bg-gray-200 focus:ring-0"
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment}
            className={`font-semibold ${
              !comment ? "text-blue-300" : "text-blue-500"
            }`}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
