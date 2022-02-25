import { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../Firebase/firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} data={{ id: post.id, postdata: post.data() }} />
      ))}
    </div>
  );
}
