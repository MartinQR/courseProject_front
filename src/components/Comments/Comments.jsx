import "../../index.css";
import { useState, useEffect, useContext } from "react";
import { Card, Avatar, Button, Textarea } from "@nextui-org/react";
const APP_URL = import.meta.env.VITE_APP_URL;
import { AuthContext } from "../../contexts/AuthContext";

export default function Comments({ formId }) {
  const { authData } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);

  const getComments = async () => {
    try {
      const response = await fetch(
        `${APP_URL}/form/getFormComments?formId=${formId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formId) {
      getComments();
    }
  }, [formId]);
  
  useEffect(() => {
    console.log("formId", formId);
    
    const intervalId = setInterval(() => {
      if (formId) {
        console.log("useEffect");
        getComments();

      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [formId]);

  const postComment = async () => {
    setLoadingPost(true);

    try {
      const response = await fetch(`${APP_URL}/form/commentForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId,
          content,
          userId: authData?.userId,
        }),
      });
      setContent("");
      getComments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    // <div className="">
    <Card className="bg-neutral-100 w-full my-5 p-5">
      <div className="text-center font-bold text-2xl h-1/3">Comments</div>

      <div>
        {comments?.map((comment) => (
          <Card
            key={comment?.id}
            className="bg-neutral-100 my-1 flex items-center justify-between p-2">
            <div className="flex items-center">
              <Avatar size="sm" />
              <p className="ml-2">{comment?.user?.email}</p>
            </div>
            <Textarea readOnly disabled value={comment?.content} />
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <Textarea
          label="Add Comments"
          placeholder="Comments..."
          maxLength={100}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="bordered"
          className="bg-orange-600 text-white m-2"
          onClick={postComment}
          isLoading={loadingPost}>
          Comment
        </Button>
      </Card>
    </Card>
    // </div>
  );
}
