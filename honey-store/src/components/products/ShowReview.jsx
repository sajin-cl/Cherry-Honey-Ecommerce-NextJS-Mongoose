import React from 'react'
import WriteReviewModal from '@/components/products/WriteReviewModal';
import StarRating from '@/components/ui/StarRating';
import { serifItalic } from '@/config/staticData';


const ShowReview = ({product, localReviews, formOpen, setFormOpen, handleReviewSubmit}) => {
    return (
        <section className="mb-20">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-white" style={serifItalic}>
                    <span className="text-primary">Reviews</span>
                </h2>
                <button
                    onClick={() => setFormOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-secondary text-black text-sm font-semibold px-5 py-2.5 transition-all rounded-full cursor-pointer active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.5 1.125 1.125-4.5L16.862 3.487z" />
                    </svg>
                    Write a Review
                </button>
            </div>
            <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl font-bold text-primary">
                    {product?.rating}
                </span>
                <div>
                    <StarRating rating={product.rating} count={product.numReviews} />
                    <p className="text-gray-500 text-xs mt-1">
                        Based on {product?.numReviews} verified reviews
                    </p>
                </div>
            </div>

            <div className="space-y-6 max-w-3xl">
                {[...localReviews]
                    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                    .map((rev, i) => {
                        const avatar = rev?.avatar || rev.name?.charAt(0) || "U";
                        const dateStr = rev?.date || (rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : "Recent");
                        const commentText = rev?.text || rev?.comment || "";
                        return (
                            <div key={i} className="bg-[#111] border border-gray-800 p-5 animate-fadeIn">
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                        {avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-white text-sm font-semibold">
                                                {rev?.name}
                                            </span>
                                            <span className="text-gray-500 text-xs shrink-0">
                                                {dateStr}
                                            </span>
                                        </div>
                                        <StarRating rating={rev.rating} count={null} />
                                        <p className="text-gray-400 text-sm leading-relaxed mt-3">
                                            {commentText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/*  ═══════════════════════════ Write a Review Modal  ══════════════════════════════════════════════  */}
            <WriteReviewModal
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleReviewSubmit}
            />
        </section>
    )
};

export default ShowReview;