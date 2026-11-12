export interface LessonVocab {
  arabic: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  englishMeaning: string;
}

export interface DialogueLine {
  speaker: string;
  arabic: string;
  banglaPronunciation: string;
  banglaTranslation: string;
}

export interface LessonQuizItem {
  questionBn: string;
  options: string[];
  correctIndex: number;
}

export interface FullLesson {
  id: string;
  levelId: string;
  chapterNumber: number;
  lessonNumber: number;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  objectivesBn: string[];
  vocabulary: LessonVocab[];
  grammarTitleBn: string;
  grammarExplanationBn: string;
  grammarExamples: {
    arabic: string;
    banglaMeaning: string;
  }[];
  dialogue: DialogueLine[];
  listeningTaskBn: string;
  speakingTaskBn: string;
  writingTaskBn: string;
  translationTaskBn: string;
  quiz: LessonQuizItem[];
}

export interface CurriculumLevel {
  id: string;
  number: number;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  chapterRange: string;
  totalPlannedLessons: number;
  descriptionBn: string;
}

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    id: "level-1",
    number: 1,
    titleBn: "লেভেল ১: ভিত্তি ও প্রাথমিক কথোপকথন (Foundations)",
    titleEn: "Level 1: Foundations & Daily Greetings",
    titleAr: "المستوى الأول: الأساسيات والتحيات اليومية",
    chapterRange: "অধ্যায় ১ – ২০ (২০০ লেসন)",
    totalPlannedLessons: 200,
    descriptionBn:
      "আরবি বর্ণমালা, হরকত, আত্মপরিচয়, পরিবার, সংখ্যা এবং দৈনন্দিন সালাম ও কুশল বিনিময়।",
  },
  {
    id: "level-2",
    number: 2,
    titleBn: "লেভেল ২: মৌলিক ব্যাকরণ ও বাক্য গঠন (Elementary)",
    titleEn: "Level 2: Elementary Sentences & Daily Life",
    titleAr: "المستوى الثاني: الجمل الأساسية والحياة اليومية",
    chapterRange: "অধ্যায় ২১ – ৪০ (২০০ লেসন)",
    totalPlannedLessons: 200,
    descriptionBn:
      "জুমলা ইসমিয়্যাহ, মুবতাদা-খবর, হরফে জার এবং বিদ্যালয়, বাজার ও ভ্রমণের কথোপকথন।",
  },
  {
    id: "level-3",
    number: 3,
    titleBn: "লেভেল ৩: ক্রিয়াকাল ও মাধ্যমিক কথোপকথন (Intermediate)",
    titleEn: "Level 3: Verb Tenses & Intermediate Dialogue",
    titleAr: "المستوى الثالث: الأزمنة والمحادثة المتوسطة",
    chapterRange: "অধ্যায় ৪১ – ৬০ (২০০ লেসন)",
    totalPlannedLessons: 200,
    descriptionBn:
      "ফে'লে মাযী (অতীত), মুদারি (বর্তমান/ভবিষ্যৎ), আমর (আদেশ) এবং বিস্তারিত আরবি সংলাপ।",
  },
  {
    id: "level-4",
    number: 4,
    titleBn: "লেভেল ৪: উচ্চতর নাহু ও সরফ (Upper-Intermediate)",
    titleEn: "Level 4: Advanced Nahw & Sarf Morphology",
    titleAr: "المستوى الرابع: النحو والصرف المتقدم",
    chapterRange: "অধ্যায় ৬১ – ৭৫ (১৫০ লেসন)",
    totalPlannedLessons: 150,
    descriptionBn:
      "ই'রাবের সূক্ষ্ম নিয়ম, বাবসমূহ (Abwab), মাজিদ ফিহ ক্রিয়া এবং প্রবন্ধ পাঠ।",
  },
  {
    id: "level-5",
    number: 5,
    titleBn: "লেভেল ৫: কুরআনিক আরবি ও তাফসির পরিভাষা (Quranic Arabic)",
    titleEn: "Level 5: Quranic Arabic & Root Analysis",
    titleAr: "المستوى الخامس: العربية القرآنية وتحليل الجذور",
    chapterRange: "অধ্যায় ৭৬ – ৯০ (১৫০ লেসন)",
    totalPlannedLessons: 150,
    descriptionBn:
      "কুরআনের সর্বাধিক ব্যবহৃত শব্দভাণ্ডার, ত্রিবর্ণমূল ধাতু এবং আয়াতের ব্যাকরণগত সৌন্দর্য।",
  },
  {
    id: "level-6",
    number: 6,
    titleBn: "লেভেল ৬: উচ্চতর সাহিত্য, বালাগাহ ও সাবলীলতা (Mastery)",
    titleEn: "Level 6: Classical Literature, Rhetoric & Fluency",
    titleAr: "المستوى السادس: الأدب والبلاغة والطلاقة",
    chapterRange: "অধ্যায় ৯১ – ১০০ (১০০ লেসন)",
    totalPlannedLessons: 100,
    descriptionBn:
      "আরবি অলঙ্কারশাস্ত্র (বালাগাহ), ধ্রুপদী সাহিত্য পাঠ এবং সাবলীল বক্তৃতা ও রচনা।",
  },
];

export const SAMPLE_LESSONS: FullLesson[] = [
  {
    id: "ch1-l1",
    levelId: "level-1",
    chapterNumber: 1,
    lessonNumber: 1,
    titleBn: "অধ্যায় ১ • লেসন ১: সালাম, পরিচিতি ও জ্ঞান অন্বেষণ",
    titleEn: "Chapter 1 • Lesson 1: Greetings, Introduction & Seeking Knowledge",
    titleAr: "الفصل الأول • الدرس الأول: التحية والتعارف وطلب العلم",
    objectivesBn: [
      "ইসলামিক ও প্রমিত আরবিতে সালাম ও কুশল বিনিময় করতে পারা।",
      "নিজের নাম, পরিচয় ও শিক্ষাপ্রতিষ্ঠান সম্পর্কে আরবিতে বলতে পারা।",
      "জুমলা ইসমিয়্যাহ (নামবাচক বাক্য) ও সর্বনাম (أَنَا, أَنْتَ, هُوَ) ব্যবহার করতে পারা।",
    ],
    vocabulary: [
      {
        arabic: "اَلسَّلَامُ عَلَيْكُمْ",
        banglaPronunciation: "আসসালামু আলাইকুম",
        banglaMeaning: "আপনার ওপর শান্তি বর্ষিত হোক",
        englishMeaning: "Peace be upon you",
      },
      {
        arabic: "أَهْلًا وَسَهْلًا",
        banglaPronunciation: "আহলান ওয়া সাহলান",
        banglaMeaning: "স্বাগতম",
        englishMeaning: "Welcome",
      },
      {
        arabic: "طَالِبٌ",
        banglaPronunciation: "ত্বালিবুন",
        banglaMeaning: "ছাত্র / শিক্ষার্থী",
        englishMeaning: "Student (male)",
      },
      {
        arabic: "اَلْجَامِعَةُ",
        banglaPronunciation: "আল-জামিআতু",
        banglaMeaning: "বিশ্ববিদ্যালয়",
        englishMeaning: "The university",
      },
      {
        arabic: "اَلْعِلْمُ",
        banglaPronunciation: "আল-ইলমু",
        banglaMeaning: "জ্ঞান / বিদ্যা",
        englishMeaning: "Knowledge",
      },
      {
        arabic: "مُفِيدٌ",
        banglaPronunciation: "মুফীদুন",
        banglaMeaning: "উপকারী",
        englishMeaning: "Beneficial / Useful",
      },
    ],
    grammarTitleBn: "সর্বনাম (ضَمِير) ও নামবাচক বাক্য (جُمْلَة اسْمِيَّة)",
    grammarExplanationBn:
      "আরবিতে 'আমি' বোঝাতে أَنَا (আনা), 'তুমি (পুরুষ)' বোঝাতে أَنْتَ (আনতা) এবং 'সে (পুরুষ)' বোঝাতে هُوَ (হুয়া) ব্যবহৃত হয়। এই সর্বনামগুলো বাক্যের শুরুতে বসলে মুবতাদা হয় এবং পরের শব্দটি খবর হিসেবে মারফু (শেষে পেশ/তানভীন) হয়।",
    grammarExamples: [
      {
        arabic: "أَنَا طَالِبٌ فِي الْجَامِعَةِ",
        banglaMeaning: "আমি বিশ্ববিদ্যালয়ের একজন ছাত্র।",
      },
      {
        arabic: "أَنْتَ أُسْتَاذٌ مَاهِرٌ",
        banglaMeaning: "আপনি একজন দক্ষ শিক্ষক।",
      },
    ],
    dialogue: [
      {
        speaker: "تَاسِينُ (তাসীন)",
        arabic: "اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ.",
        banglaPronunciation: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু।",
        banglaTranslation: "আপনাদের ওপর শান্তি, রহমত ও বরকত বর্ষিত হোক।",
      },
      {
        speaker: "يُوسُفُ (ইউসুফ)",
        arabic: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، أَهْلًا وَسَهْلًا!",
        banglaPronunciation: "ওয়া আলাইকুমুস সালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু, আহলান ওয়া সাহলান!",
        banglaTranslation: "আপনার ওপরও শান্তি, রহমত ও বরকত বর্ষিত হোক, স্বাগতম!",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "مَرْحَبًا بِكُمَا فِي أَكَادِيمِيَّةِ الْعَرَبِيَّةِ الذَّكِيَّةِ.",
        banglaPronunciation: "মারহাবান বিকুমা ফী আকাদীমিয়্যাতিল আরাবিয়্যাতিয যাকিয়্যাহ।",
        banglaTranslation: "স্মার্ট আরবি একাডেমিতে তোমাদের দুজনকে স্বাগতম।",
      },
      {
        speaker: "تَاسِينُ (তাসীন)",
        arabic: "شُكْرًا جَزِيلًا يَا أُسْتَاذُ، اِسْمِي تَاسِينُ.",
        banglaPronunciation: "শুকরান জাযীলান ইয়া উস্তাদু, ইসমি তাসীনু।",
        banglaTranslation: "অনেক ধন্যবাদ হে উস্তাদ, আমার নাম তাসীন।",
      },
      {
        speaker: "يُوسُفُ (ইউসুফ)",
        arabic: "وَأَنَا يُوسُفُ، نَحْنُ طَالِبَانِ مِنْ بَنْغَلَادِيشَ.",
        banglaPronunciation: "ওয়া আনা ইউসুফু, নাহনু ত্বালিবানি মিন বানগালাদীশ।",
        banglaTranslation: "আর আমি ইউসুফ, আমরা বাংলাদেশ থেকে আগত দুজন শিক্ষার্থী।",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "حَيَّاكُمَا اللَّهُ! مَاذَا تَدْرُسَانِ فِي الْجَامِعَةِ؟",
        banglaPronunciation: "হাইয়্যাকুমাল্লাহ! মাযা তাদরুসানি ফিল জামিআহ?",
        banglaTranslation: "আল্লাহ তোমাদের কল্যাণ করুন! তোমরা বিশ্ববিদ্যালয়ে কী পড়াশোনা করছ?",
      },
      {
        speaker: "تَاسِينُ (তাসীন)",
        arabic: "أَدْرُسُ الْقُرْآنَ الْكَرِيمَ وَالدِّرَاسَاتِ الْإِسْلَامِيَّةَ.",
        banglaPronunciation: "আদরুসুল কুরআনাল কারীমা ওয়াদ দিরাসাতিল ইসলামিয়্যাহ।",
        banglaTranslation: "আমি পবিত্র কুরআন ও ইসলামিক স্টাডিজ অধ্যয়ন করছি।",
      },
      {
        speaker: "يُوسُفُ (ইউসুফ)",
        arabic: "وَنَحْنُ نُرِيدُ أَنْ نَتَعَلَّمَ اللُّغَةَ الْعَرَبِيَّةَ بِطَلَاقَةٍ.",
        banglaPronunciation: "ওয়া নাহনু নুরীদু আন নাতাআল্লামাল লুগাতাল আরাবিয়্যাতা বিত্বালাকাহ।",
        banglaTranslation: "এবং আমরা সাবলীলভাবে আরবি ভাষা শিখতে চাই।",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "هٰذَا هَدَفٌ عَظِيمٌ، فَاللُّغَةُ الْعَرَبِيَّةُ مِفْتَاحُ فَهْمِ الْقُرْآنِ.",
        banglaPronunciation: "হাযা হাদাফুন আযীমুন, ফাল্লুগাতুল আরাবিয়্যাতু মিফতাহু ফাহমিল কুরআন।",
        banglaTranslation: "এটি একটি মহৎ লক্ষ্য, কারণ আরবি ভাষা হলো কুরআন বোঝার চাবিকাঠি।",
      },
      {
        speaker: "تَاسِينُ (তাসীন)",
        arabic: "كَيْفَ نَبْدَأُ دِرَاسَةَ النَّحْوِ وَالصَّرْفِ يَا أُسْتَاذُ؟",
        banglaPronunciation: "কাইফা নাবদাউ দিরাসাতান নাহবি ওয়াস সারফি ইয়া উস্তাদ?",
        banglaTranslation: "হে উস্তাদ, আমরা কীভাবে নাহু ও সরফ পড়া শুরু করব?",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "نَبْدَأُ بِفَهْمِ الْكَلِمَةِ وَالْجُمْلَةِ الْمُفِيدَةِ كُلَّ يَوْمٍ.",
        banglaPronunciation: "নাবদাউ বিফাহমিল কালিমাতি ওয়াল জুমলাতিল মুফীদাতি কুল্লা ইয়াওম।",
        banglaTranslation: "আমরা প্রতিদিন শব্দ এবং অর্থবোধক বাক্য বোঝার মাধ্যমে শুরু করব।",
      },
      {
        speaker: "يُوسُفُ (ইউসুফ)",
        arabic: "هَلْ نَتَدَرَّبُ عَلَى الِاسْتِمَاعِ وَالْمُحَادَثَةِ أَيْضًا؟",
        banglaPronunciation: "হাল নাতাদাররাবু আলাল ইসতিমায়ি ওয়াল মুহাদাসাতি আইদান?",
        banglaTranslation: "আমরা কি শ্রবণ এবং কথোপকথনেরও অনুশীলন করব?",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "نَعَمْ، بِالتَّأْكِيدِ! اَلْمُمَارَسَةُ الْيَوْمِيَّةُ تُقَوِّي اللِّسَانَ.",
        banglaPronunciation: "নাআম, বিত্তা'কীদ! আল-মুমারাসাতুল ইয়াওমিয়্যাতু তুকাউয়িল লিসান।",
        banglaTranslation: "হ্যাঁ, অবশ্যই! দৈনিক অনুশীলন জিহ্বাকে জড়তামুক্ত ও শক্তিশালী করে।",
      },
      {
        speaker: "تَاسِينُ (তাসীন)",
        arabic: "جَزَاكَ اللَّهُ خَيْرًا يَا أُسْتَاذُ عَلَى هٰذِهِ النَّصِيحَةِ.",
        banglaPronunciation: "জাযাকাল্লাহু খাইরান ইয়া উস্তাদু আলা হাযিহিন নাসীহাহ।",
        banglaTranslation: "হে উস্তাদ, এই মূল্যবান উপদেশের জন্য আল্লাহ আপনাকে উত্তম প্রতিদান দিন।",
      },
      {
        speaker: "اَلْأُسْتَاذُ (উস্তাদ)",
        arabic: "وَإِيَّاكُمَا، بَارَكَ اللَّهُ فِي عِلْمِكُمَا وَوَقْتِكُمَا.",
        banglaPronunciation: "ওয়া ইয়্যাকুমা, বারাকাল্লাহু ফী ইলমিকুমা ওয়া ওয়াকতিকুমা।",
        banglaTranslation: "তোমাদের দুজনকেও, আল্লাহ তোমাদের জ্ঞান ও সময়ে বরকত দান করুন।",
      },
    ],
    listeningTaskBn:
      "উপরের ১৫-লাইনের সংলাপটি অডিও প্লে বাটনে ক্লিক করে ২ বার মনোযোগ দিয়ে শুনুন এবং প্রতিটি হরকতের উচ্চারণ লক্ষ্য করুন।",
    speakingTaskBn:
      "নিজের নাম ও শিক্ষাপ্রতিষ্ঠানের নাম যুক্ত করে 'اَلسَّلَامُ عَلَيْكُمْ، اِسْمِي ... وَأَنَا طَالِبٌ' বাক্যটি ৩ বার উচ্চস্বরে বলুন।",
    writingTaskBn:
      "খাতায় বা AI Teacher চ্যাটে নিজের পরিচয় সম্পর্কে ৩টি পূর্ণ হরকতযুক্ত আরবি বাক্য লিখুন।",
    translationTaskBn:
      "বাংলায় অনুবাদ করুন: 'اَللُّغَةُ الْعَرَبِيَّةُ مِفْتَاحُ فَهْمِ الْقُرْآنِ الْكَرِيمِ'",
    quiz: [
      {
        questionBn: "সংলাপে তাসীন বিশ্ববিদ্যালয়ে কোন বিষয়ে পড়াশোনা করার কথা বলেছেন?",
        options: [
          "চিকিৎসাবিজ্ঞান",
          "পবিত্র কুরআন ও ইসলামিক স্টাডিজ",
          "প্রকৌশলবিদ্যা",
        ],
        correctIndex: 1,
      },
      {
        questionBn: "'مِفْتَاحُ فَهْمِ الْقُرْآنِ' অর্থ কী?",
        options: [
          "কুরআন বোঝার চাবিকাঠি",
          "বিদ্যালয়ের দরজা",
          "নতুন বই",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "ch21-l1",
    levelId: "level-2",
    chapterNumber: 21,
    lessonNumber: 1,
    titleBn: "অধ্যায় ২১ • লেসন ১: গ্রন্থাগার ও বই পাঠ (মৌলিক বাক্য গঠন)",
    titleEn: "Chapter 21 • Lesson 1: In the Library & Reading Books",
    titleAr: "الفصل الحادي والعشرون • الدرس الأول: في المكتبة وقراءة الكتب",
    objectivesBn: [
      "গ্রন্থাগার ও পড়াশোনা সম্পর্কিত প্রয়োজনীয় আরবি শব্দ শেখা।",
      "হরফে জার (فِي, عَلَى, مِن, إِلَى) ব্যবহার করে শুদ্ধ বাক্য গঠন করা।",
    ],
    vocabulary: [
      {
        arabic: "اَلْمَكْتَبَةُ",
        banglaPronunciation: "আল-মাকতাবাতু",
        banglaMeaning: "গ্রন্থাগার / লাইব্রেরি",
        englishMeaning: "The library",
      },
      {
        arabic: "قِصَّةٌ",
        banglaPronunciation: "কিসসাতুন",
        banglaMeaning: "গল্প / কাহিনী",
        englishMeaning: "Story",
      },
      {
        arabic: "رَفٌّ",
        banglaPronunciation: "রাফফুন",
        banglaMeaning: "বইয়ের তাক (Shelf)",
        englishMeaning: "Shelf",
      },
      {
        arabic: "هُدُوءٌ",
        banglaPronunciation: "হুদূউন",
        banglaMeaning: "নীরবতা / প্রশান্তি",
        englishMeaning: "Quietness / Calm",
      },
    ],
    grammarTitleBn: "হরফে জার (حُرُوفُ الْجَرِّ) এর প্রয়োগ",
    grammarExplanationBn:
      "فِي (ভেতরে) এবং عَلَى (উপরে) হলো হরফে জার। এগুলোর পরের বিশেষ্য শব্দের শেষে সর্বদা কাসরা বা যের ( ِ ) হয়। যেমন: فِي الْمَكْتَبَةِ (লাইব্রেরির ভেতরে)।",
    grammarExamples: [
      {
        arabic: "اَلْكِتَابُ عَلَى الرَّفِّ",
        banglaMeaning: "বইটি তাকের উপরে আছে।",
      },
      {
        arabic: "يَقْرَأُ الطَّالِبُ فِي الْمَكْتَبَةِ",
        banglaMeaning: "ছাত্রটি গ্রন্থাগারে পড়ছে।",
      },
    ],
    dialogue: [
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "اَلسَّلَامُ عَلَيْكُمْ يَا زَيْدُ، أَيْنَ تَذْهَبُ الْآنَ؟",
        banglaPronunciation: "আসসালামু আলাইকুম ইয়া যাইদু, আইনা তাযহাবুল আন?",
        banglaTranslation: "আসসালামু আলাইকুম হে যায়েদ, তুমি এখন কোথায় যাচ্ছ?",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "وَعَلَيْكُمُ السَّلَامُ، أَذْهَبُ إِلَى الْمَكْتَبَةِ الْمَرْكَزِيَّةِ.",
        banglaPronunciation: "ওয়া আলাইকুমুস সালাম, আযহাবু ইলাল মাকতাবাতিল মারকাযিয়্যাহ।",
        banglaTranslation: "ওয়া আলাইকুমুস সালাম, আমি কেন্দ্রীয় গ্রন্থাগারে যাচ্ছি।",
      },
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "مَاذَا تَبْحَثُ عَنْهُ فِي الْمَكْتَبَةِ؟",
        banglaPronunciation: "মাযা তাবহাসু আনহু ফিল মাকতাবাতি?",
        banglaTranslation: "তুমি গ্রন্থাগারে কী খুঁজছ?",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "أَبْحَثُ عَنْ كِتَابٍ فِي قَوَاعِدِ اللُّغَةِ الْعَرَبِيَّةِ.",
        banglaPronunciation: "আবহাসু আন কিতাবিন ফী কাওয়ায়িদিল লুগাতিল আরাবিয়্যাহ।",
        banglaTranslation: "আমি আরবি ব্যাকরণের ওপর একটি বই খুঁজছি।",
      },
      {
        speaker: "أَمِينُ الْمَكْتَبَةِ (লাইব্রেরিয়ান)",
        arabic: "أَهْلًا بِكُمَا، كُتُبُ النَّحْوِ عَلَى الرَّفِّ الثَّالِثِ.",
        banglaPronunciation: "আহলান বিকুমা, কুতুবুন নাহবি আলার রাফফিস সালিস।",
        banglaTranslation: "তোমাদের স্বাগতম, নাহুর বইগুলো তৃতীয় তাকে রাখা আছে।",
      },
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "وَهَلْ تُوجَدُ هُنَا كُتُبُ الْقِصَصِ الْعَرَبِيَّةِ؟",
        banglaPronunciation: "ওয়া হাল তূজাদু হুনা কুতুবুল কিসাসিল আরাবিয়্যাহ?",
        banglaTranslation: "আর এখানে কি আরবি গল্পের বই পাওয়া যায়?",
      },
      {
        speaker: "أَمِينُ الْمَكْتَبَةِ (লাইব্রেরিয়ান)",
        arabic: "نَعَمْ، قِسْمُ الْأَدَبِ وَالْقِصَصِ بِجَانِبِ النَّافِذَةِ.",
        banglaPronunciation: "নাআম, কিসমুল আদাবি ওয়াল কিসাসি বিজানিবিন নাফিযাহ।",
        banglaTranslation: "হ্যাঁ, সাহিত্য ও গল্পের বিভাগটি জানালার পাশে অবস্থিত।",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "مَا أَجْمَلَ هٰذِهِ الْمَكْتَبَةَ! اَلْهُدُوءُ فِيهَا رَائِعٌ.",
        banglaPronunciation: "মা আজমালা হাযিহিল মাকতাবাহ! আল-হুদূউ ফীহা রায়িঊন।",
        banglaTranslation: "এই গ্রন্থাগারটি কতই না সুন্দর! এখানকার নীরবতা অসাধারণ।",
      },
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "صَحِيحٌ، اَلْقِرَاءَةُ تُنَوِّرُ الْعَقْلَ وَتَزِيدُ الْمَعْرِفَةَ.",
        banglaPronunciation: "সাহীহুন, আল-কিরাআতু তুনাউয়িরুল আকলা ওয়া তাযীদুল মা'রিফাহ।",
        banglaTranslation: "ঠিক বলেছ, বই পড়া মস্তিষ্ককে আলোকিত করে এবং জ্ঞান বৃদ্ধি করে।",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "سَأَجْلِسُ هُنَا لِمُدَّةِ سَاعَةٍ لِقِرَاءَةِ هٰذَا الْفَصْلِ.",
        banglaPronunciation: "সাআজলিসু হুনা লিমুদ্দাতি সাআতিন লিকিরাআতি হাযাল ফাসল।",
        banglaTranslation: "আমি এই অধ্যায়টি পড়ার জন্য এখানে এক ঘণ্টা বসব।",
      },
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "وَأَنَا سَأَقْرَأُ قِصَّةً قَصِيرَةً ثُمَّ نَعُودُ مَعًا.",
        banglaPronunciation: "ওয়া আনা সাআকরাউ কিসসাতান কাসীরাতান সুম্মা নাঊদু মাআন।",
        banglaTranslation: "আর আমি একটি ছোটগল্প পড়ব, তারপর আমরা একসাথে ফিরব।",
      },
      {
        speaker: "أَمِينُ الْمَكْتَبَةِ (লাইব্রেরিয়ান)",
        arabic: "تَفَضَّلَا بِالْجُلُوسِ، وَأَتَمَنَّى لَكُمَا قِرَاءَةً نَافِعَةً.",
        banglaPronunciation: "তাফাদ্দালা বিল জুলূসি, ওয়া আতামান্না লাকুমা কিরাআতান নাফিআহ।",
        banglaTranslation: "আপনারা বসুন, এবং আমি আপনাদের জন্য উপকারী পাঠ কামনা করছি।",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "شُكْرًا لَكَ يَا أُسْتَاذُ عَلَى حُسْنِ التَّعَاوُنِ.",
        banglaPronunciation: "শুকরান লাকা ইয়া উস্তাদু আলা হুসনিত তাআউন।",
        banglaTranslation: "সুন্দর সহযোগিতার জন্য আপনাকে ধন্যবাদ হে উস্তাদ।",
      },
      {
        speaker: "عُمَرُ (উমর)",
        arabic: "اَلْكِتَابُ خَيْرُ جَلِيسٍ فِي الزَّمَانِ.",
        banglaPronunciation: "আল-কিতাবু খাইরু জালীসিন ফিয যামান।",
        banglaTranslation: "বই হলো যুগের সর্বশ্রেষ্ঠ সঙ্গী।",
      },
      {
        speaker: "زَيْدٌ (যায়েদ)",
        arabic: "نَعَمْ، هَيَّا نَبْدَأُ الْقِرَاءَةَ بِاسْمِ اللَّهِ.",
        banglaPronunciation: "নাআম, হাইয়া নাবদাউল কিরাআতা বিসমিল্লাহ।",
        banglaTranslation: "হ্যাঁ, চলো আল্লাহর নামে পড়া শুরু করি।",
      },
    ],
    listeningTaskBn: "পুরো সংলাপটি শুনুন এবং হরফে জার যুক্ত শব্দগুলো (إِلَى الْمَكْتَبَةِ, عَلَى الرَّفِّ) শনাক্ত করুন।",
    speakingTaskBn: "'اَلْكِتَابُ خَيْرُ جَلِيسٍ فِي الزَّمَانِ' বাক্যটি সুন্দর উচ্চারণে আবৃত্তি করুন।",
    writingTaskBn: "ফী (فِي) এবং আলা (عَلَى) ব্যবহার করে ২টি আরবি বাক্য লিখুন।",
    translationTaskBn: "বাংলায় অনুবাদ করুন: 'اَلْقِرَاءَةُ تُنَوِّرُ الْعَقْلَ وَتَزِيدُ الْمَعْرِفَةَ'",
    quiz: [
      {
        questionBn: "লাইব্রেরিয়ানের মতে নাহুর বইগুলো কোন তাকে রাখা আছে?",
        options: ["প্রথম তাকে", "তৃতীয় তাকে (الرَّفِّ الثَّالِثِ)", "পঞ্চম তাকে"],
        correctIndex: 1,
      },
    ],
  },
];
