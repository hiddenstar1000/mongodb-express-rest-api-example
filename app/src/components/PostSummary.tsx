import React from "react";
import Card from "@leafygreen-ui/card";
import { css } from "@leafygreen-ui/emotion";
import { H3 } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import { Link } from "react-router-dom";
import type { PostSummaryData } from "../types";

const cardStyle = css`
  margin: 1em;
`;

type BadgeVariant = "lightgray" | "darkgray" | "red" | "blue" | "green" | "yellow";
const badgeColors: BadgeVariant[] = ["lightgray", "darkgray", "red", "blue", "green", "yellow"];

const getBadgeColor = (tag: string): BadgeVariant => {
  const tagId =
    tag
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((s, a) => s + a, 0) % 6;
  return badgeColors[tagId];
};

interface PostSummaryProps extends PostSummaryData {}

const PostSummary: React.FC<PostSummaryProps> = ({
  _id,
  title,
  author,
  date,
  tags,
}) => {
  return (
    <Card className={cardStyle}>
      <H3>{title}</H3>
      by {author} on {new Date(date).toLocaleDateString()}
      <br />
      <Link to={`/post/${_id}`}>Read More...</Link>
      <br />
      {tags &&
        tags.map((tag, index) => (
          <React.Fragment key={index}>
            <Badge variant={getBadgeColor(tag)}>{tag}</Badge>{" "}
          </React.Fragment>
        ))}
    </Card>
  );
};

export default PostSummary;

