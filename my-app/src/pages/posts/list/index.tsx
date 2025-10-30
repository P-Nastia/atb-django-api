import React from "react";
import {useGetPostsQuery} from "../../../services/postService.ts";
import PostCard from "../../../components/postCard/postCard.tsx";

const PostsPage: React.FC = () => {
    const { data: posts, isLoading, isError } = useGetPostsQuery();


    if (isLoading) return <div className="text-center mt-10">Loading posts...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading posts</div>;
    console.log(posts);
    return (

        <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            {posts?.length ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <div className="text-center text-gray-500">No posts yet</div>
            )}
        </div>
    );
};

export default PostsPage;
