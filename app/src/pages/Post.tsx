import React, { useState, useEffect, ChangeEvent } from "react";
import ExpandableCard from "@leafygreen-ui/expandable-card";
import { H2, H3, Body } from "@leafygreen-ui/typography";
import ConfirmationModal from "@leafygreen-ui/confirmation-modal";
import TextInput from "@leafygreen-ui/text-input";
import TextArea from "@leafygreen-ui/text-area";
import Icon from "@leafygreen-ui/icon";
import Button from "@leafygreen-ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import type { Post as PostType, Comment } from "../types";

const Post: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Partial<PostType>>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const navigate = useNavigate();

  const deletePost = async (): Promise<void> => {
    await fetch(`${baseUrl}/posts/${params.id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  const handleNewComment = async (): Promise<void> => {
    await fetch(`${baseUrl}/posts/comment/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        author,
        body,
      }),
    });

    const result = await fetch(`${baseUrl}/posts/${params.id}`).then((resp) =>
      resp.json()
    );
    setPost(result);

    setAuthor("");
    setBody("");
    setShowModal(false);
  };

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      const results = await fetch(`${baseUrl}/posts/${params.id}`).then(
        (resp) => resp.json()
      );
      setPost(results);
    };

    loadPost();
  }, [params.id]);

  return (
    <React.Fragment>
      <H2>{post.title}</H2>
      <H3>by {post.author}</H3>
      <p>Published on {post.date ? new Date(post.date).toLocaleDateString() : ""}</p>
      <p dangerouslySetInnerHTML={{ __html: post.body || "" }} />
      <Button
        variant="primary"
        leftGlyph={<Icon glyph="Megaphone" />}
        onClick={() => setShowModal(true)}
      >
        Add Comment
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="danger"
        leftGlyph={<Icon glyph="Trash" />}
        onClick={deletePost}
      >
        Delete Post
      </Button>
      <br />
      <br />
      {post && post.comments && (
        <ExpandableCard title="Comments">
          {post.comments.map((comment: Comment, index: number) => (
            <p key={index}>
              <Body weight="medium">{comment.author} said: </Body>
              <Body>{comment.body}</Body>
            </p>
          ))}
        </ExpandableCard>
      )}

      <ConfirmationModal
        open={showModal}
        buttonText="Save Comment"
        onConfirm={handleNewComment}
        onCancel={() => setShowModal(false)}
      >
        <H2>Add Comment</H2>
        <TextInput
          label="Name"
          description="Enter your name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
          value={author}
        />
        <TextArea
          label="Comment"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.target.value)
          }
          rows={5}
          value={body}
        />
      </ConfirmationModal>
    </React.Fragment>
  );
};

export default Post;

