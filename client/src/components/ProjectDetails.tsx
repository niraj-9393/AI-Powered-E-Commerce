import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { shopDataContext } from "../context/ShopContext"
import RelatedProduct from "./RelatedProduct"

type Product = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  image2: string;
  image3: string;
  description: string;
  category: string;
  subCategory: string;
  bestseller: boolean;
  sizes: string[];
};

function ProjectDetails() {
  const { productId } = useParams()
  const context = useContext(shopDataContext)
  const products = context?.products
  const currency = context?.currency

  const [productData, setProductData] = useState<Product | null>(null)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description")

  const fetchProductData = () => {
    products?.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image1)
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  if (!productData) return <div className="opacity-0" />

  const images = [productData.image1, productData.image2, productData.image3]

  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025]">
      <div className="w-full max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col gap-10">

        {/* ── Top Section: Images + Info ── */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left: Thumbnails + Main Image ── */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-[55%]">

            {/* Thumbnail column */}
            <div className="flex lg:flex-col flex-row gap-3 justify-start shrink-0">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setImage(img)}
                  className={`w-20 h-24 rounded-md overflow-hidden border cursor-pointer transition-all duration-200 shrink-0 ${
                    image === img
                      ? "border-white/60"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-slate-300/10">
              <img
                src={image}
                alt={productData.name}
                className="w-full h-120 object-cover object-top"
              />
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="w-full lg:w-[45%] flex flex-col gap-5 text-white">

            {/* Name */}
            <h1 className="text-4xl font-semibold text-[aliceblue] leading-tight">
              {productData.name.toUpperCase()}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <svg key={s} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.957z" />
                </svg>
              ))}
              {/* Half star */}
              <svg className="w-5 h-5" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#FACC15" />
                    <stop offset="50%" stopColor="#6B7280" />
                  </linearGradient>
                </defs>
                <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.957z" />
              </svg>
              <span className="text-white/60 text-sm ml-1">(124)</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-semibold">
              {currency}{productData.price.toLocaleString()}
            </p>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              {productData.description}
            </p>

            {/* Size selector — from DB */}
            <div>
              <p className="text-base font-medium mb-3">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 rounded-md border text-sm font-medium transition-all duration-200 ${
                      size === s
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/80 hover:border-white/50 bg-transparent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full max-w-xs py-3.5 rounded-full bg-[#2a3a40] hover:bg-[#374f57] border border-white/10 text-white text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98]">
              Add To Cart
            </button>

            {/* Trust badges */}
            <div className="flex flex-col gap-1.5 text-white/50 text-xs mt-2 border-t border-white/10 pt-4">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>

        {/* ── Description / Reviews Tabs ── */}
        <div className="w-full mt-4">

          {/* Tab headers */}
          <div className="flex border border-white/10 rounded-t-md w-fit overflow-hidden">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "description"
                  ? "bg-white/5 text-white border-r border-white/10"
                  : "text-white/40 hover:text-white/60 border-r border-white/10 bg-transparent"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "reviews"
                  ? "bg-white/5 text-white"
                  : "text-white/40 hover:text-white/60 bg-transparent"
              }`}
            >
              Reviews (124)
            </button>
          </div>

          {/* Tab content */}
          <div className="border border-white/10 rounded-b-md rounded-tr-md p-6 bg-white/2">
            {activeTab === "description" ? (
              <p className="text-white/80 text-sm leading-relaxed max-w-4xl">
                {productData.description}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {[
                  { name: "Rahul M.", rating: 5, comment: "Excellent quality! Fits perfectly and the fabric is super breathable." },
                  { name: "Ankit S.", rating: 4, comment: "Great shirt for the price. Very comfortable for daily wear." },
                  { name: "Priya K.", rating: 5, comment: "Bought this for my husband and he loves it. Will order again." },
                ].map((review, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white text-sm font-medium">{review.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.957z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/60 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />

      </div>
    </div>
  )
}

export default ProjectDetails