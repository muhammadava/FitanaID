from typing import Dict, List, Any
from sqlalchemy.orm import Session
from app.models.medicine import Medicine

QUESTIONS: Dict[str, List[Dict]] = {
    "herbal": [
        {
            "id": "h_q1",
            "question": "Apa keluhan utama Anda saat ini?",
            "options": [
                {"value": "demam",       "label": "Demam / Panas Badan",      "tags": {"demam": 3, "infeksi": 1}},
                {"value": "batuk_pilek", "label": "Batuk & Pilek",             "tags": {"batuk": 3, "pilek": 2, "infeksi": 1}},
                {"value": "mual",        "label": "Mual / Muntah",             "tags": {"mual": 3, "pencernaan": 2}},
                {"value": "nyeri_sendi", "label": "Nyeri Sendi / Otot",        "tags": {"nyeri_sendi": 3, "radang": 2}},
                {"value": "pencernaan",  "label": "Gangguan Pencernaan",       "tags": {"pencernaan": 3, "mual": 1, "kembung": 2}},
                {"value": "liver",       "label": "Masalah Liver / Detoksifikasi", "tags": {"liver": 3, "detoks": 2}},
                {"value": "imunitas",    "label": "Daya Tahan Tubuh Lemah",   "tags": {"imunitas": 3, "infeksi": 1}},
                {"value": "gula_darah",  "label": "Kadar Gula Darah Tinggi",  "tags": {"diabetes": 3, "gula_darah": 3}},
                {"value": "stres",       "label": "Stres / Kecemasan",         "tags": {"stres": 3, "tidur": 1}},
                {"value": "kelelahan",   "label": "Kelelahan / Stamina Rendah","tags": {"stamina": 3, "kelelahan": 2}},
            ],
        },
        {
            "id": "h_q2",
            "question": "Sudah berapa lama keluhan berlangsung?",
            "options": [
                {"value": "baru",    "label": "Baru saja (< 1 hari)",    "tags": {"akut": 2}},
                {"value": "1_3hr",   "label": "1–3 hari",                 "tags": {"akut": 1}},
                {"value": "4_7hr",   "label": "4–7 hari",                 "tags": {"subakut": 2}},
                {"value": "2_4mg",   "label": "2–4 minggu",               "tags": {"kronik": 1}},
                {"value": "1_3bln",  "label": "1–3 bulan",                "tags": {"kronik": 2}},
                {"value": "6bln",    "label": "Lebih dari 6 bulan",       "tags": {"kronik": 3}},
                {"value": "hilang_timbul", "label": "Hilang timbul",      "tags": {"kronik": 1}},
                {"value": "tidak_tahu",    "label": "Tidak tahu",         "tags": {}},
                {"value": "sejak_kecil",   "label": "Sejak kecil / bawaan", "tags": {"kronik": 3}},
                {"value": "setelah_makan", "label": "Muncul setelah makan", "tags": {"pencernaan": 1}},
            ],
        },
        {
            "id": "h_q3",
            "question": "Apakah Anda memiliki kondisi kesehatan lain?",
            "options": [
                {"value": "tidak_ada",     "label": "Tidak ada",           "tags": {}, "contraindications": []},
                {"value": "hamil",         "label": "Sedang hamil",        "tags": {}, "contraindications": ["hamil"]},
                {"value": "menyusui",      "label": "Sedang menyusui",     "tags": {}, "contraindications": ["menyusui"]},
                {"value": "diabetes",      "label": "Diabetes",             "tags": {"diabetes": 1}, "contraindications": []},
                {"value": "hipertensi",    "label": "Hipertensi",           "tags": {"hipertensi": 1}, "contraindications": []},
                {"value": "maag",          "label": "Maag / GERD",          "tags": {"maag": 1}, "contraindications": ["maag_berat"]},
                {"value": "gangguan_liver","label": "Gangguan Liver",       "tags": {}, "contraindications": ["gangguan_liver"]},
                {"value": "gagal_ginjal",  "label": "Gagal Ginjal",         "tags": {}, "contraindications": ["gagal_ginjal"]},
                {"value": "lansia",        "label": "Lansia (> 65 tahun)", "tags": {}, "contraindications": []},
                {"value": "anak",          "label": "Anak-anak (< 12 thn)", "tags": {}, "contraindications": ["anak"]},
            ],
        },
        {
            "id": "h_q4",
            "question": "Bentuk sediaan yang Anda inginkan?",
            "options": [
                {"value": "kapsul",  "label": "Kapsul",                    "tags": {"kapsul": 2}},
                {"value": "tablet",  "label": "Tablet",                    "tags": {"tablet": 2}},
                {"value": "sirup",   "label": "Sirup / Cair",              "tags": {"sirup": 2}},
                {"value": "serbuk",  "label": "Serbuk / Sachet",           "tags": {"serbuk": 2}},
                {"value": "ekstrak", "label": "Ekstrak / Tetes",           "tags": {"ekstrak": 2}},
                {"value": "rebusan", "label": "Rebusan / Teh Herbal",      "tags": {"rebusan": 2}},
                {"value": "patch",   "label": "Koyo / Patch",              "tags": {"topikal": 2}},
                {"value": "salep",   "label": "Salep / Krim Topikal",      "tags": {"topikal": 2}},
                {"value": "pil",     "label": "Pil",                       "tags": {"tablet": 1}},
                {"value": "tidak_peduli", "label": "Tidak ada preferensi", "tags": {}},
            ],
        },
        {
            "id": "h_q5",
            "question": "Seberapa sering Anda bersedia mengonsumsi?",
            "options": [
                {"value": "1x_hr",  "label": "1x sehari",          "tags": {"praktis": 2}},
                {"value": "2x_hr",  "label": "2x sehari",          "tags": {}},
                {"value": "3x_hr",  "label": "3x sehari",          "tags": {}},
                {"value": "sebelum_makan", "label": "Sebelum makan", "tags": {"pencernaan": 1}},
                {"value": "sesudah_makan", "label": "Sesudah makan", "tags": {}},
                {"value": "saat_gejala",   "label": "Hanya saat gejala muncul", "tags": {"akut": 1}},
                {"value": "rutin_pagi",    "label": "Rutin pagi hari", "tags": {"stamina": 1}},
                {"value": "malam",         "label": "Malam sebelum tidur", "tags": {"tidur": 1}},
                {"value": "mingguan",      "label": "Beberapa kali seminggu", "tags": {}},
                {"value": "tidak_peduli",  "label": "Tidak ada preferensi", "tags": {}},
            ],
        },
    ],
    "kimia": [
        {
            "id": "k_q1",
            "question": "Apa keluhan utama Anda saat ini?",
            "options": [
                {"value": "demam",       "label": "Demam",                    "tags": {"demam": 3, "panas": 2}},
                {"value": "sakit_kepala","label": "Sakit Kepala / Migrain",   "tags": {"sakit_kepala": 3, "nyeri": 2}},
                {"value": "nyeri_otot",  "label": "Nyeri Otot / Sendi",       "tags": {"nyeri_otot": 3, "radang": 2}},
                {"value": "batuk",       "label": "Batuk",                     "tags": {"batuk": 3, "ekspektoran": 1}},
                {"value": "pilek_alergi","label": "Pilek / Alergi",           "tags": {"alergi": 3, "pilek": 2}},
                {"value": "maag",        "label": "Maag / Nyeri Lambung",     "tags": {"maag": 3, "asam_lambung": 2}},
                {"value": "diare",       "label": "Diare",                     "tags": {"diare": 3, "pencernaan": 1}},
                {"value": "infeksi",     "label": "Infeksi Bakteri",           "tags": {"infeksi": 3, "antibiotik": 2}},
                {"value": "hipertensi",  "label": "Tekanan Darah Tinggi",     "tags": {"hipertensi": 3}},
                {"value": "kolesterol",  "label": "Kolesterol Tinggi",        "tags": {"kolesterol": 3}},
            ],
        },
        {
            "id": "k_q2",
            "question": "Sudah berapa lama keluhan berlangsung?",
            "options": [
                {"value": "kurang_1hr",  "label": "< 1 jam",        "tags": {"akut": 3}},
                {"value": "bbrp_jam",    "label": "Beberapa jam",   "tags": {"akut": 2}},
                {"value": "1hr",         "label": "1 hari",         "tags": {"akut": 1}},
                {"value": "2_3hr",       "label": "2–3 hari",       "tags": {"subakut": 1}},
                {"value": "seminggu",    "label": "> 1 minggu",     "tags": {"kronik": 1}},
                {"value": "2_4mg",       "label": "2–4 minggu",     "tags": {"kronik": 2}},
                {"value": "berbulan",    "label": "Berbulan-bulan", "tags": {"kronik": 3}},
                {"value": "bertahun",    "label": "Bertahun-tahun", "tags": {"kronik": 3}},
                {"value": "hilang_timbul","label":"Hilang timbul",  "tags": {"kronik": 1}},
                {"value": "tidak_tahu",  "label": "Tidak tahu",    "tags": {}},
            ],
        },
        {
            "id": "k_q3",
            "question": "Apakah Anda memiliki kondisi kesehatan lain?",
            "options": [
                {"value": "tidak_ada",     "label": "Tidak ada",           "tags": {}, "contraindications": []},
                {"value": "hamil",         "label": "Sedang hamil",        "tags": {}, "contraindications": ["hamil", "nsaid"]},
                {"value": "menyusui",      "label": "Sedang menyusui",     "tags": {}, "contraindications": ["menyusui"]},
                {"value": "diabetes",      "label": "Diabetes",             "tags": {"diabetes": 1}, "contraindications": []},
                {"value": "hipertensi",    "label": "Hipertensi",           "tags": {}, "contraindications": ["hipertensi_berat"]},
                {"value": "maag_kronis",   "label": "Maag kronis",          "tags": {}, "contraindications": ["nsaid", "maag_berat"]},
                {"value": "gangguan_ginjal","label": "Gangguan Ginjal",    "tags": {}, "contraindications": ["nsaid", "gagal_ginjal"]},
                {"value": "gangguan_liver","label": "Gangguan Liver",       "tags": {}, "contraindications": ["hepatotoksik"]},
                {"value": "jantung",       "label": "Penyakit Jantung",     "tags": {}, "contraindications": []},
                {"value": "anak_kecil",    "label": "Anak < 12 tahun",     "tags": {}, "contraindications": ["anak", "aspirin"]},
            ],
        },
        {
            "id": "k_q4",
            "question": "Apakah Anda sedang mengonsumsi obat lain?",
            "options": [
                {"value": "tidak",       "label": "Tidak",                      "tags": {}},
                {"value": "antibiotik",  "label": "Antibiotik",                 "tags": {}, "contraindications": ["antibiotik_ganda"]},
                {"value": "antihipertensi","label":"Obat tekanan darah",        "tags": {}, "contraindications": []},
                {"value": "antikoagulan","label": "Pengencer darah (warfarin)", "tags": {}, "contraindications": ["antikoagulan"]},
                {"value": "insulin",     "label": "Insulin / metformin",        "tags": {}, "contraindications": []},
                {"value": "kortikosteroid","label":"Kortikosteroid",            "tags": {}, "contraindications": []},
                {"value": "antidepresan","label": "Antidepresan",               "tags": {}, "contraindications": []},
                {"value": "obat_jantung","label": "Obat jantung (digoxin)",    "tags": {}, "contraindications": []},
                {"value": "suplemen",    "label": "Suplemen herbal saja",       "tags": {}},
                {"value": "tidak_ingat", "label": "Tidak ingat / Tidak tahu",  "tags": {}},
            ],
        },
        {
            "id": "k_q5",
            "question": "Bentuk sediaan yang Anda inginkan?",
            "options": [
                {"value": "tablet",   "label": "Tablet",             "tags": {"tablet": 2}},
                {"value": "kapsul",   "label": "Kapsul",             "tags": {"kapsul": 2}},
                {"value": "sirup",    "label": "Sirup",              "tags": {"sirup": 2}},
                {"value": "injeksi",  "label": "Injeksi (suntik)",   "tags": {"injeksi": 2}},
                {"value": "suppositoria","label":"Suppositoria",      "tags": {}},
                {"value": "topikal",  "label": "Salep / Krim",       "tags": {"topikal": 2}},
                {"value": "tetes",    "label": "Tetes (mata/telinga)","tags": {}},
                {"value": "inhaler",  "label": "Inhaler",            "tags": {"inhaler": 2}},
                {"value": "patch",    "label": "Koyo / Patch",       "tags": {"topikal": 1}},
                {"value": "tidak_peduli","label":"Tidak ada preferensi","tags": {}},
            ],
        },
    ],
    "vitamin": [
        {
            "id": "v_q1",
            "question": "Apa yang ingin Anda tingkatkan atau jaga?",
            "options": [
                {"value": "imunitas",    "label": "Daya Tahan Tubuh",         "tags": {"imunitas": 3, "antioksidan": 1}},
                {"value": "tulang",      "label": "Kesehatan Tulang & Sendi", "tags": {"tulang": 3, "kalsium": 2}},
                {"value": "energi",      "label": "Energi & Stamina",         "tags": {"energi": 3, "stamina": 2}},
                {"value": "kulit",       "label": "Kesehatan Kulit & Rambut", "tags": {"kulit": 3, "antioksidan": 2}},
                {"value": "mata",        "label": "Kesehatan Mata",           "tags": {"mata": 3}},
                {"value": "jantung",     "label": "Kesehatan Jantung",        "tags": {"jantung": 3, "kolesterol": 1}},
                {"value": "otak",        "label": "Fungsi Otak & Konsentrasi","tags": {"otak": 3, "kognitif": 2}},
                {"value": "saraf",       "label": "Sistem Saraf",             "tags": {"saraf": 3, "neuropati": 1}},
                {"value": "ibu_hamil",   "label": "Kehamilan & Menyusui",    "tags": {"kehamilan": 3, "folat": 2}},
                {"value": "pemulihan",   "label": "Pemulihan Pasca Sakit",   "tags": {"pemulihan": 3, "imunitas": 2}},
            ],
        },
        {
            "id": "v_q2",
            "question": "Apakah Anda mengalami gejala kekurangan nutrisi tertentu?",
            "options": [
                {"value": "tidak_ada",    "label": "Tidak ada gejala khusus",  "tags": {}},
                {"value": "sering_sakit", "label": "Sering sakit / mudah tertular", "tags": {"imunitas": 2}},
                {"value": "tulang_lemah", "label": "Tulang lemah / mudah kram","tags": {"kalsium": 2, "vitamin_d": 2}},
                {"value": "lesu",         "label": "Mudah lelah / lesu",       "tags": {"energi": 2, "vitamin_b": 2, "zat_besi": 1}},
                {"value": "rambut_rontok","label": "Rambut rontok / kuku rapuh","tags": {"biotin": 2, "zinc": 1}},
                {"value": "kulit_kering", "label": "Kulit kering / kusam",     "tags": {"vitamin_e": 2, "kolagen": 1}},
                {"value": "penglihatan",  "label": "Penglihatan buram / rabun senja","tags": {"vitamin_a": 2, "mata": 2}},
                {"value": "kesemutan",    "label": "Kesemutan / mati rasa",    "tags": {"vitamin_b12": 2, "saraf": 2}},
                {"value": "sariawan",     "label": "Sering sariawan",          "tags": {"vitamin_c": 2, "zinc": 1}},
                {"value": "depresi_mood", "label": "Mood rendah / depresi ringan","tags": {"vitamin_d": 2, "omega3": 1}},
            ],
        },
        {
            "id": "v_q3",
            "question": "Bagaimana gaya hidup Anda sehari-hari?",
            "options": [
                {"value": "kantoran",    "label": "Banyak di dalam ruangan / kantor","tags": {"vitamin_d": 2}},
                {"value": "aktif_olahraga","label":"Aktif berolahraga",         "tags": {"energi": 2, "pemulihan": 1}},
                {"value": "vegetarian",  "label": "Vegetarian / vegan",         "tags": {"vitamin_b12": 2, "zat_besi": 2}},
                {"value": "diet_ketat",  "label": "Diet ketat / pembatasan kalori","tags": {"multivitamin": 2}},
                {"value": "stres_tinggi","label": "Stres tinggi / padat kerja", "tags": {"vitamin_b": 2, "magnesium": 1}},
                {"value": "perokok",     "label": "Perokok",                    "tags": {"vitamin_c": 2, "antioksidan": 2}},
                {"value": "lanjut_usia", "label": "Lanjut usia (> 50 tahun)",  "tags": {"vitamin_d": 2, "kalsium": 2, "vitamin_b12": 1}},
                {"value": "ibu_hamil",   "label": "Ibu hamil / menyusui",     "tags": {"folat": 3, "zat_besi": 2}},
                {"value": "anak_tumbuh", "label": "Anak dalam masa pertumbuhan","tags": {"kalsium": 2, "vitamin_d": 1}},
                {"value": "normal",      "label": "Gaya hidup sehat / normal", "tags": {}},
            ],
        },
        {
            "id": "v_q4",
            "question": "Apakah Anda memiliki kondisi atau kebutuhan khusus?",
            "options": [
                {"value": "tidak_ada",    "label": "Tidak ada",                "tags": {}, "contraindications": []},
                {"value": "hamil",        "label": "Sedang hamil",             "tags": {"folat": 2}, "contraindications": ["dosis_tinggi_a"]},
                {"value": "diabetes",     "label": "Diabetes",                 "tags": {}, "contraindications": []},
                {"value": "hipertensi",   "label": "Hipertensi",               "tags": {}, "contraindications": []},
                {"value": "batu_ginjal",  "label": "Riwayat batu ginjal",     "tags": {}, "contraindications": ["kalsium_tinggi", "vitamin_c_tinggi"]},
                {"value": "hemokromatosis","label":"Kelebihan zat besi",       "tags": {}, "contraindications": ["zat_besi"]},
                {"value": "alergi_susu",  "label": "Alergi/intoleransi susu", "tags": {}, "contraindications": []},
                {"value": "gangguan_tiroid","label":"Gangguan tiroid",         "tags": {}, "contraindications": []},
                {"value": "autoimun",     "label": "Penyakit autoimun",        "tags": {}, "contraindications": []},
                {"value": "anak",         "label": "Anak < 12 tahun",         "tags": {}, "contraindications": ["dosis_dewasa"]},
            ],
        },
        {
            "id": "v_q5",
            "question": "Bentuk sediaan yang Anda inginkan?",
            "options": [
                {"value": "tablet",    "label": "Tablet",            "tags": {"tablet": 2}},
                {"value": "kapsul_gel","label": "Kapsul gel (softgel)","tags": {"kapsul": 2}},
                {"value": "kaplet",    "label": "Kaplet",            "tags": {"tablet": 1}},
                {"value": "effervescent","label":"Effervescent (larut air)","tags": {"effervescent": 2}},
                {"value": "sirup",     "label": "Sirup / Cair",      "tags": {"sirup": 2}},
                {"value": "gummy",     "label": "Gummy / Kunyah",    "tags": {"gummy": 2}},
                {"value": "serbuk",    "label": "Serbuk / Sachet",   "tags": {"serbuk": 2}},
                {"value": "tetes",     "label": "Tetes",             "tags": {"tetes": 2}},
                {"value": "injeksi",   "label": "Injeksi (suntik)",  "tags": {}},
                {"value": "tidak_peduli","label":"Tidak ada preferensi","tags": {}},
            ],
        },
    ],
    "suplemen": [
        {
            "id": "s_q1",
            "question": "Apa tujuan utama Anda mengonsumsi suplemen?",
            "options": [
                {"value": "massa_otot",  "label": "Meningkatkan Massa Otot",   "tags": {"massa_otot": 3, "protein": 2}},
                {"value": "kebugaran",   "label": "Kebugaran & Performa Olahraga","tags": {"kebugaran": 3, "stamina": 2}},
                {"value": "penurunan_bb","label": "Penurunan Berat Badan",     "tags": {"penurunan_bb": 3, "metabolisme": 2}},
                {"value": "stamina",     "label": "Stamina & Energi Harian",   "tags": {"stamina": 3, "energi": 2}},
                {"value": "kecantikan",  "label": "Kecantikan & Kulit",        "tags": {"kulit": 3, "kolagen": 2}},
                {"value": "anti_aging",  "label": "Anti-Aging",                "tags": {"anti_aging": 3, "antioksidan": 2}},
                {"value": "kognitif",    "label": "Fungsi Otak / Fokus",       "tags": {"kognitif": 3, "otak": 2}},
                {"value": "tidur",       "label": "Kualitas Tidur",            "tags": {"tidur": 3}},
                {"value": "pencernaan",  "label": "Kesehatan Pencernaan",      "tags": {"probiotik": 3, "pencernaan": 2}},
                {"value": "imunitas",    "label": "Meningkatkan Imunitas",     "tags": {"imunitas": 3, "antioksidan": 1}},
            ],
        },
        {
            "id": "s_q2",
            "question": "Bagaimana level aktivitas fisik Anda?",
            "options": [
                {"value": "sedentari",   "label": "Sangat sedikit gerak (meja kerja)", "tags": {"metabolisme": 1}},
                {"value": "ringan",      "label": "Ringan (jalan kaki, peregangan)",   "tags": {}},
                {"value": "sedang",      "label": "Sedang (olahraga 2-3x/minggu)",     "tags": {"kebugaran": 1}},
                {"value": "aktif",       "label": "Aktif (olahraga 4-5x/minggu)",      "tags": {"kebugaran": 2, "pemulihan": 1}},
                {"value": "sangat_aktif","label": "Sangat aktif / atlet",              "tags": {"protein": 2, "pemulihan": 2}},
                {"value": "gym",         "label": "Gym / angkat beban rutin",          "tags": {"massa_otot": 2, "protein": 2}},
                {"value": "cardio",      "label": "Kardio intensif (lari, sepeda)",    "tags": {"stamina": 2, "energi": 1}},
                {"value": "yoga",        "label": "Yoga / pilates / meditasi",         "tags": {"fleksibilitas": 1}},
                {"value": "lansia",      "label": "Lansia / rehabilitasi",             "tags": {"sendi": 1}},
                {"value": "tidak_rutin", "label": "Tidak rutin / berubah-ubah",        "tags": {}},
            ],
        },
        {
            "id": "s_q3",
            "question": "Apakah Anda memiliki kondisi atau kebutuhan khusus?",
            "options": [
                {"value": "tidak_ada",  "label": "Tidak ada",                   "tags": {}, "contraindications": []},
                {"value": "hamil",      "label": "Sedang hamil",                "tags": {}, "contraindications": ["stimulan", "high_caffeine"]},
                {"value": "diabetes",   "label": "Diabetes",                    "tags": {}, "contraindications": ["gula_tinggi"]},
                {"value": "hipertensi", "label": "Hipertensi",                  "tags": {}, "contraindications": ["stimulan", "high_caffeine"]},
                {"value": "alergi_susu","label": "Alergi/intoleransi susu",    "tags": {}, "contraindications": ["whey", "kasein"]},
                {"value": "vegetarian", "label": "Vegetarian / vegan",          "tags": {}, "contraindications": ["gelatin", "whey"]},
                {"value": "ginjal",     "label": "Masalah ginjal",              "tags": {}, "contraindications": ["protein_tinggi", "creatine"]},
                {"value": "hati",       "label": "Masalah hati",               "tags": {}, "contraindications": ["hepatotoksik"]},
                {"value": "jantung",    "label": "Penyakit jantung",            "tags": {}, "contraindications": ["stimulan"]},
                {"value": "anak",       "label": "Anak < 18 tahun",            "tags": {}, "contraindications": ["stimulan", "high_caffeine"]},
            ],
        },
        {
            "id": "s_q4",
            "question": "Apa preferensi bahan/sumber suplemen Anda?",
            "options": [
                {"value": "alami",       "label": "Bahan alami / organik",           "tags": {"alami": 2}},
                {"value": "whey",        "label": "Berbasis susu (whey, kasein)",    "tags": {"whey": 2, "protein": 1}},
                {"value": "plant_based", "label": "Berbasis tanaman (plant-based)",  "tags": {"plant_based": 2}},
                {"value": "marine",      "label": "Berbasis laut (fish oil, collagen fish)", "tags": {"marine": 2}},
                {"value": "bee",         "label": "Berbasis lebah (madu, propolis)", "tags": {"bee": 2}},
                {"value": "fungi",       "label": "Jamur (mushroom complex)",        "tags": {"fungi": 2}},
                {"value": "ayurvedic",   "label": "Tradisional Ayurveda",            "tags": {"ayurveda": 2}},
                {"value": "sintetis",    "label": "Sintetis tidak masalah",          "tags": {}},
                {"value": "halal",       "label": "Bersertifikat halal",             "tags": {"halal": 2}},
                {"value": "tidak_peduli","label": "Tidak ada preferensi",            "tags": {}},
            ],
        },
        {
            "id": "s_q5",
            "question": "Kapan Anda berencana mengonsumsi suplemen?",
            "options": [
                {"value": "pagi",         "label": "Pagi sebelum aktivitas",     "tags": {"energi": 1}},
                {"value": "sebelum_olahraga","label":"Sebelum olahraga (pre-workout)","tags": {"pre_workout": 2, "stamina": 1}},
                {"value": "selama_olahraga","label":"Selama olahraga (intra-workout)","tags": {}},
                {"value": "setelah_olahraga","label":"Setelah olahraga (post-workout)","tags": {"pemulihan": 2, "protein": 1}},
                {"value": "bersama_makan","label": "Bersama makan",             "tags": {}},
                {"value": "malam",        "label": "Malam sebelum tidur",       "tags": {"tidur": 1}},
                {"value": "kapan_saja",   "label": "Kapan saja / fleksibel",    "tags": {}},
                {"value": "pagi_malam",   "label": "Pagi & malam (2x/hari)",    "tags": {}},
                {"value": "jeda_makan",   "label": "Di antara waktu makan",     "tags": {}},
                {"value": "tidak_peduli", "label": "Tidak ada preferensi",      "tags": {}},
            ],
        },
    ],
}


def get_questions(category: str) -> List[Dict]:
    return QUESTIONS.get(category, [])


def build_score_vector(answers: Dict[str, str]) -> Dict[str, float]:
    """Convert user answers into a tag-weight vector."""
    score_vector: Dict[str, float] = {}
    for category_questions in QUESTIONS.values():
        for question in category_questions:
            q_id = question["id"]
            user_answer = answers.get(q_id)
            if not user_answer:
                continue
            for option in question["options"]:
                if option["value"] == user_answer:
                    for tag, weight in option.get("tags", {}).items():
                        score_vector[tag] = score_vector.get(tag, 0) + weight
    return score_vector


def get_contraindications(answers: Dict[str, str]) -> List[str]:
    """Collect all contraindication keywords from user answers."""
    contras = []
    for category_questions in QUESTIONS.values():
        for question in category_questions:
            q_id = question["id"]
            user_answer = answers.get(q_id)
            if not user_answer:
                continue
            for option in question["options"]:
                if option["value"] == user_answer:
                    contras.extend(option.get("contraindications", []))
    return list(set(contras))


def score_medicine(medicine: "Medicine", score_vector: Dict[str, float]) -> tuple:
    """Calculate dot-product score between user vector and medicine relevance."""
    relevance = medicine.relevance_score or {}
    medicine_tags = set(medicine.tags or [])
    
    total_score = 0.0
    matched_tags = []
    
    # Dot-product: user score vector × medicine relevance weights
    for tag, user_weight in score_vector.items():
        if tag in relevance:
            total_score += user_weight * relevance[tag]
            matched_tags.append(tag)
        elif tag in medicine_tags:
            total_score += user_weight * 1.0
            matched_tags.append(tag)
    
    return total_score, matched_tags


MINIMUM_SCORE_THRESHOLD = 2.0

def run_consultation(
    db: Session,
    category: str,
    answers: Dict[str, str],
    user_id=None,
) -> Dict:
    """Main consultation engine: score, filter, rank, return top 3."""
    from app.models.consultation import ConsultationSession
    
    score_vector = build_score_vector(answers)
    user_contras = get_contraindications(answers)
    
    # Fetch all active medicines in the selected category
    medicines = (
        db.query(Medicine)
        .filter(Medicine.category == category, Medicine.is_active == True)
        .all()
    )
    
    scored = []
    for med in medicines:
        # Constraint filter: skip if medicine has a contraindication that matches user
        med_contras = med.contraindications or []
        if any(c in med_contras for c in user_contras):
            continue
        
        total_score, matched_tags = score_medicine(med, score_vector)
        
        if total_score >= MINIMUM_SCORE_THRESHOLD:
            scored.append((med, total_score, matched_tags))
    
    # Sort descending by score, take top 3
    scored.sort(key=lambda x: x[1], reverse=True)
    top3 = scored[:3]
    
    # Normalize to percentage (max score = highest in result set)
    max_score = top3[0][1] if top3 else 1.0
    
    recommendations = []
    for med, score, matched_tags in top3:
        match_percent = min(100, int((score / max_score) * 100))
        recommendations.append({
            "medicine": med,
            "score": round(score, 2),
            "match_percent": match_percent,
            "matched_tags": matched_tags,
        })
    
    # Save session
    session = ConsultationSession(
        user_id=user_id,
        category=category,
        answers=answers,
        symptoms=list(score_vector.keys()),
        result_ids=[str(r["medicine"].id) for r in recommendations],
        result_scores={str(r["medicine"].id): r["score"] for r in recommendations},
        status="completed",
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return {
        "session_id": session.id,
        "category": category,
        "recommendations": recommendations,
        "created_at": session.created_at,
    }
