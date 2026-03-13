import { useState, useRef } from "react";

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────
const CATS = {
  "Fashion & Clothing":    { icon: "👗", color: "#E11D48", bg: "#FFF1F3" },
  "Beauty & Makeup":       { icon: "💄", color: "#DB2777", bg: "#FDF2F8" },
  "Skincare":              { icon: "🧴", color: "#7C3AED", bg: "#F5F3FF" },
  "Food & Beverages":      { icon: "🍜", color: "#EA580C", bg: "#FFF7ED" },
  "Health & Fitness":      { icon: "💪", color: "#16A34A", bg: "#F0FDF4" },
  "Finance & Investment":  { icon: "📈", color: "#0D9488", bg: "#F0FDFA" },
  "Education & Courses":   { icon: "📚", color: "#2563EB", bg: "#EFF6FF" },
  "Tech & Electronics":    { icon: "📱", color: "#0284C7", bg: "#F0F9FF" },
  "Media & YouTube":       { icon: "🎬", color: "#DC2626", bg: "#FEF2F2" },
  "Music & Podcast":       { icon: "🎵", color: "#D97706", bg: "#FFFBEB" },
  "Gaming & Esports":      { icon: "🎮", color: "#6D28D9", bg: "#F5F3FF" },
  "Merchandise & Apparel": { icon: "🛍️", color: "#C2410C", bg: "#FFF7ED" },
  "Personal Care":         { icon: "🪥", color: "#0891B2", bg: "#ECFEFF" },
  "Home & Lifestyle":      { icon: "🏠", color: "#B45309", bg: "#FFFBEB" },
  "Photography & Art":     { icon: "📸", color: "#9333EA", bg: "#FAF5FF" },
  "Travel & Adventure":    { icon: "✈️", color: "#0369A1", bg: "#F0F9FF" },
  "Spiritual & Wellness":  { icon: "🧘", color: "#15803D", bg: "#F0FDF4" },
  "Real Estate":           { icon: "🏢", color: "#92400E", bg: "#FFFBEB" },
  "E-commerce":            { icon: "🛒", color: "#1D4ED8", bg: "#EFF6FF" },
  "Sports":                { icon: "⚽", color: "#047857", bg: "#ECFDF5" },
};

const TYPE_C = {
  "Founder":    { bg: "#DCFCE7", color: "#15803D" },
  "Co-Founder": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Collab":     { bg: "#FCE7F3", color: "#BE185D" },
  "Partner":    { bg: "#FEF3C7", color: "#B45309" },
  "Owner":      { bg: "#F3E8FF", color: "#7E22CE" },
  "Investor":   { bg: "#E0F2FE", color: "#0369A1" },
  "Ambassador": { bg: "#FFEDD5", color: "#C2410C" },
  "Co-Creator": { bg: "#FCE7F3", color: "#BE185D" },
};

const TIERS = {
  "Mega":  { label: "Mega Creator",   sub: "50M+ subscribers",  color: "#DC2626", icon: "👑", bg: "#FEF2F2" },
  "Large": { label: "Large Creator",  sub: "5M–50M",            color: "#EA580C", icon: "⭐", bg: "#FFF7ED" },
  "Mid":   { label: "Mid Creator",    sub: "1M–5M",             color: "#D97706", icon: "🔥", bg: "#FFFBEB" },
  "Small": { label: "Rising Creator", sub: "Under 1M",          color: "#16A34A", icon: "🌱", bg: "#F0FDF4" },
};

// ─── WORLD YOUTUBER DATA ──────────────────────────────────────────────────────
const COUNTRIES = [
  // ══════════════════════════════════
  {
    code:"IN", name:"India", flag:"🇮🇳", region:"Asia",
    youtubers:[
      { name:"CarryMinati", tier:"Mega", subs:"42M", niche:"Roast & Gaming", yt:"https://www.youtube.com/@CarryMinati", avatar:"CM", color:"#7C3AED",
        brands:[
          { name:"Carry Merchandise", cat:"Merchandise & Apparel", desc:"India's top roast culture streetwear — hoodies, tees, caps", link:"https://carryminati.com", cta:"Shop Merch", type:"Founder", year:2020 },
          { name:"CarryIsLive", cat:"Gaming & Esports", desc:"Premier gaming & livestream content brand", link:"https://www.youtube.com/@CarryIsLive", cta:"Watch Gaming", type:"Founder", year:2018 },
        ]},
      { name:"BB Ki Vines (Bhuvan Bam)", tier:"Mega", subs:"26M", niche:"Comedy & Music", yt:"https://www.youtube.com/@BBKiVines", avatar:"BB", color:"#DB2777",
        brands:[
          { name:"Youthiapa", cat:"Merchandise & Apparel", desc:"India's iconic youth merchandise — cult streetwear brand", link:"https://youthiapa.com", cta:"Shop Youthiapa", type:"Founder", year:2017 },
          { name:"BB Music", cat:"Music & Podcast", desc:"Original Bollywood-pop music under his own label", link:"https://www.youtube.com/@BBKiVines", cta:"Listen Now", type:"Founder", year:2018 },
        ]},
      { name:"Technical Guruji", tier:"Mega", subs:"23M", niche:"Tech Reviews", yt:"https://www.youtube.com/@TechnicalGuruji", avatar:"TG", color:"#0284C7",
        brands:[
          { name:"TG Official Store", cat:"Merchandise & Apparel", desc:"Official tech lifestyle merchandise & accessories", link:"https://technicalguruji.in", cta:"Shop Now", type:"Founder", year:2021 },
        ]},
      { name:"Ranveer Allahbadia", tier:"Large", subs:"9.2M", niche:"Fitness & Podcast", yt:"https://www.youtube.com/@BeerBiceps", avatar:"RA", color:"#16A34A",
        brands:[
          { name:"BeerBiceps App", cat:"Health & Fitness", desc:"Fitness & mindset coaching — workouts, nutrition plans", link:"https://beerbiceps.com", cta:"Download App", type:"Founder", year:2020 },
          { name:"Monk-E Agency", cat:"Media & YouTube", desc:"India's top creator talent management agency", link:"https://monk-e.in", cta:"Join Network", type:"Co-Founder", year:2021 },
        ]},
      { name:"Nikhil Kamath", tier:"Large", subs:"1.8M", niche:"Finance & Business", yt:"https://www.youtube.com/@nikhilkamathcio", avatar:"NK", color:"#0D9488",
        brands:[
          { name:"Zerodha", cat:"Finance & Investment", desc:"India's #1 discount broker — 10M+ active investors", link:"https://zerodha.com", cta:"Open Account", type:"Co-Founder", year:2010 },
          { name:"True Beacon", cat:"Finance & Investment", desc:"Premium wealth management & hedge fund", link:"https://truebeacon.com", cta:"Invest Now", type:"Co-Founder", year:2019 },
          { name:"Gruhas", cat:"Real Estate", desc:"PropTech venture capital fund", link:"https://gruhas.com", cta:"View Fund", type:"Co-Founder", year:2022 },
        ]},
      { name:"Vivek Bindra", tier:"Large", subs:"22M", niche:"Business Education", yt:"https://www.youtube.com/@DrVivekBindra", avatar:"VB", color:"#DC2626",
        brands:[
          { name:"Bada Business", cat:"Education & Courses", desc:"India's largest online business education platform", link:"https://www.badabusiness.com", cta:"Enroll Now", type:"Founder", year:2019 },
        ]},
      { name:"Gaurav Taneja (Flying Beast)", tier:"Large", subs:"8.5M", niche:"Fitness & Family", yt:"https://www.youtube.com/@FlyingBeast320", avatar:"GT", color:"#2563EB",
        brands:[
          { name:"Ripped Nutrition", cat:"Health & Fitness", desc:"Premium Indian sports nutrition — whey protein, pre-workouts", link:"https://rippednutrition.com", cta:"Buy Supplements", type:"Founder", year:2020 },
        ]},
      { name:"Sandeep Maheshwari", tier:"Mega", subs:"30M", niche:"Motivation", yt:"https://www.youtube.com/@SandeepMaheshwari", avatar:"SM", color:"#D97706",
        brands:[
          { name:"ImagesBazaar", cat:"Photography & Art", desc:"World's largest Indian stock photo platform — 10M+ images", link:"https://www.imagesbazaar.com", cta:"Browse Images", type:"Founder", year:2006 },
        ]},
      { name:"Ankur Warikoo", tier:"Mid", subs:"4.4M", niche:"Finance & Startup", yt:"https://www.youtube.com/@warikoo", avatar:"AW", color:"#0D9488",
        brands:[
          { name:"Warikoo Online Courses", cat:"Education & Courses", desc:"Personal finance & startup courses for young Indians", link:"https://warikoo.com", cta:"Buy Courses", type:"Founder", year:2021 },
          { name:"Get Set Young (Book)", cat:"Education & Courses", desc:"Bestselling personal finance book for millennials", link:"https://warikoo.com/books", cta:"Buy Book", type:"Founder", year:2022 },
        ]},
      { name:"Raj Shamani", tier:"Mid", subs:"2.8M", niche:"Business & Startup", yt:"https://www.youtube.com/@rajshamani", avatar:"RS", color:"#EA580C",
        brands:[
          { name:"House of X", cat:"Music & Podcast", desc:"India's premium business podcast network", link:"https://houseofx.in", cta:"Listen Podcast", type:"Founder", year:2021 },
          { name:"Shamani Organics", cat:"Food & Beverages", desc:"Organic health foods & nutrition snack brand", link:"https://shamaniorganics.com", cta:"Shop Organic", type:"Founder", year:2022 },
        ]},
      { name:"Hitesh Choudhary (Chai aur Code)", tier:"Small", subs:"900K", niche:"Programming", yt:"https://www.youtube.com/@HiteshChoudharydotcom", avatar:"HC", color:"#0284C7",
        brands:[
          { name:"Chai aur Code Courses", cat:"Education & Courses", desc:"Hindi programming & web dev courses for beginners", link:"https://courses.chaicode.com", cta:"Buy Courses", type:"Founder", year:2022 },
          { name:"Chai aur Code Merch", cat:"Merchandise & Apparel", desc:"Developer culture tees, mugs & accessories", link:"https://chaicode.com/merch", cta:"Shop Merch", type:"Founder", year:2023 },
        ]},
      { name:"Nisha Madhulika", tier:"Large", subs:"13M", niche:"Indian Cooking", yt:"https://www.youtube.com/@nishamadhulika", avatar:"NM", color:"#EA580C",
        brands:[
          { name:"Nisha Madhulika Kitchen", cat:"Food & Beverages", desc:"Indian recipe brand — cookbooks, spice mixes & masalas", link:"https://nishamadhulika.com", cta:"Buy Products", type:"Founder", year:2015 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"US", name:"United States", flag:"🇺🇸", region:"Americas",
    youtubers:[
      { name:"MrBeast (Jimmy Donaldson)", tier:"Mega", subs:"300M", niche:"Entertainment & Stunts", yt:"https://www.youtube.com/@MrBeast", avatar:"MB", color:"#1D4ED8",
        brands:[
          { name:"Feastables", cat:"Food & Beverages", desc:"Better-for-you chocolate bars — MrBeast's snack empire", link:"https://feastables.com", cta:"Buy Chocolate", type:"Founder", year:2022 },
          { name:"MrBeast Burger", cat:"Food & Beverages", desc:"Virtual restaurant chain — smash burgers delivered nationwide", link:"https://mrbeastburger.com", cta:"Order Burger", type:"Founder", year:2020 },
          { name:"Beast Philanthropy", cat:"Media & YouTube", desc:"Charity channel & food bank operations", link:"https://www.youtube.com/@BeastPhilanthropy", cta:"Support Cause", type:"Founder", year:2020 },
        ]},
      { name:"Emma Chamberlain", tier:"Large", subs:"12M", niche:"Lifestyle & Fashion", yt:"https://www.youtube.com/@emmachamberlain", avatar:"EC", color:"#92400E",
        brands:[
          { name:"Chamberlain Coffee", cat:"Food & Beverages", desc:"Specialty coffee brand — beans, matcha, cold brew", link:"https://chamberlaincoffee.com", cta:"Shop Coffee", type:"Founder", year:2019 },
        ]},
      { name:"Logan Paul", tier:"Large", subs:"23M", niche:"Entertainment & Boxing", yt:"https://www.youtube.com/@LoganPaul", avatar:"LP", color:"#D97706",
        brands:[
          { name:"PRIME Hydration", cat:"Food & Beverages", desc:"Sports hydration drink — global $1B+ brand", link:"https://drinkprime.com", cta:"Buy PRIME", type:"Co-Founder", year:2022 },
          { name:"Maverick Apparel", cat:"Fashion & Clothing", desc:"Bold youth streetwear brand", link:"https://shop.loganpaul.com", cta:"Shop Now", type:"Founder", year:2017 },
        ]},
      { name:"Mark Rober", tier:"Large", subs:"60M", niche:"Science & Engineering", yt:"https://www.youtube.com/@MarkRober", avatar:"MR", color:"#0369A1",
        brands:[
          { name:"CrunchLabs", cat:"Education & Courses", desc:"Monthly STEM build-it-yourself science kit subscription", link:"https://www.crunchlabs.com", cta:"Subscribe", type:"Founder", year:2022 },
        ]},
      { name:"Linus Tech Tips (Linus Sebastian)", tier:"Large", subs:"15M", niche:"PC & Tech", yt:"https://www.youtube.com/@LinusTechTips", avatar:"LT", color:"#0284C7",
        brands:[
          { name:"LTTStore.com", cat:"Merchandise & Apparel", desc:"Premium tech-culture merch — screwdriver, backpack, apparel", link:"https://www.lttstore.com", cta:"Shop LTT", type:"Co-Founder", year:2018 },
          { name:"Floatplane Media", cat:"Media & YouTube", desc:"Premium video subscription platform for creators", link:"https://floatplane.com", cta:"Subscribe", type:"Co-Founder", year:2018 },
        ]},
      { name:"David Dobrik", tier:"Large", subs:"18M", niche:"Vlogs & Comedy", yt:"https://www.youtube.com/@daviddobrik", avatar:"DD", color:"#7C3AED",
        brands:[
          { name:"Doughbrik's Pizza", cat:"Food & Beverages", desc:"Chicago-style deep dish pizza chain", link:"https://doughbriks.com", cta:"Order Pizza", type:"Founder", year:2021 },
        ]},
      { name:"Rhett & Link (Good Mythical Morning)", tier:"Large", subs:"18M", niche:"Entertainment & Food", yt:"https://www.youtube.com/@GoodMythicalMorning", avatar:"RL", color:"#EA580C",
        brands:[
          { name:"Mythical Store", cat:"Merchandise & Apparel", desc:"Pop culture merchandise from GMM universe", link:"https://mythical.com/collections/store", cta:"Shop Mythical", type:"Founder", year:2016 },
          { name:"Mythical Kitchen", cat:"Food & Beverages", desc:"Food entertainment brand & cookbook series", link:"https://mythical.com", cta:"Get Cookbook", type:"Founder", year:2019 },
        ]},
      { name:"MKBHD (Marques Brownlee)", tier:"Large", subs:"18M", niche:"Tech Reviews", yt:"https://www.youtube.com/@mkbhd", avatar:"MK", color:"#1D4ED8",
        brands:[
          { name:"MKBHD Store", cat:"Merchandise & Apparel", desc:"Minimal tech-culture apparel & accessories", link:"https://shop.mkbhd.com", cta:"Shop MKBHD", type:"Founder", year:2020 },
          { name:"Panels App", cat:"Tech & Electronics", desc:"Wallpaper app built for MKBHD fans", link:"https://panels.app", cta:"Get App", type:"Co-Founder", year:2020 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"GB", name:"United Kingdom", flag:"🇬🇧", region:"Europe",
    youtubers:[
      { name:"KSI (JJ Olatunji)", tier:"Mega", subs:"24M", niche:"Music, Boxing & Gaming", yt:"https://www.youtube.com/@KSI", avatar:"KS", color:"#DC2626",
        brands:[
          { name:"PRIME Hydration", cat:"Food & Beverages", desc:"Co-founded $1B+ sports drink with Logan Paul", link:"https://drinkprime.com", cta:"Buy PRIME", type:"Co-Founder", year:2022 },
          { name:"Misfits Boxing", cat:"Sports", desc:"Celebrity & influencer boxing promotion company", link:"https://misfitsboxing.com", cta:"Get Tickets", type:"Co-Founder", year:2021 },
          { name:"XIX Vodka", cat:"Food & Beverages", desc:"Premium UK vodka brand — clean distilled spirit", link:"https://xixvodka.com", cta:"Buy Vodka", type:"Founder", year:2020 },
        ]},
      { name:"Zoella (Zoe Sugg)", tier:"Large", subs:"11M", niche:"Lifestyle & Beauty", yt:"https://www.youtube.com/@Zoella", avatar:"ZS", color:"#DB2777",
        brands:[
          { name:"Zoella Beauty", cat:"Beauty & Makeup", desc:"Lifestyle beauty collection — bath, body & fragrance", link:"https://zoellabeauty.com", cta:"Shop Beauty", type:"Founder", year:2014 },
          { name:"Zoella Lifestyle", cat:"Home & Lifestyle", desc:"Home décor, stationery & lifestyle accessories", link:"https://zoellalifestyle.com", cta:"Shop Lifestyle", type:"Founder", year:2016 },
        ]},
      { name:"Caspar Lee", tier:"Mid", subs:"7M", niche:"Comedy & Lifestyle", yt:"https://www.youtube.com/@CasparLee", avatar:"CL", color:"#0369A1",
        brands:[
          { name:"Influencer.com", cat:"Media & YouTube", desc:"World's largest influencer marketing platform", link:"https://influencer.com", cta:"Visit Platform", type:"Co-Founder", year:2017 },
        ]},
      { name:"Jim Chapman", tier:"Mid", subs:"2.5M", niche:"Fashion & Lifestyle", yt:"https://www.youtube.com/@JimChapman", avatar:"JC", color:"#1D4ED8",
        brands:[
          { name:"Roster", cat:"Fashion & Clothing", desc:"Premium men's fashion essentials brand UK", link:"https://roster.co.uk", cta:"Shop Roster", type:"Co-Founder", year:2020 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"KR", name:"South Korea", flag:"🇰🇷", region:"Asia",
    youtubers:[
      { name:"Pony (Park Hye-min)", tier:"Large", subs:"7.3M", niche:"K-Beauty Tutorials", yt:"https://www.youtube.com/@PONYSyndrome", avatar:"PH", color:"#DB2777",
        brands:[
          { name:"Pony Effect", cat:"Beauty & Makeup", desc:"Award-winning K-beauty brand — sold in 30+ countries", link:"https://en.ponyeffect.com", cta:"Shop K-Beauty", type:"Founder", year:2016 },
        ]},
      { name:"Risabae", tier:"Mid", subs:"3.5M", niche:"Beauty Art & Transformation", yt:"https://www.youtube.com/@risabae", avatar:"RB", color:"#0284C7",
        brands:[
          { name:"Colorgram", cat:"Beauty & Makeup", desc:"Trendy Korean Gen Z cosmetics brand", link:"https://colorgram.co.kr", cta:"Shop Colorgram", type:"Founder", year:2020 },
        ]},
      { name:"Jane ASMR", tier:"Large", subs:"9M", niche:"ASMR & Korean Food", yt:"https://www.youtube.com/@JaneASMR", avatar:"JN", color:"#D97706",
        brands:[
          { name:"Jane ASMR Snacks", cat:"Food & Beverages", desc:"Korean ASMR-branded snack & food product line", link:"https://www.youtube.com/@JaneASMR", cta:"Order Snacks", type:"Founder", year:2022 },
        ]},
      { name:"쯔양 (Tzuyang)", tier:"Large", subs:"10M", niche:"Mukbang", yt:"https://www.youtube.com/@tzuyang8282", avatar:"TZ", color:"#E11D48",
        brands:[
          { name:"Tzuyang Kitchen", cat:"Food & Beverages", desc:"Korean mukbang-inspired food & sauce brand", link:"https://smartstore.naver.com/tzuyang", cta:"Buy Food", type:"Founder", year:2023 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"JP", name:"Japan", flag:"🇯🇵", region:"Asia",
    youtubers:[
      { name:"Hikakin", tier:"Mega", subs:"11M", niche:"Entertainment & Beatbox", yt:"https://www.youtube.com/@HikakinTV", avatar:"HK", color:"#EA580C",
        brands:[
          { name:"UUUM Inc.", cat:"Media & YouTube", desc:"Japan's largest YouTube MCN — 300+ creators", link:"https://www.uuum.co.jp", cta:"Visit UUUM", type:"Co-Founder", year:2013 },
          { name:"Hikakin Store", cat:"Merchandise & Apparel", desc:"Official Hikakin branded merch & collectibles", link:"https://hikakin.net", cta:"Shop Merch", type:"Founder", year:2020 },
        ]},
      { name:"Naomi Watanabe", tier:"Large", subs:"1.2M", niche:"Fashion & Comedy", yt:"https://www.youtube.com/@naomiwatanabe", avatar:"NW", color:"#E11D48",
        brands:[
          { name:"Punyus", cat:"Fashion & Clothing", desc:"Japan's landmark plus-size fashion brand", link:"https://punyus.jp", cta:"Shop Fashion", type:"Founder", year:2015 },
          { name:"Punyus Beauty", cat:"Beauty & Makeup", desc:"Inclusive Japanese makeup celebrating all sizes", link:"https://punyus.jp/pages/beauty", cta:"Shop Beauty", type:"Founder", year:2020 },
        ]},
      { name:"Kizuna AI", tier:"Large", subs:"3M", niche:"VTuber Pioneer", yt:"https://www.youtube.com/@AIChannel", avatar:"KA", color:"#7C3AED",
        brands:[
          { name:"Activ8 / A-i Inc.", cat:"Tech & Electronics", desc:"World's first VTuber company & virtual entertainment tech", link:"https://kizunaai.com", cta:"Explore VTech", type:"Founder", year:2017 },
          { name:"Kizuna AI Store", cat:"Merchandise & Apparel", desc:"VTuber collectibles, figures & exclusive merch", link:"https://kizunaai.com/en/store", cta:"Buy Collectibles", type:"Founder", year:2018 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"CN", name:"China", flag:"🇨🇳", region:"Asia",
    youtubers:[
      { name:"Li Jiaqi (Austin Li)", tier:"Mega", subs:"60M+", niche:"Beauty Live Commerce", yt:"https://www.youtube.com/@AustinLi", avatar:"LJ", color:"#DC2626",
        brands:[
          { name:"Li Jiaqi Beauty (美ONE)", cat:"Beauty & Makeup", desc:"China's #1 beauty livestream brand — $1B+ annual GMV", link:"https://www.meione.com", cta:"Shop Beauty", type:"Founder", year:2021 },
          { name:"Meone Skincare", cat:"Skincare", desc:"Clean skincare formulated for modern Chinese consumers", link:"https://www.meione.com", cta:"Shop Skincare", type:"Founder", year:2023 },
        ]},
      { name:"李子柒 (Li Ziqi)", tier:"Large", subs:"20M", niche:"Chinese Culture & Food", yt:"https://www.youtube.com/@lizizhang", avatar:"LZ", color:"#D97706",
        brands:[
          { name:"李子柒 Food Brand", cat:"Food & Beverages", desc:"Traditional Chinese cuisine — hot pot, sauces, noodles export", link:"https://liziqi.tmall.com", cta:"Buy Food", type:"Founder", year:2018 },
          { name:"Liziqi Lifestyle", cat:"Home & Lifestyle", desc:"Chinese heritage lifestyle products & home goods", link:"https://liziqi.tmall.com", cta:"Shop Now", type:"Founder", year:2019 },
        ]},
      { name:"Papi Jiang", tier:"Large", subs:"32M", niche:"Comedy & Short Video", yt:"https://www.youtube.com/@papijiang", avatar:"PJ", color:"#16A34A",
        brands:[
          { name:"Papitube", cat:"Media & YouTube", desc:"China's biggest short-video MCN — 500+ creator network", link:"https://papitube.com", cta:"Explore Network", type:"Co-Founder", year:2016 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"AE", name:"UAE / Dubai", flag:"🇦🇪", region:"Middle East",
    youtubers:[
      { name:"Huda Kattan", tier:"Large", subs:"4M", niche:"Beauty & Makeup", yt:"https://www.youtube.com/@HudaBeauty", avatar:"HK2", color:"#D97706",
        brands:[
          { name:"Huda Beauty", cat:"Beauty & Makeup", desc:"Global beauty empire valued at $1.2B — makeup, lashes & more", link:"https://hudabeauty.com", cta:"Shop Huda Beauty", type:"Founder", year:2013 },
          { name:"Wishful Skin", cat:"Skincare", desc:"Results-driven skincare for all skin tones globally", link:"https://wishfulskin.com", cta:"Shop Skincare", type:"Founder", year:2020 },
          { name:"Kayali Fragrances", cat:"Personal Care", desc:"Luxury Middle Eastern-inspired perfume house", link:"https://kayali.com", cta:"Shop Perfumes", type:"Founder", year:2018 },
        ]},
      { name:"Mo Vlogs", tier:"Large", subs:"10M", niche:"Luxury Lifestyle & Cars", yt:"https://www.youtube.com/@MoVlogs", avatar:"MV", color:"#D97706",
        brands:[
          { name:"Mo Vlogs Merch", cat:"Merchandise & Apparel", desc:"Luxury lifestyle streetwear from Dubai", link:"https://movlogs.com", cta:"Shop Merch", type:"Founder", year:2019 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"PK", name:"Pakistan", flag:"🇵🇰", region:"Asia",
    youtubers:[
      { name:"Ducky Bhai", tier:"Large", subs:"9.8M", niche:"Comedy & Roast", yt:"https://www.youtube.com/@DuckyBhai", avatar:"DB", color:"#D97706",
        brands:[
          { name:"Ducky Dips", cat:"Food & Beverages", desc:"Bold Pakistani snack & dipping sauce brand", link:"https://duckydips.pk", cta:"Order Now", type:"Founder", year:2023 },
        ]},
      { name:"Irfan Junejo", tier:"Mid", subs:"1.7M", niche:"Travel & Lifestyle", yt:"https://www.youtube.com/@irfanjunejo", avatar:"IJ", color:"#16A34A",
        brands:[
          { name:"Junejo Films", cat:"Media & YouTube", desc:"Cinematic storytelling & video production studio", link:"https://irfanjunejo.com", cta:"Watch Films", type:"Founder", year:2020 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"BR", name:"Brazil", flag:"🇧🇷", region:"Americas",
    youtubers:[
      { name:"Bianca Andrade (Boca Rosa)", tier:"Large", subs:"18M", niche:"Beauty & Lifestyle", yt:"https://www.youtube.com/@boca_rosa", avatar:"BA", color:"#DB2777",
        brands:[
          { name:"Boca Rosa Beauty", cat:"Beauty & Makeup", desc:"Brazilian cosmetics by Payot — lip products & foundation", link:"https://bocarosabeauty.com.br", cta:"Shop Beauty", type:"Founder", year:2017 },
          { name:"Boca Rosa Hair", cat:"Personal Care", desc:"Brazilian hair care line for all hair types", link:"https://bocarosahair.com.br", cta:"Shop Hair", type:"Founder", year:2020 },
        ]},
      { name:"Felipe Neto", tier:"Mega", subs:"44M", niche:"Entertainment & Gaming", yt:"https://www.youtube.com/@felipeneto", avatar:"FN", color:"#16A34A",
        brands:[
          { name:"Neto's Club", cat:"Media & YouTube", desc:"Kids entertainment platform & digital content brand", link:"https://www.youtube.com/@felipeneto", cta:"Watch Shows", type:"Founder", year:2021 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"ID", name:"Indonesia", flag:"🇮🇩", region:"Asia",
    youtubers:[
      { name:"Ria Ricis", tier:"Mega", subs:"32M", niche:"Family & Comedy", yt:"https://www.youtube.com/@riaricisofficial", avatar:"RR", color:"#EA580C",
        brands:[
          { name:"Ricis Skincare", cat:"Skincare", desc:"Halal-certified Indonesian skincare for all ages", link:"https://riaricis.com/skincare", cta:"Shop Skincare", type:"Founder", year:2022 },
          { name:"Ricis Store", cat:"Merchandise & Apparel", desc:"Family lifestyle merchandise & accessories", link:"https://riaricis.com", cta:"Shop Merch", type:"Founder", year:2019 },
        ]},
      { name:"Atta Halilintar", tier:"Mega", subs:"33M", niche:"Family & Music", yt:"https://www.youtube.com/@attahalilintar", avatar:"AH", color:"#D97706",
        brands:[
          { name:"Atta Music", cat:"Music & Podcast", desc:"Indonesian pop music label & artist management", link:"https://www.youtube.com/@attahalilintar", cta:"Listen Music", type:"Founder", year:2021 },
        ]},
      { name:"Jerome Polin", tier:"Large", subs:"7.6M", niche:"Math & Lifestyle", yt:"https://www.youtube.com/@JeromePolinSijabat", avatar:"JP", color:"#0284C7",
        brands:[
          { name:"Jenius Math", cat:"Education & Courses", desc:"Fun online math education platform for Indonesian students", link:"https://www.youtube.com/@JeromePolinSijabat", cta:"Start Learning", type:"Founder", year:2020 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"TH", name:"Thailand", flag:"🇹🇭", region:"Asia",
    youtubers:[
      { name:"Nisamanee Nutt", tier:"Large", subs:"4.1M", niche:"Beauty & Skincare", yt:"https://www.youtube.com/@nisamaneenutt", avatar:"NN", color:"#DB2777",
        brands:[
          { name:"Nutt Beauty", cat:"Skincare", desc:"Thai botanical skincare with K-beauty influence", link:"https://nuttbeauty.com", cta:"Shop Skincare", type:"Founder", year:2019 },
          { name:"NuttCosmetics", cat:"Beauty & Makeup", desc:"Affordable Thai cosmetics targeting Gen Z", link:"https://nuttcosmetics.com", cta:"Shop Makeup", type:"Founder", year:2022 },
        ]},
      { name:"Bie The Ska", tier:"Large", subs:"6.2M", niche:"Comedy & Food", yt:"https://www.youtube.com/@biethefunny", avatar:"BT", color:"#D97706",
        brands:[
          { name:"Bie Cafe", cat:"Food & Beverages", desc:"Thai specialty café chain across Bangkok", link:"https://www.instagram.com/bie_cafe", cta:"Find a Café", type:"Founder", year:2021 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"SA", name:"Saudi Arabia", flag:"🇸🇦", region:"Middle East",
    youtubers:[
      { name:"Ahmed Al Shugairi", tier:"Large", subs:"2.1M", niche:"Self-Development & Islam", yt:"https://www.youtube.com/@AlShugairi", avatar:"AS", color:"#16A34A",
        brands:[
          { name:"Shugairi Academy", cat:"Education & Courses", desc:"Online Islamic self-development & life-skills courses", link:"https://shugairi.com", cta:"Join Academy", type:"Founder", year:2020 },
        ]},
      { name:"Ascia Al Faraj", tier:"Mid", subs:"600K", niche:"Modest Fashion & Art", yt:"https://www.youtube.com/@ASCIAAIF", avatar:"AF", color:"#7C3AED",
        brands:[
          { name:"Ascia Creative Studio", cat:"Fashion & Clothing", desc:"Modest luxury fashion — abayas, coordinates & art pieces", link:"https://www.instagram.com/ascia_af", cta:"Shop Collection", type:"Founder", year:2018 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"AU", name:"Australia", flag:"🇦🇺", region:"Oceania",
    youtubers:[
      { name:"Sarah's Day", tier:"Mid", subs:"1.5M", niche:"Fitness & Wellness", yt:"https://www.youtube.com/@sarahsday", avatar:"SD", color:"#16A34A",
        brands:[
          { name:"Body Bloom", cat:"Health & Fitness", desc:"Online fitness programs & wellness coaching", link:"https://bodybloombysarah.com", cta:"Join Program", type:"Founder", year:2019 },
          { name:"Tropeaka (Partner)", cat:"Food & Beverages", desc:"Superfood wellness & nutrition brand partnership", link:"https://tropeaka.com.au", cta:"Shop Wellness", type:"Partner", year:2018 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"DE", name:"Germany", flag:"🇩🇪", region:"Europe",
    youtubers:[
      { name:"Dagi Bee", tier:"Large", subs:"5.3M", niche:"Beauty & Lifestyle", yt:"https://www.youtube.com/@DagiBee", avatar:"DG", color:"#DB2777",
        brands:[
          { name:"Dagi Bee Beauty", cat:"Beauty & Makeup", desc:"German beauty brand — eyeshadow palettes & glow products", link:"https://dagibeebeauty.com", cta:"Shop Beauty", type:"Founder", year:2018 },
        ]},
      { name:"Gronkh (Erik Range)", tier:"Large", subs:"5M", niche:"Gaming & Let's Play", yt:"https://www.youtube.com/@Gronkh", avatar:"GR", color:"#1D4ED8",
        brands:[
          { name:"Gronkh Merch", cat:"Merchandise & Apparel", desc:"Germany's top gaming creator merch brand", link:"https://gronkh.de/shop", cta:"Shop Merch", type:"Founder", year:2017 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"FR", name:"France", flag:"🇫🇷", region:"Europe",
    youtubers:[
      { name:"Léna Situations", tier:"Large", subs:"4M", niche:"Fashion & Lifestyle", yt:"https://www.youtube.com/@lenasituations", avatar:"LS", color:"#7C3AED",
        brands:[
          { name:"Hôtel Mahfouf", cat:"Fashion & Clothing", desc:"French Gen Z streetwear brand — bold & colourful", link:"https://hotelmahfouf.com", cta:"Shop Fashion", type:"Founder", year:2021 },
        ]},
      { name:"EnjoyPhoenix (Marie Lopez)", tier:"Large", subs:"5M", niche:"Beauty & Lifestyle", yt:"https://www.youtube.com/@enjoyphoenix", avatar:"ML", color:"#DB2777",
        brands:[
          { name:"Leospa", cat:"Spiritual & Wellness", desc:"Natural wellness & mindfulness lifestyle brand", link:"https://leospa.fr", cta:"Shop Wellness", type:"Founder", year:2019 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"MX", name:"Mexico", flag:"🇲🇽", region:"Americas",
    youtubers:[
      { name:"Yuya (Mariand Castrejón)", tier:"Large", subs:"24M", niche:"Beauty & Lifestyle", yt:"https://www.youtube.com/@yuya", avatar:"YY", color:"#DB2777",
        brands:[
          { name:"lady16makeup", cat:"Beauty & Makeup", desc:"Affordable Mexican beauty brand — lipstick & eyeshadow", link:"https://lady16makeup.com", cta:"Shop Beauty", type:"Founder", year:2016 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"NG", name:"Nigeria", flag:"🇳🇬", region:"Africa",
    youtubers:[
      { name:"Mark Angel", tier:"Large", subs:"9M", niche:"Comedy Skits", yt:"https://www.youtube.com/@MarkAngelComedy", avatar:"MA", color:"#16A34A",
        brands:[
          { name:"Mark Angel Comedy Studio", cat:"Media & YouTube", desc:"Africa's most-subscribed comedy YouTube channel & studio", link:"https://www.youtube.com/@MarkAngelComedy", cta:"Watch Comedy", type:"Founder", year:2013 },
        ]},
      { name:"Wode Maya", tier:"Mid", subs:"2.1M", niche:"Travel & Africa", yt:"https://www.youtube.com/@WodeMaya", avatar:"WM", color:"#D97706",
        brands:[
          { name:"Africa Snack Box", cat:"Food & Beverages", desc:"Monthly African snack & food discovery subscription box", link:"https://wodemaya.com", cta:"Subscribe Box", type:"Founder", year:2022 },
        ]},
    ]
  },

  // ══════════════════════════════════
  {
    code:"TR", name:"Turkey", flag:"🇹🇷", region:"Middle East",
    youtubers:[
      { name:"Danla Bilic", tier:"Large", subs:"3.2M", niche:"Beauty & Comedy", yt:"https://www.youtube.com/@DanlaBilic", avatar:"DL", color:"#DC2626",
        brands:[
          { name:"Danla Cosmetics", cat:"Beauty & Makeup", desc:"Cruelty-free vegan Turkish cosmetics — lip, eye & face", link:"https://danlacosmetics.com", cta:"Shop Cosmetics", type:"Founder", year:2021 },
          { name:"Danla x Koton", cat:"Fashion & Clothing", desc:"Youth fashion collab with Turkey's biggest fashion chain", link:"https://koton.com", cta:"Shop Fashion", type:"Collab", year:2022 },
        ]},
    ]
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const REGIONS = ["All Regions","Asia","Americas","Europe","Middle East","Africa","Oceania"];
const allYoutubers = COUNTRIES.flatMap(c => c.youtubers.map(y => ({...y, country:c.name, flag:c.flag, countryCode:c.code})));
const allBrands = allYoutubers.flatMap(y => y.brands.map(b => ({...b, ytName:y.name, ytSubs:y.subs, ytYT:y.yt, ytAvatar:y.avatar, ytColor:y.color, ytTier:y.tier, country:y.country, flag:y.flag})));
const allCatNames = [...new Set(allBrands.map(b=>b.cat))].sort();

export default function App() {
  const [page, setPage] = useState("home");        // home | country | ytDetail | byCat | byYT
  const [selCountry, setSelCountry] = useState(null);
  const [selYT, setSelYT] = useState(null);
  const [selCat, setSelCat] = useState(null);
  const [search, setSearch] = useState("");
  const [regionF, setRegionF] = useState("All Regions");
  const [tierF, setTierF] = useState("All");
  const [catF, setCatF] = useState("All");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef();

  const totalBrands = allBrands.length;
  const totalCreators = allYoutubers.length;

  const filteredCountries = COUNTRIES.filter(c => {
    const mr = regionF === "All Regions" || c.region === regionF;
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.youtubers.some(y => y.name.toLowerCase().includes(search.toLowerCase()) || y.brands.some(b => b.name.toLowerCase().includes(search.toLowerCase())));
    const mc = catF === "All" || c.youtubers.some(y => y.brands.some(b => b.cat === catF));
    return mr && ms && mc;
  });

  const filteredYT = allYoutubers.filter(y => {
    const ms = !search || y.name.toLowerCase().includes(search.toLowerCase()) || y.brands.some(b=>b.name.toLowerCase().includes(search.toLowerCase()));
    const mt = tierF === "All" || y.tier === tierF;
    const mc = catF === "All" || y.brands.some(b=>b.cat === catF);
    const mr = regionF === "All Regions"; // simplified for byYT
    return ms && mt && mc;
  });

  const filteredBrands = allBrands.filter(b => {
    const ms = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.ytName.toLowerCase().includes(search.toLowerCase()) || b.country.toLowerCase().includes(search.toLowerCase());
    const mc = selCat ? b.cat === selCat : (catF === "All" || b.cat === catF);
    const mr = regionF === "All Regions" || b.flag; // all regions for simplicity
    return ms && mc;
  });

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiA("");
    const ctx = JSON.stringify(COUNTRIES.map(c => ({ country:c.name, flag:c.flag,
      youtubers:c.youtubers.map(y => ({ name:y.name, subs:y.subs, brands:y.brands.map(b=>`${b.name}(${b.cat},${b.type},${b.link})`) }))
    })));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1200,
          system:`You are a global YouTuber brand expert. Know all brands by YouTubers worldwide. Data: ${ctx}. Be concise, friendly, use emojis, mention links.`,
          messages:[{role:"user",content:aiQ}] }) });
      const d = await res.json();
      setAiA(d.content?.[0]?.text||"No response.");
    } catch { setAiA("⚠️ Could not reach AI."); }
    setAiLoading(false);
  };

  const nav = (p, extras={}) => { setPage(p); if(!extras.keep) { setSelCat(null); setSelYT(null); setSelCountry(null); } if(extras.country) setSelCountry(extras.country); if(extras.yt) setSelYT(extras.yt); if(extras.cat) setSelCat(extras.cat); };

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:"#F8F7FF",minHeight:"100vh",color:"#1a1a2e"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f0eeff}::-webkit-scrollbar-thumb{background:#d4d0ff;border-radius:3px}
        .card{transition:transform .2s,box-shadow .2s,border-color .2s;cursor:pointer}
        .card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.12)!important;border-color:#c7c3f0!important}
        .row{transition:background .15s,box-shadow .15s;cursor:pointer}
        .row:hover{background:#F0EEFF!important;box-shadow:0 4px 12px rgba(0,0,0,.06)!important}
        input:focus,select:focus{outline:none}
        .fade{animation:fu .3s ease both}
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .spin{animation:sp .8s linear infinite}
        @keyframes sp{to{transform:rotate(360deg)}}
        .pdot{animation:pd 2s ease-in-out infinite}
        @keyframes pd{0%,100%{opacity:1}50%{opacity:.3}}
        .shopbtn{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;border-radius:10px;font-size:14px;font-weight:800;letter-spacing:.2px;transition:all .2s;text-decoration:none}
        .shopbtn:hover{transform:scale(1.04);filter:brightness(1.05);box-shadow:0 8px 24px rgba(0,0,0,.18)}
        .tab{cursor:pointer;border:none;transition:all .18s;font-family:'Outfit',sans-serif}
        .chip{cursor:pointer;border:none;transition:all .15s;font-family:'Outfit',sans-serif}
        .chip:hover{transform:translateY(-1px)}
        a{text-decoration:none;color:inherit}
        .ytlink:hover{opacity:.75}
        .navlink{cursor:pointer;border:none;background:none;font-family:'Outfit',sans-serif;transition:all .15s}
        .navlink:hover{color:#6D28D9!important}
        .section-label{font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9CA3AF;text-transform:uppercase;margin-bottom:12px}
      `}</style>

      {/* ═══════════ NAV ═══════════ */}
      <nav style={{background:"#fff",borderBottom:"1.5px solid #EDE9FF",position:"sticky",top:0,zIndex:300}}>
        <div style={{maxWidth:1340,margin:"0 auto",padding:"0 20px"}}>
          {/* Top row */}
          <div style={{display:"flex",alignItems:"center",gap:16,padding:"14px 0",flexWrap:"wrap"}}>
            <div onClick={()=>nav("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
              <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#6D28D9,#DB2777)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>▶</div>
              <div>
                <div style={{fontWeight:900,fontSize:16,letterSpacing:"-0.5px",background:"linear-gradient(90deg,#6D28D9,#DB2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CreatorBrands</div>
                <div style={{fontSize:9,color:"#D1D5DB",letterSpacing:"1.5px",fontWeight:600}}>GLOBAL YOUTUBER BRAND DIRECTORY</div>
              </div>
            </div>
            <div style={{flex:1}}/>
            {/* search */}
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#C4B5FD"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search brands, creators, countries…"
                style={{padding:"9px 14px 9px 32px",background:"#F8F7FF",border:"1.5px solid #EDE9FF",borderRadius:9,color:"#1a1a2e",fontSize:13,width:250}}/>
            </div>
            <button onClick={()=>setAiOpen(!aiOpen)} className="tab"
              style={{padding:"9px 18px",borderRadius:9,background:aiOpen?"linear-gradient(135deg,#6D28D9,#DB2777)":"#F8F7FF",border:`1.5px solid ${aiOpen?"transparent":"#EDE9FF"}`,color:aiOpen?"#fff":"#6D28D9",fontSize:13,fontWeight:700}}>
              🤖 Ask AI
            </button>
          </div>
          {/* Nav tabs */}
          <div style={{display:"flex",gap:4,borderTop:"1px solid #F0EEFF",paddingTop:1,flexWrap:"wrap"}}>
            {[["home","🌍 Countries"],["byCat","📂 By Category"],["byYT","👤 By Creator"]].map(([v,l])=>(
              <button key={v} onClick={()=>nav(v)} className="tab"
                style={{padding:"10px 18px",fontSize:13,fontWeight:700,background:"none",borderBottom:`2.5px solid ${page===v?"#6D28D9":"transparent"}`,color:page===v?"#6D28D9":"#9CA3AF"}}>
                {l}
              </button>
            ))}
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#9CA3AF",paddingRight:4}}>
              <span style={{fontWeight:700,color:"#6D28D9"}}>{COUNTRIES.length}</span> countries ·
              <span style={{fontWeight:700,color:"#DB2777"}}>{totalCreators}</span> creators ·
              <span style={{fontWeight:700,color:"#EA580C"}}>{totalBrands}</span> brands
            </div>
          </div>
        </div>
      </nav>

      <div style={{maxWidth:1340,margin:"0 auto",padding:"24px 20px"}}>

        {/* AI PANEL */}
        {aiOpen && (
          <div className="fade" style={{background:"#fff",border:"1.5px solid #EDE9FF",borderRadius:14,padding:20,marginBottom:22,boxShadow:"0 4px 20px rgba(109,40,217,.08)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#6D28D9,#DB2777)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#1a1a2e"}}>AI Brand Intelligence</div>
                <div style={{fontSize:11,color:"#9CA3AF"}}>Global YouTuber brands · {totalBrands} brands across {COUNTRIES.length} countries</div>
              </div>
              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#16A34A"}}>
                <span className="pdot" style={{width:6,height:6,borderRadius:"50%",background:"#16A34A",display:"inline-block"}}/>Online
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
              {["Best beauty brands globally?","Which YouTubers own food brands?","Top creators who founded companies?","Best brands to shop from India?","Compare US vs UK YouTuber brands"].map(q=>(
                <button key={q} onClick={()=>setAiQ(q)} style={{padding:"6px 12px",borderRadius:20,fontSize:12,background:"#F8F7FF",border:"1.5px solid #EDE9FF",color:"#6D28D9",cursor:"pointer",fontWeight:500,transition:"all .15s"}}
                  onMouseEnter={e=>{e.target.style.background="#EDE9FF"}} onMouseLeave={e=>{e.target.style.background="#F8F7FF"}}>{q}</button>
              ))}
            </div>
            {aiA && <div className="fade" style={{background:"#F8F7FF",border:"1.5px solid #EDE9FF",borderRadius:10,padding:16,fontSize:13,lineHeight:1.8,color:"#374151",marginBottom:14,whiteSpace:"pre-wrap"}}>{aiA}</div>}
            {aiLoading && <div style={{display:"flex",alignItems:"center",gap:7,fontSize:13,color:"#9CA3AF",marginBottom:14}}>
              <div className="spin" style={{width:15,height:15,border:"2px solid #EDE9FF",borderTopColor:"#6D28D9",borderRadius:"50%"}}/>Searching global brand database…
            </div>}
            <div style={{display:"flex",gap:8}}>
              <input ref={aiRef} value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder="Ask about any YouTuber brand worldwide…"
                style={{flex:1,padding:"10px 14px",background:"#F8F7FF",border:"1.5px solid #EDE9FF",borderRadius:9,color:"#1a1a2e",fontSize:13}}/>
              <button onClick={askAI} disabled={aiLoading||!aiQ.trim()} className="shopbtn"
                style={{padding:"10px 20px",borderRadius:9,background:aiQ.trim()?"linear-gradient(135deg,#6D28D9,#DB2777)":"#F0EEFF",border:"none",color:aiQ.trim()?"#fff":"#C4B5FD",fontSize:13,fontWeight:700,cursor:aiQ.trim()?"pointer":"default"}}>
                Ask ✦
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            HOME — COUNTRIES
        ═══════════════════════════════════════════ */}
        {page==="home" && (
          <div className="fade">
            {/* Filters row */}
            <div style={{display:"flex",gap:8,marginBottom:22,flexWrap:"wrap",alignItems:"center"}}>
              <div className="section-label" style={{margin:0}}>Filter:</div>
              {REGIONS.map(r=>(
                <button key={r} className="chip" onClick={()=>setRegionF(r)}
                  style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"1.5px solid",borderColor:regionF===r?"#6D28D9":"#E5E7EB",background:regionF===r?"#6D28D9":"#fff",color:regionF===r?"#fff":"#6B7280"}}>
                  {r}
                </button>
              ))}
              <div style={{width:1,height:20,background:"#E5E7EB",margin:"0 4px"}}/>
              <select value={catF} onChange={e=>setCatF(e.target.value)}
                style={{padding:"7px 12px",background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:20,color:"#6B7280",fontSize:12,cursor:"pointer",fontFamily:"Outfit"}}>
                <option value="All">All Categories</option>
                {Object.keys(CATS).map(c=><option key={c} value={c}>{CATS[c].icon} {c}</option>)}
              </select>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14}}>
              {filteredCountries.map(c=>{
                const totalB=c.youtubers.reduce((s,y)=>s+y.brands.length,0);
                const cats=[...new Set(c.youtubers.flatMap(y=>y.brands.map(b=>b.cat)))];
                return (
                  <div key={c.code} className="card" onClick={()=>nav("country",{country:c.code,keep:true})}
                    style={{background:"#fff",border:"1.5px solid #EDE9FF",borderRadius:16,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                      <div style={{display:"flex",alignItems:"center",gap:11}}>
                        <span style={{fontSize:32}}>{c.flag}</span>
                        <div>
                          <div style={{fontWeight:800,fontSize:17,color:"#1a1a2e"}}>{c.name}</div>
                          <div style={{fontSize:11,color:"#9CA3AF",marginTop:2}}>{c.region} · {c.youtubers.length} creator{c.youtubers.length>1?"s":""}</div>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:900,fontSize:26,color:"#6D28D9",lineHeight:1}}>{totalB}</div>
                        <div style={{fontSize:9,color:"#D1D5DB",letterSpacing:"0.8px",fontWeight:600}}>BRANDS</div>
                      </div>
                    </div>
                    {/* creator avatars */}
                    <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
                      {c.youtubers.map((y,i)=>(
                        <div key={i} style={{width:30,height:30,borderRadius:"50%",background:y.color+"18",border:`2px solid ${y.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:y.color,marginLeft:i>0?-8:0,position:"relative",zIndex:20-i}}>{y.avatar}</div>
                      ))}
                    </div>
                    {/* category chips */}
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {cats.slice(0,4).map(cat=>(
                        <span key={cat} style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:CATS[cat]?.bg||"#F8F7FF",color:CATS[cat]?.color||"#666",fontWeight:600}}>
                          {CATS[cat]?.icon} {cat.split(" ")[0]}
                        </span>
                      ))}
                      {cats.length>4 && <span style={{fontSize:10,color:"#9CA3AF"}}>+{cats.length-4}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            COUNTRY PAGE — domain sections
        ═══════════════════════════════════════════ */}
        {page==="country" && selCountry && (()=>{
          const C = COUNTRIES.find(c=>c.code===selCountry);
          if(!C) return null;
          const grouped={};
          C.youtubers.forEach(y=>y.brands.forEach(b=>{
            if(!grouped[b.cat]) grouped[b.cat]=[];
            grouped[b.cat].push({...b, ytName:y.name, ytSubs:y.subs, ytYT:y.yt, ytAvatar:y.avatar, ytColor:y.color, ytTier:y.tier});
          }));
          const totalB=C.youtubers.reduce((s,y)=>s+y.brands.length,0);
          const catKeys=Object.keys(grouped).sort();
          return (
            <div className="fade">
              {/* Country hero */}
              <div style={{background:"#fff",border:"1.5px solid #EDE9FF",borderRadius:16,padding:"22px 26px",marginBottom:24,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap",boxShadow:"0 2px 12px rgba(109,40,217,.06)"}}>
                <button onClick={()=>nav("home")} style={{background:"#F8F7FF",border:"1.5px solid #EDE9FF",borderRadius:8,padding:"7px 14px",color:"#6B7280",fontSize:12,cursor:"pointer",fontFamily:"Outfit",fontWeight:600}}>← Countries</button>
                <span style={{fontSize:44}}>{C.flag}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:26,color:"#1a1a2e"}}>{C.name}</div>
                  <div style={{fontSize:13,color:"#9CA3AF",marginTop:4}}>{C.region} · {C.youtubers.length} YouTubers · {totalB} brands across {catKeys.length} categories</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {[{v:C.youtubers.length,l:"Creators",c:"#6D28D9"},{v:totalB,l:"Brands",c:"#DB2777"},{v:catKeys.length,l:"Categories",c:"#EA580C"}].map(s=>(
                    <div key={s.l} style={{textAlign:"center",padding:"10px 16px",background:"#F8F7FF",borderRadius:11,border:"1.5px solid #EDE9FF"}}>
                      <div style={{fontWeight:900,fontSize:20,color:s.c,lineHeight:1}}>{s.v}</div>
                      <div style={{fontSize:9,color:"#D1D5DB",letterSpacing:"0.8px",marginTop:3,fontWeight:600}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category pills */}
              <div style={{display:"flex",gap:7,marginBottom:24,flexWrap:"wrap"}}>
                {catKeys.map(cat=>{
                  const cfg=CATS[cat];
                  const count=grouped[cat]?.length||0;
                  return (
                    <a key={cat} href={`#section-${cat.replace(/\s/g,"-")}`}
                      style={{padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"1.5px solid",borderColor:cfg?.color||"#E5E7EB",background:cfg?.bg||"#F8F7FF",color:cfg?.color||"#666",textDecoration:"none"}}>
                      {cfg?.icon} {cat} ({count})
                    </a>
                  );
                })}
              </div>

              {/* Domain sections */}
              {catKeys.map((cat,si)=>{
                const cfg=CATS[cat];
                const brands=grouped[cat]||[];
                return (
                  <div key={cat} id={`section-${cat.replace(/\s/g,"-")}`} style={{marginBottom:32,scrollMarginTop:80}}>
                    {/* Section header */}
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"16px 20px",background:cfg?.bg||"#F8F7FF",border:`1.5px solid ${cfg?.color||"#E5E7EB"}30`,borderRadius:14,borderLeft:`5px solid ${cfg?.color||"#E5E7EB"}`}}>
                      <div style={{width:46,height:46,borderRadius:12,background:"#fff",border:`1.5px solid ${cfg?.color||"#E5E7EB"}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 2px 10px ${cfg?.color||"#888"}20`}}>
                        {cfg?.icon}
                      </div>
                      <div>
                        <div style={{fontWeight:900,fontSize:19,color:cfg?.color||"#1a1a2e"}}>{cat}</div>
                        <div style={{fontSize:12,color:"#9CA3AF",marginTop:2}}>{brands.length} brand{brands.length>1?"s":""} from {C.name} YouTubers — click to shop directly</div>
                      </div>
                    </div>
                    {/* Brand grid */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:12}}>
                      {brands.map((b,i)=>(
                        <BrandCard key={i} b={b} cfg={cfg} onYTClick={yt=>{const y=C.youtubers.find(x=>x.name===yt); if(y) nav("ytDetail",{yt:{...y,country:C.name,flag:C.flag},keep:true});}}/>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ═══════════════════════════════════════════
            BY CATEGORY — global
        ═══════════════════════════════════════════ */}
        {page==="byCat" && (
          <div className="fade">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
              <div style={{fontWeight:900,fontSize:22,color:"#1a1a2e"}}>📂 All Brands by Category</div>
              <div style={{flex:1}}/>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#C4B5FD"}}>🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search brands…"
                  style={{padding:"8px 12px 8px 28px",background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:9,color:"#1a1a2e",fontSize:12,width:200}}/>
              </div>
            </div>

            {/* Category selector */}
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:24}}>
              <button className="chip" onClick={()=>setSelCat(null)}
                style={{padding:"7px 16px",borderRadius:20,fontSize:12,fontWeight:700,border:"1.5px solid",borderColor:!selCat?"#6D28D9":"#E5E7EB",background:!selCat?"#6D28D9":"#fff",color:!selCat?"#fff":"#6B7280"}}>
                🗂️ All ({totalBrands})
              </button>
              {Object.entries(CATS).map(([cat,cfg])=>{
                const count=allBrands.filter(b=>b.cat===cat).length;
                if(!count) return null;
                return (
                  <button key={cat} className="chip" onClick={()=>setSelCat(selCat===cat?null:cat)}
                    style={{padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"1.5px solid",borderColor:selCat===cat?cfg.color:"#E5E7EB",background:selCat===cat?cfg.bg:"#fff",color:selCat===cat?cfg.color:"#6B7280"}}>
                    {cfg.icon} {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Sections */}
            {(selCat?[selCat]:allCatNames).map((cat,si)=>{
              const cfg=CATS[cat];
              const brands=filteredBrands.filter(b=>b.cat===cat);
              if(!brands.length) return null;
              return (
                <div key={cat} className="fade" style={{marginBottom:32,animationDelay:`${si*.03}s`}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"14px 20px",background:cfg?.bg||"#F8F7FF",border:`1.5px solid ${cfg?.color||"#E5E7EB"}30`,borderRadius:14,borderLeft:`5px solid ${cfg?.color||"#E5E7EB"}`}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 2px 10px ${cfg?.color||"#888"}20`}}>{cfg?.icon}</div>
                    <div>
                      <div style={{fontWeight:900,fontSize:18,color:cfg?.color||"#1a1a2e"}}>{cat}</div>
                      <div style={{fontSize:12,color:"#9CA3AF",marginTop:2}}>{brands.length} brands globally from YouTubers</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                    {brands.map((b,i)=>(
                      <BrandCard key={i} b={b} cfg={cfg} showCountry/>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════════════════
            BY YOUTUBER
        ═══════════════════════════════════════════ */}
        {page==="byYT" && !selYT && (
          <div className="fade">
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
              <div style={{fontWeight:900,fontSize:22,color:"#1a1a2e"}}>👤 All YouTubers Worldwide</div>
              <div style={{flex:1}}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["All",...Object.keys(TIERS)].map(t=>(
                  <button key={t} className="chip" onClick={()=>setTierF(t)}
                    style={{padding:"6px 13px",borderRadius:8,fontSize:12,fontWeight:600,border:"1.5px solid",borderColor:tierF===t?(TIERS[t]?.color||"#6D28D9"):"#E5E7EB",background:tierF===t?(TIERS[t]?.bg||"#F8F7FF"):"#fff",color:tierF===t?(TIERS[t]?.color||"#6D28D9"):"#6B7280"}}>
                    {t==="All"?"All Tiers":`${TIERS[t].icon} ${t}`}
                  </button>
                ))}
              </div>
              <select value={catF} onChange={e=>setCatF(e.target.value)}
                style={{padding:"7px 12px",background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:8,color:"#6B7280",fontSize:12,cursor:"pointer",fontFamily:"Outfit"}}>
                <option value="All">All Categories</option>
                {Object.keys(CATS).map(c=><option key={c} value={c}>{CATS[c].icon} {c}</option>)}
              </select>
            </div>

            {Object.entries(TIERS).map(([tier,tcfg])=>{
              const yt=filteredYT.filter(y=>y.tier===tier);
              if(!yt.length) return null;
              return (
                <div key={tier} style={{marginBottom:28}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 16px",background:tcfg.bg,borderRadius:11,border:`1.5px solid ${tcfg.color}25`}}>
                    <span style={{fontSize:18}}>{tcfg.icon}</span>
                    <div style={{fontWeight:800,fontSize:16,color:tcfg.color}}>{tcfg.label}</div>
                    <div style={{fontSize:12,color:"#9CA3AF"}}>{tcfg.sub}</div>
                    <div style={{marginLeft:"auto",padding:"3px 10px",borderRadius:20,background:"#fff",color:tcfg.color,fontSize:12,fontWeight:700,border:`1.5px solid ${tcfg.color}30`}}>{yt.length}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12}}>
                    {yt.map(y=>(
                      <div key={y.name} className="card row" onClick={()=>{setSelYT(y);setPage("ytDetail");}}
                        style={{background:"#fff",border:"1.5px solid #EDE9FF",borderRadius:14,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                          <div style={{width:50,height:50,borderRadius:13,background:y.color+"18",border:`2px solid ${y.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:y.color,flexShrink:0}}>{y.avatar}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontWeight:800,fontSize:15,color:"#1a1a2e",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{y.name}</div>
                            <a href={y.yt} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="ytlink"
                              style={{fontSize:11,color:"#DC2626",display:"flex",alignItems:"center",gap:3,marginTop:2}}>▶ {y.subs} · {y.flag} {y.country}</a>
                            <div style={{fontSize:11,color:"#9CA3AF",marginTop:1}}>{y.niche}</div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0}}>
                            <div style={{fontWeight:900,fontSize:22,color:tcfg.color,lineHeight:1}}>{y.brands.length}</div>
                            <div style={{fontSize:9,color:"#D1D5DB",fontWeight:600}}>BRANDS</div>
                          </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          {y.brands.slice(0,3).map((b,i)=>(
                            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:"#F8F7FF",borderRadius:8}}>
                              <span style={{fontSize:16}}>{CATS[b.cat]?.icon}</span>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{b.name}</div>
                                <div style={{fontSize:10,color:"#9CA3AF"}}>{b.cat}</div>
                              </div>
                              <span style={{fontSize:10,padding:"2px 7px",borderRadius:4,fontWeight:700,background:TYPE_C[b.type]?.bg||"#F8F7FF",color:TYPE_C[b.type]?.color||"#666",flexShrink:0}}>{b.type}</span>
                            </div>
                          ))}
                          {y.brands.length>3 && <div style={{fontSize:11,color:"#9CA3AF",textAlign:"center"}}>+{y.brands.length-3} more brands →</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════════════════
            YOUTUBER DETAIL
        ═══════════════════════════════════════════ */}
        {page==="ytDetail" && selYT && (
          <div className="fade">
            <button onClick={()=>{setSelYT(null);setPage("byYT");}} style={{background:"#F8F7FF",border:"1.5px solid #E5E7EB",borderRadius:8,padding:"7px 14px",color:"#6B7280",fontSize:12,cursor:"pointer",fontFamily:"Outfit",fontWeight:600,marginBottom:20}}>← Back to Creators</button>
            {/* Hero */}
            <div style={{background:"#fff",border:`1.5px solid ${selYT.color}30`,borderRadius:18,padding:"24px 28px",marginBottom:24,boxShadow:`0 4px 20px ${selYT.color}15`}}>
              <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
                <div style={{width:70,height:70,borderRadius:18,background:selYT.color+"18",border:`3px solid ${selYT.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:selYT.color}}>{selYT.avatar}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:26,color:"#1a1a2e"}}>{selYT.name}</div>
                  <div style={{fontSize:13,color:"#9CA3AF",marginTop:3}}>{selYT.niche} · {selYT.flag} {selYT.country}</div>
                  <a href={selYT.yt} target="_blank" rel="noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:7,marginTop:10,padding:"7px 16px",borderRadius:9,background:"#FEF2F2",border:"1.5px solid #FECACA",color:"#DC2626",fontSize:13,fontWeight:700}}>
                    ▶ YouTube · {selYT.subs} subscribers
                  </a>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {[{v:TIERS[selYT.tier]?.icon+" "+selYT.tier,l:"TIER",c:TIERS[selYT.tier]?.color},{v:selYT.brands.length,l:"BRANDS",c:"#6D28D9"}].map(s=>(
                    <div key={s.l} style={{textAlign:"center",padding:"12px 18px",background:"#F8F7FF",borderRadius:11,border:"1.5px solid #EDE9FF"}}>
                      <div style={{fontWeight:900,fontSize:20,color:s.c,lineHeight:1}}>{s.v}</div>
                      <div style={{fontSize:9,color:"#D1D5DB",fontWeight:600,marginTop:3}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Brand sections by category */}
            {(()=>{
              const grouped={};
              selYT.brands.forEach(b=>{ if(!grouped[b.cat]) grouped[b.cat]=[]; grouped[b.cat].push(b); });
              return Object.entries(grouped).map(([cat,brands])=>{
                const cfg=CATS[cat];
                return (
                  <div key={cat} style={{marginBottom:24}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"12px 16px",background:cfg?.bg||"#F8F7FF",border:`1.5px solid ${cfg?.color||"#E5E7EB"}30`,borderRadius:12,borderLeft:`5px solid ${cfg?.color||"#E5E7EB"}`}}>
                      <span style={{fontSize:22}}>{cfg?.icon}</span>
                      <div style={{fontWeight:800,fontSize:16,color:cfg?.color||"#1a1a2e"}}>{cat}</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                      {brands.map((b,i)=>(
                        <BrandCard key={i} b={{...b,ytName:selYT.name,ytSubs:selYT.subs,ytYT:selYT.yt,ytAvatar:selYT.avatar,ytColor:selYT.color}} cfg={cfg} hideYT/>
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── BRAND CARD COMPONENT ─────────────────────────────────────────────────────
function BrandCard({ b, cfg, hideYT, showCountry, onYTClick }) {
  const tc = TYPE_C[b.type] || { bg:"#F3F4F6", color:"#6B7280" };
  return (
    <div style={{background:"#fff",border:"1.5px solid #EDE9FF",borderRadius:15,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 2px 8px rgba(0,0,0,.04)",transition:"transform .2s,box-shadow .2s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.04)";}}>
      {/* top stripe */}
      <div style={{height:4,background:`linear-gradient(90deg,${cfg?.color||"#6D28D9"},${cfg?.color||"#6D28D9"}66)`}}/>
      <div style={{padding:"16px 16px 14px",flex:1,display:"flex",flexDirection:"column"}}>
        {/* header */}
        <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
          <div style={{width:46,height:46,borderRadius:12,background:cfg?.bg||"#F8F7FF",border:`1.5px solid ${cfg?.color||"#E5E7EB"}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{b.logo||cfg?.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:800,fontSize:15,color:"#1a1a2e",lineHeight:1.2}}>{b.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,flexWrap:"wrap"}}>
              <span style={{fontSize:10,padding:"2px 8px",borderRadius:4,fontWeight:700,background:tc.bg,color:tc.color}}>{b.type}</span>
              {b.year && <span style={{fontSize:10,color:"#9CA3AF"}}>Est. {b.year}</span>}
              {showCountry && b.flag && <span style={{fontSize:11}}>{b.flag}</span>}
            </div>
          </div>
        </div>
        {/* desc */}
        <div style={{fontSize:13,color:"#6B7280",lineHeight:1.65,marginBottom:14,flex:1}}>{b.desc}</div>
        {/* creator badge */}
        {!hideYT && (
          <div onClick={()=>onYTClick&&onYTClick(b.ytName)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"#F8F7FF",borderRadius:9,marginBottom:12,cursor:onYTClick?"pointer":"default",border:"1.5px solid #EDE9FF"}}>
            <div style={{width:28,height:28,borderRadius:7,background:b.ytColor+"18",border:`1.5px solid ${b.ytColor}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:b.ytColor,flexShrink:0}}>{b.ytAvatar}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{b.ytName}</div>
              <a href={b.ytYT} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,color:"#DC2626",display:"flex",alignItems:"center",gap:3}}>▶ {b.ytSubs} subs</a>
            </div>
            {onYTClick && <span style={{fontSize:12,color:"#C4B5FD"}}>→</span>}
          </div>
        )}
        {/* SHOP BUTTON */}
        <a href={b.link} target="_blank" rel="noreferrer" className="shopbtn"
          style={{background:`linear-gradient(135deg,${cfg?.color||"#6D28D9"},${cfg?.color||"#6D28D9"}bb)`,color:"#fff",boxShadow:`0 4px 14px ${cfg?.color||"#6D28D9"}30`}}>
          🛒 {b.cta||"Shop Now"} →
        </a>
        {/* URL */}
        <div style={{marginTop:8,textAlign:"center",fontSize:11,color:"#D1D5DB",fontFamily:"monospace"}}>
          🔗 {b.link.replace("https://","").replace("http://","").split("/")[0]}
        </div>
      </div>
    </div>
  );
}
