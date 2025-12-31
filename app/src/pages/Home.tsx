import React, { useState, useEffect } from "react";
import { H2 } from "@leafygreen-ui/typography";
import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";
import type { PostSummaryData } from "../types";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostSummaryData[]>([]);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      const results = await fetch(`${baseUrl}/posts/latest`).then((resp) =>
        resp.json()
      );
      setPosts(results);
    };

    loadPosts();
  }, []);

  return (
    <React.Fragment>
      <H2>Latest Articles</H2>
      <div>
        {posts.map((post) => (
          <PostSummary {...post} key={post._id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;

