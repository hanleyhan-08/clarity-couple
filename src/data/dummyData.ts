export interface Contact {
  id: string;
  name: string;
  initials: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  lastSeen: string | null;
  relationship: string;
  status: "online" | "offline";
}

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  read: boolean;
  sender: "user" | "partner";
}

export interface QuickReplyOption {
  text: string;
  reason: string;
}

export interface QuickReplyResult {
  calm: QuickReplyOption;
  firm: QuickReplyOption;
  empathetic: QuickReplyOption;
}

export interface ConflictAnalysisResult {
  score: number;
  level: string;
  summary: string;
  perspectives: {
    you: { feels: string[]; means: string };
    partner: { feels: string[]; means: string };
    misunderstanding: string;
  };
  patterns: {
    defensiveness: number;
    avoidance: number;
    escalation: number;
    repeatedTopics: string[];
  };
  rootCause: string[];
  betterResponse: { original: string; improved: string };
}

export interface PatternDetectionResult {
  mainPattern: string;
  frequency: string;
  triggers: string[];
  cycle: string;
  recommendation: string;
}

export interface FullAnalysis {
  quickReply: QuickReplyResult;
  conflictAnalysis: ConflictAnalysisResult;
  patternDetection: PatternDetectionResult;
}

// Legacy type for backward compat
export interface AnalysisResult {
  conflictScore: number;
  level: "Ringan" | "Tegang" | "Tinggi";
  summary: string;
  userPerspective: { feelings: string[]; intention: string };
  partnerPerspective: { feelings: string[]; intention: string };
  misinterpretation: string;
  patterns: { defensiveness: number; avoidance: number; escalation: number; recurringTopics: string[] };
  rootCauses: string[];
  rewrite: { original: string; suggestion: string };
}

export const contacts: Contact[] = [
  {
    id: "1", name: "Brigida Putri", initials: "BP", phone: "+62 812-3456-7890",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", lastMessage: "Aku ngerti kok maksud kamu...", time: "14:32",
    unread: 3, isOnline: true, lastSeen: null, relationship: "Pacar (2 tahun)", status: "online",
  },
  {
    id: "2", name: "Budi Santoso", initials: "BS", phone: "+62 813-9876-5432",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", lastMessage: "Maaf ya kalau aku kelewatan", time: "Yesterday",
    unread: 0, isOnline: false, lastSeen: "2 hours ago", relationship: "Pacar (6 bulan)", status: "offline",
  },
  {
    id: "3", name: "Rina Amelia", initials: "RA", phone: "+62 856-1234-8765",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", lastMessage: "Iya deh terserah kamu", time: "2 days ago",
    unread: 0, isOnline: false, lastSeen: "yesterday", relationship: "Pacar LDR (1 tahun)", status: "offline",
  },
  {
    id: "4", name: "Dimas Prakoso", initials: "DP", phone: "+62 821-5555-9999",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", lastMessage: "Kita perlu ngobrol serius", time: "Monday",
    unread: 1, isOnline: true, lastSeen: null, relationship: "Pacar (3 tahun)", status: "online",
  },
  {
    id: "5", name: "Ayu Lestari", initials: "AL", phone: "+62 878-4444-3333",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", lastMessage: "Makasih udah dengerin aku 💚", time: "09:20",
    unread: 0, isOnline: false, lastSeen: "1 hour ago", relationship: "Pacar (8 bulan)", status: "offline",
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    { id: "1", fromMe: false, sender: "partner", text: "Kamu kok jadi dingin banget sih akhir-akhir ini?", time: "14:10", read: true },
    { id: "2", fromMe: true, sender: "user", text: "Hah? Dingin gimana?", time: "14:12", read: true },
    { id: "3", fromMe: false, sender: "partner", text: "Ya gitu, kayak males bales chat aku", time: "14:13", read: true },
    { id: "4", fromMe: true, sender: "user", text: "Lagi banyak pikiran aja, sayang", time: "14:14", read: true },
    { id: "5", fromMe: false, sender: "partner", text: "Pikiran apa? Kok gak cerita ke aku?", time: "14:15", read: true },
    { id: "6", fromMe: true, sender: "user", text: "Kerjaan lagi banyak banget, deadline besok", time: "14:16", read: true },
    { id: "7", fromMe: false, sender: "partner", text: "Kamu selalu bilang gitu", time: "14:17", read: true },
    { id: "8", fromMe: true, sender: "user", text: "Emang beneran kok", time: "14:18", read: true },
    { id: "9", fromMe: false, sender: "partner", text: "Tapi weekend kemarin kita janjian kamu malah bilang capek", time: "14:19", read: true },
    { id: "10", fromMe: true, sender: "user", text: "Iya emang lagi capek banget", time: "14:20", read: true },
    { id: "11", fromMe: false, sender: "partner", text: "Capek atau emang udah gak mau effort buat hubungan ini?", time: "14:22", read: true },
    { id: "12", fromMe: true, sender: "user", text: "Brigida please jangan gini dulu", time: "14:23", read: true },
    { id: "13", fromMe: false, sender: "partner", text: "Gini gimana? Aku cuma nanya", time: "14:24", read: true },
    { id: "14", fromMe: true, sender: "user", text: "Aku udah bilang lagi banyak kerjaan", time: "14:25", read: true },
    { id: "15", fromMe: false, sender: "partner", text: "Terus aku harus gimana? Diem aja?", time: "14:26", read: true },
    { id: "16", fromMe: true, sender: "user", text: "Bukan gitu maksud aku", time: "14:27", read: true },
    { id: "17", fromMe: false, sender: "partner", text: "Terus apa? Kasih solusi dong", time: "14:28", read: true },
    { id: "18", fromMe: true, sender: "user", text: "Weekend depan kita ketemuan ya? Aku janji", time: "14:29", read: true },
    { id: "19", fromMe: false, sender: "partner", text: "Kamu juga janji minggu lalu", time: "14:30", read: true },
    { id: "20", fromMe: true, sender: "user", text: "Kali ini beneran, aku cancel semua rencana lain", time: "14:31", read: true },
    { id: "21", fromMe: false, sender: "partner", text: "Aku ngerti kok maksud kamu...", time: "14:32", read: false },
  ],
  "2": [
    { id: "1", fromMe: true, sender: "user", text: "Bud, tadi ulang tahun mama kamu kan?", time: "19:15", read: true },
    { id: "2", fromMe: false, sender: "partner", text: "Iya nih, tadi siang makan bareng keluarga", time: "19:30", read: true },
    { id: "3", fromMe: true, sender: "user", text: "Kok gak ngajak aku? Kamu bilang mau ajak kemarin", time: "19:32", read: true },
    { id: "4", fromMe: false, sender: "partner", text: "Oh iya ya, aku lupa bilang ke kamu", time: "19:35", read: true },
    { id: "5", fromMe: true, sender: "user", text: "Lupa? Budi ini udah kedua kalinya", time: "19:36", read: true },
    { id: "6", fromMe: false, sender: "partner", text: "Maaf deh, banyak urusan soalnya", time: "19:40", read: true },
    { id: "7", fromMe: true, sender: "user", text: "Urusan apa sih yang bikin kamu lupa terus sama aku?", time: "19:42", read: true },
    { id: "8", fromMe: false, sender: "partner", text: "Jangan gitu dong", time: "19:45", read: true },
    { id: "9", fromMe: true, sender: "user", text: "Aku serius Bud, ini nyakitin aku", time: "19:46", read: true },
    { id: "10", fromMe: false, sender: "partner", text: "Maaf ya kalau aku kelewatan", time: "19:50", read: true },
  ],
  "3": [
    { id: "1", fromMe: false, sender: "partner", text: "Kamu sibuk ya hari ini?", time: "10:30", read: true },
    { id: "2", fromMe: true, sender: "user", text: "Lumayan sih, ada meeting siang", time: "12:45", read: true },
    { id: "3", fromMe: false, sender: "partner", text: "Oh... oke deh", time: "12:46", read: true },
    { id: "4", fromMe: true, sender: "user", text: "Kenapa emangnya?", time: "13:15", read: true },
    { id: "5", fromMe: false, sender: "partner", text: "Gak apa-apa kok", time: "13:16", read: true },
    { id: "6", fromMe: true, sender: "user", text: "Rin, jangan gini dong. Ada apa?", time: "13:20", read: true },
    { id: "7", fromMe: false, sender: "partner", text: "Aku cuma pengen video call aja, tapi kamu sibuk", time: "13:25", read: true },
    { id: "8", fromMe: true, sender: "user", text: "Malem bisa kok, sekarang lagi kerja", time: "13:26", read: true },
    { id: "9", fromMe: false, sender: "partner", text: "Selalu gitu jawabannya", time: "13:27", read: true },
    { id: "10", fromMe: true, sender: "user", text: "Maksud kamu?", time: "13:30", read: true },
    { id: "11", fromMe: false, sender: "partner", text: "Udah lah lupain", time: "13:31", read: true },
    { id: "12", fromMe: true, sender: "user", text: "Rin please, aku bingung kenapa kamu marah", time: "13:35", read: true },
    { id: "13", fromMe: false, sender: "partner", text: "Iya deh terserah kamu", time: "13:40", read: true },
  ],
  "4": [
    { id: "1", fromMe: false, sender: "partner", text: "Kenapa kamu gak pernah cerita soal temen kantor yang baru?", time: "20:15", read: true },
    { id: "2", fromMe: true, sender: "user", text: "Temen kantor yang mana?", time: "20:17", read: true },
    { id: "3", fromMe: false, sender: "partner", text: "Yang kamu sering lunch bareng itu", time: "20:18", read: true },
    { id: "4", fromMe: true, sender: "user", text: "Oh si Maya? Emang kenapa?", time: "20:20", read: true },
    { id: "5", fromMe: false, sender: "partner", text: "Kamu gak merasa perlu kasih tau aku?", time: "20:22", read: true },
    { id: "6", fromMe: true, sender: "user", text: "Dia temen biasa aja, Dim", time: "20:23", read: true },
    { id: "7", fromMe: false, sender: "partner", text: "Tapi kok sering banget?", time: "20:24", read: true },
    { id: "8", fromMe: true, sender: "user", text: "Kamu stalking aku ya?", time: "20:25", read: true },
    { id: "9", fromMe: false, sender: "partner", text: "Bukan stalking, aku liat story kamu", time: "20:26", read: true },
    { id: "10", fromMe: true, sender: "user", text: "Dimas, kamu overthinking deh", time: "20:28", read: true },
    { id: "11", fromMe: false, sender: "partner", text: "Atau kamu yang gak transparent?", time: "20:30", read: true },
    { id: "12", fromMe: true, sender: "user", text: "Serius deh, ini temen kantor biasa", time: "20:32", read: true },
    { id: "13", fromMe: false, sender: "partner", text: "Kita perlu ngobrol serius", time: "20:35", read: false },
  ],
  "5": [
    { id: "1", fromMe: false, sender: "partner", text: "Sayang, aku lagi sedih banget hari ini", time: "08:30", read: true },
    { id: "2", fromMe: true, sender: "user", text: "Ada apa, Ayu? Cerita dong", time: "08:32", read: true },
    { id: "3", fromMe: false, sender: "partner", text: "Tadi pagi berantem sama mamah gara-gara masalah kerja", time: "08:33", read: true },
    { id: "4", fromMe: true, sender: "user", text: "Mamah marah kenapa?", time: "08:35", read: true },
    { id: "5", fromMe: false, sender: "partner", text: "Dia bilang aku harus cari kerja yang lebih \"proper\"", time: "08:36", read: true },
    { id: "6", fromMe: true, sender: "user", text: "Padahal kamu kan suka sama kerjaan sekarang", time: "08:38", read: true },
    { id: "7", fromMe: false, sender: "partner", text: "Iya tapi mamah gak ngerti. Dia nganggap kerjaan aku main-main", time: "08:40", read: true },
    { id: "8", fromMe: true, sender: "user", text: "Kamu udah coba jelasin?", time: "08:42", read: true },
    { id: "9", fromMe: false, sender: "partner", text: "Udah tapi dia tetep gak mau dengerin", time: "08:43", read: true },
    { id: "10", fromMe: true, sender: "user", text: "Sabar ya sayang. Kamu tahu kok yang terbaik buat kamu", time: "08:45", read: true },
    { id: "11", fromMe: false, sender: "partner", text: "Iya sih... tapi kadang aku juga ragu", time: "08:47", read: true },
    { id: "12", fromMe: true, sender: "user", text: "Ragu kenapa? Kamu passionate sama kerjaan kamu kan?", time: "08:50", read: true },
    { id: "13", fromMe: false, sender: "partner", text: "Iya tapi takut mamah benar juga...", time: "08:52", read: true },
    { id: "14", fromMe: true, sender: "user", text: "Ayu, jangan overthink dulu. Fokus ke apa yang bikin kamu happy", time: "08:55", read: true },
    { id: "15", fromMe: false, sender: "partner", text: "Makasih udah dengerin aku 💚", time: "09:20", read: true },
  ],
};

export const dummyAnalysis: Record<string, FullAnalysis> = {
  "1": {
    quickReply: {
      calm: {
        text: "Sayang, aku paham kamu merasa diabaikan. Minggu ini memang lagi overwhelm, tapi bukan berarti aku gak peduli sama kita. Gimana kalau weekend depan kita quality time bareng? Aku janji bakal fokus full sama kamu.",
        reason: "Mengakui perasaan Brigida tanpa defensif, plus kasih solusi konkret"
      },
      firm: {
        text: "Brigida, aku ngerti kamu kecewa. Tapi aku butuh kamu percaya kalau aku lagi beneran struggle. Bukan aku gak mau effort, tapi aku lagi gak bisa 100%. Bisa gak kita supportan dulu sampai deadline ini kelar?",
        reason: "Tegas tapi tetap vulnerable, minta dukungan dengan jujur"
      },
      empathetic: {
        text: "Aku minta maaf kalau kamu ngerasa aku distant. Pasti kamu lonely ya minggu ini? Aku janji setelah deadline besok, kita video call lama dan aku dengerin semua cerita kamu. I love you.",
        reason: "Fokus ke perasaan Brigida, validasi emosi, plus komitmen jelas"
      }
    },
    conflictAnalysis: {
      score: 68, level: "medium",
      summary: "Terjadi ketegangan karena ekspektasi waktu berkualitas yang tidak terpenuhi. Brigida merasa diabaikan, sementara partner merasa tertekan dengan pekerjaan. Komunikasi menjadi defensif di kedua sisi.",
      perspectives: {
        you: { feels: ["Tertekan dengan deadline", "Merasa tidak dimengerti", "Butuh space"], means: "Bukan tidak peduli, tapi sedang overwhelmed dan butuh fokus sementara" },
        partner: { feels: ["Diabaikan", "Tidak diprioritaskan", "Khawatir hubungan melemah"], means: "Bukan mau menyerang, tapi butuh reassurance dan quality time" },
        misunderstanding: "\"Lagi banyak kerjaan\" ditafsir sebagai \"Kamu bukan prioritas aku\""
      },
      patterns: { defensiveness: 72, avoidance: 45, escalation: 68, repeatedTopics: ["Quality time", "Work-life balance", "Feeling neglected"] },
      rootCause: ["Kebutuhan validasi emosional tidak terpenuhi", "Ekspektasi komunikasi yang berbeda saat sibuk", "Fear of being deprioritized"],
      betterResponse: { original: "Aku udah bilang lagi banyak kerjaan", improved: "Aku ngerti kamu kangen quality time kita. Deadline aku besok, habis itu aku janji kita weekend together okay? Gimana?" }
    },
    patternDetection: {
      mainPattern: "Conflict Avoidance yang berujung Passive Escalation",
      frequency: "Pola serupa terjadi 3x dalam 2 bulan terakhir",
      triggers: ["Periode kerja intensif", "Weekend plans yang gagal", "Komunikasi yang berkurang"],
      cycle: "1. Partner sibuk → 2. Brigida merasa neglected → 3. Brigida questioning → 4. Partner defensif → 5. Konflik meningkat",
      recommendation: "Set ekspektasi jelas di awal periode sibuk + scheduled quality time meski singkat"
    }
  },
  "2": {
    quickReply: {
      calm: {
        text: "Bud, aku serius ya. Ini bukan soal lupa sekali dua kali, tapi soal aku merasa gak penting dalam hidup kamu. Bisa gak kita ngobrol serius soal ini?",
        reason: "Tenang tapi tegas, fokus ke dampak emosional bukan blame"
      },
      firm: {
        text: "Budi, 'maaf' tanpa perubahan itu meaningless. Aku butuh kamu show up buat aku, bukan cuma bilang maaf terus. Kapan kamu bisa ambil tanggung jawab serius?",
        reason: "Tegas minta akuntabilitas, tidak menerima apology kosong"
      },
      empathetic: {
        text: "Aku tahu kamu gak sengaja, tapi ini nyakitin aku Bud. Aku pengen ikut jadi bagian dari hidup kamu, terutama momen penting. Bisa kita cari solusi bareng?",
        reason: "Ekspresikan hurt tapi tetap collaborative"
      }
    },
    conflictAnalysis: {
      score: 74, level: "high",
      summary: "Konflik berulang akibat partner yang konsisten lupa melibatkan pasangan dalam acara keluarga. Ini menciptakan perasaan tidak dihargai dan dipertanyakan keseriusan hubungan.",
      perspectives: {
        you: { feels: ["Tidak dihargai", "Diabaikan", "Mempertanyakan keseriusan hubungan"], means: "Ingin diakui sebagai bagian penting dari hidup partner" },
        partner: { feels: ["Kewalahan dengan banyak urusan", "Tidak berniat menyakiti"], means: "Bukan sengaja mengabaikan, tapi kurang mindful dengan perasaan pasangan" },
        misunderstanding: "\"Lupa\" ditafsir sebagai \"Kamu gak penting buat aku\""
      },
      patterns: { defensiveness: 82, avoidance: 78, escalation: 74, repeatedTopics: ["Being included", "Feeling valued", "Empty apologies"] },
      rootCause: ["Lack of integration dalam kehidupan partner", "Pattern of minimization (bilang \"maaf\" tanpa action)", "Possible commitment issues"],
      betterResponse: { original: "Maaf ya kalau aku kelewatan", improved: "Aku minta maaf banget. Aku ngerti ini kedua kalinya dan pasti kamu kecewa. Mulai sekarang aku bakal set reminder untuk acara penting dan pastiin kamu included. Deal?" }
    },
    patternDetection: {
      mainPattern: "Repeated Forgetfulness → Empty Apologies → No Real Change",
      frequency: "Kejadian serupa 2x dalam 3 bulan, pola konsisten",
      triggers: ["Family events", "Social gatherings", "Important dates"],
      cycle: "1. Acara keluarga → 2. Partner lupa ajak → 3. Konflik → 4. Apology → 5. No follow-through → 6. Repeat",
      recommendation: "Butuh serious conversation tentang commitment level + concrete action plan (reminder, calendar sharing, dll)"
    }
  },
  "3": {
    quickReply: {
      calm: {
        text: "Rin, aku notice kamu lagi gak oke. Aku gak bisa baca pikiran kamu kalau kamu gak bilang. Boleh gak kamu jelasin apa yang sebenarnya kamu rasain?",
        reason: "Calm tapi proactive, ajak komunikasi terbuka"
      },
      firm: {
        text: "Rina, kalau kamu bilang 'gak apa-apa' padahal ada masalah, itu bikin aku bingung dan frustrated. Kita gak bisa solve masalah kalau kamu gak mau ngomong. Please be honest sama aku.",
        reason: "Tegas tolak passive aggression, minta direct communication"
      },
      empathetic: {
        text: "Sayang, aku feeling kamu lagi upset tapi gak mau bilang. LDR udah susah, jangan makin susah dengan silent treatment. Aku di sini ready dengerin kamu kok. Mau cerita?",
        reason: "Empati dengan kesulitan LDR, buka safe space"
      }
    },
    conflictAnalysis: {
      score: 71, level: "high",
      summary: "Komunikasi passive-aggressive dalam hubungan LDR. Rina merasa lonely dan butuh attention, tapi mengekspresikannya dengan indirect language yang bikin partner bingung dan frustrated.",
      perspectives: {
        you: { feels: ["Bingung", "Frustrated dengan indirect communication", "Helpless"], means: "Ingin bantu tapi tidak tahu masalah sebenarnya" },
        partner: { feels: ["Lonely", "Butuh perhatian", "Takut jadi needy"], means: "Ingin quality time tapi takut terlihat demanding" },
        misunderstanding: "\"Gak apa-apa kok\" sebenarnya artinya \"Aku sedih tapi gak mau admit\""
      },
      patterns: { defensiveness: 58, avoidance: 85, escalation: 71, repeatedTopics: ["Quality time", "Work priority", "Feeling neglected"] },
      rootCause: ["LDR loneliness yang tidak tervalidasi", "Fear of being \"too needy\"", "Ekspektasi komunikasi yang tidak aligned"],
      betterResponse: { original: "Maksud kamu?", improved: "Rin, aku notice kamu bilang \"selalu gitu jawabannya\". Apa aku kurang ngasih waktu buat kamu? Talk to me please, aku pengen ngerti." }
    },
    patternDetection: {
      mainPattern: "Passive-Aggressive Communication dalam LDR",
      frequency: "Terjadi hampir setiap minggu",
      triggers: ["Partner sibuk kerja", "Cancelled plans", "Delayed responses"],
      cycle: "1. Rina butuh attention → 2. Subtle hints → 3. Partner tidak tangkap → 4. Rina frustrated → 5. Silent treatment → 6. Konflik",
      recommendation: "Schedule regular video calls + teach direct communication (\"Aku kangen kamu\" instead of \"Gak apa-apa kok\")"
    }
  },
  "4": {
    quickReply: {
      calm: {
        text: "Dim, aku ngerti kamu khawatir. Tapi Maya itu beneran cuma temen kantor. Gimana kalau kapan-kapan kamu ikut lunch bareng kami biar kamu kenal dia juga? I have nothing to hide.",
        reason: "Transparansi penuh + solusi konkret untuk bangun trust"
      },
      firm: {
        text: "Dimas, aku butuh trust dari kamu. Aku gak bisa hidup dengan constantly dipertanyakan. Kalau kamu gak percaya, that's a bigger problem yang kita harus selesaiin.",
        reason: "Tegas set boundaries, gak accept constant suspicion"
      },
      empathetic: {
        text: "Aku paham kamu insecure, tapi aku ada di sini sama kamu selama 3 tahun. Maya gak ada apa-apanya dibanding kamu. What can I do to make you feel more secure?",
        reason: "Validasi insecurity + reassurance + ajak collaborate"
      }
    },
    conflictAnalysis: {
      score: 76, level: "high",
      summary: "Trust issue yang dipicu oleh lack of communication tentang friendship baru. Dimas merasa tidak diinformasikan dan menjadi suspicious, sementara partner merasa dicurigai tanpa alasan.",
      perspectives: {
        you: { feels: ["Dicurigai", "Tidak dipercaya", "Defensive"], means: "Tidak ada yang disembunyikan, Maya benar-benar teman biasa" },
        partner: { feels: ["Insecure", "Worried", "Butuh reassurance"], means: "Tidak melarang berteman, tapi butuh transparency dan rasa aman" },
        misunderstanding: "\"Temen biasa\" ditafsir sebagai minimization, \"Kamu overthinking\" ditafsir sebagai gaslighting"
      },
      patterns: { defensiveness: 78, avoidance: 52, escalation: 76, repeatedTopics: ["Transparency", "Opposite-sex friendships", "Trust"] },
      rootCause: ["Komunikasi tentang friendship boundaries yang kurang jelas", "Possible past trust wounds", "Insecurity dalam hubungan"],
      betterResponse: { original: "Dimas, kamu overthinking deh", improved: "Aku minta maaf kalau aku gak update kamu soal Maya. Aku gak sadar itu penting buat kamu. Next time aku bakal lebih update ya. Maya itu temen kantor yang helpful banget, nothing more." }
    },
    patternDetection: {
      mainPattern: "Transparency Issues → Suspicion → Defensive Response → Escalation",
      frequency: "Pertama kali muncul explicit, tapi underlying trust issue mungkin lebih lama",
      triggers: ["New friendships (especially opposite sex)", "Social media posts", "Time spent outside relationship"],
      cycle: "1. New social connection → 2. Lack of disclosure → 3. Partner discovers → 4. Suspicion → 5. Defensive response → 6. Trust erodes",
      recommendation: "Set clear boundaries + regular \"relationship check-ins\" + transparency about new friendships"
    }
  },
  "5": {
    quickReply: {
      calm: {
        text: "Sayang, keputusan akhirnya tetap di kamu ya. Tapi aku percaya sama judgment kamu. Kamu yang paling tahu apa yang terbaik buat hidup kamu. Aku support apapun keputusan kamu.",
        reason: "Supportive without being pushy, empower Ayu's autonomy"
      },
      firm: {
        text: "Ayu, jangan biarkan opinion orang lain (even your mom) override what makes you happy. Kamu punya right untuk pursue passion kamu. Stand firm on your choice.",
        reason: "Encourage her to be assertive and confident"
      },
      empathetic: {
        text: "Aku ngerti banget dilema kamu. Pengen bikin mama happy tapi juga gak mau sacrifice passion kamu. It's not easy. Tapi remember, this is YOUR life. Mama akan ngerti eventually. I'm here for you.",
        reason: "Deep empathy untuk internal conflict, plus reassurance"
      }
    },
    conflictAnalysis: {
      score: 32, level: "low",
      summary: "Ini bukan konflik antar pasangan, tapi partner yang sedang butuh emotional support tentang masalah eksternal (konflik dengan orangtua). Komunikasi sehat dan supportive.",
      perspectives: {
        you: { feels: ["Empathetic", "Supportive", "Protective"], means: "Ingin membantu Ayu merasa lebih baik dan confident dengan keputusannya" },
        partner: { feels: ["Confused", "Pressured", "Butuh validation"], means: "Butuh safe space untuk express doubts tanpa judgment" },
        misunderstanding: "Tidak ada salah tafsir signifikan — komunikasi sangat sehat"
      },
      patterns: { defensiveness: 15, avoidance: 20, escalation: 10, repeatedTopics: ["Career choices", "Family expectations", "Self-doubt"] },
      rootCause: ["External pressure (bukan masalah hubungan)", "Normal self-doubt phase", "Need for validation"],
      betterResponse: { original: "Ayu, jangan overthink dulu. Fokus ke apa yang bikin kamu happy", improved: "Ayu, aku lihat kamu passionate banget sama kerjaan kamu. Mama mungkin belum ngerti sekarang, tapi eventually dia akan proud sama kamu. Keep doing what you love." }
    },
    patternDetection: {
      mainPattern: "Healthy Support Pattern — No Red Flags",
      frequency: "Ayu sering sharing personal struggles, kamu konsisten supportive",
      triggers: ["External stressors (family, work)", "Decision-making moments", "Self-doubt episodes"],
      cycle: "1. Ayu stressed → 2. Share dengan kamu → 3. Kamu listen & support → 4. Ayu merasa better → 5. Gratitude",
      recommendation: "Keep doing what you're doing! Ini contoh komunikasi yang sehat. Maybe help Ayu develop coping strategies untuk family pressure."
    }
  },
};

// Legacy mapping
export const analysisResults: Record<string, AnalysisResult> = Object.fromEntries(
  Object.entries(dummyAnalysis).map(([id, a]) => [id, {
    conflictScore: a.conflictAnalysis.score,
    level: (a.conflictAnalysis.score <= 40 ? "Ringan" : a.conflictAnalysis.score <= 65 ? "Tegang" : "Tinggi") as AnalysisResult["level"],
    summary: a.conflictAnalysis.summary,
    userPerspective: { feelings: a.conflictAnalysis.perspectives.you.feels, intention: a.conflictAnalysis.perspectives.you.means },
    partnerPerspective: { feelings: a.conflictAnalysis.perspectives.partner.feels, intention: a.conflictAnalysis.perspectives.partner.means },
    misinterpretation: a.conflictAnalysis.perspectives.misunderstanding,
    patterns: {
      defensiveness: a.conflictAnalysis.patterns.defensiveness,
      avoidance: a.conflictAnalysis.patterns.avoidance,
      escalation: a.conflictAnalysis.patterns.escalation,
      recurringTopics: a.conflictAnalysis.patterns.repeatedTopics,
    },
    rootCauses: a.conflictAnalysis.rootCause,
    rewrite: { original: a.conflictAnalysis.betterResponse.original, suggestion: a.conflictAnalysis.betterResponse.improved },
  }])
);

export const analysisMode = [
  { id: "quick-reply", icon: "💬", title: "Apa yang Harus Saya Balas Sekarang?", description: "Dapatkan 3 opsi balasan siap pakai", badge: "BARU" },
  { id: "conflict", icon: "🔍", title: "Analisis Konflik Terakhir", description: "Identifikasi masalah dari chat terbaru", badge: "POPULER" },
  { id: "pattern", icon: "🧠", title: "Cari Pola Konflik", description: "Temukan pola berulang dari percakapan" },
  { id: "question", icon: "❓", title: "Tanya Pertanyaan Spesifik", description: "Custom question tentang chat ini" },
];

export const sampleQuestions = [
  "Kenapa konflik ini berulang?",
  "Siapa yang salah paham?",
  "Apa akar masalahnya?",
  "Bagaimana cara memperbaiki komunikasi?",
];
