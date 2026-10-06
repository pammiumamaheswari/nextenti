import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_BLOGS } from '../../lib/mockDb.js';
import { HealthcareSalaryCalculator } from '../../components/common/HealthcareSalaryCalculator.js';

export const ResourcesBlogPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" /> Clinical Career Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43]">
          Healthcare Career Resources & Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Compensation benchmarks, medical board interview walkthroughs, and clinical leadership guides.
        </p>
      </div>

      {/* Embedded Live Benchmark Tool */}
      <HealthcareSalaryCalculator />

      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#102A43]">Latest Clinical Guides & Career Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_BLOGS.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-premium transition flex flex-col justify-between"
            >
              <img src={blog.coverImage} alt={blog.title} className="w-full h-52 object-cover" />
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-teal-700 font-bold mb-2">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400 font-normal">
                      <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[#102A43] hover:text-teal-800 transition">
                    <Link to={`/resources/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-800 block">{blog.authorName}</span>
                    <span className="text-[11px]">{blog.authorRole}</span>
                  </div>
                  <Link
                    to={`/resources/${blog.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
