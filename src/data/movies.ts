export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  description?: string;
  duration?: string;
  language?: string;
  director?: string;
  actors?: string[];
  trailerUrl?: string;
  isSeries?: boolean;
  seasons?: number;
  episodes?: number;
}

export const featuredMovies: Movie[] = [
  {
    id: "1",
    title: "الحارس",
    year: 2023,
    rating: 8.5,
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    category: "أكشن",
    isNew: true,
    description: "فيلم أكشن مثير يتناول قصة حارس شخصي محترف يواجه تحديات غير متوقعة أثناء حمايته لشخصية مهمة.",
    duration: "2h 15m",
    language: "العربية",
    director: "أحمد السيد",
    actors: ["محمد رمضان", "أحمد عز", "منة شلبي"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    title: "الليلة الأخيرة",
    year: 2023,
    rating: 7.8,
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1459&q=80",
    category: "دراما",
    isNew: true,
    description: "دراما مؤثرة تحكي قصة عائلة تواجه تحديات الحياة في ليلة واحدة مصيرية تغير حياتهم للأبد.",
    duration: "1h 55m",
    language: "العربية",
    director: "مروان حامد",
    actors: ["كريم عبد العزيز", "نيللي كريم", "آسر ياسين"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "3",
    title: "الرحلة",
    year: 2022,
    rating: 8.2,
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "مغامرة",
    description: "مغامرة مثيرة لمجموعة من الأصدقاء يقومون برحلة استكشافية تتحول إلى صراع من أجل البقاء.",
    duration: "2h 5m",
    language: "العربية",
    director: "محمد سامي",
    actors: ["أحمد السقا", "أمير كرارة", "غادة عادل"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "4",
    title: "الحقيقة المخفية",
    year: 2023,
    rating: 7.5,
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "غموض",
    isNew: true,
    description: "فيلم غموض وإثارة يكشف أسرار جريمة قديمة تهز أركان مدينة هادئة وتكشف الكثير من الأسرار المخفية.",
    duration: "2h 10m",
    language: "العربية",
    director: "شريف عرفة",
    actors: ["عمرو يوسف", "هند صبري", "محمد ممدوح"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "5",
    title: "الحب الأبدي",
    year: 2022,
    rating: 6.9,
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "رومانسي",
    description: "قصة حب رومانسية تتخطى حدود الزمن والمكان وتواجه تحديات الحياة والمجتمع.",
    duration: "1h 45m",
    language: "العربية",
    director: "خالد يوسف",
    actors: ["أحمد حلمي", "منى زكي", "محمود حميدة"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

export const latestMovies: Movie[] = [
  {
    id: "6",
    title: "المواجهة",
    year: 2023,
    rating: 8.7,
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80",
    category: "أكشن",
    isNew: true,
    description: "فيلم أكشن مليء بالإثارة والتشويق يتناول مواجهة بين رجل شرطة ومجموعة من المجرمين الخطرين.",
    duration: "2h 20m",
    language: "العربية",
    director: "بيتر ميمي",
    actors: ["أمير كرارة", "أحمد عز", "هند صبري"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "7",
    title: "الصحراء",
    year: 2023,
    rating: 7.2,
    imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "مغامرة",
    isNew: true,
    description: "مغامرة في قلب الصحراء لمجموعة من المستكشفين يبحثون عن كنز مفقود ويواجهون تحديات الطبيعة القاسية.",
    duration: "2h 5m",
    language: "العربية",
    director: "مروان حامد",
    actors: ["خالد النبوي", "عمرو سعد", "نيللي كريم"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "8",
    title: "الليل الطويل",
    year: 2023,
    rating: 6.8,
    imageUrl: "https://images.unsplash.com/photo-1611523658822-385aa008324c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    category: "رعب",
    isNew: true,
    description: "فيلم رعب نفسي يتناول قصة عائلة محاصرة في منزل معزول خلال ليلة عاصفة تبدأ فيها أحداث غريبة ومرعبة.",
    duration: "1h 50m",
    language: "العربية",
    director: "أحمد عاطف",
    actors: ["أحمد الفيشاوي", "روبي", "محمد ممدوح"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "9",
    title: "الأمل الأخير",
    year: 2023,
    rating: 8.1,
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    category: "دراما",
    isNew: true,
    description: "دراما إنسانية مؤثرة تحكي قصة كفاح رجل يحاول إنقاذ عائلته من ظروف الحياة القاسية.",
    duration: "2h 15m",
    language: "العربية",
    director: "خالد يوسف",
    actors: ["كريم عبد العزيز", "منة شلبي", "محمود حميدة"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "10",
    title: "الضحك",
    year: 2023,
    rating: 7.4,
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1459&q=80",
    category: "كوميدي",
    isNew: true,
    description: "كوميديا اجتماعية تتناول مواقف مضحكة في حياة شاب يواجه تحديات الحياة اليومية بروح الفكاهة.",
    duration: "1h 40m",
    language: "العربية",
    director: "سامح عبد العزيز",
    actors: ["أحمد حلمي", "دنيا سمير غانم", "بيومي فؤاد"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

export const popularSeries: Movie[] = [
  {
    id: "11",
    title: "الطريق",
    year: 2022,
    rating: 9.1,
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "دراما",
    description: "مسلسل درامي يتناول رحلة عائلة عبر الزمن ومواجهتهم للتحديات والتغيرات الاجتماعية.",
    language: "العربية",
    director: "محمد سامي",
    actors: ["نيللي كريم", "أحمد فهمي", "إنجي المقدم"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isSeries: true,
    seasons: 3,
    episodes: 30
  },
  {
    id: "12",
    title: "المدينة المفقودة",
    year: 2022,
    rating: 8.8,
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "مغامرة",
    description: "مسلسل مغامرات يتتبع رحلة مجموعة من علماء الآثار في البحث عن مدينة أسطورية مفقودة.",
    language: "العربية",
    director: "شريف عرفة",
    actors: ["أمير كرارة", "روبي", "محمد لطفي"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isSeries: true,
    seasons: 2,
    episodes: 16
  },
  {
    id: "13",
    title: "الحب والحرب",
    year: 2021,
    rating: 8.5,
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "رومانسي",
    description: "مسلسل رومانسي تاريخي يحكي قصة حب نشأت في ظروف الحرب وتحديات المجتمع.",
    language: "العربية",
    director: "كاملة أبو ذكري",
    actors: ["ظافر العابدين", "نور", "جمال سليمان"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isSeries: true,
    seasons: 1,
    episodes: 15
  },
  {
    id: "14",
    title: "الانتقام",
    year: 2022,
    rating: 8.3,
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80",
    category: "أكشن",
    description: "مسلسل أكشن وإثارة يتناول قصة رجل يسعى للانتقام ممن تسببوا في تدمير حياته.",
    language: "العربية",
    director: "بيتر ميمي",
    actors: ["ياسر جلال", "أمينة خليل", "أحمد سعيد عبد الغني"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isSeries: true,
    seasons: 2,
    episodes: 20
  },
  {
    id: "15",
    title: "الغابة المسكونة",
    year: 2021,
    rating: 7.9,
    imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "رعب",
    description: "مسلسل رعب نفسي يتناول أحداث غامضة تحدث في غابة معزولة وتؤثر على سكان قرية مجاورة.",
    language: "العربية",
    director: "عمرو سلامة",
    actors: ["أحمد مالك", "أروى جودة", "محمد فراج"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isSeries: true,
    seasons: 1,
    episodes: 10
  }
];

export const allMovies = [...featuredMovies, ...latestMovies];
export const allSeries = [...popularSeries];

export function getMovieById(id: string): Movie | undefined {
  return [...allMovies, ...allSeries].find(movie => movie.id === id);
}

export function getMoviesByCategory(category: string): Movie[] {
  return [...allMovies, ...allSeries].filter(movie => movie.category.toLowerCase() === category.toLowerCase());
}

export function searchMovies(query: string): Movie[] {
  const lowerCaseQuery = query.toLowerCase();
  return [...allMovies, ...allSeries].filter(
    movie => 
      movie.title.toLowerCase().includes(lowerCaseQuery) || 
      movie.category.toLowerCase().includes(lowerCaseQuery) ||
      (movie.description && movie.description.toLowerCase().includes(lowerCaseQuery))
  );
}
