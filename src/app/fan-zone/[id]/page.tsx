"use client";

import { useState } from "react";

type CommentType = {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  replies?: CommentType[];
  isParent?: boolean;
};

const commentsData: CommentType[] = [
  {
    id: 1,
    author: "anonymous",
    timeAgo: "3hrs. ago",
    content:
      "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
    isParent: true,
    replies: [
      {
        id: 2,
        author: "anonymous",
        timeAgo: "3hrs. ago",
        content:
          "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
      },
      {
        id: 3,
        author: "anonymous",
        timeAgo: "3hrs. ago",
        content:
          "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
      },
    ],
  },
  {
    id: 4,
    author: "winners",
    timeAgo: "3hrs. ago",
    content:
      "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
    isParent: true,
    replies: [
      {
        id: 5,
        author: "anonymous",
        timeAgo: "3hrs. ago",
        content:
          "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
      },
      {
        id: 6,
        author: "anonymous",
        timeAgo: "3hrs. ago",
        content:
          "I think Player Y was the real MVP of the game. His defensive work was phenomenal!",
      },
    ],
  },
];

function Comment({
  comment,
  level = 0,
}: {
  comment: CommentType;
  level?: number;
}) {
  return (
    <div className="relative pl-8">
      {/* Line */}
      {level > 0 && (
        <div className="absolute top-0 bottom-0 left-3 w-px bg-green-600" />
      )}
      <div className="mb-4 flex items-start gap-2">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700 uppercase">
            {comment.author.charAt(0)}
          </div>
          {comment.isParent && (
            <div className="absolute -bottom-2 -left-2 rounded-full bg-gray-200 p-0.5 text-[10px]">
              i
            </div>
          )}
        </div>

        <div className="flex-1">
          {/* Username and time */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-green-700">
              {comment.author}
            </span>
            <span className="text-xs text-gray-400">{comment.timeAgo}</span>
          </div>

          {/* Content */}
          <p className="mt-1 text-sm text-gray-700">{comment.content}</p>

          {/* Actions */}
          <div className="mt-2 flex gap-6 text-xs text-gray-500">
            <button className="hover:text-black">👍 Likes</button>
            <button className="hover:text-black">💬 Reply</button>
            <button className="hover:text-black">🔗 Share</button>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommentsSection() {
  const [sortBy, setSortBy] = useState("Top");

  return (
    <div className="rounded bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Comments</h2>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Top">Top - (Most Like comments)</option>
          <option value="New">New - (Latest comments)</option>
          <option value="Best">Best - (Most Replied)</option>
        </select>
      </div>

      <div className="space-y-6">
        {commentsData.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
