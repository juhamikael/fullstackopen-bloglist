import PropTypes from "prop-types";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useLike } from "../hooks/useLike";
import LikeButton from "./LikeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Blog = ({ blog }) => {
  const { likes, handleLike } = useLike(blog);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center pt-10 lg:pt-8">
      <Card
        className={cn(
          "bg-transparent border-accent/10 mb-4 rounded-xl items-center md:w-2/3 xl:w-1/3 "
        )}
      >
        <CardHeader>
          <CardTitle className={cn("text-2xl text-accent")}>
            {blog.title}
          </CardTitle>
          <CardDescription className={cn("text-sm italic")}>
            by {blog.author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <LikeButton handleLike={handleLike} likes={likes } />
            <Button
              id="show-details-btn"
              data-testid="show-details-btn"
              onClick={() => navigate(`/blogs/${blog.id}`)}
              className="w-1/4"
            >
              Show Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
