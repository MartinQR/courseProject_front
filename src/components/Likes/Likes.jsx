import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
const APP_URL = import.meta.env.VITE_APP_URL;

export default function Likes({ formId }) {
  const { authData } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const getLikes = async() => {
    try {
      const response = await fetch(`${APP_URL}/form/getFormLikesCount?formId=${formId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLikes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const hasUserLikedForm = async() => {
    try {
      const response = await fetch(`${APP_URL}/form/hasUserLikedForm?formId=${formId}&userId=${authData?.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
      setLiked(data);
    } catch (error) {
      console.error(error);
    }
  }

  const likeForm = async() => {
    try {
      await fetch(`${APP_URL}/form/likeForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          userId: authData?.userId,
        }),
      });
      setLiked(true);
      getLikes();
    } catch (error) {
      console.error(error);
    }
  };

  const unlikeForm = async() => {
    try {
      await fetch(`${APP_URL}/form/unlikeForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          userId: authData?.userId,
        }),
      });
      setLiked(false);
      getLikes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formId) {
      getLikes();
    }
  }, [formId]);

  useEffect(() => {
    if (formId && authData?.userId) {
      hasUserLikedForm();
    }
  }, [formId, authData]);

  

  const handleLike = async() => {
    if (!authData?.userId) {
      toast.error("Please login to like the form");
      return;
    }

    if (liked) {
      await unlikeForm();
    } else {
      await likeForm();
    }
  };


  return (
    <div className="flex items-center">
      <div>Likes: {likes} </div>
      <div className="ml-4">
        <Button
          className={liked ? "bg-blue-500 text-white" : ""}
          onClick={handleLike}
        >
          {liked ? "Unlike" : "Like"}
        </Button>
      </div>
    </div>
  )
};