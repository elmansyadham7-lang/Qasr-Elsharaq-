/**
 * ====================================================================
 * قائمة طعام قصر الشرق - ملف البيانات المنسق
 * Menu Data - Categorized & Structured
 * ====================================================================
 * يمكنك إضافة أو تعديل أو حذف أي طبق بسهولة من هنا.
 */

const MENU_CATEGORIES = [
  { id: "all", name: "الكل", icon: "✨" },
  { id: "grills", name: "المشويات الملكية", icon: "🥩" },
  { id: "tajines", name: "طواجن الفخار", icon: "🍲" },
  { id: "appetizers", name: "مقبلات وشوربات", icon: "🥗" },
  { id: "desserts", name: "حلويات شرقية", icon: "🍯" },
  { id: "beverages", name: "مشروبات وعصائر", icon: "🍹" }
];

const MENU_ITEMS = [
  // ==================== المشويات الملكية (Grills) ====================
  {
    id: "g1",
    name: "صينية مشكل قصر الشرق الملكي",
    category: "grills",
    price: 490,
    tag: "الأكثر طلباً",
    serves: "تكفي شخصين إلى 3 أشخاص",
    description: "تشكيلة فاخرة من الكباب البلدي، الكفتة المتبلة على الفحم، الريش الضاني المشوية، والشيش طاووق، تقدم مع أرز بالخلطة، ثومية، وسلطات.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g2",
    name: "ريش ضاني مشوية على الفحم",
    category: "grills",
    price: 360,
    tag: "توصية الشيف",
    serves: "طبق رئيسي فاخر",
    description: "قطع ريش ضاني بلدي متبلة بالزعتر الجبلي والبصل والليمون، مشوية بعناية فائقة على الفحم الحجري لدرجة استواء ونعومة مثالية.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g3",
    name: "كباب وكفتة بلدي مشوي",
    category: "grills",
    price: 290,
    tag: "كلاسيك أصيل",
    serves: "طبق فردي مشبع",
    description: "أسياخ لحم بتلو مفروم ناعم ومتبل بخلطة بهارات قصر الشرق الخاصة، مع أسياخ كباب طري متبل، يقدم مع خبز بلدي ساخن وطحينة.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g4",
    name: "طرب بلدي مشوي على الجمر",
    category: "grills",
    price: 310,
    tag: "عشاق الدسم الشرقي",
    serves: "طبق فردي",
    description: "كفتة متبلة ملفوفة بعناية في منديل الضاني الطبيعي، مشوية على الفحم حتى تصبح مقرمشة من الخارج وطرية وغنية بالنكهة من الداخل.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g5",
    name: "شيش طاووق على الطريقة اللبنانية",
    category: "grills",
    price: 220,
    tag: "خفيف وصحي",
    serves: "طبق فردي",
    description: "مكعبات صدور دجاج طازجة منقوعة في تتبيلة الزبادي والثوم وزيت الزيتون والليمون، مشوية مع الفلفل الألوان والبصل والروزماري.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g6",
    name: "نصف دجاجة مسحب على الفحم",
    category: "grills",
    price: 195,
    tag: "نكهة مميزة",
    serves: "طبق فردي",
    description: "دجاجة طازجة مخلية من العظم ومتبلة بصلصة الثوم والأعشاب الشرقية، مشوية ببطء على الفحم حتى تنضج تماماً، مع البطاطس المقلية.",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80"
  },

  // ==================== طواجن الفخار (Tajines) ====================
  {
    id: "t1",
    name: "طاجن عكاوي بالبصل القاورما",
    category: "tajines",
    price: 340,
    tag: "توصية الشيف",
    serves: "طبق رئيسي دسم",
    description: "قطع عكاوي بقري ذائبة مطهوة على نار هادئة في طاجن فخاري مغطى بعجين ساخن، مع البصل المكرمل والتوابل الشرقية العطرية المستكة والحبهان.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "t2",
    name: "طاجن موزة ضاني بالفريك الصعيدي",
    category: "tajines",
    price: 380,
    tag: "طبق الملوك",
    serves: "طبق فردي فاخر",
    description: "موزة ضاني كاملة محمرة بالسمن البلدي ومستقرة فوق سرير من الفريك الأخضر المفلفل بالمكسرات المحمصة والزبيب ومرق اللحم المعتق.",
    image: "https://images.unsplash.com/photo-1514944298352-78d1283ea4e6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "t3",
    name: "طاجن بامية بلدي باللحم الضاني",
    category: "tajines",
    price: 260,
    tag: "نكهة البيوت الأصيلة",
    serves: "طبق رئيسي",
    description: "بامية بلدي خضراء صغيرة مطهوة في صلصة طماطم مسبكة بالثوم والكزبرة الجافة مع قطع لحم ضاني طرية، ومقدمة مع ليمون طازج.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "t4",
    name: "طاجن ملوخية بالتقلية والطشة وسمن بلدي",
    category: "tajines",
    price: 140,
    tag: "طشة زمان",
    serves: "طبق مشاركة",
    description: "ملوخية خضراء طازجة مخروطة يدوياً، مطبوخة بمرقة البط الفاخرة مع طشة الثوم المقرمش والكزبرة بالسمن البلدي الفلاحي.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80"
  },

  // ==================== مقبلات وشوربات (Appetizers & Soups) ====================
  {
    id: "a1",
    name: "تشكيلة مقبلات قصر الشرق الباردة",
    category: "appetizers",
    price: 165,
    tag: "الأكثر طلباً",
    serves: "مشاركة 2-4 أفراد",
    description: "صحن مشكل فاخر يحتوي على: حمص بالطحينة وزيت الزيتون البكر، متبل باذنجان مشوي، بابا غنوج، تبولة لبنانية، وورق عنب بدبس الرمان.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "a2",
    name: "ورق عنب بدبس الرمان والليمون",
    category: "appetizers",
    price: 110,
    tag: "مذاق حامض حلو",
    serves: "طبق مقبلات",
    description: "أصابع ورق عنب طازجة محشوة بخلطة الأرز بالأعشاب والنعناع، مطهوة بزيت الزيتون وعصير الليمون الطبيعي ومزينة بقطرات دبس الرمان.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "a3",
    name: "تشكيلة سمبوسك مقرمشة وكبيبة شامية",
    category: "appetizers",
    price: 135,
    tag: "مقرمشات ساخنة",
    serves: "مشاركة",
    description: "حبات كبيبة محشوة باللحم المفروم والصنوبر، مع سمبوسك مقرمشة محشوة بخليط الجبن الموتزاريلا والفيتا، وأخرى باللحم المتبل.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "a4",
    name: "شوربة كوارع مخلية ملكية بالليمون",
    category: "appetizers",
    price: 150,
    tag: "غذاء ودواء",
    serves: "طبق فردي ساخن",
    description: "مرق كوارع غني ومصفى بعناية، مع قطع كوارع مخلية طرية ومتبلة بالمستكة والحبهان وخلطة الثوم والخل والليمون الأخضر.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
  },

  // ==================== حلويات شرقية (Desserts) ====================
  {
    id: "d1",
    name: "كنافة نابلسية بالجبنة السائحة والفستق",
    category: "desserts",
    price: 120,
    tag: "الأكثر طلباً",
    serves: "طبق فردي/مشاركة",
    description: "كنافة شعر ذهبية مقرمشة ومحمرة بالسمن البلدي، محشوة بجبنة عكاوية تمط وتذوب، ومسقية بالشربات الخفيف ومرشوشة بالفستق الحلبي الأخضر.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d2",
    name: "طاجن أم علي بالمكسرات والقشطة الفلاحي",
    category: "desserts",
    price: 95,
    tag: "توصية الشيف",
    serves: "طبق دافئ ومغذي",
    description: "رقائق الميل فوي الهشة المغمورة في حليب طازج مكثف ومتبل بالفانيليا والمستكة، ومخبوزة في الفرن مع طبقة قشطة فلاحي ومكسرات مشكلة.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d3",
    name: "صينية مشكل بقلاوة وبسبوسة بالمكسرات",
    category: "desserts",
    price: 140,
    tag: "أصالة شرقية",
    serves: "مشاركة عائلية",
    description: "تشكيلة من قطع البقلاوة المقرمشة المورقة بالفستق والكاجو، مع قطع بسبوسة مرملة بالسمن البلدي وجوز الهند وحبات اللوز المحمص.",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80"
  },

  // ==================== مشروبات وعصائر (Beverages) ====================
  {
    id: "b1",
    name: "عصير ليمون بالنعناع الفريش المنعش",
    category: "beverages",
    price: 55,
    tag: "منعش وطبيعي",
    serves: "كوب مثلج",
    description: "عصير ليمون طازج مع أوراق النعناع البلدي الخضراء والثلج المجروش، يقدم بقوام مخفوق رائع يروي العطش.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b2",
    name: "تمر هندي شرقي ملكي طبيعي",
    category: "beverages",
    price: 45,
    tag: "مشروب الأصالة",
    serves: "كوب بارد",
    description: "مستخلص تمر هندي طبيعي محضر على الطريقة التراثية برائحة ماء الورد والسكر الموزون لإنعاش حواسك بعد وجبة مشويات دسمة.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b3",
    name: "كركديه أسواني مثلج",
    category: "beverages",
    price: 45,
    tag: "نكهة مصرية",
    serves: "كوب بارد",
    description: "أوراق زهور كركديه أسواني منتقاة بعناية، منقوعة على البارد للحفاظ على مضادات الأكسدة والنكهة الغنية مع مكعبات الثلج.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b4",
    name: "شاي مغربي أصيل بالنعناع والقرنفل",
    category: "beverages",
    price: 40,
    tag: "ختام مثالي",
    serves: "إبريق نحاسي فردي",
    description: "شاي أخضر فاخر مهدور مع باقة نعناع طازجة، يسكب من إبريق تقليدي بفقاعات ورغوة غنية تضفي شعوراً بالاسترخاء الملكي.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
  }
];

if (typeof window !== "undefined") {
  window.MENU_CATEGORIES = MENU_CATEGORIES;
  window.MENU_ITEMS = MENU_ITEMS;
}
