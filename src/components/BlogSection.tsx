import React, { useState, useEffect } from 'react';

const fallbackPosts = [
  { title: 'Health Insurance Claim Rejection: 15 Real Reasons & How to Prevent', slug: 'health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026', summary: 'Discover the most common reasons health insurance claims get rejected in India and learn practical strategies to prevent and appeal each one.' },
  { title: 'How to Revive a Lapsed LIC Policy in India 2026', slug: 'how-to-revive-a-lapsed-lic-policy-in-india-2026-complete-step-by-step-guide', summary: 'Step-by-step guide to revive your lapsed LIC policy. Learn about revival fees, documents required, and deadlines.' },
  { title: 'Term Insurance vs Life Insurance: Key Differences Every Indian Must Know', slug: 'term-insurance-vs-life-insurance-key-differences-every-indian-must-know-2026', summary: 'A clear comparison of term insurance and whole life insurance to help you choose the right policy for your family.' },
];

export default function BlogSection() {
  const [post, setPost] = useState(fallbackPosts[0]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Simulate fetching latest blog post
    const random = fallbackPosts[Math.floor(Math.random() * fallbackPosts.length)];
    setPost(random);
  }, []);

  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/30 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <div className="text-center mb-10 reveal">
          <span className="label-aurora mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Expert Insights
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Expert Insurance Insights</h2>
        </div>

        <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-sm overflow-hidden card-aurora reveal">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.title}</h3>
            <p className={`text-[rgba(255,255,255,0.6)] leading-relaxed mb-4 ${!expanded ? 'line-clamp-3' : ''}`} style={{ fontFamily: "'Inter', sans-serif" }}>
              {post.summary}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#10b981] hover:text-[#0d9f6a] font-medium text-sm flex items-center gap-1"
              >
                {expanded ? 'Show Less' : 'Read More'}
                <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <a href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#10b981] hover:text-[#0d9f6a] flex items-center gap-1 ml-auto">
                Full Article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/blog" className="btn-aurora-pill">
            View All Articles
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
