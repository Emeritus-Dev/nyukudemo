export interface ProductSize {
  size: string;
  stock: number;
}

export interface ProductImages {
  front: string;
  folded?: string;
  side?: string;
  back?: string;
  angle?: string;
  close?: string;
}

export interface Product {
  id: number;
  title: string;
  category: 'T-Shirts' | 'Hoodies & Sweats' | 'Shorts' | 'Accessories' | 'Outerwear' | 'Bottoms' | 'Headwear' | 'Drinkware' | 'Club & Leisure';
  gender: 'Men' | 'Women' | 'Unisex';
  price: string;
  images: ProductImages;
  description: string;
  material: string;
  sizes: ProductSize[];
  colors?: string[];
}

export const PRODUCTS: Product[] = [
  // 1. Signature Oversized Tee
  {
    id: 1,
    title: "Signature Cartoon Character Oversized Tee",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R500",
    images: {
      front: "/nyuku-tee-front.png",
      side: "/nyuku-tee-side.png"
    },
    description: "Signature boxy oversized streetwear tee featuring the core multi-colored bubble character typography. Tailored with dropped shoulders and a thick crew neck collar.",
    material: "100% Combed Heavyweight Cotton (280GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 6 }
    ]
  },
  // 2. Tennis Club Shorts - Red
  {
    id: 9,
    title: "NYUKU Tennis Club Shorts - Crimson Red",
    category: "Shorts",
    gender: "Unisex",
    price: "R450",
    images: {
      front: "/nyuku-shorts-red-front.png",
      folded: "/nyuku-shorts-red-folded.png",
      side: "/nyuku-shorts-red-close.png"
    },
    description: "Vibrant crimson red French Terry sweat shorts cut above the knee with an elastic drawstring waist and custom embroidered 'The Nyüku Club' tennis crest.",
    material: "100% French Terry Loopback Cotton (420GSM)",
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 8 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 3 }
    ]
  },
  // 3. Botanical Technical Track Jacket - Olive
  {
    id: 48,
    title: "NYUKU Botanical Technical Track Jacket - Olive",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R1,200",
    images: {
      front: "/nyuku-jacket-olive-front.png",
      back: "/nyuku-jacket-olive-back.png",
      folded: "/nyuku-jacket-olive-folded.png"
    },
    colors: ["Olive Green"],
    description: "Utilitarian technical track jacket in rich army olive green. Features traditional white frog-button ladder toggles along the gold center zipper, dual white sleeve racing stripes, minimalist geometric chest lettering, and an oversized botanical daisy tapestry graphic with vertical NYUKU typography across the entire back.",
    material: "100% Matte Technical Poly Shell with Ribbed Hem and Cuffs",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 11 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 4 }
    ]
  },
  // 4. Character Plush Cotton Towel - Blush Pink
  {
    id: 49,
    title: "NYUKU Character Plush Cotton Towel - Blush Pink",
    category: "Accessories",
    gender: "Unisex",
    price: "R220",
    images: {
      front: "/nyuku-towel-pink-front.png",
      folded: "/nyuku-towel-pink-folded.png",
      side: "/nyuku-towel-pink-close.png"
    },
    colors: ["Blush Pink"],
    description: "Plush 650GSM zero-twist Turkish cotton bath towel finished in pastel blush pink. Features a structured herringbone dobby band accented with high-density 3D puffy embroidered multi-color cartoon 'NYUKU' character typography.",
    material: "100% Zero-Twist Ring-Spun Turkish Cotton (650GSM)",
    sizes: [
      { size: "Bath Sheet (70x140cm)", stock: 35 }
    ]
  },
  // 5. Heavyweight Fleece Trackpants - Vanilla Cream
  {
    id: 41,
    title: "NYUKU Heavyweight Fleece Trackpants - Vanilla Cream",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R650",
    images: {
      front: "/nyuku-trackpants-cream-front.png",
      folded: "/nyuku-trackpants-cream-folded.png",
      side: "/nyuku-trackpants-cream-close.png"
    },
    colors: ["Vanilla Cream"],
    description: "Luxury heavyweight French Terry sweatpants tailored in a relaxed tapered streetwear fit. Features gathered elastic waistband with metallic-tipped drawstrings, side slant pockets, elastic ribbed cuffs, and raised 3D puffy bubble 'NYUKU' multi-color embroidery on the upper left thigh.",
    material: "100% Heavyweight Loopback French Terry Cotton (450GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ]
  },
  // 6. Vintage Canvas Tote - Chalk White
  {
    id: 39,
    title: "NYUKU-DAY Vintage Canvas Tote - Chalk White",
    category: "Accessories",
    gender: "Unisex",
    price: "R350",
    images: {
      front: "/nyuku-tote-white-front.png",
      side: "/nyuku-tote-white-side.png",
      back: "/nyuku-tote-white-hand.png"
    },
    colors: ["Chalk White"],
    description: "Heavyweight 14oz organic cotton canvas tote featuring the retro mascot print 'TODAY IS GOING TO BE A NYUKU_DAY!' across the front face. Equipped with reinforced shoulder straps and heavy-duty box stitching.",
    material: "100% Organic Heavy Cotton Canvas (14oz)",
    sizes: [
      { size: "One Size", stock: 80 }
    ]
  },
  // 7. Club Vertical Stripe Golf Polo - Camel Tan
  {
    id: 46,
    title: "NYUKU Club Vertical Stripe Golf Polo - Camel Tan",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R700",
    images: {
      front: "/nyuku-polo-striped-tan-front.png",
      folded: "/nyuku-polo-striped-tan-folded.png",
      back: "/nyuku-polo-striped-tan-back.png"
    },
    colors: ["Camel Tan"],
    description: "Short-sleeve luxury golf polo engineered with wide vertical awning stripes in warm camel tan and crisp chalk white. Styled with a solid flat-knit collar, twin pearlized buttons, and high-density satin embroidery of 'The Nyüku Club' tennis racquet medallion on the chest (ESTD 02.12.23).",
    material: "100% Heavy Combed Piqué Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ]
  },
  // 8. Definition Heavyweight Hoodie - Espresso Brown
  {
    id: 43,
    title: "NYUKU Definition Heavyweight Hoodie - Espresso Brown",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R600",
    images: {
      front: "/nyuku-hoodie-definition-brown-front.png",
      folded: "/nyuku-hoodie-definition-brown-folded.png",
      side: "/nyuku-hoodie-definition-brown-side.png"
    },
    colors: ["Espresso Brown"],
    description: "Heavyweight 450GSM loopback cotton pullover hoodie in rich espresso brown. Screen-printed with the iconic 8-bit pixelated 'NYUKU' noun dictionary definition across the chest, finished with metallic eyelets and a deep kangaroo pocket.",
    material: "100% French Terry Cotton Fleece (450GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 4 }
    ]
  },
  // 9. Character Plush Cotton Towel - Sage Green
  {
    id: 50,
    title: "NYUKU Character Plush Cotton Towel - Sage Green",
    category: "Accessories",
    gender: "Unisex",
    price: "R220",
    images: {
      front: "/nyuku-towel-green-front.png",
      folded: "/nyuku-towel-green-folded.png",
      side: "/nyuku-towel-green-close.png"
    },
    colors: ["Sage Green"],
    description: "Heavyweight absorbent luxury towel in calming sage mint green. Styled with deep plush terry loops and signature raised multi-color cartoon character 'NYUKU' embroidery above the hem.",
    material: "100% Zero-Twist Ring-Spun Turkish Cotton (650GSM)",
    sizes: [
      { size: "Bath Sheet (70x140cm)", stock: 30 }
    ]
  },
  // 10. Vertical Character Tumbler - Matte Black
  {
    id: 34,
    title: "NYUKU Vertical Character Tumbler - Matte Black",
    category: "Accessories",
    gender: "Unisex",
    price: "R120",
    images: {
      front: "/nyuku-tumbler-black.png"
    },
    colors: ["Matte Black"],
    description: "Sleek reusable insulated travel tumbler in matte jet-black featuring the signature vertical stacked 3D bubble cartoon mascot typography reading 'NYUKU' down the front. Double-wall insulated, BPA-free, and sweat-proof construction.",
    material: "Double-Wall Insulated Composite / BPA-Free Polymer (450ml)",
    sizes: [
      { size: "450ml (Standard)", stock: 60 }
    ]
  },
  // 11. Club Vertical Stripe Golf Polo - Forest Green
  {
    id: 47,
    title: "NYUKU Club Vertical Stripe Golf Polo - Forest Green",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R700",
    images: {
      front: "/nyuku-polo-striped-green-front.png",
      folded: "/nyuku-polo-striped-green-folded.png",
      side: "/nyuku-polo-striped-green-close.png",
      back: "/nyuku-polo-striped-green-back.png"
    },
    colors: ["Forest Green"],
    description: "Archival country club polo cut with wide alternating stripes in deep pine forest green and optic chalk white. Finished with a solid ribbed collar, engraved buttons, and tactile 3D satin-stitched 'The Nyüku Club' tennis medallion embroidery with golden script.",
    material: "100% Heavy Combed Piqué Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 15 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 5 }
    ]
  },
  // 12. Core Character Oversized Tee - Blush Pink
  {
    id: 52,
    title: "NYUKU Core Character Oversized Tee - Blush Pink",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R430",
    images: {
      front: "/nyuku-tee-character-pink-front.png",
      folded: "/nyuku-tee-character-pink-folded.png",
      back: "/nyuku-tee-character-pink-back.png"
    },
    colors: ["Blush Pink"],
    description: "Boxy luxury streetwear tee tailored in soft blush peach-pink from dense 280GSM combed jersey cotton. Features dropped shoulders, a thick 1.25-inch ribbed collar, and the signature multi-colored puff-printed 'NYUKU' cartoon mascot character typography across the chest.",
    material: "100% Combed Heavyweight Cotton (280GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ]
  },
  // 13. Heritage Soccer Kit - Sethosa #23 (Orange Edition)
  {
    id: 54,
    title: "NYUKU Heritage Soccer Kit - Sethosa #23 (Orange Edition)",
    category: "T-Shirts",
    gender: "Men",
    price: "R890",
    images: {
      front: "/nyuku-jersey-orange-sethosa-front.png",
      back: "/nyuku-jersey-orange-sethosa-back.png",
      folded: "/nyuku-jersey-orange-sethosa-folded.png",
      side: "/nyuku-jersey-orange-sethosa-close.png"
    },
    colors: ["Chalk White / Electric Orange"],
    description: "Minimalist technical football jersey engineered from breathable moisture-wicking honeycomb jacquard. Features electric orange abstract wave gradients along the flanks, dual-tipped ribbed athletic V-neck, high-density embroidered 'The Nyüku Club' soccer shield crest on the chest, and 'SETHOSA 23' archival squad numbering across the back.",
    material: "100% Recycled Moisture-Wicking Poly Performance Jacquard",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ]
  },
  // 14. Core Character Oversized Tee - Mint Green
  {
    id: 56,
    title: "NYUKU Core Character Oversized Tee - Mint Green",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R430",
    images: {
      front: "/nyuku-tee-character-mint-front.png",
      folded: "/nyuku-tee-character-mint-folded.png",
      back: "/nyuku-tee-character-mint-back.png"
    },
    colors: ["Mint Green"],
    description: "Boxy luxury streetwear tee tailored in fresh pastel mint green from heavyweight 280GSM combed cotton jersey. Features dropped shoulders, a structured ribbed crew neck, and high-density puff-printed cartoon mascot typography centered across the chest.",
    material: "100% Combed Heavyweight Cotton (280GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ]
  },
  // 15. Heritage Soccer Crop Top - Pink Edition
  {
    id: 55,
    title: "NYUKU Heritage Soccer Crop Top - Pink Edition",
    category: "T-Shirts",
    gender: "Women",
    price: "R350",
    images: {
      front: "/nyuku-croptop-pink-front.png",
      back: "/nyuku-croptop-pink-back.png",
      folded: "/nyuku-croptop-pink-folded.png",
      side: "/nyuku-croptop-pink-close.png"
    },
    colors: ["Chalk White / Pastel Pink"],
    description: "Cropped performance football silhouette crafted from lightweight breathable honeycomb jacquard. Features the heraldic soccer shield badge embroidered on the chest, pastel blush accents, and ribbed athletic trim.",
    material: "100% Moisture-Wicking Performance Polyester Jacquard",
    sizes: [
      { size: "XS", stock: 6 },
      { size: "S", stock: 12 },
      { size: "M", stock: 10 },
      { size: "L", stock: 4 }
    ]
  },
  // 16. Collage Block Tee - Chalk White
  {
    id: 23,
    title: "NYUKU EVERYWHERE Collage Block Tee - Chalk White",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R700",
    images: {
      front: "/nyuku-tee-collage-white-front.png",
      folded: "/nyuku-tee-collage-white-folded.png",
      side: "/nyuku-tee-collage-white-side.png",
      back: "/nyuku-tee-collage-white-back.png"
    },
    colors: ["Chalk White"],
    description: "Boxy luxury streetwear heavyweight tee in crisp chalk white featuring the iconic multi-color cut-out ransom collage 'NYUKU EVERYWHERE' block across the chest. Cut with dropped shoulders, wide sleeves, and a thick 1.25-inch ribbed neckband.",
    material: "100% Combed Heavyweight Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ]
  },
  // 17. Tennis Club Puffer Vest - Safety Orange
  {
    id: 20,
    title: "NYUKU Tennis Club Puffer Vest - Safety Orange",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R1,050",
    images: {
      front: "/nyuku-vest-orange-front.png",
      folded: "/nyuku-vest-orange-folded.png",
      side: "/nyuku-vest-orange-close.png"
    },
    description: "Insulated heavyweight puffer body warmer crafted from technical water-resistant nylon. Features horizontal quilted baffles, a stand collar, and high-density 'The Nyüku Club' tennis racket embroidery on the chest.",
    material: "100% Matte Technical Nylon with Thermal Down Fill",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 9 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ]
  },
  // 18. Bucket Hat - Royal Purple
  {
    id: 26,
    title: "NYUKU Chunky Corduroy Bucket Hat - Royal Purple",
    category: "Accessories",
    gender: "Unisex",
    price: "R320",
    images: {
      front: "/nyuku-bucket-purple-front.png",
      side: "/nyuku-bucket-purple-side.png",
      folded: "/nyuku-bucket-purple-top.png"
    },
    colors: ["Royal Purple"],
    description: "Festival-ready utility bucket hat crafted from heavyweight wide-wale cotton corduroy. Accented with raised 3D puffy bubble 'nyuku' embroidery in tonal purple with a crisp white border, concentric brim stitching, and an adjustable utility chin cord with toggle lock.",
    material: "100% Heavy Cotton Wide-Wale Corduroy",
    sizes: [
      { size: "S/M", stock: 25 },
      { size: "L/XL", stock: 30 }
    ]
  },
  // 19. Distressed Denim Tennis Cap
  {
    id: 25,
    title: "NYUKU Tennis Club Distressed Denim Cap",
    category: "Accessories",
    gender: "Unisex",
    price: "R400",
    images: {
      front: "/nyuku-cap-denim-distressed-front.png",
      side: "/nyuku-cap-denim-distressed-side.png",
      back: "/nyuku-cap-denim-distressed-back.png"
    },
    colors: ["Acid Wash Denim"],
    description: "Artisanal distressed dad cap crafted from heavy acid-washed blue denim. Finished with raw frayed gouges backed by a vibrant kelly-green underlayer, complete with the multi-layer 'Nyüku Club' tennis embroidery.",
    material: "100% Heavy Distressed Cotton Denim",
    sizes: [
      { size: "One Size (Adjustable Strap)", stock: 25 }
    ]
  },
  // 20. Heavyweight Fleece Trackpants - Matte Black
  {
    id: 42,
    title: "NYUKU Heavyweight Fleece Trackpants - Matte Black",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R650",
    images: {
      front: "/nyuku-trackpants-black-front.png"
    },
    colors: ["Matte Black"],
    description: "Monochrome matte black fleece sweatpants cut in a relaxed tapered streetwear silhouette. Accented with high-density 3D puffy bubble 'NYUKU' multi-color embroidery on the upper thigh, side pockets, elastic waistband, and ribbed ankle cuffs.",
    material: "100% Heavyweight Loopback French Terry Cotton (450GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ]
  },
  // 21. Tennis Club Shorts - Matte Black
  {
    id: 8,
    title: "NYUKU Tennis Club Shorts - Matte Black",
    category: "Shorts",
    gender: "Unisex",
    price: "R450",
    images: {
      front: "/nyuku-shorts-black-front.png",
      folded: "/nyuku-shorts-black-folded.png",
      side: "/nyuku-shorts-black-close.png"
    },
    description: "Heavyweight French Terry sweat shorts in matte black with an elastic drawstring waist. Accented with custom high-density 'The Nyüku Club' tennis racket embroidery on the left thigh.",
    material: "100% French Terry Loopback Cotton (420GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ]
  },
  // 22. Vintage Canvas Tote - Espresso Brown
  {
    id: 40,
    title: "NYUKU-DAY Vintage Canvas Tote - Espresso Brown",
    category: "Accessories",
    gender: "Unisex",
    price: "R350",
    images: {
      front: "/nyuku-tote-brown-front.png",
      side: "/nyuku-tote-brown-side.png",
      back: "/nyuku-tote-brown-hand.png"
    },
    colors: ["Espresso Brown"],
    description: "Rich dark espresso brown canvas utility tote bag featuring the high-contrast cream and orange 'NYUKU_DAY!' retro mascot graphic. Durable, spacious, and styled for everyday city essentials.",
    material: "100% Organic Heavy Cotton Canvas (14oz)",
    sizes: [
      { size: "One Size", stock: 80 }
    ]
  },
  // 23. Definition Heavyweight Hoodie - Nude
  {
    id: 44,
    title: "NYUKU Definition Heavyweight Hoodie - Nude",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R600",
    images: {
      front: "/nyuku-hoodie-definition-nude-front.png",
      folded: "/nyuku-hoodie-definition-nude-folded.png",
      side: "/nyuku-hoodie-definition-nude-side.png"
    },
    colors: ["Nude"],
    description: "Understated neutral sand nude pullover hoodie featuring high-density 8-bit arcade typography and dictionary noun definition graphics. Tailored with dropped shoulders and plush heavyweight fleece.",
    material: "100% French Terry Cotton Fleece (450GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 3 }
    ]
  },
  // 24. Vertical Character Tumbler - Frosted Glass
  {
    id: 35,
    title: "NYUKU Vertical Character Tumbler - Frosted Glass",
    category: "Accessories",
    gender: "Unisex",
    price: "R120",
    images: {
      front: "/nyuku-tumbler-transparent.png"
    },
    colors: ["Frosted Transparent"],
    description: "Frosted semi-translucent travel tumbler cup displaying the colorful vertical stacked 3D character letter column. Modern, lightweight, durable, and BPA-free.",
    material: "Semi-Translucent Frosted Polypropylene (450ml)",
    sizes: [
      { size: "450ml (Standard)", stock: 50 }
    ]
  },
  // 25. Collage Block Tee - Cyan
  {
    id: 28,
    title: "NYUKU EVERYWHERE Collage Block Tee - Electric Cyan",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R500",
    images: {
      front: "/nyuku-tee-collage-cyan-front.png",
      folded: "/nyuku-tee-collage-cyan-folded.png",
      side: "/nyuku-tee-collage-cyan-side.png",
      back: "/nyuku-tee-collage-cyan-back.png"
    },
    colors: ["Cyan"],
    description: "Electric cyan boxy streetwear tee showcasing the cut-paper 'NYUKU EVERYWHERE' collage block across the chest. Dropped shoulder silhouette with structured drape.",
    material: "100% Combed Heavyweight Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 4 }
    ]
  },
  // 26. Bucket Hat - Coral
  {
    id: 27,
    title: "NYUKU Chunky Corduroy Bucket Hat - Coral",
    category: "Accessories",
    gender: "Unisex",
    price: "R320",
    images: {
      front: "/nyuku-bucket-coral-front.png",
      side: "/nyuku-bucket-coral-side.png",
      folded: "/nyuku-bucket-coral-top.png"
    },
    colors: ["Coral"],
    description: "Heavyweight wide-wale corduroy bucket hat finished in vibrant summer coral. Finished with tonal 3D 'nyuku' bubble embroidery outlined in white, stitched circular rim, and black chin cord with white cinch toggle.",
    material: "100% Heavy Cotton Wide-Wale Corduroy",
    sizes: [
      { size: "S/M", stock: 20 },
      { size: "L/XL", stock: 25 }
    ]
  },
  // 27. Vintage Washed Tennis Cap - Charcoal Brown
  {
    id: 24,
    title: "NYUKU Tennis Club Vintage Washed Cap",
    category: "Accessories",
    gender: "Unisex",
    price: "R300",
    images: {
      front: "/nyuku-cap-tennis-front.png",
      side: "/nyuku-cap-tennis-side.png",
      back: "/nyuku-cap-tennis-back.png"
    },
    colors: ["Charcoal Brown"],
    description: "Low-profile unstructured 6-panel dad cap in vintage mineral-washed charcoal-brown cotton twill. Features raised 3D satin embroidery with 'Nyüku', an emerald tennis medallion, and 'Club' in golden cursive.",
    material: "100% Mineral-Washed Heavyweight Cotton Twill",
    sizes: [
      { size: "One Size (Adjustable Brass Buckle)", stock: 35 }
    ]
  },
  // 28. Rugby Polo - Baby Pink
  {
    id: 12,
    title: "NYUKU Heritage Striped Rugby Polo - Baby Pink",
    category: "T-Shirts",
    gender: "Women",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-pink-front.png"
    },
    description: "Tailored long-sleeve rugby jersey featuring alternating horizontal stripes in baby pink and crisp white. Finished with a solid pink collar and the athletic NYUKU shield crest embroidery on the chest.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 8 },
      { size: "M", stock: 10 },
      { size: "L", stock: 4 }
    ]
  },
  // 29. Definition Heavyweight Hoodie - Sky Blue
  {
    id: 45,
    title: "NYUKU Definition Heavyweight Hoodie - Sky Blue",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R600",
    images: {
      front: "/nyuku-hoodie-definition-blue-front.png",
      folded: "/nyuku-hoodie-definition-blue-folded.png",
      side: "/nyuku-hoodie-definition-blue-side.png"
    },
    colors: ["Sky Blue"],
    description: "Soft pastel sky blue fleece pullover hoodie accented with clean white retro 8-bit 'NYUKU' lettering and phonetic definition typography. Equipped with a structured double-layer hood and ribbed trim.",
    material: "100% French Terry Cotton Fleece (450GSM)",
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 11 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 5 }
    ]
  },
  // 30. Vertical Character Tumbler - Electric Orange
  {
    id: 36,
    title: "NYUKU Vertical Character Tumbler - Electric Orange",
    category: "Accessories",
    gender: "Unisex",
    price: "R120",
    images: {
      front: "/nyuku-tumbler-orange.png"
    },
    colors: ["Electric Orange"],
    description: "High-visibility matte electric orange travel tumbler featuring the high-contrast vertical stacked 3D character lettering running down the center. Double-wall insulated for temperature retention.",
    material: "Insulated Double-Wall Polymer (450ml)",
    sizes: [
      { size: "450ml (Standard)", stock: 45 }
    ]
  },
  // 31. Tennis Club Shorts - French Navy
  {
    id: 10,
    title: "NYUKU Tennis Club Shorts - French Navy",
    category: "Shorts",
    gender: "Unisex",
    price: "R450",
    images: {
      front: "/nyuku-shorts-blue-front.png",
      folded: "/nyuku-shorts-blue-folded.png",
      side: "/nyuku-shorts-blue-close.png"
    },
    description: "Deep French navy blue sweat shorts crafted from dense 420GSM loopback cotton, featuring thick drawstrings and the iconic tennis club embroidery.",
    material: "100% French Terry Loopback Cotton (420GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 9 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ]
  },
  // 32. Bucket Hat - Nude
  {
    id: 29,
    title: "NYUKU Chunky Corduroy Bucket Hat - Nude",
    category: "Accessories",
    gender: "Unisex",
    price: "R320",
    images: {
      front: "/nyuku-bucket-nude-front.png",
      side: "/nyuku-bucket-nude-side.png",
      folded: "/nyuku-bucket-nude-top.png"
    },
    colors: ["Nude"],
    description: "Wide-wale cotton corduroy bucket hat in neutral sand nude. Features raised tonal 3D 'nyuku' bubble embroidery with white outline stitching, textured ridges, and utility chin toggle.",
    material: "100% Heavy Cotton Wide-Wale Corduroy",
    sizes: [
      { size: "S/M", stock: 22 },
      { size: "L/XL", stock: 28 }
    ]
  },
  // 33. Acid-Wash Neon Scribble Tee
  {
    id: 4,
    title: "Vintage Acid-Wash NYUKU Neon Scribble Tee",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R850",
    images: {
      front: "/nyuku-acidwash-front.png",
      folded: "/nyuku-acidwash-folded.png"
    },
    description: "Custom vintage mineral acid-wash heavyweight jersey featuring 3D neon scribble typography. Finished with a relaxed vintage drape and thick ribbed collar.",
    material: "100% Acid-Washed Combed Cotton (280GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 2 }
    ]
  },
  // 34. Vertical Character Tumbler - Blush Pink
  {
    id: 37,
    title: "NYUKU Vertical Character Tumbler - Blush Pink",
    category: "Accessories",
    gender: "Unisex",
    price: "R120",
    images: {
      front: "/nyuku-tumbler-pink.png"
    },
    colors: ["Blush Pink"],
    description: "Soft pastel blush pink matte drinking tumbler highlighted by the iconic vertical stacked character typography. Spill-resistant lid profile and double-wall temperature control.",
    material: "Insulated Double-Wall Polymer (450ml)",
    sizes: [
      { size: "450ml (Standard)", stock: 55 }
    ]
  },
  // 35. Tennis Club Puffer Vest - Matte Black
  {
    id: 21,
    title: "NYUKU Tennis Club Puffer Vest - Matte Black",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R1,050",
    images: {
      front: "/nyuku-vest-black-front.png",
      folded: "/nyuku-vest-black-folded.png",
      side: "/nyuku-vest-black-close.png"
    },
    description: "Monochrome matte black insulated puffer vest with high stand collar, full-length front zip, and contrasting white and gold 'The Nyüku Club' tennis embroidery.",
    material: "100% Matte Technical Nylon with Thermal Down Fill",
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 6 }
    ]
  },
  // 36. Reusable Stadium Cup - Frost White
  {
    id: 22,
    title: "NYUKU EVERYWHERE Frosted Stadium Cup - Frost White",
    category: "Accessories",
    gender: "Unisex",
    price: "R75",
    images: {
      front: "/nyuku-cup-transparent.png"
    },
    colors: ["Transparent Frost"],
    description: "Signature reusable 500ml frosted matte stadium cup with high-contrast cobalt blue screen-printed 'NYUKU EVERYWHERE' curved typography. Durable, BPA-free, and dishwasher-safe lifestyle essential for street sessions and weekend events.",
    material: "100% BPA-Free Frosted Polypropylene (500ml)",
    sizes: [
      { size: "500ml (Standard)", stock: 150 }
    ]
  },
  // 37. Collage Block Tee - Lavender
  {
    id: 32,
    title: "NYUKU EVERYWHERE Collage Block Tee - Pastel Lavender",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R550",
    images: {
      front: "/nyuku-tee-collage-lavender-front.png",
      folded: "/nyuku-tee-collage-lavender-folded.png",
      side: "/nyuku-tee-collage-lavender-side.png",
      back: "/nyuku-tee-collage-lavender-back.png"
    },
    colors: ["Lavender"],
    description: "Pastel lavender heavy combed cotton tee displaying the full multi-color cut-out ransom 'NYUKU EVERYWHERE' collage block across the chest. Finished with dropped shoulders and relaxed sleeves.",
    material: "100% Combed Heavyweight Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 14 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 5 }
    ]
  },
  // 38. Vertical Character Tumbler - Crimson Red
  {
    id: 38,
    title: "NYUKU Vertical Character Tumbler - Crimson Red",
    category: "Accessories",
    gender: "Unisex",
    price: "R120",
    images: {
      front: "/nyuku-tumbler-red.png"
    },
    colors: ["Crimson Red"],
    description: "Bold matte crimson red insulated cup styled with the vibrant stacked 3D character letters reading 'NYUKU' from top to bottom. Durable, ergonomic, and BPA-free.",
    material: "Insulated Double-Wall Polymer (450ml)",
    sizes: [
      { size: "450ml (Standard)", stock: 50 }
    ]
  },
  // 39. Tennis Club Shorts - Espresso Brown
  {
    id: 11,
    title: "NYUKU Tennis Club Shorts - Espresso Brown",
    category: "Shorts",
    gender: "Unisex",
    price: "R450",
    images: {
      front: "/nyuku-shorts-brown-front.png",
      folded: "/nyuku-shorts-brown-folded.png",
      side: "/nyuku-shorts-brown-close.png"
    },
    description: "Rich espresso brown heavyweight sweat shorts finished with white and gold 'The Nyüku Club' tennis embroidery on the lower left leg.",
    material: "100% French Terry Loopback Cotton (420GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 7 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 }
    ]
  },
  // 40. Minimalist Track Jacket
  {
    id: 3,
    title: "NYUKU Minimalist Track Jacket",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R1,200",
    images: {
      front: "/nyuku-vest-black-front.png"
    },
    description: "Structured outerwear piece with custom matte black metal hardware and tonal embroidery accents across the spine.",
    material: "Durable Nylon Shell with Cotton Lining",
    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 6 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ]
  },
  // 41. Isometric Cube Tee
  {
    id: 5,
    title: "NYUKU Isometric Cube Tee",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R600",
    images: {
      front: "/nyuku-cube-front.png",
      back: "/nyuku-tee-cube-back.png",
      side: "/nyuku-cube-side.png",
      folded: "/nyuku-cube-folded.png"
    },
    description: "Monochrome heavyweight streetwear staple showcasing a custom 3D isometric typographic Rubik's cube print. Cut in a boxy, dropped-shoulder silhouette.",
    material: "100% Premium Organic Combed Cotton (260GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 }
    ]
  },
  // 42. Signature Ribbed Beanie
  {
    id: 6,
    title: "NYUKU Signature Ribbed Beanie",
    category: "Accessories",
    gender: "Unisex",
    price: "R190",
    images: {
      front: "/nyuku-beanie-black.png",
      folded: "/nyuku-beanie-beige.png",
      side: "/nyuku-beanie-pink.png",
      back: "/nyuku-beanie-green.png"
    },
    colors: ["Black", "White", "Pink", "Beige", "Green", "Red"],
    description: "Dense double-knit ribbed fisherman beanie finished with an embroidered NYUKU graphic badge on the cuff. Offered in a spectrum of seasonal colorways.",
    material: "100% Soft Touch Heavy-Gauge Acrylic Knit",
    sizes: [
      { size: "One Size", stock: 35 }
    ]
  },
  // 43. Heavyweight Hoodie (Core)
  {
    id: 2,
    title: "NYUKU Heritage Heavyweight Hoodie",
    category: "Hoodies & Sweats",
    gender: "Unisex",
    price: "R950",
    images: {
      front: "/nyuku-hoodie-white-front.png",
      folded: "/nyuku-hoodie-red-front.png",
      side: "/nyuku-hoodie-pink-front.png",
      back: "/nyuku-hoodie-purple-front.png"
    },
    colors: ["Chalk White", "Crimson Red", "Blush Pink", "Royal Purple"],
    description: "Premium fleece-lined pullover hoodie with ribbed side panels, deep kangaroo pocket, and high-density 3D cartoon character typography across the chest.",
    material: "100% French Terry Cotton (450GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 4 }
    ]
  },
  // 44. Rugby Polo - Royal Blue
  {
    id: 16,
    title: "NYUKU Heritage Striped Rugby Polo - Royal Blue",
    category: "T-Shirts",
    gender: "Men",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-blue-front.png"
    },
    description: "Athletic royal cobalt blue and crisp white rugby shirt with a solid polo collar, ribbed wrist cuffs, and raised satin-stitched NYUKU heritage crest on the chest.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 7 }
    ]
  },
  // 45. Reusable Stadium Cup - Smoky Black
  {
    id: 33,
    title: "NYUKU EVERYWHERE Frosted Stadium Cup - Smoky Black",
    category: "Accessories",
    gender: "Unisex",
    price: "R75",
    images: {
      front: "/nyuku-cup-black.png"
    },
    colors: ["Smoky Black"],
    description: "Frosted translucent smoky tinted black 500ml stadium cup with clean white curved 'NYUKU EVERYWHERE' graphics. Durable, BPA-free street drinking vessel.",
    material: "100% BPA-Free Frosted Polypropylene (500ml)",
    sizes: [
      { size: "500ml (Standard)", stock: 130 }
    ]
  },
  // 46. Rugby Polo - Matte Black
  {
    id: 13,
    title: "NYUKU Heritage Striped Rugby Polo - Matte Black",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-black-front.png"
    },
    description: "Streetwear long-sleeve rugby polo with wide horizontal monochrome black and white stripes. Accented by a structured black flat-knit collar and embroidered heritage chest badge.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ]
  },
  // 47. Signature 6-Panel Cap
  {
    id: 7,
    title: "NYUKU Signature 6-Panel Cap",
    category: "Accessories",
    gender: "Unisex",
    price: "R400",
    images: {
      front: "/nyuku-cap-black.png",
      folded: "/nyuku-cap-blue.png",
      side: "/nyuku-cap-green.png",
      back: "/nyuku-cap-beige.png"
    },
    colors: ["Washed Black", "Royal Blue", "Forest Green", "Sand Beige"],
    description: "Unstructured 6-panel low-profile dad cap crafted from heavyweight washed cotton twill, featuring bespoke 3D high-density NYUKU embroidery and an adjustable brass strap buckle.",
    material: "100% Heavy Washed Cotton Twill",
    sizes: [
      { size: "One Size (Adjustable)", stock: 40 }
    ]
  },
  // 48. Rugby Polo - Canary Yellow
  {
    id: 14,
    title: "NYUKU Heritage Striped Rugby Polo - Canary Yellow",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-yellow-front.png"
    },
    description: "Vibrant yellow and white striped heavyweight long-sleeve rugby jersey with three-button placket and left-chest embroidered NYUKU athletic shield.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 8 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 3 }
    ]
  },
  // 49. Rugby Polo - Royal Purple
  {
    id: 15,
    title: "NYUKU Heritage Striped Rugby Polo - Royal Purple",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-purple-front.png"
    },
    description: "Deep regal purple and white horizontal stripe pattern cut in a relaxed streetwear silhouette. Completed with ribbed cuffs and signature NYUKU club embroidery.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 9 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 2 }
    ]
  },
  // 50. Rugby Polo - Crimson Red
  {
    id: 17,
    title: "NYUKU Heritage Striped Rugby Polo - Crimson Red",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-red-front.png"
    },
    description: "Bold crimson red and white striped long-sleeve rugby jersey with clean turn-down collar and signature embroidered crest badge.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ]
  },
  // 51. Rugby Polo - Heather Grey
  {
    id: 18,
    title: "NYUKU Heritage Striped Rugby Polo - Heather Grey",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-grey-front.png"
    },
    description: "Clean heather grey and optic white horizontal striped long-sleeve rugby polo with embroidered chest badge and solid grey turn-down collar.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 3 }
    ]
  },
  // 52. Rugby Polo - Electric Orange
  {
    id: 19,
    title: "NYUKU Heritage Striped Rugby Polo - Electric Orange",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R1,300",
    images: {
      front: "/nyuku-rugby-orange-front.png"
    },
    description: "Original safety orange and optic white horizontal stripe rugby shirt featuring contrasting buttons, solid collar, and embroidered left-chest NYUKU crest.",
    material: "100% Combed Heavy Jersey Cotton (320GSM)",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 5 }
    ]
  },
  // 53. Slender Fieldbar Cooler Box
  {
    id: 57,
    title: "NYUKU Club 5L Slim Fieldbar Cooler - Forest Green",
    category: "Club & Leisure",
    gender: "Unisex",
    price: "R2,450",
    images: {
      front: "/nyuku-fieldbar-slim-green-front.png",
      side: "/nyuku-fieldbar-slim-green-side.png",
      angle: "/nyuku-fieldbar-slim-green-angle.png"
    },
    colors: ["Forest Green"],
    description: "Handcrafted 5L vertical bar cooler box in satin Forest Green with jewelry-grade polished gold hardware, dual hinge anchors, and genuine full-grain chestnut leather carry strap.",
    material: "Satin ABS, Polished Gold Hardware, Full-Grain Leather Strap",
    sizes: [
      { size: "5L Slim", stock: 12 }
    ]
  },
  // 54. Everywhere Leather Varsity Jacket - Green
  {
    id: 58,
    title: "NYUKU Everywhere Leather Varsity Jacket - Forest Green",
    category: "Outerwear",
    gender: "Men",
    price: "R3,850",
    images: {
      front: "/nyuku-varsity-green-front.png",
      side: "/nyuku-varsity-green-side.png",
      back: "/nyuku-varsity-green-back.png"
    },
    colors: ["Forest Green / Chalk White"],
    description: "Heavyweight Melton wool baseball varsity jacket in Forest Green featuring chalk white full-grain pebble leather sleeves, striped 2x2 ribbing, cartoon mascot sleeve embroidery, and statement spilled tumbler back graphic.",
    material: "100% Melton Wool Body, Full-Grain Pebble Leather Sleeves, Quilted Lining",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 5 }
    ]
  },
  // 55. Everywhere Leather Varsity Jacket - Orange
  {
    id: 59,
    title: "NYUKU Everywhere Leather Varsity Jacket - Safety Orange",
    category: "Outerwear",
    gender: "Men",
    price: "R3,850",
    images: {
      front: "/nyuku-varsity-orange-front.png",
      back: "/nyuku-varsity-orange-back.png"
    },
    colors: ["Safety Orange / Chalk White"],
    description: "Heavyweight Melton wool baseball varsity jacket in vibrant Safety Orange with chalk white cowhide leather sleeves, enamel snaps, sleeve character embroidery, and spilled tumbler back artwork.",
    material: "100% Melton Wool Body, Full-Grain Pebble Leather Sleeves, Quilted Lining",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 16 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 4 }
    ]
  },
  // 56. Soda Bottlecaps Heavyweight Tee - Ice Blue
  {
    id: 60,
    title: "NYUKU Soda Bottlecaps Heavyweight Tee - Ice Blue",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R850",
    images: {
      front: "/nyuku-tee-bottlecaps-blue-front.png",
      back: "/nyuku-tee-bottlecaps-blue-back.png",
      folded: "/nyuku-tee-bottlecaps-blue-angle.png"
    },
    colors: ["Ice Blue"],
    description: "Relaxed boxy cut tee in Ice Blue 280GSM combed cotton jersey. Features dual-soda bottlecaps badge on left chest and oversized high-gloss crimped bottlecap back graphic.",
    material: "100% Combed Heavyweight Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 20 },
      { size: "M", stock: 25 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 12 }
    ]
  },
  // 57. Soda Bottlecaps Heavyweight Tee - Sage Green
  {
    id: 61,
    title: "NYUKU Soda Bottlecaps Heavyweight Tee - Sage",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R850",
    images: {
      front: "/nyuku-tee-bottlecaps-sage-front.png",
      back: "/nyuku-tee-bottlecaps-sage-back.png",
      folded: "/nyuku-tee-bottlecaps-sage-angle.png"
    },
    colors: ["Sage Green"],
    description: "Boxy dropped-shoulder silhouette in muted Sage Green 280GSM cotton. Dual crimped metal soda bottlecaps badge on left chest and archival 'Cold Like Ice' back print.",
    material: "100% Combed Heavyweight Cotton Jersey (280GSM)",
    sizes: [
      { size: "S", stock: 18 },
      { size: "M", stock: 22 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 8 }
    ]
  },
  // 58. Soda Bottlecaps Heavyweight Tee - Chalk White
  {
    id: 62,
    title: "NYUKU Soda Bottlecaps Heavyweight Tee - Chalk White",
    category: "T-Shirts",
    gender: "Unisex",
    price: "R850",
    images: {
      front: "/nyuku-tee-bottlecaps-white-front.png",
      back: "/nyuku-tee-bottlecaps-white-back.png",
      folded: "/nyuku-tee-bottlecaps-white-angle.png"
    },
    colors: ["Chalk White"],
    description: "Staple Chalk White 300GSM heavy cotton tee featuring 1.25-inch thick ribbed collar, left badge print, and bold red/green overlapping soda bottlecaps back-print.",
    material: "100% Combed Heavyweight Cotton (300GSM)",
    sizes: [
      { size: "S", stock: 25 },
      { size: "M", stock: 35 },
      { size: "L", stock: 30 },
      { size: "XL", stock: 15 }
    ]
  },
  // 59. 5-Panel Camper Cap - Cyan Acid Denim
  {
    id: 63,
    title: "NYUKU 5-Panel Camper Cap - Cyan Acid Denim",
    category: "Headwear",
    gender: "Unisex",
    price: "R650",
    images: {
      front: "/nyuku-cap-denim-cyan-front.png",
      side: "/nyuku-cap-denim-cyan-side.png",
      folded: "/nyuku-cap-denim-cyan-angle.png"
    },
    colors: ["Acid Cyan Blue"],
    description: "Low-profile unstructured 5-panel camp cap crafted from heavy mineral acid-washed cyan denim twill. Features 3D bubble graffiti embroidery with white contrast contour and rear nylon strap closure.",
    material: "100% Stonewashed Cotton Denim Twill, Nylon Strap",
    sizes: [
      { size: "One Size (Adjustable Strap)", stock: 45 }
    ]
  },
  // 60. 5-Panel Camper Cap - Crimson Red
  {
    id: 64,
    title: "NYUKU 5-Panel Camper Cap - Crimson Red",
    category: "Headwear",
    gender: "Unisex",
    price: "R650",
    images: {
      front: "/nyuku-cap-denim-red-front.png",
      side: "/nyuku-cap-denim-red-side.png",
      folded: "/nyuku-cap-denim-red-angle.png"
    },
    colors: ["Crimson Red"],
    description: "Low-profile 5-panel camp hat constructed from garment-washed crimson red cotton twill. Features tonal bubble graffiti mascot typography framed by a raised white contrast stitch.",
    material: "100% Washed Cotton Twill Canvas, Matte Metal Eyelets",
    sizes: [
      { size: "One Size (Adjustable Strap)", stock: 40 }
    ]
  },
  // 61. 5-Panel Camper Cap - Washed Black Denim
  {
    id: 65,
    title: "NYUKU 5-Panel Camper Cap - Washed Black Denim",
    category: "Headwear",
    gender: "Unisex",
    price: "R650",
    images: {
      front: "/nyuku-cap-denim-5panel-front.png",
      side: "/nyuku-cap-denim-5panel-side.png",
      folded: "/nyuku-cap-denim-5panel-angle.png"
    },
    colors: ["Washed Black Denim"],
    description: "Mineral stonewashed black denim 5-panel camper cap featuring authentic edge abrasion, flat visor, dual side breathers, and the iconic Nyüku 3D bubble mascot lettering in monochrome white stitch.",
    material: "100% Mineral Acid-Washed Black Denim Twill",
    sizes: [
      { size: "One Size (Adjustable Strap)", stock: 50 }
    ]
  },
  // 62. Ballistic Canvas Camping Chair
  {
    id: 66,
    title: "NYUKU EVERYWHERE Ballistic Canvas Camping Chair",
    category: "Club & Leisure",
    gender: "Unisex",
    price: "R1,450",
    images: {
      front: "/nyuku-camping-chair-white-front.png",
      side: "/nyuku-camping-chair-white-angle.png",
      back: "/nyuku-camping-chair-white-back.png"
    },
    colors: ["Chalk White / Matte Black"],
    description: "Luxury outdoor folding armchair engineered from 900D ballistic waterproof canvas and heavy-duty matte black steel scissor-frame. Features high-density embroidered 'NYUKU EVERYWHERE' ransom collage block patch on the headrest, oversized back-print, and integrated aluminum-rimmed cup holder.",
    material: "900D Ballistic Matte Canvas, Powder-Coated Steel Scissor-Frame, Anodized Aluminum Accents",
    sizes: [
      { size: "One Size (Foldable Portable)", stock: 25 }
    ]
  },
  // 63. Dictionary Sky Hoodie (Slideshow Drop)
  {
    id: 70,
    title: "Dictionary Sky Hoodie",
    category: "Outerwear",
    price: "R1,450",
    description: "Heavyweight sky-blue oversized pullover hoodie with dropped shoulders, kangaroo pouch, and an 8-bit typographic dictionary print across the chest.",
    material: "450GSM Loopback French Terry",
    gender: "Unisex",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 18 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 6 }
    ],
    images: {
      front: "/nyuku-hoodie-dictionary-sky.png",
      side: "/nyuku-hoodie-definition-blue-side.png",
      folded: "/nyuku-hoodie-definition-blue-folded.png"
    }
  },
  // 64. Bottlecaps Sage Tee (Slideshow Drop)
  {
    id: 71,
    title: "Bottlecaps Sage Tee",
    category: "T-Shirts",
    price: "R850",
    description: "Heavyweight sage green combed cotton t-shirt with dropped shoulders, featuring oversized overlapping fluted crown soda bottlecaps on the back.",
    material: "280GSM Combed Cotton",
    gender: "Unisex",
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 8 }
    ],
    images: {
      front: "/nyuku-tee-bottlecaps-sage-front.png",
      back: "/nyuku-tee-bottlecaps-moss.png",
      side: "/nyuku-tee-bottlecaps-sage-angle.png"
    }
  },
  // 65. Bubble Mascot Sweats (Slideshow Drop)
  {
    id: 72,
    title: "Bubble Mascot Sweats",
    category: "Bottoms",
    price: "R1,200",
    description: "Ultra-wide balloon-cut relaxed sweatpants in jet black loopback fleece featuring raised 3D puff embroidery of the cartoon mascot character letters across the front.",
    material: "450GSM Loopback French Terry",
    gender: "Unisex",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 16 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ],
    images: {
      front: "/nyuku-sweatpants-bubble-noir.png",
      back: "/nyuku-sweatpants-baggy-black-back.png",
      angle: "/nyuku-sweatpants-baggy-black-angle.png"
    }
  },
  // 66. Heritage Tennis Cap (Slideshow Drop)
  {
    id: 73,
    title: "Heritage Tennis Cap",
    category: "Headwear",
    price: "R480",
    description: "Vintage unstructured 6-panel dad cap in heavily washed charcoal twill with high-density embroidered tennis club crest on the crown.",
    material: "Distressed Heavy Cotton Twill",
    gender: "Unisex",
    sizes: [
      { size: "One Size", stock: 50 }
    ],
    images: {
      front: "/nyuku-cap-tennis-heritage-charcoal.png",
      back: "/nyuku-cap-tennis-back.png",
      side: "/nyuku-cap-tennis-side.png"
    }
  }
];

export default PRODUCTS;