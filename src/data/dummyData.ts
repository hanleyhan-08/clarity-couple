export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "partner";
  text: string;
  time: string;
}

export interface AnalysisResult {
  conflictScore: number;
  level: "Ringan" | "Tegang" | "Tinggi";
  summary: string;
  userPerspective: {
    feelings: string[];
    intention: string;
  };
  partnerPerspective: {
    feelings: string[];
    intention: string;
  };
  misinterpretation: string;
  patterns: {
    defensiveness: number;
    avoidance: number;
    escalation: number;
    recurringTopics: string[];
  };
  rootCauses: string[];
  rewrite: {
    original: string;
    suggestion: string;
  };
}

export const contacts: Contact[] = [
  { id: "1", name: "Sarah", avatar: "S", status: "online" },
  { id: "2", name: "Budi Pratama", avatar: "B", status: "offline", lastSeen: "5m lalu" },
  { id: "3", name: "Rina Amelia", avatar: "R", status: "offline", lastSeen: "1j lalu" },
  { id: "4", name: "Dani Saputra", avatar: "D", status: "online" },
  { id: "5", name: "Maya Putri", avatar: "M", status: "offline", lastSeen: "30m lalu" },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    { id: "1", sender: "user", text: "Kenapa kamu selalu sibuk sih?", time: "20:15" },
    { id: "2", sender: "partner", text: "Aku lagi banyak kerjaan, sayang", time: "20:17" },
    { id: "3", sender: "user", text: "Tapi kamu janji weekend ini kita ngobrol", time: "20:18" },
    { id: "4", sender: "partner", text: "Iya aku tahu, maaf ya", time: "20:20" },
    { id: "5", sender: "user", text: "Kamu selalu bilang maaf tapi gak berubah", time: "20:22" },
    { id: "6", sender: "partner", text: "Aku udah berusaha, kamu gak liat aja", time: "20:24" },
    { id: "7", sender: "user", text: "Berusaha apa? Aku ngerasa sendirian terus", time: "20:25" },
    { id: "8", sender: "partner", text: "Ya udah terserah kamu deh", time: "20:27" },
    { id: "9", sender: "user", text: "Tuh kan, kamu selalu kayak gitu", time: "20:28" },
    { id: "10", sender: "partner", text: "Aku capek debat mulu. Besok aja ya.", time: "20:30" },
  ],
  "2": [
    { id: "1", sender: "user", text: "Bud, besok jadi gak dinner?", time: "18:00" },
    { id: "2", sender: "partner", text: "Hmm kayaknya gak bisa deh", time: "18:15" },
    { id: "3", sender: "user", text: "Lagi? Ini udah ke-3 kalinya cancel", time: "18:16" },
    { id: "4", sender: "partner", text: "Maaf beb, deadline kantor", time: "18:20" },
    { id: "5", sender: "user", text: "Aku ngerti kerjaan penting, tapi aku juga penting kan?", time: "18:22" },
    { id: "6", sender: "partner", text: "Iya kamu penting, jangan gitu dong", time: "18:25" },
    { id: "7", sender: "user", text: "Terus kapan dong?", time: "18:26" },
    { id: "8", sender: "partner", text: "Weekend pasti ya. Janji.", time: "18:30" },
  ],
  "3": [
    { id: "1", sender: "partner", text: "Kamu tadi ngobrol sama siapa di cafe?", time: "14:00" },
    { id: "2", sender: "user", text: "Temen kantor, kenapa?", time: "14:05" },
    { id: "3", sender: "partner", text: "Kok gak cerita?", time: "14:06" },
    { id: "4", sender: "user", text: "Emang harus cerita semua?", time: "14:07" },
    { id: "5", sender: "partner", text: "Ya minimal bilang aja", time: "14:08" },
    { id: "6", sender: "user", text: "Oke deh nanti aku kabarin", time: "14:10" },
  ],
  "4": [
    { id: "1", sender: "user", text: "Gimana presentasinya tadi?", time: "19:00" },
    { id: "2", sender: "partner", text: "Lancar dong! Bos suka banget", time: "19:02" },
    { id: "3", sender: "user", text: "Yeay proud of you! 🎉", time: "19:03" },
    { id: "4", sender: "partner", text: "Makasih sayang, nanti aku ceritain detail ya", time: "19:05" },
  ],
  "5": [
    { id: "1", sender: "partner", text: "Kamu lupa ulang tahun mama aku ya?", time: "09:00" },
    { id: "2", sender: "user", text: "Astaga, iya aku lupa. Maaf banget", time: "09:10" },
    { id: "3", sender: "partner", text: "Ini penting buat aku loh", time: "09:11" },
    { id: "4", sender: "user", text: "Aku tahu, aku emang salah", time: "09:12" },
    { id: "5", sender: "partner", text: "Kadang aku ngerasa kamu gak peduli sama keluarga aku", time: "09:15" },
    { id: "6", sender: "user", text: "Jangan gitu dong, aku peduli. Aku cuma lupa", time: "09:16" },
    { id: "7", sender: "partner", text: "Lupa juga bentuk gak peduli", time: "09:18" },
  ],
};

export const analysisResults: Record<string, AnalysisResult> = {
  "1": {
    conflictScore: 65,
    level: "Tegang",
    summary: "Percakapan menunjukkan ketegangan akibat perbedaan ekspektasi waktu berkualitas. Partner merasa tidak diprioritaskan, sementara pasangan merasa sudah berusaha tapi tidak dihargai. Pola defensif terlihat jelas di akhir percakapan.",
    userPerspective: {
      feelings: ["Diabaikan", "Tidak diprioritaskan", "Kesepian"],
      intention: "Butuh perhatian dan waktu berkualitas bersama",
    },
    partnerPerspective: {
      feelings: ["Tertekan", "Kurang dihargai", "Lelah"],
      intention: "Sedang dalam tekanan kerja, butuh pengertian",
    },
    misinterpretation: '"Kenapa kamu selalu sibuk sih?" → ditafsir sebagai serangan personal, padahal ungkapan rindu dan butuh perhatian',
    patterns: {
      defensiveness: 72,
      avoidance: 58,
      escalation: 68,
      recurringTopics: ["Waktu berkualitas", "Prioritas hubungan", "Komunikasi kesibukan"],
    },
    rootCauses: ["Kebutuhan Validasi Emosional", "Ekspektasi Tidak Tersinkron", "Fear of Being Deprioritized"],
    rewrite: {
      original: "Kenapa kamu selalu sibuk sih?",
      suggestion: "Aku ngerti kamu lagi banyak kerjaan. Tapi aku kangen quality time kita. Bisa kita plan kapan bisa ngobrol santai?",
    },
  },
  "2": {
    conflictScore: 45,
    level: "Ringan",
    summary: "Ketegangan ringan akibat pembatalan rencana berulang. Kedua pihak masih berkomunikasi dengan cukup baik meski ada kekecewaan. Pola cancel yang berulang menjadi trigger utama.",
    userPerspective: {
      feelings: ["Kecewa", "Tidak diprioritaskan"],
      intention: "Ingin waktu bersama yang konsisten",
    },
    partnerPerspective: {
      feelings: ["Bersalah", "Tertekan kerja"],
      intention: "Ingin memenuhi janji tapi terhalang deadline",
    },
    misinterpretation: '"Lagi?" → ditafsir sebagai sindiran, padahal ekspresi kekecewaan yang valid',
    patterns: {
      defensiveness: 35,
      avoidance: 42,
      escalation: 28,
      recurringTopics: ["Pembatalan rencana", "Work-life balance", "Komitmen waktu"],
    },
    rootCauses: ["Prioritas Kerja vs Hubungan", "Pola Cancel Berulang", "Kurangnya Perencanaan Bersama"],
    rewrite: {
      original: "Ini udah ke-3 kalinya cancel",
      suggestion: "Aku paham deadline penting. Tapi aku udah excited banget soal dinner kita. Gimana kalau kita cari waktu yang pasti bisa buat kita berdua?",
    },
  },
  "5": {
    conflictScore: 78,
    level: "Tinggi",
    summary: "Konflik serius terkait perhatian terhadap keluarga pasangan. Lupa ulang tahun menjadi simbol dari masalah yang lebih dalam tentang perhatian dan prioritas dalam hubungan.",
    userPerspective: {
      feelings: ["Bersalah", "Defensif", "Dihakimi"],
      intention: "Mengakui kesalahan tapi merasa dihakimi berlebihan",
    },
    partnerPerspective: {
      feelings: ["Tidak dihargai", "Sedih", "Kecewa mendalam"],
      intention: "Ingin pasangan lebih peduli pada hal penting baginya",
    },
    misinterpretation: '"Aku cuma lupa" → ditafsir sebagai meremehkan pentingnya keluarga pasangan',
    patterns: {
      defensiveness: 60,
      avoidance: 30,
      escalation: 82,
      recurringTopics: ["Perhatian keluarga", "Bentuk kepedulian", "Prioritas emosional"],
    },
    rootCauses: ["Perbedaan Love Language", "Kurangnya Sistem Pengingat Bersama", "Makna Berbeda untuk Tindakan Kecil"],
    rewrite: {
      original: "Aku cuma lupa",
      suggestion: "Aku minta maaf, ini salah aku. Aku tahu ulang tahun mama kamu penting banget buat kamu. Boleh aku yang arrange surprise kecil buat mama hari ini?",
    },
  },
};

export const analysisMode = [
  {
    id: "conflict",
    icon: "🔍",
    title: "Analisis Konflik Terakhir",
    description: "Identifikasi masalah dari chat terbaru",
  },
  {
    id: "pattern",
    icon: "🧠",
    title: "Cari Pola Konflik",
    description: "Temukan pola berulang dari percakapan",
  },
  {
    id: "question",
    icon: "💬",
    title: "Tanya Pertanyaan Spesifik",
    description: "Custom question tentang chat ini",
  },
];

export const sampleQuestions = [
  "Kenapa konflik ini berulang?",
  "Siapa yang salah paham?",
  "Apa akar masalahnya?",
  "Bagaimana cara memperbaiki komunikasi?",
];
