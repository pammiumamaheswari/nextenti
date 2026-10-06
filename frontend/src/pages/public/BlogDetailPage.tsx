import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Bookmark, Sparkles } from 'lucide-react';
import { INITIAL_BLOGS } from '../../lib/mockDb.js';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = INITIAL_BLOGS.find(b => b.slug === slug) || INITIAL_BLOGS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Link to="/resources" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700">
        <ArrowLeft className="w-4 h-4" /> Back to Career Resources
      </Link>

      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-subtle space-y-6">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102A43] leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
            <span className="font-semibold text-slate-800">{blog.authorName} ({blog.authorRole})</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
          </div>
        </div>

        <img src={blog.coverImage} alt={blog.title} className="w-full h-80 object-cover rounded-2xl" />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
          {blog.content}
        </div>
      </article>
    </div>
  );
};
