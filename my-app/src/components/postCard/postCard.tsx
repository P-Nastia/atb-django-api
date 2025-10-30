import React from "react";
import type {IPostItem} from "../../types/posts";
import ReactPlayer from "react-player";
import {formatDistanceToNow} from "date-fns";
import {APP_ENV} from "../../env";

interface PostCardProps {
    post: IPostItem;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-3">
            {/* Post header */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{post.topic_name || "No topic"}</span>
                <span>{formatDistanceToNow(post.created_at, { addSuffix: true })}</span>
            </div>

            <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>

            <p className="text-gray-700">{post.body}</p>

            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-lg max-h-96 w-full object-cover"
                />
            )}

            {post.video_url ? (

                <div className="rounded-lg overflow-hidden">
                    <ReactPlayer
                        src={post.video_url}
                        controls
                        width="100%"
                        height="180px"
                    />
                </div>
            ) : post.video ? (

                <div className="rounded-lg overflow-hidden">
                    <video controls style={{ width: '100%', height: '180px' }}>
                        <source src={`${APP_ENV.MEDIA_BASE_URL_VIDEO}${post.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : null}

            <div className="flex space-x-6 text-gray-500 text-sm pt-2 border-t border-gray-200">
                <button className="hover:text-blue-500">👍</button>
                <button className="hover:text-blue-500">💬</button>
                <button className="hover:text-blue-500">🔗</button>
            </div>
        </div>
    );
};

export default PostCard;
