import brigidaAvatar from "@/assets/my****.png";

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
  date?: string; // YYYY-MM-DD
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

export interface SpecificQuestionResult {
  question: string;
  answer: string;
}

export interface FullAnalysis {
  quickReply: QuickReplyResult;
  conflictAnalysis: ConflictAnalysisResult;
  patternDetection: PatternDetectionResult;
  specificQuestions: SpecificQuestionResult[];
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
    avatar: brigidaAvatar, lastMessage: "Aku ngerti kok maksud kamu...", time: "14:32",
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
    // Minggu, 2 Feb
    { id: "1-1", fromMe: true, sender: "user", text: "Selamat pagi sayang ☀️ hari ini jadi jalan kan?", time: "09:00", date: "2025-02-02", read: true },
    { id: "1-2", fromMe: false, sender: "partner", text: "Pagi sayang :) insyaallah jadi", time: "09:15", date: "2025-02-02", read: true },
    { id: "1-3", fromMe: true, sender: "user", text: "Insyaallah itu artinya jadi atau enggak? 😅", time: "09:30", date: "2025-02-02", read: true },
    { id: "1-4", fromMe: false, sender: "partner", text: "Jadi kok, tenang dulu. Aku mau beresin sesuatu bentar", time: "09:45", date: "2025-02-02", read: true },
    { id: "1-5", fromMe: true, sender: "user", text: "Udah 1,5 jam nih, masih bentar?", time: "11:00", date: "2025-02-02", read: true },
    { id: "1-6", fromMe: false, sender: "partner", text: "Sorry ada kerjaan mendadak dari kantor", time: "11:10", date: "2025-02-02", read: true },
    { id: "1-7", fromMe: true, sender: "user", text: "Kerjaan lagi kerjaan lagi", time: "11:15", date: "2025-02-02", read: true },
    { id: "1-8", fromMe: false, sender: "partner", text: "Aku gak bisa nolak sayang, ini urgent", time: "11:20", date: "2025-02-02", read: true },
    { id: "1-9", fromMe: true, sender: "user", text: "Ya udah. Gak apa-apa kok", time: "11:25", date: "2025-02-02", read: true },
    { id: "1-10", fromMe: false, sender: "partner", text: "Gimana kalau kita ganti besok?", time: "14:00", date: "2025-02-02", read: true },
    { id: "1-11", fromMe: true, sender: "user", text: "Besok aku ada acara keluarga", time: "14:05", date: "2025-02-02", read: true },
    { id: "1-12", fromMe: false, sender: "partner", text: "Oh oke. Weekend depan kita ganti ya, janji!", time: "14:10", date: "2025-02-02", read: true },
    { id: "1-13", fromMe: true, sender: "user", text: "Okay 👍", time: "14:15", date: "2025-02-02", read: true },

    // Senin, 3 Feb
    { id: "1-14", fromMe: false, sender: "partner", text: "Pagi sayang, maaf soal kemarin ya", time: "08:30", date: "2025-02-03", read: true },
    { id: "1-15", fromMe: true, sender: "user", text: "Udah lupa kok", time: "08:45", date: "2025-02-03", read: true },
    { id: "1-16", fromMe: false, sender: "partner", text: "Beneran? Aku khawatir kamu masih kecewa", time: "08:50", date: "2025-02-03", read: true },
    { id: "1-17", fromMe: true, sender: "user", text: "Gak kok, santai aja", time: "09:00", date: "2025-02-03", read: true },
    { id: "1-18", fromMe: true, sender: "user", text: "Makan siang udah?", time: "12:30", date: "2025-02-03", read: true },
    { id: "1-19", fromMe: false, sender: "partner", text: "Belum sempat, lagi rapat", time: "12:45", date: "2025-02-03", read: true },
    { id: "1-20", fromMe: true, sender: "user", text: "Rapat terus ya kamu", time: "12:50", date: "2025-02-03", read: true },
    { id: "1-21", fromMe: false, sender: "partner", text: "Iya lagi masa sibuk di kantor", time: "13:00", date: "2025-02-03", read: true },
    { id: "1-22", fromMe: true, sender: "user", text: "Oh okay", time: "13:05", date: "2025-02-03", read: true },
    { id: "1-23", fromMe: true, sender: "user", text: "Udah pulang?", time: "20:00", date: "2025-02-03", read: true },
    { id: "1-24", fromMe: false, sender: "partner", text: "Baru sampai rumah, capek banget", time: "20:30", date: "2025-02-03", read: true },
    { id: "1-25", fromMe: true, sender: "user", text: "Istirahat dulu ya", time: "20:35", date: "2025-02-03", read: true },
    { id: "1-26", fromMe: false, sender: "partner", text: "Iya makasih sayang ❤️", time: "20:40", date: "2025-02-03", read: true },

    // Selasa, 4 Feb
    { id: "1-27", fromMe: true, sender: "user", text: "Pagi! Hari ini gimana kira-kira?", time: "07:00", date: "2025-02-04", read: true },
    { id: "1-28", fromMe: false, sender: "partner", text: "Pagi. Kayaknya hari ini juga lumayan padat", time: "07:15", date: "2025-02-04", read: true },
    { id: "1-29", fromMe: true, sender: "user", text: "Oh gitu ya", time: "07:20", date: "2025-02-04", read: true },
    { id: "1-30", fromMe: false, sender: "partner", text: "Kenapa?", time: "07:25", date: "2025-02-04", read: true },
    { id: "1-31", fromMe: true, sender: "user", text: "Gak apa-apa kok", time: "07:30", date: "2025-02-04", read: true },
    { id: "1-32", fromMe: true, sender: "user", text: "Lunch sama siapa hari ini?", time: "12:00", date: "2025-02-04", read: true },
    { id: "1-33", fromMe: false, sender: "partner", text: "Makan di meja, sambil kerja", time: "12:30", date: "2025-02-04", read: true },
    { id: "1-34", fromMe: true, sender: "user", text: "Kamu harus istirahat loh", time: "12:35", date: "2025-02-04", read: true },
    { id: "1-35", fromMe: false, sender: "partner", text: "Iya nanti. Masih ngejar deadline", time: "12:40", date: "2025-02-04", read: true },
    { id: "1-36", fromMe: false, sender: "partner", text: "Kamu baik-baik aja?", time: "19:00", date: "2025-02-04", read: true },
    { id: "1-37", fromMe: true, sender: "user", text: "Iya baik. Kamu gimana?", time: "19:10", date: "2025-02-04", read: true },
    { id: "1-38", fromMe: false, sender: "partner", text: "Lumayan. Deadline satu kelar", time: "19:15", date: "2025-02-04", read: true },
    { id: "1-39", fromMe: true, sender: "user", text: "Bagus dong", time: "19:20", date: "2025-02-04", read: true },
    { id: "1-40", fromMe: true, sender: "user", text: "Kok kayak datar gitu?", time: "19:25", date: "2025-02-04", read: true },
    { id: "1-41", fromMe: false, sender: "partner", text: "Maksudnya?", time: "19:30", date: "2025-02-04", read: true },
    { id: "1-42", fromMe: true, sender: "user", text: "Kayak kamu lagi gak oke", time: "19:35", date: "2025-02-04", read: true },
    { id: "1-43", fromMe: false, sender: "partner", text: "Gak kok, aku okey", time: "19:40", date: "2025-02-04", read: true },

    // Rabu, 5 Feb
    { id: "1-44", fromMe: false, sender: "partner", text: "Selamat pagi Brig 😊", time: "08:00", date: "2025-02-05", read: true },
    { id: "1-45", fromMe: true, sender: "user", text: "Pagi", time: "08:15", date: "2025-02-05", read: true },
    { id: "1-46", fromMe: false, sender: "partner", text: "Kamu hari ini ada rencana apa?", time: "08:20", date: "2025-02-05", read: true },
    { id: "1-47", fromMe: true, sender: "user", text: "Biasa aja. Kamu?", time: "08:30", date: "2025-02-05", read: true },
    { id: "1-48", fromMe: false, sender: "partner", text: "Ada meeting pagi sampai siang", time: "08:35", date: "2025-02-05", read: true },
    { id: "1-49", fromMe: true, sender: "user", text: "Oh okay", time: "08:40", date: "2025-02-05", read: true },
    { id: "1-50", fromMe: true, sender: "user", text: "Kamu udah selesai meeting?", time: "18:00", date: "2025-02-05", read: true },
    { id: "1-51", fromMe: false, sender: "partner", text: "Baru kelar, panjang banget meetingnya", time: "18:30", date: "2025-02-05", read: true },
    { id: "1-52", fromMe: true, sender: "user", text: "Kamu pernah gak sih mikirin kita?", time: "18:35", date: "2025-02-05", read: true },
    { id: "1-53", fromMe: false, sender: "partner", text: "Maksudnya?", time: "18:40", date: "2025-02-05", read: true },
    { id: "1-54", fromMe: true, sender: "user", text: "Ya, di tengah-tengah kesibukan kamu itu", time: "18:45", date: "2025-02-05", read: true },
    { id: "1-55", fromMe: false, sender: "partner", text: "Ya pasti mikirin dong sayang", time: "18:50", date: "2025-02-05", read: true },
    { id: "1-56", fromMe: true, sender: "user", text: "Buktinya apa?", time: "18:55", date: "2025-02-05", read: true },
    { id: "1-57", fromMe: false, sender: "partner", text: "Aku selalu balas chat kamu kok", time: "19:00", date: "2025-02-05", read: true },
    { id: "1-58", fromMe: true, sender: "user", text: "Balas chat doang bukan bukti perhatian", time: "19:05", date: "2025-02-05", read: true },
    { id: "1-59", fromMe: true, sender: "user", text: "Brigida...", time: "19:10", date: "2025-02-05", read: true },
    { id: "1-60", fromMe: false, sender: "partner", text: "Lupain deh, aku capek ngomongin ini", time: "19:15", date: "2025-02-05", read: true },

    // Kamis, 6 Feb
    { id: "1-61", fromMe: true, sender: "user", text: "Brig, soal kemarin, maaf ya kalau aku kurang perhatian", time: "09:00", date: "2025-02-06", read: true },
    { id: "1-62", fromMe: false, sender: "partner", text: "Iya", time: "09:30", date: "2025-02-06", read: true },
    { id: "1-63", fromMe: true, sender: "user", text: "Cuma \"iya\"?", time: "09:35", date: "2025-02-06", read: true },
    { id: "1-64", fromMe: false, sender: "partner", text: "Emang mau aku jawab apa?", time: "09:40", date: "2025-02-06", read: true },
    { id: "1-65", fromMe: true, sender: "user", text: "Aku serius minta maaf Brig", time: "09:45", date: "2025-02-06", read: true },
    { id: "1-66", fromMe: false, sender: "partner", text: "Aku tau. Tapi maaf aja gak cukup", time: "09:50", date: "2025-02-06", read: true },
    { id: "1-67", fromMe: true, sender: "user", text: "Lalu aku harus gimana?", time: "10:00", date: "2025-02-06", read: true },
    { id: "1-68", fromMe: false, sender: "partner", text: "Gak tau. Kamu yang tau jawabannya", time: "10:10", date: "2025-02-06", read: true },
    { id: "1-69", fromMe: true, sender: "user", text: "Hari ini gimana?", time: "20:00", date: "2025-02-06", read: true },
    { id: "1-70", fromMe: false, sender: "partner", text: "Biasa", time: "20:05", date: "2025-02-06", read: true },
    { id: "1-71", fromMe: true, sender: "user", text: "Kamu masih marah?", time: "20:10", date: "2025-02-06", read: true },
    { id: "1-72", fromMe: false, sender: "partner", text: "Aku gak marah", time: "20:15", date: "2025-02-06", read: true },
    { id: "1-73", fromMe: true, sender: "user", text: "Tapi kayak ada yang mengganjal", time: "20:20", date: "2025-02-06", read: true },
    { id: "1-74", fromMe: false, sender: "partner", text: "Kamu aja yang overthinking", time: "20:25", date: "2025-02-06", read: true },

    // Jumat, 7 Feb
    { id: "1-75", fromMe: true, sender: "user", text: "Weekend ini kamu ada waktu?", time: "07:30", date: "2025-02-07", read: true },
    { id: "1-76", fromMe: false, sender: "partner", text: "Harusnya ada. Kenapa sayang?", time: "07:45", date: "2025-02-07", read: true },
    { id: "1-77", fromMe: true, sender: "user", text: "Pengen jalan bareng. Udah lama banget kita gak kemana-mana", time: "07:50", date: "2025-02-07", read: true },
    { id: "1-78", fromMe: false, sender: "partner", text: "Iya bener. Sabtu gimana?", time: "07:55", date: "2025-02-07", read: true },
    { id: "1-79", fromMe: true, sender: "user", text: "Oke, Sabtu ya. Jangan dibatalin lagi", time: "08:00", date: "2025-02-07", read: true },
    { id: "1-80", fromMe: false, sender: "partner", text: "Janji gak dibatalin ❤️", time: "08:05", date: "2025-02-07", read: true },
    { id: "1-81", fromMe: true, sender: "user", text: "Serius ya?", time: "08:10", date: "2025-02-07", read: true },
    { id: "1-82", fromMe: false, sender: "partner", text: "Serius banget", time: "08:15", date: "2025-02-07", read: true },
    { id: "1-83", fromMe: true, sender: "user", text: "Kita mau ke mana Sabtu?", time: "12:00", date: "2025-02-07", read: true },
    { id: "1-84", fromMe: false, sender: "partner", text: "Terserah kamu mau ke mana, yang penting bareng", time: "12:15", date: "2025-02-07", read: true },
    { id: "1-85", fromMe: true, sender: "user", text: "Aww okay 🥺 aku pikirin ya", time: "12:20", date: "2025-02-07", read: true },
    { id: "1-86", fromMe: false, sender: "partner", text: "Gimana harimu?", time: "18:00", date: "2025-02-07", read: true },
    { id: "1-87", fromMe: true, sender: "user", text: "Lumayan. Excited buat Sabtu", time: "18:10", date: "2025-02-07", read: true },
    { id: "1-88", fromMe: false, sender: "partner", text: "Aku juga 😊", time: "18:15", date: "2025-02-07", read: true },

    // Sabtu, 8 Feb
    { id: "1-89", fromMe: true, sender: "user", text: "Kita jadi hari ini kan?", time: "09:00", date: "2025-02-08", read: true },
    { id: "1-90", fromMe: false, sender: "partner", text: "Jadi! Aku siap-siap dulu", time: "09:05", date: "2025-02-08", read: true },
    { id: "1-91", fromMe: true, sender: "user", text: "Yay akhirnya 🎉", time: "09:10", date: "2025-02-08", read: true },
    { id: "1-92", fromMe: true, sender: "user", text: "Kamu udah mandi?", time: "10:00", date: "2025-02-08", read: true },
    { id: "1-93", fromMe: false, sender: "partner", text: "Hampir 😅", time: "10:05", date: "2025-02-08", read: true },
    { id: "1-94", fromMe: false, sender: "partner", text: "Siap! Jemput jam 11.30 ya", time: "11:00", date: "2025-02-08", read: true },
    { id: "1-95", fromMe: true, sender: "user", text: "Oke aku tunggu!", time: "11:02", date: "2025-02-08", read: true },
    { id: "1-96", fromMe: true, sender: "user", text: "Ini sotonya enak banget ya", time: "14:00", date: "2025-02-08", read: true },
    { id: "1-97", fromMe: false, sender: "partner", text: "Iya! Kamu yang rekomendasiin bagus banget", time: "14:05", date: "2025-02-08", read: true },
    { id: "1-98", fromMe: true, sender: "user", text: "Makasih hari ini ya, seneng banget", time: "16:30", date: "2025-02-08", read: true },
    { id: "1-99", fromMe: false, sender: "partner", text: "Aku juga seneng. Kita harus sering gini", time: "16:35", date: "2025-02-08", read: true },
    { id: "1-100", fromMe: true, sender: "user", text: "Setuju ❤️ semoga beneran sering ya", time: "16:40", date: "2025-02-08", read: true },
    { id: "1-101", fromMe: false, sender: "partner", text: "Janji, bukan cuma kata-kata", time: "16:45", date: "2025-02-08", read: true },
    { id: "1-102", fromMe: true, sender: "user", text: "Makasih untuk hari yang indah sayang 🥰", time: "20:00", date: "2025-02-08", read: true },
    { id: "1-103", fromMe: false, sender: "partner", text: "Sama-sama. Kamu yang bikin hari ini special", time: "20:05", date: "2025-02-08", read: true },

    // Minggu, 9 Feb
    { id: "1-104", fromMe: true, sender: "user", text: "Minggu depan kali?", time: "10:20", date: "2025-02-09", read: true },
    { id: "1-105", fromMe: false, sender: "partner", text: "Deal! Jangan lupa ya", time: "10:25", date: "2025-02-09", read: true },
    { id: "1-106", fromMe: true, sender: "user", text: "Brig, besok kayaknya minggu yang lumayan sibuk", time: "14:00", date: "2025-02-09", read: true },
    { id: "1-107", fromMe: false, sender: "partner", text: "Sibuk gimana?", time: "14:05", date: "2025-02-09", read: true },
    { id: "1-108", fromMe: true, sender: "user", text: "Ada project baru masuk, kemungkinan lembur beberapa hari", time: "14:10", date: "2025-02-09", read: true },
    { id: "1-109", fromMe: false, sender: "partner", text: "Oh... berapa lama kira-kira?", time: "14:15", date: "2025-02-09", read: true },
    { id: "1-110", fromMe: true, sender: "user", text: "Mungkin sampai Jumat", time: "14:20", date: "2025-02-09", read: true },
    { id: "1-111", fromMe: false, sender: "partner", text: "Jadi weekend ini exception dong?", time: "14:25", date: "2025-02-09", read: true },
    { id: "1-112", fromMe: true, sender: "user", text: "Bukan exception, tetap usaha kok", time: "14:30", date: "2025-02-09", read: true },
    { id: "1-113", fromMe: false, sender: "partner", text: "Okay. Aku ngerti kok", time: "14:35", date: "2025-02-09", read: true },
    { id: "1-114", fromMe: true, sender: "user", text: "Makasih ya ❤️", time: "14:40", date: "2025-02-09", read: true },
    { id: "1-115", fromMe: false, sender: "partner", text: "Tapi serius ya, usahain", time: "14:45", date: "2025-02-09", read: true },

    // Senin, 10 Feb
    { id: "1-116", fromMe: false, sender: "partner", text: "Pagi sayang! Semangat ya project barunya", time: "08:00", date: "2025-02-10", read: true },
    { id: "1-117", fromMe: true, sender: "user", text: "Pagi. Iya makasih ya", time: "08:15", date: "2025-02-10", read: true },
    { id: "1-118", fromMe: false, sender: "partner", text: "Nanti malam mau dibawain makan?", time: "13:00", date: "2025-02-10", read: true },
    { id: "1-119", fromMe: true, sender: "user", text: "Gak usah, kayaknya aku makan di kantor aja", time: "13:30", date: "2025-02-10", read: true },
    { id: "1-120", fromMe: false, sender: "partner", text: "Oh okay. Semangat!", time: "13:35", date: "2025-02-10", read: true },
    { id: "1-121", fromMe: true, sender: "user", text: "Aku belum pulang nih, masih banyak banget", time: "21:00", date: "2025-02-10", read: true },
    { id: "1-122", fromMe: false, sender: "partner", text: "Kasihan... istirahat yang cukup ya kalau udah sampai rumah", time: "21:10", date: "2025-02-10", read: true },
    { id: "1-123", fromMe: true, sender: "user", text: "Iya sayang", time: "21:15", date: "2025-02-10", read: true },

    // Selasa, 11 Feb
    { id: "1-124", fromMe: false, sender: "partner", text: "Hari ini masih sibuk banget?", time: "09:00", date: "2025-02-11", read: true },
    { id: "1-125", fromMe: true, sender: "user", text: "Iya nih, baru mulai udah ada masalah", time: "09:30", date: "2025-02-11", read: true },
    { id: "1-126", fromMe: false, sender: "partner", text: "Bisa call bentar pas makan siang?", time: "12:00", date: "2025-02-11", read: true },
    { id: "1-127", fromMe: true, sender: "user", text: "Maaf, lagi fokus kerjaan", time: "13:40", date: "2025-02-11", read: true },
    { id: "1-128", fromMe: false, sender: "partner", text: "Iya aku tau", time: "13:45", date: "2025-02-11", read: true },
    { id: "1-129", fromMe: false, sender: "partner", text: "Kapan selesainya sih project ini?", time: "18:00", date: "2025-02-11", read: true },
    { id: "1-130", fromMe: true, sender: "user", text: "Estimasi Jumat atau Sabtu", time: "18:30", date: "2025-02-11", read: true },
    { id: "1-131", fromMe: false, sender: "partner", text: "Jadi Sabtu juga ikut kehabisan?", time: "18:35", date: "2025-02-11", read: true },
    { id: "1-132", fromMe: true, sender: "user", text: "Mudah-mudahan enggak", time: "18:40", date: "2025-02-11", read: true },
    { id: "1-133", fromMe: false, sender: "partner", text: "Kamu tau gak, aku udah nunggu weekend ini dari Minggu kemarin", time: "18:45", date: "2025-02-11", read: true },
    { id: "1-134", fromMe: true, sender: "user", text: "Aku tau sayang, aku juga pengen banget", time: "18:50", date: "2025-02-11", read: true },
    { id: "1-135", fromMe: false, sender: "partner", text: "Tapi sepertinya kamu lebih pilih kerjaan", time: "18:55", date: "2025-02-11", read: true },
    { id: "1-136", fromMe: true, sender: "user", text: "Sayang itu gak fair, aku kerja buat kita berdua juga", time: "19:00", date: "2025-02-11", read: true },
    { id: "1-137", fromMe: false, sender: "partner", text: "Aku gak butuh uang, aku butuh waktu kamu", time: "19:05", date: "2025-02-11", read: true },
    { id: "1-138", fromMe: true, sender: "user", text: "Aku ngerti, tapi situasinya lagi kayak gini", time: "19:10", date: "2025-02-11", read: true },
    { id: "1-139", fromMe: false, sender: "partner", text: "Situasinya selalu kayak gini", time: "19:15", date: "2025-02-11", read: true },
    { id: "1-140", fromMe: true, sender: "user", text: "Sayang...", time: "19:20", date: "2025-02-11", read: true },
    { id: "1-141", fromMe: false, sender: "partner", text: "Lupain deh", time: "19:25", date: "2025-02-11", read: true },

    // Rabu, 12 Feb
    { id: "1-142", fromMe: true, sender: "user", text: "Sayang, kita perlu ngobrol soal kemarin", time: "09:00", date: "2025-02-12", read: true },
    { id: "1-143", fromMe: false, sender: "partner", text: "Ngobrol apa?", time: "09:30", date: "2025-02-12", read: true },
    { id: "1-144", fromMe: true, sender: "user", text: "Kamu bilang situasinya selalu kayak gini. Itu bikin aku mikir", time: "09:35", date: "2025-02-12", read: true },
    { id: "1-145", fromMe: false, sender: "partner", text: "Emang bukan?", time: "09:40", date: "2025-02-12", read: true },
    { id: "1-146", fromMe: true, sender: "user", text: "Aku akui iya, dan itu salah aku", time: "09:45", date: "2025-02-12", read: true },
    { id: "1-147", fromMe: false, sender: "partner", text: "Okay", time: "09:50", date: "2025-02-12", read: true },
    { id: "1-148", fromMe: true, sender: "user", text: "Cuma okay?", time: "09:55", date: "2025-02-12", read: true },
    { id: "1-149", fromMe: false, sender: "partner", text: "Mau aku bilang apa? Kamu udah ngakuin, habis itu tetap lembur kan?", time: "10:00", date: "2025-02-12", read: true },
    { id: "1-150", fromMe: true, sender: "user", text: "Iya tapi ini yang terakhir untuk project ini", time: "10:05", date: "2025-02-12", read: true },
    { id: "1-151", fromMe: false, sender: "partner", text: "Habis ini ada project lain", time: "10:10", date: "2025-02-12", read: true },
    { id: "1-152", fromMe: true, sender: "user", text: "Aku janji setelah ini aku manage waktu lebih baik", time: "10:15", date: "2025-02-12", read: true },
    { id: "1-153", fromMe: false, sender: "partner", text: "Aku udah sering denger kata janji", time: "10:20", date: "2025-02-12", read: true },
    { id: "1-154", fromMe: true, sender: "user", text: "Aku serius kali ini", time: "10:25", date: "2025-02-12", read: true },
    { id: "1-155", fromMe: false, sender: "partner", text: "Kita lihat aja", time: "10:30", date: "2025-02-12", read: true },

    // Kamis, 13 Feb
    { id: "1-156", fromMe: false, sender: "partner", text: "Hari ini gimana?", time: "08:00", date: "2025-02-13", read: true },
    { id: "1-157", fromMe: true, sender: "user", text: "Masih ngejar deadline. Tapi udah keliatan ujungnya", time: "08:10", date: "2025-02-13", read: true },
    { id: "1-158", fromMe: false, sender: "partner", text: "Semangat ya", time: "08:15", date: "2025-02-13", read: true },
    { id: "1-159", fromMe: true, sender: "user", text: "Makasih sayang ❤️", time: "08:20", date: "2025-02-13", read: true },
    { id: "1-160", fromMe: true, sender: "user", text: "Sayang, besok 14 Feb loh", time: "12:30", date: "2025-02-13", read: true },
    { id: "1-161", fromMe: false, sender: "partner", text: "Iya tau", time: "12:35", date: "2025-02-13", read: true },
    { id: "1-162", fromMe: true, sender: "user", text: "Kita celebrate yuk meskipun aku masih ada kerjaan", time: "12:40", date: "2025-02-13", read: true },
    { id: "1-163", fromMe: false, sender: "partner", text: "Kalau ada kerjaan gak usah dipaksain", time: "12:45", date: "2025-02-13", read: true },
    { id: "1-164", fromMe: true, sender: "user", text: "Aku pengen tetap ketemu kamu besok", time: "12:50", date: "2025-02-13", read: true },
    { id: "1-165", fromMe: false, sender: "partner", text: "Beneran?", time: "12:55", date: "2025-02-13", read: true },
    { id: "1-166", fromMe: true, sender: "user", text: "Beneran. Dinner bareng malam, gimana?", time: "13:00", date: "2025-02-13", read: true },
    { id: "1-167", fromMe: false, sender: "partner", text: "Okay deh... aku tunggu", time: "13:05", date: "2025-02-13", read: true },
    { id: "1-168", fromMe: true, sender: "user", text: "Project hampir kelar! Besok aku bakal lebih bebas", time: "20:00", date: "2025-02-13", read: true },
    { id: "1-169", fromMe: false, sender: "partner", text: "Bagus dong", time: "20:05", date: "2025-02-13", read: true },
    { id: "1-170", fromMe: true, sender: "user", text: "Kamu excited gak buat besok?", time: "20:10", date: "2025-02-13", read: true },
    { id: "1-171", fromMe: false, sender: "partner", text: "Excited sih, tapi agak takut dibatalin lagi", time: "20:15", date: "2025-02-13", read: true },
    { id: "1-172", fromMe: true, sender: "user", text: "Gak akan. I promise", time: "20:20", date: "2025-02-13", read: true },
    { id: "1-173", fromMe: false, sender: "partner", text: "Oke, percaya deh", time: "20:25", date: "2025-02-13", read: true },

    // Jumat, 14 Feb (Valentine's Day)
    { id: "1-174", fromMe: true, sender: "user", text: "Selamat hari Valentine sayang ❤️", time: "08:00", date: "2025-02-14", read: true },
    { id: "1-175", fromMe: false, sender: "partner", text: "Happy Valentine juga 🥰", time: "08:05", date: "2025-02-14", read: true },
    { id: "1-176", fromMe: true, sender: "user", text: "Malam ini kita dinner ya, udah booking tempat", time: "08:10", date: "2025-02-14", read: true },
    { id: "1-177", fromMe: false, sender: "partner", text: "Aww, udah booking? Makasih!", time: "08:15", date: "2025-02-14", read: true },
    { id: "1-178", fromMe: true, sender: "user", text: "Sayang, ada sedikit masalah", time: "12:00", date: "2025-02-14", read: true },
    { id: "1-179", fromMe: false, sender: "partner", text: "Apa?", time: "12:05", date: "2025-02-14", read: true },
    { id: "1-180", fromMe: true, sender: "user", text: "Meeting mendadak jam 5, tapi aku usahain kelar sebelum jam 7", time: "12:10", date: "2025-02-14", read: true },
    { id: "1-181", fromMe: false, sender: "partner", text: "Serius?? Hari ini?", time: "12:15", date: "2025-02-14", read: true },
    { id: "1-182", fromMe: true, sender: "user", text: "Maaf banget, aku gak bisa nolak ini", time: "12:20", date: "2025-02-14", read: true },
    { id: "1-183", fromMe: false, sender: "partner", text: "Hari Valentine dan kamu masih ada meeting", time: "12:25", date: "2025-02-14", read: true },
    { id: "1-184", fromMe: true, sender: "user", text: "Aku tau, ini gak oke. Tapi aku janji kelar sebelum dinner", time: "12:30", date: "2025-02-14", read: true },
    { id: "1-185", fromMe: false, sender: "partner", text: "Okay... aku tunggu", time: "12:35", date: "2025-02-14", read: true },
    { id: "1-186", fromMe: true, sender: "user", text: "Sayang aku di jalan, 20 menit lagi sampai", time: "19:00", date: "2025-02-14", read: true },
    { id: "1-187", fromMe: false, sender: "partner", text: "Okay aku udah siap", time: "19:02", date: "2025-02-14", read: true },
    { id: "1-188", fromMe: false, sender: "partner", text: "Tadi malam indah banget, makasih ya 🥰", time: "21:00", date: "2025-02-14", read: true },
    { id: "1-189", fromMe: true, sender: "user", text: "Sama-sama sayang. Maaf bikin kamu khawatir tadi", time: "21:05", date: "2025-02-14", read: true },
    { id: "1-190", fromMe: false, sender: "partner", text: "Gak apa-apa. Yang penting kamu datang ❤️", time: "21:10", date: "2025-02-14", read: true },

    // Sabtu, 15 Feb
    { id: "1-191", fromMe: false, sender: "partner", text: "Pagi! Kemarin seru", time: "10:00", date: "2025-02-15", read: true },
    { id: "1-192", fromMe: true, sender: "user", text: "Pagi! Iya seru banget. Maaf ya kemarin sempat bikin khawatir", time: "10:10", date: "2025-02-15", read: true },
    { id: "1-193", fromMe: false, sender: "partner", text: "It's okay. Tapi aku mau jujur", time: "10:15", date: "2025-02-15", read: true },
    { id: "1-194", fromMe: true, sender: "user", text: "Silakan", time: "10:20", date: "2025-02-15", read: true },
    { id: "1-195", fromMe: false, sender: "partner", text: "Aku capek Brigida terus begini. Kerja boleh, tapi aku juga butuh kamu", time: "10:25", date: "2025-02-15", read: true },
    { id: "1-196", fromMe: true, sender: "user", text: "Aku tau. Dan aku minta maaf udah sering bikin kamu nunggu", time: "10:30", date: "2025-02-15", read: true },
    { id: "1-197", fromMe: false, sender: "partner", text: "Bukan soal nunggu. Soal prioritas", time: "10:35", date: "2025-02-15", read: true },
    { id: "1-198", fromMe: true, sender: "user", text: "Kamu adalah prioritas aku", time: "10:40", date: "2025-02-15", read: true },
    { id: "1-199", fromMe: false, sender: "partner", text: "Kalau iya, tunjukin. Bukan cuma kata-kata", time: "10:45", date: "2025-02-15", read: true },
    { id: "1-200", fromMe: true, sender: "user", text: "Aku akan tunjukin. Mulai sekarang", time: "10:50", date: "2025-02-15", read: true },
    { id: "1-201", fromMe: false, sender: "partner", text: "Aku harap beneran ya", time: "10:55", date: "2025-02-15", read: true },
    { id: "1-202", fromMe: true, sender: "user", text: "Kok jadi dingin banget sih akhir-akhir ini?", time: "14:20", date: "2025-02-15", read: true },
    { id: "1-203", fromMe: false, sender: "partner", text: "Lagi banyak pikiran aja", time: "14:22", date: "2025-02-15", read: true },
    { id: "1-204", fromMe: true, sender: "user", text: "Pikiran apa? Kok gak cerita ke aku?", time: "14:23", date: "2025-02-15", read: true },
    { id: "1-205", fromMe: false, sender: "partner", text: "Kerjaan lagi banyak banget, deadline besok", time: "14:25", date: "2025-02-15", read: true },
    { id: "1-206", fromMe: true, sender: "user", text: "Tapi weekend kemarin kita janjian kamu malah bilang capek terus", time: "14:26", date: "2025-02-15", read: true },
    { id: "1-207", fromMe: false, sender: "partner", text: "Iya emang lagi capek banget", time: "14:27", date: "2025-02-15", read: true },
    { id: "1-208", fromMe: true, sender: "user", text: "Capek atau emang udah gak mau effort buat hubungan ini?", time: "14:28", date: "2025-02-15", read: true },
    { id: "1-209", fromMe: false, sender: "partner", text: "Jangan gitu dong", time: "14:29", date: "2025-02-15", read: true },
    { id: "1-210", fromMe: true, sender: "user", text: "Aku cuma nanya", time: "14:30", date: "2025-02-15", read: true },
    { id: "1-211", fromMe: false, sender: "partner", text: "Aku udah bilang lagi banyak kerjaan", time: "14:31", date: "2025-02-15", read: true },
    { id: "1-212", fromMe: true, sender: "user", text: "Aku ngerti kok maksud kamu...", time: "14:32", date: "2025-02-15", read: false },
  ],
  "2": [
    // Minggu, 2 Feb
    { id: "2-1", fromMe: true, sender: "user", text: "Hei Bud, hari ini ada rencana?", time: "11:00", date: "2025-02-02", read: true },
    { id: "2-2", fromMe: false, sender: "partner", text: "Lagi di rumah nih, saudaraku dateng", time: "11:30", date: "2025-02-02", read: true },
    { id: "2-3", fromMe: true, sender: "user", text: "Oh! Saudaramu yang mana?", time: "11:35", date: "2025-02-02", read: true },
    { id: "2-4", fromMe: false, sender: "partner", text: "Yang di Malang, lagi liburan", time: "11:40", date: "2025-02-02", read: true },
    { id: "2-5", fromMe: true, sender: "user", text: "Aku boleh kenalan gak?", time: "11:45", date: "2025-02-02", read: true },
    { id: "2-6", fromMe: false, sender: "partner", text: "Hmm, hari ini lagi ribet soalnya", time: "12:00", date: "2025-02-02", read: true },
    { id: "2-7", fromMe: true, sender: "user", text: "Oh okay, next time aja ya", time: "12:05", date: "2025-02-02", read: true },
    { id: "2-8", fromMe: false, sender: "partner", text: "Iya nanti ya", time: "12:10", date: "2025-02-02", read: true },
    { id: "2-9", fromMe: true, sender: "user", text: "Gimana saudara kamu?", time: "15:00", date: "2025-02-02", read: true },
    { id: "2-10", fromMe: false, sender: "partner", text: "Udara tadi pulang tadi", time: "15:30", date: "2025-02-02", read: true },

    // Senin, 3 Feb
    { id: "2-11", fromMe: true, sender: "user", text: "Bud, kapan aku bisa ketemu keluarga kamu?", time: "09:00", date: "2025-02-03", read: true },
    { id: "2-12", fromMe: false, sender: "partner", text: "Haha nanti ada waktunya", time: "09:30", date: "2025-02-03", read: true },
    { id: "2-13", fromMe: true, sender: "user", text: "Kita udah 6 bulan loh", time: "09:35", date: "2025-02-03", read: true },
    { id: "2-14", fromMe: false, sender: "partner", text: "Iya aku tau, santai dulu", time: "09:40", date: "2025-02-03", read: true },
    { id: "2-15", fromMe: true, sender: "user", text: "Bukan mau buru-buru, tapi pengen kenal orang-orang penting di hidupmu", time: "09:45", date: "2025-02-03", read: true },
    { id: "2-16", fromMe: false, sender: "partner", text: "Oke nanti aku atur", time: "10:00", date: "2025-02-03", read: true },
    { id: "2-17", fromMe: true, sender: "user", text: "Janji ya", time: "10:05", date: "2025-02-03", read: true },
    { id: "2-18", fromMe: false, sender: "partner", text: "Iya 😊", time: "10:10", date: "2025-02-03", read: true },
    { id: "2-19", fromMe: true, sender: "user", text: "Kangen kamu", time: "20:30", date: "2025-02-03", read: true },
    { id: "2-20", fromMe: false, sender: "partner", text: "Kangen juga ❤️", time: "20:35", date: "2025-02-03", read: true },

    // Selasa, 4 Feb
    { id: "2-21", fromMe: true, sender: "user", text: "Bud makan siang bareng gak?", time: "12:00", date: "2025-02-04", read: true },
    { id: "2-22", fromMe: false, sender: "partner", text: "Udah di kantin duluan, maaf ya", time: "12:30", date: "2025-02-04", read: true },
    { id: "2-23", fromMe: true, sender: "user", text: "Oh gak apa-apa", time: "12:35", date: "2025-02-04", read: true },
    { id: "2-24", fromMe: true, sender: "user", text: "Pulang jam berapa?", time: "19:00", date: "2025-02-04", read: true },
    { id: "2-25", fromMe: false, sender: "partner", text: "Baru selesai, mau langsung pulang", time: "19:30", date: "2025-02-04", read: true },
    { id: "2-26", fromMe: true, sender: "user", text: "Okay, hati-hati ya", time: "19:35", date: "2025-02-04", read: true },

    // Rabu, 5 Feb
    { id: "2-27", fromMe: true, sender: "user", text: "Bud, weekend ini ada rencana?", time: "10:00", date: "2025-02-05", read: true },
    { id: "2-28", fromMe: false, sender: "partner", text: "Belum ada sih", time: "10:30", date: "2025-02-05", read: true },
    { id: "2-29", fromMe: true, sender: "user", text: "Kita jalan yuk! Lama gak quality time", time: "10:35", date: "2025-02-05", read: true },
    { id: "2-30", fromMe: false, sender: "partner", text: "Boleh, Saturday ya", time: "10:40", date: "2025-02-05", read: true },
    { id: "2-31", fromMe: true, sender: "user", text: "Jam 2 gimana?", time: "10:50", date: "2025-02-05", read: true },
    { id: "2-32", fromMe: false, sender: "partner", text: "Siap ❤️", time: "10:55", date: "2025-02-05", read: true },

    // Kamis, 6 Feb
    { id: "2-33", fromMe: true, sender: "user", text: "Bud, gimana kalau kita dinner sama teman-temanmu sabtu?", time: "14:00", date: "2025-02-06", read: true },
    { id: "2-34", fromMe: false, sender: "partner", text: "Hmm... kayaknya mereka ada rencana sendiri deh", time: "14:30", date: "2025-02-06", read: true },
    { id: "2-35", fromMe: true, sender: "user", text: "Oh, aku gak diajak?", time: "14:35", date: "2025-02-06", read: true },
    { id: "2-36", fromMe: false, sender: "partner", text: "Bukan gitu, kamu kan belum terlalu kenal mereka", time: "14:40", date: "2025-02-06", read: true },
    { id: "2-37", fromMe: true, sender: "user", text: "Ya makanya dikenalkan dong", time: "14:45", date: "2025-02-06", read: true },
    { id: "2-38", fromMe: false, sender: "partner", text: "Nanti kalau udah ada momen yang pas", time: "14:50", date: "2025-02-06", read: true },
    { id: "2-39", fromMe: true, sender: "user", text: "Momen yang pas itu kapan sih Bud?", time: "14:55", date: "2025-02-06", read: true },
    { id: "2-40", fromMe: false, sender: "partner", text: "Santai dulu dong", time: "15:00", date: "2025-02-06", read: true },

    // Jumat, 7 Feb
    { id: "2-41", fromMe: true, sender: "user", text: "Besok kita tetap jalan ya, jam 2?", time: "20:00", date: "2025-02-07", read: true },
    { id: "2-42", fromMe: false, sender: "partner", text: "Eh, iya! Oh tapi nanti aku kabarin lagi ya", time: "20:15", date: "2025-02-07", read: true },
    { id: "2-43", fromMe: true, sender: "user", text: "Ada apa?", time: "20:20", date: "2025-02-07", read: true },
    { id: "2-44", fromMe: false, sender: "partner", text: "Ada yang mau minta tolong sesuatu bentar, teman bantu pindahan", time: "20:25", date: "2025-02-07", read: true },
    { id: "2-45", fromMe: true, sender: "user", text: "Oh... jadi sabtu gimana?", time: "20:40", date: "2025-02-07", read: true },
    { id: "2-46", fromMe: false, sender: "partner", text: "Maaf ya, kayaknya aku harus bantu dia dulu", time: "20:45", date: "2025-02-07", read: true },
    { id: "2-47", fromMe: true, sender: "user", text: "Ini kedua kalinya kamu batalin rencana kita, Bud", time: "20:50", date: "2025-02-07", read: true },
    { id: "2-48", fromMe: false, sender: "partner", text: "Aku minta maaf, dia beneran butuh bantuan", time: "20:55", date: "2025-02-07", read: true },

    // Sabtu, 8 Feb
    { id: "2-49", fromMe: true, sender: "user", text: "Udah selesai bantuin teman?", time: "16:00", date: "2025-02-08", read: true },
    { id: "2-50", fromMe: false, sender: "partner", text: "Baru selesai, lumayan capek", time: "16:30", date: "2025-02-08", read: true },
    { id: "2-51", fromMe: true, sender: "user", text: "Gak. Cuma kecewa", time: "16:45", date: "2025-02-08", read: true },
    { id: "2-52", fromMe: false, sender: "partner", text: "Aku minta maaf ya, darurat soalnya", time: "16:50", date: "2025-02-08", read: true },

    // Minggu, 9 Feb
    { id: "2-53", fromMe: false, sender: "partner", text: "Buat ganti kemarin, makan siang bareng yuk?", time: "11:00", date: "2025-02-09", read: true },
    { id: "2-54", fromMe: true, sender: "user", text: "Boleh", time: "11:10", date: "2025-02-09", read: true },
    { id: "2-55", fromMe: true, sender: "user", text: "Bud, aku mau tanya sesuatu. Kamu serius sama aku?", time: "12:40", date: "2025-02-09", read: true },
    { id: "2-56", fromMe: false, sender: "partner", text: "Ya serius dong. Kenapa?", time: "12:55", date: "2025-02-09", read: true },
    { id: "2-57", fromMe: true, sender: "user", text: "Terus kenapa aku belum pernah diperkenalkan ke siapapun?", time: "13:00", date: "2025-02-09", read: true },
    { id: "2-58", fromMe: false, sender: "partner", text: "Belum ada momen yang pas aja", time: "13:05", date: "2025-02-09", read: true },
    { id: "2-59", fromMe: true, sender: "user", text: "6 bulan, Bud. Berapa kali lagi harus nunggu 'momen yang pas'?", time: "13:10", date: "2025-02-09", read: true },
    { id: "2-60", fromMe: false, sender: "partner", text: "Sabar ya, nanti aku atur", time: "13:30", date: "2025-02-09", read: true },

    // Senin, 10 Feb
    { id: "2-61", fromMe: true, sender: "user", text: "Bud, hari ini gimana?", time: "20:00", date: "2025-02-10", read: true },
    { id: "2-62", fromMe: false, sender: "partner", text: "Biasa. Kamu?", time: "20:30", date: "2025-02-10", read: true },
    { id: "2-63", fromMe: true, sender: "user", text: "Lagi mikirin hal kemarin", time: "20:35", date: "2025-02-10", read: true },
    { id: "2-64", fromMe: false, sender: "partner", text: "Aku serius kok sama kamu", time: "20:50", date: "2025-02-10", read: true },
    { id: "2-65", fromMe: true, sender: "user", text: "Aku mau lihat dari tindakan, bukan kata-kata", time: "20:55", date: "2025-02-10", read: true },

    // Selasa, 11 Feb
    { id: "2-66", fromMe: true, sender: "user", text: "Bud ada rencana weekend ini?", time: "12:00", date: "2025-02-11", read: true },
    { id: "2-67", fromMe: false, sender: "partner", text: "Belum tau, mungkin ada acara keluarga. Ulang tahun mama", time: "12:30", date: "2025-02-11", read: true },
    { id: "2-68", fromMe: true, sender: "user", text: "Ohhh! Aku boleh ikut?", time: "12:40", date: "2025-02-11", read: true },
    { id: "2-69", fromMe: false, sender: "partner", text: "Hmm, ini kan acara keluarga internal. Nanti aku lihat dulu", time: "13:05", date: "2025-02-11", read: true },

    // Rabu, 12 Feb
    { id: "2-70", fromMe: true, sender: "user", text: "Bud, soal ulang tahun mama gimana?", time: "19:00", date: "2025-02-12", read: true },
    { id: "2-71", fromMe: false, sender: "partner", text: "Kayaknya acara keluarga internal dulu ya", time: "19:30", date: "2025-02-12", read: true },
    { id: "2-72", fromMe: true, sender: "user", text: "Okay Bud. Aku ngerti", time: "19:35", date: "2025-02-12", read: true },

    // Kamis, 13 Feb
    { id: "2-73", fromMe: true, sender: "user", text: "Bud ulang tahun mama besok atau Sabtu?", time: "20:00", date: "2025-02-13", read: true },
    { id: "2-74", fromMe: false, sender: "partner", text: "Sabtu siang", time: "20:15", date: "2025-02-13", read: true },
    { id: "2-75", fromMe: true, sender: "user", text: "Okay", time: "20:20", date: "2025-02-13", read: true },

    // Jumat, 14 Feb
    { id: "2-76", fromMe: false, sender: "partner", text: "Selamat Valentine! ❤️", time: "09:00", date: "2025-02-14", read: true },
    { id: "2-77", fromMe: true, sender: "user", text: "Happy Valentine juga", time: "09:10", date: "2025-02-14", read: true },
    { id: "2-78", fromMe: false, sender: "partner", text: "Malam ini dinner bareng ya?", time: "09:15", date: "2025-02-14", read: true },
    { id: "2-79", fromMe: true, sender: "user", text: "Boleh", time: "09:20", date: "2025-02-14", read: true },
    { id: "2-80", fromMe: true, sender: "user", text: "Bud, serius ya, aku mau diikutsertain dalam hidupmu", time: "19:25", date: "2025-02-14", read: true },
    { id: "2-81", fromMe: false, sender: "partner", text: "Iya aku tau, aku akan buktiin", time: "19:35", date: "2025-02-14", read: true },

    // Sabtu, 15 Feb
    { id: "2-82", fromMe: true, sender: "user", text: "Bud, tadi ulang tahun mama kamu kan?", time: "14:00", date: "2025-02-15", read: true },
    { id: "2-83", fromMe: false, sender: "partner", text: "Iya nih, tadi siang makan bareng keluarga", time: "14:15", date: "2025-02-15", read: true },
    { id: "2-84", fromMe: true, sender: "user", text: "Kok gak ngajak aku? Kamu bilang mau ajak kemarin", time: "14:20", date: "2025-02-15", read: true },
    { id: "2-85", fromMe: false, sender: "partner", text: "Oh iya ya, aku lupa bilang ke kamu", time: "14:25", date: "2025-02-15", read: true },
    { id: "2-86", fromMe: true, sender: "user", text: "Lupa? Budi ini udah kedua kalinya", time: "14:30", date: "2025-02-15", read: true },
    { id: "2-87", fromMe: false, sender: "partner", text: "Maaf deh, banyak urusan soalnya", time: "14:35", date: "2025-02-15", read: true },
    { id: "2-88", fromMe: true, sender: "user", text: "Urusan apa sih yang bikin kamu lupa terus sama aku?", time: "14:40", date: "2025-02-15", read: true },
    { id: "2-89", fromMe: false, sender: "partner", text: "Maaf ya kalau aku kelewatan", time: "14:55", date: "2025-02-15", read: false },
  ],
  "3": [
    // Minggu, 2 Feb
    { id: "3-1", fromMe: true, sender: "user", text: "Pagi Rin! Weekend ini gimana di sana?", time: "10:00", date: "2025-02-02", read: true },
    { id: "3-2", fromMe: false, sender: "partner", text: "Biasa aja", time: "10:15", date: "2025-02-02", read: true },
    { id: "3-3", fromMe: true, sender: "user", text: "Aku mau beresin kamar terus nonton", time: "10:30", date: "2025-02-02", read: true },
    { id: "3-4", fromMe: false, sender: "partner", text: "Oh seru ya", time: "10:35", date: "2025-02-02", read: true },
    { id: "3-5", fromMe: true, sender: "user", text: "Rin, kamu oke? Kayak lagi gak bersemangat", time: "14:00", date: "2025-02-02", read: true },
    { id: "3-6", fromMe: false, sender: "partner", text: "Iya kok", time: "14:15", date: "2025-02-02", read: true },

    // Senin, 3 Feb
    { id: "3-7", fromMe: false, sender: "partner", text: "Pagi", time: "08:00", date: "2025-02-03", read: true },
    { id: "3-8", fromMe: true, sender: "user", text: "Pagi juga Rin ❤️", time: "08:15", date: "2025-02-03", read: true },
    { id: "3-9", fromMe: true, sender: "user", text: "Gimana hari ini?", time: "20:00", date: "2025-02-03", read: true },
    { id: "3-10", fromMe: false, sender: "partner", text: "Capek, biasa kerja", time: "20:35", date: "2025-02-03", read: true },
    { id: "3-11", fromMe: true, sender: "user", text: "Semangat ya Rin. Kamu hebat!", time: "20:45", date: "2025-02-03", read: true },
    { id: "3-12", fromMe: false, sender: "partner", text: "Hm", time: "20:55", date: "2025-02-03", read: true },

    // Selasa, 4 Feb
    { id: "3-13", fromMe: false, sender: "partner", text: "Kamu lunch sama siapa?", time: "12:00", date: "2025-02-04", read: true },
    { id: "3-14", fromMe: true, sender: "user", text: "Sendiri di meja, sambil kerja", time: "12:30", date: "2025-02-04", read: true },
    { id: "3-15", fromMe: false, sender: "partner", text: "Oh okay", time: "12:50", date: "2025-02-04", read: true },
    { id: "3-16", fromMe: false, sender: "partner", text: "Kamu lagi apa?", time: "19:00", date: "2025-02-04", read: true },
    { id: "3-17", fromMe: true, sender: "user", text: "Lagi makan, baru pulang", time: "19:05", date: "2025-02-04", read: true },

    // Rabu, 5 Feb
    { id: "3-18", fromMe: true, sender: "user", text: "Rin, kita video call malem ini gimana?", time: "09:00", date: "2025-02-05", read: true },
    { id: "3-19", fromMe: false, sender: "partner", text: "Terserah", time: "09:15", date: "2025-02-05", read: true },
    { id: "3-20", fromMe: true, sender: "user", text: "Aku tanya kamu mau apa gak", time: "09:30", date: "2025-02-05", read: true },
    { id: "3-21", fromMe: false, sender: "partner", text: "Mau", time: "09:40", date: "2025-02-05", read: true },
    { id: "3-22", fromMe: false, sender: "partner", text: "Boleh tapi lagi agak capek", time: "21:15", date: "2025-02-05", read: true },
    { id: "3-23", fromMe: true, sender: "user", text: "Kalau capek istirahat aja, gak papa", time: "21:20", date: "2025-02-05", read: true },

    // Kamis, 6 Feb
    { id: "3-24", fromMe: true, sender: "user", text: "Rin, kamu kenapa kok seminggu ini kayak jauh banget?", time: "07:00", date: "2025-02-06", read: true },
    { id: "3-25", fromMe: false, sender: "partner", text: "Aku gak apa-apa kok", time: "07:35", date: "2025-02-06", read: true },
    { id: "3-26", fromMe: true, sender: "user", text: "Aku lebih suka kamu jujur daripada bilang gak apa-apa", time: "07:45", date: "2025-02-06", read: true },
    { id: "3-27", fromMe: false, sender: "partner", text: "Udah, gak penting", time: "08:10", date: "2025-02-06", read: true },

    // Jumat, 7 Feb
    { id: "3-28", fromMe: false, sender: "partner", text: "Kamu Sabtu ada rencana?", time: "12:00", date: "2025-02-07", read: true },
    { id: "3-29", fromMe: true, sender: "user", text: "Belum ada. Kenapa?", time: "12:15", date: "2025-02-07", read: true },
    { id: "3-30", fromMe: false, sender: "partner", text: "Gak apa-apa", time: "12:25", date: "2025-02-07", read: true },
    { id: "3-31", fromMe: true, sender: "user", text: "Besok kita video call ya Rin, kangen nih", time: "20:00", date: "2025-02-07", read: true },
    { id: "3-32", fromMe: false, sender: "partner", text: "Oke deh", time: "20:25", date: "2025-02-07", read: true },

    // Sabtu, 8 Feb
    { id: "3-33", fromMe: true, sender: "user", text: "Rin, video call sekarang bisa?", time: "14:00", date: "2025-02-08", read: true },
    { id: "3-34", fromMe: false, sender: "partner", text: "Maaf, tadi ketiduran", time: "16:30", date: "2025-02-08", read: true },
    { id: "3-35", fromMe: true, sender: "user", text: "Rin, aku gak bisa terus nebak kamu mau apa", time: "16:55", date: "2025-02-08", read: true },
    { id: "3-36", fromMe: false, sender: "partner", text: "Okay. Aku mau video call", time: "17:10", date: "2025-02-08", read: true },

    // Minggu, 9 Feb
    { id: "3-37", fromMe: false, sender: "partner", text: "Kemarin akhirnya video call enak ya", time: "10:00", date: "2025-02-09", read: true },
    { id: "3-38", fromMe: true, sender: "user", text: "Iya! Kangen banget ngobrol lama sama kamu", time: "10:10", date: "2025-02-09", read: true },
    { id: "3-39", fromMe: false, sender: "partner", text: "Aku tau, aku cuma gak mau kelihatan needy", time: "10:35", date: "2025-02-09", read: true },
    { id: "3-40", fromMe: true, sender: "user", text: "Kamu gak needy. Kamu butuh, itu beda", time: "10:40", date: "2025-02-09", read: true },
    { id: "3-41", fromMe: false, sender: "partner", text: "Kapan kamu bisa ke sini?", time: "14:00", date: "2025-02-09", read: true },
    { id: "3-42", fromMe: true, sender: "user", text: "Bulan depan kali, aku usahain lebih cepat", time: "14:15", date: "2025-02-09", read: true },

    // Senin, 10 Feb
    { id: "3-43", fromMe: true, sender: "user", text: "Pagi Rin!", time: "08:00", date: "2025-02-10", read: true },
    { id: "3-44", fromMe: false, sender: "partner", text: "Pagi", time: "09:00", date: "2025-02-10", read: true },
    { id: "3-45", fromMe: true, sender: "user", text: "Gimana hari ini?", time: "20:00", date: "2025-02-10", read: true },
    { id: "3-46", fromMe: false, sender: "partner", text: "Biasa", time: "20:35", date: "2025-02-10", read: true },

    // Selasa, 11 Feb
    { id: "3-47", fromMe: false, sender: "partner", text: "Kamu sibuk ya hari ini?", time: "10:00", date: "2025-02-11", read: true },
    { id: "3-48", fromMe: true, sender: "user", text: "Lumayan sih, ada meeting siang", time: "12:45", date: "2025-02-11", read: true },
    { id: "3-49", fromMe: false, sender: "partner", text: "Aku cuma pengen video call aja, tapi kamu sibuk", time: "13:25", date: "2025-02-11", read: true },
    { id: "3-50", fromMe: false, sender: "partner", text: "Selalu gitu jawabannya. Lupain deh", time: "13:31", date: "2025-02-11", read: true },

    // Rabu, 12 Feb
    { id: "3-51", fromMe: true, sender: "user", text: "Rin, soal kemarin, aku pengen ngerti", time: "09:00", date: "2025-02-12", read: true },
    { id: "3-52", fromMe: false, sender: "partner", text: "Aku cuma capek LDR-an. Kamu kayak gak kangen-kangenan", time: "09:45", date: "2025-02-12", read: true },
    { id: "3-53", fromMe: true, sender: "user", text: "Aku kangen banget. Aku akan lebih ekspresiin ya", time: "10:15", date: "2025-02-12", read: true },

    // Kamis, 13 Feb
    { id: "3-54", fromMe: true, sender: "user", text: "Rin, Valentine besok! Kita video date ya", time: "12:00", date: "2025-02-13", read: true },
    { id: "3-55", fromMe: false, sender: "partner", text: "Iya deh", time: "12:45", date: "2025-02-13", read: true },

    // Jumat, 14 Feb
    { id: "3-56", fromMe: true, sender: "user", text: "Happy Valentine Rin! ❤️ Kamu cantik walaupun jauh 😘", time: "09:15", date: "2025-02-14", read: true },
    { id: "3-57", fromMe: false, sender: "partner", text: "Haha iya tau", time: "09:25", date: "2025-02-14", read: true },
    { id: "3-58", fromMe: true, sender: "user", text: "Rin, video date sekarang?", time: "20:00", date: "2025-02-14", read: true },
    { id: "3-59", fromMe: false, sender: "partner", text: "Tadi seru ya video date-nya. Kamu tulus gak sih?", time: "22:10", date: "2025-02-14", read: true },

    // Sabtu, 15 Feb
    { id: "3-60", fromMe: false, sender: "partner", text: "Kamu sibuk ya hari ini?", time: "10:30", date: "2025-02-15", read: true },
    { id: "3-61", fromMe: true, sender: "user", text: "Lumayan sih, ada meeting siang", time: "12:45", date: "2025-02-15", read: true },
    { id: "3-62", fromMe: false, sender: "partner", text: "Oh... oke deh", time: "12:46", date: "2025-02-15", read: true },
    { id: "3-63", fromMe: true, sender: "user", text: "Kenapa emangnya?", time: "13:15", date: "2025-02-15", read: true },
    { id: "3-64", fromMe: false, sender: "partner", text: "Gak apa-apa kok", time: "13:16", date: "2025-02-15", read: true },
    { id: "3-65", fromMe: true, sender: "user", text: "Rin, jangan gini dong. Ada apa?", time: "13:20", date: "2025-02-15", read: true },
    { id: "3-66", fromMe: false, sender: "partner", text: "Aku cuma pengen video call aja, tapi kamu sibuk", time: "13:25", date: "2025-02-15", read: true },
    { id: "3-67", fromMe: true, sender: "user", text: "Malem bisa kok, sekarang lagi kerja", time: "13:26", date: "2025-02-15", read: true },
    { id: "3-68", fromMe: false, sender: "partner", text: "Selalu gitu jawabannya", time: "13:27", date: "2025-02-15", read: true },
    { id: "3-69", fromMe: true, sender: "user", text: "Maksud kamu?", time: "13:30", date: "2025-02-15", read: true },
    { id: "3-70", fromMe: false, sender: "partner", text: "Udah lah lupain", time: "13:31", date: "2025-02-15", read: true },
    { id: "3-71", fromMe: true, sender: "user", text: "Rin please, aku bingung kenapa kamu marah", time: "13:35", date: "2025-02-15", read: true },
    { id: "3-72", fromMe: false, sender: "partner", text: "Iya deh terserah kamu", time: "13:40", date: "2025-02-15", read: false },
  ],
  "4": [
    // Minggu, 2 Feb
    { id: "4-1", fromMe: true, sender: "user", text: "Pagi Dim!", time: "10:00", date: "2025-02-02", read: true },
    { id: "4-2", fromMe: false, sender: "partner", text: "Pagi. Ngapain hari ini?", time: "10:10", date: "2025-02-02", read: true },
    { id: "4-3", fromMe: true, sender: "user", text: "Mau ngerjain side project sama temen kantor bentar, Reza namanya", time: "10:25", date: "2025-02-02", read: true },
    { id: "4-4", fromMe: false, sender: "partner", text: "Cuma berdua?", time: "10:50", date: "2025-02-02", read: true },
    { id: "4-5", fromMe: true, sender: "user", text: "Iya, emang kenapa?", time: "10:55", date: "2025-02-02", read: true },

    // Senin, 3 Feb
    { id: "4-6", fromMe: true, sender: "user", text: "Lunch sama Reza lagi hari ini, dia rekomendasiin tempat baru", time: "12:00", date: "2025-02-03", read: true },
    { id: "4-7", fromMe: false, sender: "partner", text: "Kalian sering lunch bareng ya. Baru satu tim?", time: "12:20", date: "2025-02-03", read: true },
    { id: "4-8", fromMe: true, sender: "user", text: "Iya, aku dan Reza hampir kelar proyeknya", time: "20:20", date: "2025-02-03", read: true },

    // Selasa, 4 Feb
    { id: "4-9", fromMe: false, sender: "partner", text: "Pulang sama siapa tadi?", time: "19:10", date: "2025-02-04", read: true },
    { id: "4-10", fromMe: true, sender: "user", text: "Sendiri, kenapa? Kamu lagi ngecek aku ya?", time: "19:20", date: "2025-02-04", read: true },

    // Rabu, 5 Feb
    { id: "4-11", fromMe: true, sender: "user", text: "Dim, tadi ada foto kamu di story Reza. Kalian kenal?", time: "12:00", date: "2025-02-05", read: true },
    { id: "4-12", fromMe: false, sender: "partner", text: "Siapa Reza? Aku gak ingat. Kalian kenal dari mana?", time: "12:35", date: "2025-02-05", read: true },
    { id: "4-13", fromMe: true, sender: "user", text: "Kantor, Dim. Temen kantor", time: "12:40", date: "2025-02-05", read: true },

    // Kamis, 6 Feb
    { id: "4-14", fromMe: false, sender: "partner", text: "Hari ini ada acara sama temen kantor lagi? Sama Reza?", time: "09:15", date: "2025-02-06", read: true },
    { id: "4-15", fromMe: true, sender: "user", text: "Mungkin iya, satu tim soalnya. Ada masalah?", time: "09:30", date: "2025-02-06", read: true },
    { id: "4-16", fromMe: false, sender: "partner", text: "Kalian terus-terusan ya. Tadi fotomu sama siapa di story WA?", time: "20:20", date: "2025-02-06", read: true },
    { id: "4-17", fromMe: true, sender: "user", text: "Yang di coffee shop? Ada Reza juga di situ", time: "20:25", date: "2025-02-06", read: true },

    // Jumat, 7 Feb
    { id: "4-18", fromMe: true, sender: "user", text: "Dim, kamu akhir-akhir ini kok kayak ngecek-ngecek aku terus? Kamu gak percaya aku?", time: "12:20", date: "2025-02-07", read: true },
    { id: "4-19", fromMe: false, sender: "partner", text: "Bukan gitu, Aku cuma... gak tau. Dia sering banget muncul", time: "12:35", date: "2025-02-07", read: true },

    // Sabtu, 8 Feb
    { id: "4-20", fromMe: false, sender: "partner", text: "Hari ini sama siapa?", time: "11:00", date: "2025-02-08", read: true },
    { id: "4-21", fromMe: true, sender: "user", text: "Kenapa kamu tanya terus? Aku mau ke salon sama temen cewek. Cukup?", time: "11:20", date: "2025-02-08", read: true },
    { id: "4-22", fromMe: true, sender: "user", text: "Dim, kita perlu ngobrol soal kamu yang kayak gak percaya aku", time: "12:00", date: "2025-02-08", read: true },

    // Minggu, 9 Feb
    { id: "4-23", fromMe: true, sender: "user", text: "Soal trust. Aku ngerasa kamu curiga sama aku. 3 tahun kita bareng Dim", time: "10:30", date: "2025-02-09", read: true },
    { id: "4-24", fromMe: false, sender: "partner", text: "Itu wajar kan, aku pacar kamu. Aku gak ngecek", time: "10:55", date: "2025-02-09", read: true },

    // Senin, 10 Feb
    { id: "4-25", fromMe: true, sender: "user", text: "Aku gak mau terus kayak gini. Aku mau kamu percaya sama aku", time: "20:30", date: "2025-02-10", read: true },
    { id: "4-26", fromMe: false, sender: "partner", text: "Oke aku coba", time: "20:45", date: "2025-02-10", read: true },

    // Selasa, 11 Feb
    { id: "4-27", fromMe: true, sender: "user", text: "Tadi aku dan Reza presentasi ke klien, sukses!", time: "12:00", date: "2025-02-11", read: true },
    { id: "4-28", fromMe: false, sender: "partner", text: "Oh bagus. Ya selamat dong", time: "12:15", date: "2025-02-11", read: true },

    // Rabu, 12 Feb
    { id: "4-29", fromMe: false, sender: "partner", text: "Reza itu single ya?", time: "20:00", date: "2025-02-12", read: true },
    { id: "4-30", fromMe: true, sender: "user", text: "Iya single. Tapi itu gak relevan", time: "20:20", date: "2025-02-12", read: true },

    // Kamis, 13 Feb
    { id: "4-31", fromMe: true, sender: "user", text: "Besok Valentine. Gimana malem itu dinner?", time: "09:30", date: "2025-02-13", read: true },
    { id: "4-32", fromMe: false, sender: "partner", text: "Boleh. Kamu tentukan aja", time: "09:45", date: "2025-02-13", read: true },

    // Jumat, 14 Feb
    { id: "4-33", fromMe: true, sender: "user", text: "Happy Valentine Dim! ❤️", time: "09:00", date: "2025-02-14", read: true },
    { id: "4-34", fromMe: false, sender: "partner", text: "Happy Valentine juga ❤️ kamu cantik banget tadi", time: "19:10", date: "2025-02-14", read: true },
    { id: "4-35", fromMe: true, sender: "user", text: "Aku sayang banget sama kamu. Trust issue kita harus diselesaiin", time: "21:20", date: "2025-02-14", read: true },

    // Sabtu, 15 Feb
    { id: "4-36", fromMe: false, sender: "partner", text: "Kenapa kamu gak pernah cerita soal temen kantor yang baru?", time: "20:15", date: "2025-02-15", read: true },
    { id: "4-37", fromMe: true, sender: "user", text: "Temen kantor yang mana? Oh si Reza? Emang kenapa?", time: "20:20", date: "2025-02-15", read: true },
    { id: "4-38", fromMe: false, sender: "partner", text: "Yang kamu sering lunch bareng itu. Kamu gak transparent?", time: "20:30", date: "2025-02-15", read: true },
    { id: "4-39", fromMe: true, sender: "user", text: "Dimas, kamu overthinking deh. Kita perlu ngobrol serius", time: "20:35", date: "2025-02-15", read: false },
  ],
  "5": [
    // Minggu, 2 Feb
    { id: "5-1", fromMe: false, sender: "partner", text: "Sayang, aku lagi overthinking nih. Mamah ngomongin soal kerjaan lagi", time: "10:15", date: "2025-02-02", read: true },
    { id: "5-2", fromMe: true, sender: "user", text: "Ngomongin gimana? Padahal kamu content creator udah growing", time: "10:30", date: "2025-02-02", read: true },
    { id: "5-3", fromMe: false, sender: "partner", text: "Dia bilang 'itu gak stabil'. Bingung, aku gak mau bikin mamah kecewa", time: "10:55", date: "2025-02-02", read: true },

    // Senin, 3 Feb
    { id: "5-4", fromMe: false, sender: "partner", text: "Pagi! Hari ini mau shooting lifestyle routine. Doain ya", time: "08:15", date: "2025-02-03", read: true },
    { id: "5-5", fromMe: true, sender: "user", text: "Pasti bagus! Kamu selalu kreatif", time: "08:35", date: "2025-02-03", read: true },
    { id: "5-6", fromMe: false, sender: "partner", text: "Hasilnya bagus banget! Views-nya udah 10k dalam 3 jam", time: "20:00", date: "2025-02-03", read: true },

    // Selasa, 4 Feb
    { id: "5-7", fromMe: true, sender: "user", text: "Makan siang apa hari ini?", time: "12:00", date: "2025-02-04", read: true },
    { id: "5-8", fromMe: false, sender: "partner", text: "Masak sendiri di rumah. Kamu?", time: "12:15", date: "2025-02-04", read: true },

    // Rabu, 5 Feb
    { id: "5-9", fromMe: false, sender: "partner", text: "Dapet tawaran endorse satu lagi! Brand skincare", time: "14:00", date: "2025-02-05", read: true },
    { id: "5-10", fromMe: true, sender: "user", text: "Tuh kan! Bukti kalau kerjaan kamu beneran hasilin", time: "14:10", date: "2025-02-05", read: true },

    // Kamis, 6 Feb
    { id: "5-11", fromMe: false, sender: "partner", text: "Tadi pagi berantem sama mamah lagi gara-gara masalah kerja", time: "08:33", date: "2025-02-06", read: true },
    { id: "5-12", fromMe: true, sender: "user", text: "Sabar ya sayang. Kamu tahu kok yang terbaik buat kamu", time: "08:45", date: "2025-02-06", read: true },

    // Jumat, 7 Feb
    { id: "5-13", fromMe: true, sender: "user", text: "Weekend ini mau jalan-jalan?", time: "20:00", date: "2025-02-07", read: true },
    { id: "5-14", fromMe: false, sender: "partner", text: "Mau banget! Butuh refreshing", time: "20:15", date: "2025-02-07", read: true },

    // Sabtu, 8 Feb
    { id: "5-15", fromMe: false, sender: "partner", text: "Pantainya bagus banget ya. Makasih udah ajak ke sini", time: "16:00", date: "2025-02-08", read: true },
    { id: "5-16", fromMe: true, sender: "user", text: "Sama-sama. Seneng liat kamu happy lagi", time: "16:15", date: "2025-02-08", read: true },

    // Minggu, 9 Feb
    { id: "5-17", fromMe: false, sender: "partner", text: "Pulang-pulang mamah langsung tanya, 'kapan cari kerja beneran?'", time: "21:00", date: "2025-02-09", read: true },
    { id: "5-18", fromMe: true, sender: "user", text: "Jangan langsung dimasukin hati ya. Kamu lakuin ini buat masa depan kamu", time: "21:15", date: "2025-02-09", read: true },

    // Senin, 10 Feb
    { id: "5-19", fromMe: false, sender: "partner", text: "Pagi! Mood-nya lagi gak enak gara-gara omongan semalam", time: "08:30", date: "2025-02-10", read: true },
    { id: "5-20", fromMe: true, sender: "user", text: "Semangat Ayu! Kopi nunggu nih", time: "08:45", date: "2025-02-10", read: true },

    // Selasa, 11 Feb
    { id: "5-21", fromMe: false, sender: "partner", text: "Iya sih... tapi kadang aku juga ragu", time: "08:47", date: "2025-02-11", read: true },
    { id: "5-22", fromMe: true, sender: "user", text: "Ragu kenapa? Kamu passionate sama kerjaan kamu kan?", time: "08:50", date: "2025-02-11", read: true },

    // Rabu, 12 Feb
    { id: "5-23", fromMe: false, sender: "partner", text: "Iya tapi takut mamah benar juga...", time: "08:52", date: "2025-02-11", read: true },
    { id: "5-24", fromMe: true, sender: "user", text: "Ayu, jangan overthink dulu. Fokus ke apa yang bikin kamu happy", time: "08:55", date: "2025-02-11", read: true },

    // Kamis, 13 Feb
    { id: "5-25", fromMe: true, sender: "user", text: "Besok Valentine, mau surprise apa?", time: "12:00", date: "2025-02-13", read: true },
    { id: "5-26", fromMe: false, sender: "partner", text: "Apa aja yang penting sama kamu", time: "12:15", date: "2025-02-13", read: true },

    // Jumat, 14 Feb
    { id: "5-27", fromMe: true, sender: "user", text: "Happy Valentine Ayu! ❤️", time: "09:00", date: "2025-02-14", read: true },
    { id: "5-28", fromMe: false, sender: "partner", text: "Happy Valentine juga sayang! Makasih kadonya 🥰", time: "20:00", date: "2025-02-14", read: true },

    // Sabtu, 15 Feb
    { id: "5-29", fromMe: false, sender: "partner", text: "Mamah akhirnya dukung! Tadi aku liatin insight bulan ini", time: "14:00", date: "2025-02-15", read: true },
    { id: "5-30", fromMe: true, sender: "user", text: "SERIUS? Wah selamat ya Ayu! Aku ikut bangga", time: "14:15", date: "2025-02-15", read: true },
    { id: "5-31", fromMe: false, sender: "partner", text: "Makasih udah dengerin aku selama ini 💚", time: "14:30", date: "2025-02-15", read: false },
  ],
};

export const dummyAnalysis: Record<string, FullAnalysis> = {
  "1": {
    quickReply: {
      calm: {
        text: "Brig, aku paham kamu lagi sibuk banget sama project itu. Tapi jujur, aku ngerasa kesepian nunggu kabar kamu terus. Bisa gak kita luangin waktu 15 menit aja tiap malem buat ngobrol santai tanpa bahas kerjaan?",
        reason: "Menyampaikan perasaan tanpa menyalahkan, memberi solusi konkret yang ringan."
      },
      firm: {
        text: "Aku support karier kamu, tapi aku gak bisa kalau terus-terusan jadi nomor dua setelah kerjaan. Kita perlu omongin soal batasan waktu kerja kamu, karena aku juga butuh kehadiran kamu di hubungan ini.",
        reason: "Tegas soal kebutuhan diri dan meminta diskusi serius soal work-life balance."
      },
      empathetic: {
        text: "Aku tau kamu capek banget dan project ini penting buat kamu. Aku cuma kangen kita yang dulu sering jalan bareng. Kabarin ya kalau kamu udah lebih lega, aku pengen banget kita quality time lagi.",
        reason: "Menunjukkan pengertian atas beban partner sambil tetap mengomunikasikan rasa kehilangan."
      }
    },
    conflictAnalysis: {
      score: 68, level: "medium",
      summary: "Percakapan Sabtu 15 Feb menunjukkan ketegangan yang sudah menumpuk selama 2 minggu. User merasa tidak diprioritaskan dan frustrasi dengan siklus janji-sibuk yang dilakukan Brigida. Komunikasi menjadi reaktif di kedua sisi.",
      perspectives: {
        you: { feels: ["Diabaikan", "Lelah menunggu", "Gak diprioritaskan"], means: "Aku butuh bukti kamu masih peduli, bukan hanya kata-kata" },
        partner: { feels: ["Tertekan deadline", "Sudah berusaha keras", "Merasa tidak dimengerti"], means: "Aku kerja juga buat masa depan kita" },
        misunderstanding: "\"Capek atau emang udah gak mau effort?\" ditafsir sebagai tuduhan/serangan balik."
      },
      patterns: { defensiveness: 72, avoidance: 45, escalation: 68, repeatedTopics: ["Quality time", "Work-life balance", "Feeling neglected"] },
      rootCause: ["Kebutuhan validasi emosional tidak terpenuhi", "Ekspektasi berbeda (hasil kerja vs kehadiran)", "Ketakutan akan diabaikan secara permanen"],
      betterResponse: { original: "Capek atau emang udah gak mau effort?", improved: "Aku sadar akhir-akhir ini situasinya sulit buat kita berdua. Kamu capek kerja, aku capek nunggu. Gimana kalau kita cari jalan tengahnya besok?" }
    },
    patternDetection: {
      mainPattern: "Siklus Sibuk Kerja → Pasangan Neglected → Konflik → Rekonsiliasi Sementara → Repeat",
      frequency: "Konflik terjadi 4x dalam 2 minggu ini",
      triggers: ["User mengumumkan lembur", "Rencana weekend gagal", "Respons lambat saat sibuk"],
      cycle: "1. User sibuk → 2. Brigida merasa neglected → 3. Sinyal indirect → 4. Konfrontasi → 5. Rekonsiliasi sementara",
      recommendation: "Set 'non-negotiable date' minimal 1x seminggu. Komunikasikan jadwal sibuk di awal minggu."
    },
    specificQuestions: [
      { question: "Siapa yang salah dalam konflik ini?", answer: "Tidak ada yang sepenuhnya salah. User kurang menjaga konsistensi janji, Brigida kurang langsung mengekspresikan kebutuhan (memakai sinyal indirect)." },
      { question: "Kenapa Brigida bilang 'situasinya selalu kayak gini'?", answer: "Karena pola yang sama berulang minimal 4 kali dalam 2 minggu. Ini ekspresi frustrasi akumulatif, bukan sekadar kejadian tunggal." },
      { question: "Apa maksud Brigida 'bukan soal nunggu, soal prioritas'?", answer: "Dia tidak keberatan menunggu keterlambatan sesekali, tapi dia merasa bahwa pekerjaan selalu menempati urutan pertama di atas hubungan mereka." },
      { question: "Apakah hubungan ini masih bisa diselamatkan?", answer: "Ya, karena Brigida masih mau bicara jujur. Red flag baru muncul kalau pasangan sudah diam dan tidak mau membahas masalah lagi." }
    ]
  },
  "2": {
    quickReply: {
      calm: {
        text: "Bud, aku gak marah. Tapi aku mau kamu tau ini nyakitin aku. Ini bukan pertama kalinya, dan aku mulai questioning apakah kamu beneran mau aku jadi bagian dari hidupmu. Bisa kita ngobrol serius soal ini?",
        reason: "Tenang tapi tegas, fokus ke dampak emosional bukan menyalahkan."
      },
      firm: {
        text: "Budi, 'maaf' tanpa perubahan itu gak meaningful. Ini kedua kalinya dalam minggu ini, dan aku udah sabar. Aku butuh kamu show up buat aku dengan tindakan, bukan kata-kata. Kapan kamu siap melakukan itu?",
        reason: "Tegas minta akuntabilitas konkret, tidak menerima permintaan maaf kosong."
      },
      empathetic: {
        text: "Aku tau kamu gak sengaja, Bud. Tapi aku pengen jadi bagian dari hidupmu, especially momen penting kayak ultah mama. Bisa kita duduk bareng dan ngobrolin gimana supaya aku bisa lebih diikutsertain?",
        reason: "Fokus solusi bareng, bukan menyalahkan, tetap kolaboratif."
      }
    },
    conflictAnalysis: {
      score: 74, level: "high",
      summary: "User sudah menumpuk kekecewaan selama 2 minggu — dari tidak dikenalkan ke saudara, pembatalan rencana, hingga tidak diajak ke ulang tahun mama. Budi terus memberi alasan dan 'maaf' tanpa tindakan nyata.",
      perspectives: {
        you: { feels: ["Tidak dihargai", "Tidak diakui", "Mempertanyakan keseriusan"], means: "Ingin diakui sebagai bagian penting dari hidup Budi" },
        partner: { feels: ["Tidak berniat menyakiti", "Situasi belum pas"], means: "Bukan menolak, tapi kurang mindful terhadap timing dan perasaan pasangan" },
        misunderstanding: "\"Maaf ya kalau aku kelewatan\" terdengar meremehkan masalah akumulatif bagi user."
      },
      patterns: { defensiveness: 82, avoidance: 78, escalation: 74, repeatedTopics: ["Being included", "Feeling valued", "Empty apologies"] },
      rootCause: ["Budi belum sepenuhnya mengintegrasikan user ke hidupnya", "Pola 'apology without action' yang berulang", "Kemungkinan ketidakyakinan soal komitmen jangka panjang"],
      betterResponse: { original: "Maaf ya kalau aku kelewatan", improved: "Aku minta maaf banget. Aku sadar ini bukan pertama kali, dan itu salah aku. Minggu depan aku mau kenalkan kamu ke mama." }
    },
    patternDetection: {
      mainPattern: "Exclusion Pattern — User Tidak Diikutsertakan → Alasan → Apology → No Action → Repeat",
      frequency: "5 kejadian dalam 2 minggu",
      triggers: ["Acara keluarga/sosial Budi", "User menunjukkan keinginan diikutsertakan", "Budi menghindar dengan alasan 'nanti'"],
      cycle: "1. Acara penting → 2. Budi lupa/tidak ajak → 3. Konfrontasi → 4. Alasan/Apology → 5. No action → 6. Repeat",
      recommendation: "Diperlukan percakapan serius soal commitment level. Minta komitmen konkret dengan tanggal pasti."
    },
    specificQuestions: [
      { question: "Apakah Budi beneran lupa atau sengaja tidak mengajak aku?", answer: "Berdasarkan pola 2 minggu, ini bukan kelupaan acak. Budi sudah diberitahu sebelumnya tetap tidak mengajak. Ini lebih ke keputusan sadar yang disamarkan sebagai 'lupa'." },
      { question: "Kenapa Budi selalu bilang 'belum ada momen yang pas'?", answer: "Ini adalah mechanism pertahanan diri — dengan bilang 'belum pas', Budi menghindari komitmen tanpa harus secara eksplisit menolak." },
      { question: "Apa yang harus aku lakukan setelah ini?", answer: "Jangan terima permintaan maaf tanpa rencana aksi. Minta satu komitmen konkret yang bisa diukur, misal: 'Kenalkan ke keluarga sebelum akhir bulan'." }
    ]
  },
  "3": {
    quickReply: {
      calm: {
        text: "Rin, aku notice kamu lagi gak oke. Aku gak bisa baca pikiran kamu kalau kamu belum siap cerita. Tapi kalau kamu butuh dengerin aku, atau cuma mau ditemenin lewat voice call, aku di sini ya. LDR emang berat buat kita berdua.",
        reason: "Calm dan proactive, ajak komunikasi terbuka tanpa memaksa."
      },
      firm: {
        text: "Rina, kalau kamu bilang 'gak apa-apa' padahal jelas ada masalah, itu bikin aku bingung dan frustrated. Kita gak bisa solve masalah kalau komunikasi kita cuma tebak-tebakan. Please be honest, apa yang bikin kamu ganjel hari ini?",
        reason: "Tegas tolak passive aggression, minta direct communication demi kesehatan hubungan."
      },
      empathetic: {
        text: "Sayang, aku feeling kamu lagi upset tapi takut bilang. Mungkin kamu ngerasa lonely ya minggu ini? Aku di sini ready dengerin kamu kok. Gak usah takut dibilang manja, aku emang pengen jadi tempat sharing kamu.",
        reason: "Empati dengan kesulitan LDR dan rasa sepi, buka safe space untuk kerentanan."
      }
    },
    conflictAnalysis: {
      score: 71, level: "high",
      summary: "Pola passive-aggressive yang konsisten selama 2 minggu. Rina mengekspresikan kesepian dan rasa haus perhatian melalui sindiran indirect, yang ditanggapi user dengan kebingungan yang memicu silent treatment.",
      perspectives: {
        you: { feels: ["Bingung", "Frustrated", "Lelah menebak"], means: "Ingin membantu tapi tidak tahu apa masalah spesifiknya" },
        partner: { feels: ["Lonely", "Diabaikan", "Takut terlihat needy"], means: "Ingin kamu lebih peka tanpa aku harus minta-minta terus" },
        misunderstanding: "\"Gak apa-apa kok\" sebenarnya adalah \"Aku sedih tapi aku mau kamu yang sadar sendiri\"."
      },
      patterns: { defensiveness: 58, avoidance: 85, escalation: 71, repeatedTopics: ["Quality time", "Response time", "Feeling neglected"] },
      rootCause: ["Loneliness LDR yang tidak terkomunikasikan dengan sehat", "Fear of being demanding/needy", "Perbedaan gaya komunikasi (Direct vs Indirect)"],
      betterResponse: { original: "Maksud kamu?", improved: "Rin, aku notice kamu bilang 'selalu gitu jawabannya'. Apa aku kurang ngasih waktu buat kamu? Talk to me please, aku pengen ngerti." }
    },
    patternDetection: {
      mainPattern: "Indirect Request for Attention → Unmet Expectation → Passive Aggressive Remark → Silent Treatment",
      frequency: "Terjadi hampir setiap hari dalam 14 hari terakhir",
      triggers: ["User sibuk kerja", "Chat dibalas singkat", "Kurangnya inisiatif call dari user"],
      cycle: "1. Rina merasa sepi → 2. Sinyal halus → 3. User gagal tangkap → 4. Sindiran → 5. Silent treatment",
      recommendation: "Gunakan 'Direct Expression' (belajar bilang 'aku kangen' daripada nyindir). Set jadwal rutin call tanpa gangguan."
    },
    specificQuestions: [
      { question: "Kenapa Rina sering bilang 'terserah kamu' atau 'gak apa-apa'?", answer: "Itu adalah bentuk 'protest behavior'. Dia ingin kamu mengejar dan mencari tahu sendiri sebagai bukti kepedulianmu." },
      { question: "Apakah Rina beneran sibuk atau cuma menghindar?", answer: "Dia tidak sibuk. Dia sengaja menarik diri (silent treatment) untuk menghukum user karena dianggap tidak peka." },
      { question: "Gimana cara ngadepin Rina kalau lagi mode ini?", answer: "Jangan ikut marah. Berikan validasi emosi tanpa menunggu dia ngomong: 'Aku tau LDR ini berat buat kamu, aku minta maaf kalau minggu ini kurang hadir'." }
    ]
  },
  "4": {
    quickReply: {
      calm: {
        text: "Dim, aku ngerti kamu khawatir. Tapi Reza beneran cuma temen satu tim. Aku gak mau ada yang disembunyiin dari kamu — kalau kamu mau, kapan-kapan kita lunch bertiga biar kamu kenal dia. I have nothing to hide.",
        reason: "Tawarkan transparansi total, hilangkan ambiguitas dengan solusi konkret."
      },
      firm: {
        text: "Dimas, aku udah jujur dari awal soal Reza. Aku gak bisa terus dipertanyakan setiap kali aku sebut nama temen kerja. Kita 3 tahun bareng, dan aku belum pernah kasih alasan untuk gak dipercaya. Masalahnya di Reza atau di rasa percaya kamu?",
        reason: "Tegas set boundaries, tunjukkan track record, redirect ke isu utama yaitu kepercayaan."
      },
      empathetic: {
        text: "Aku paham kamu insecure, dan aku gak marah karena itu. Tapi aku ada di sini sama kamu 3 tahun dan gak ke mana-mana. Reza gak ada apa-apanya dibanding kamu. Apa yang bisa aku lakukan biar kamu merasa lebih aman?",
        reason: "Validasi insecurity tanpa judgment, ajak Dimas kolaboratif dalam mencari solusi rasa aman."
      }
    },
    conflictAnalysis: {
      score: 76, level: "high",
      summary: "Konflik soal Reza sudah berlangsung 2 minggu dan semakin intens. Dimas menciptakan atmosfer curiga yang mengikis trust. User sudah mencoba transparan tapi tetap dipertanyakan secara interogatif.",
      perspectives: {
        you: { feels: ["Dicurigai tanpa alasan", "Lelah menjawab pertanyaan yang sama", "Frustrated"], means: "Ini murni pertemanan profesional, tidak ada maksud lain" },
        partner: { feels: ["Insecure", "Butuh reassurance", "Merasa tidak cukup diinformasikan"], means: "Bukan melarang berteman, tapi butuh rasa aman melalui transparansi proaktif" },
        misunderstanding: "\"Kamu overthinking deh\" terdengar seperti gaslighting bagi Dimas, meski user bermaksud menenangkan."
      },
      patterns: { defensiveness: 78, avoidance: 52, escalation: 76, repeatedTopics: ["Transparency", "Opposite-sex friendships", "Trust"] },
      rootCause: ["Kurangnya komunikasi proaktif di awal pertemanan baru", "Underlying insecurity Dimas yang tidak diaddress", "Past wounds yang kemungkinan belum sembuh"],
      betterResponse: { original: "Atau kamu yang gak transparent?", improved: "Aku minta maaf kalau aku kurang update soal Reza. Aku pengen kamu tenang, jadi aku bakal lebih cerita soal kerjaan tim kami ya." }
    },
    patternDetection: {
      mainPattern: "Insecurity Trigger → Interrogation → User Defensive → Dimas Menarik Diri → Escalation",
      frequency: "Siklus berulang hampir setiap hari dalam 2 minggu terakhir",
      triggers: ["User menyebut nama Reza", "User posting foto di mana ada Reza", "User dan Reza sukses secara profesional"],
      cycle: "1. Trigger muncul → 2. Dimas interogasi → 3. User defensive → 4. " + "Tension tersimpan → 5. Ledakan konflik",
      recommendation: "Address root insecurity-nya, bukan sekadar bahas Reza. Kenalkan Reza secara langsung untuk hapus misteri."
    },
    specificQuestions: [
      { question: "Apakah aku salah tidak langsung cerita soal Reza dari awal?", answer: "Tidak salah secara etika, tapi secara strategis dalam hubungan dengan partner insecure, cerita lebih awal bisa mencegah eskalasi ini." },
      { question: "Kenapa Dimas tiba-tiba bilang 'kita perlu ngobrol serius'?", answer: "Karena akumulasi 2 minggu ketidaknyamanan akhirnya meledak. Dia butuh kepastian yang selama ini dia cari lewat interogasi tapi tidak dia dapatkan." },
      { question: "Apakah ini tanda-tanda hubungan yang toxic?", answer: "Belum tentu toxic, tapi ada pola controlling-insecure. Red flag muncul kalau pertanyaan berubah menjadi larangan atau ancaman." }
    ]
  },
  "5": {
    quickReply: {
      calm: {
        text: "Sayang, keputusan akhirnya tetap di kamu ya. Tapi aku mau kamu tau kalau aku super proud sama progres kamu jadi creator. Mama mungkin butuh waktu buat ngerti, tapi aku percaya sama visi kamu. I'm with you all the way.",
        reason: "Supportive tanpa menggurui, memberdayakan otonomi Ayu sambil memberi rasa aman."
      },
      firm: {
        text: "Ayu, jangan biarkan ketakutan mama (atau ketakutan kamu sendiri) mematikan apa yang bikin kamu hidup. Kamu punya talenta langka. Stand firm on your path, dan biarkan hasil yang bicara nantinya. Kamu gak sendirian kok.",
        reason: "Mendorong ketegasan dan kepercayaan diri Ayu untuk mempertahankan pilihannya."
      },
      empathetic: {
        text: "Aku ngerti banget dilema kamu. Pengen berbakti tapi juga pengen ngejar mimpi. It's heart-wrenching. Tapi ingat, kamu paling bisa bantu mama kalau kamu sendiri bahagia dan sukses di jalanmu. Take a breath, aku di sini.",
        reason: "Empati mendalam untuk konflik internal antara ekspektasi keluarga vs passion pribadi."
      }
    },
    conflictAnalysis: {
      score: 32, level: "low",
      summary: "Ini bukan konflik internal hubungan, melainkan user sebagai support system utama saat Ayu menghadapi tekanan eksternal (keluarga). Komunikasi sangat sehat, terbuka, dan penuh dukungan.",
      perspectives: {
        you: { feels: ["Empatik", "Protektif", "Yakin pada Ayu"], means: "Aku ingin kamu merasa didengar dan didukung sepenuhnya" },
        partner: { feels: ["Cemas", "Ragu pada diri sendiri", "Tertekan"], means: "Aku butuh kamu jadi peganganku saat dunia (termasuk mama) meragukan aku" },
        misunderstanding: "Hampir tidak ada salah tafsir. Hubungan ini memiliki tingkat sinkronisasi emosional yang tinggi."
      },
      patterns: { defensiveness: 15, avoidance: 20, escalation: 10, repeatedTopics: ["Career choices", "Family pressure", "Self-validation"] },
      rootCause: ["Tekanan sosial/keluarga soal karir konvensional", "Normal self-doubt dalam perjalanan creative", "Kebutuhan akan 'safe harbor' emosional"],
      betterResponse: { original: "Ayu, jangan overthink dulu. Fokus ke apa yang bikin kamu happy", improved: "Ayu, aku lihat insight konten kamu luar biasa. Mama mungkin belum paham metriknya, tapi aku paham. Kamu hebat, jangan berhenti ya." }
    },
    patternDetection: {
      mainPattern: "Healthy Support System — External Stressor → Sharing → Empathetic Listening → Validation",
      frequency: "Terjadi setiap kali Ayu menghadapi deadline atau komentar mama",
      triggers: ["Obrolan keluarga soal 'kerjaan tetap'", "Fluktuasi views konten", "Momen pengambilan keputusan besar"],
      cycle: "1. Stres eksternal → 2. Ayu share → 3. User memvalidasi → 4. Ayu merasa 'recharged' → 5. Growth bareng",
      recommendation: "Pertahankan pola ini. Mungkin bisa bantu Ayu bikin slide/data sederhana buat pelan-pelan edukasi mama soal karirnya."
    },
    specificQuestions: [
      { question: "Kenapa Ayu merasa sangat bersalah sama mamanya?", answer: "Ayu anak yang berbakti. Dia melihat ketidaksenangan mamanya sebagai kegagalan dirinya untuk membahagiakan orang tua, padahal masalahnya hanya perbedaan paradigma soal karir." },
      { question: "Apakah karir content creator Ayu beneran menjanjikan?", answer: "Sangat. Insight menunjukkan 10k views dalam 3 jam untuk konten lifestyle. Ini indikator engagement yang sangat kuat untuk monetisasi jangka panjang." },
      { question: "Apa peran paling penting user dalam hubungan ini?", answer: "User berperan sebagai 'reality check' yang positif dan penyeimbang suara kritis mamanya. Tanpa user, Ayu kemungkinan besar sudah menyerah pada passion-nya." }
    ]
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
