// College Data
const colleges = [
    {
        id: 1,
        name: "PSG College of Technology",
        location: "Coimbatore",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 50000,
            max: 200000
        },
        courses: ["B.E.", "B.Tech", "M.Tech", "M.E."],
        website: "https://www.psgtech.edu/",
        image: "assets/images/colleges/psg.jpg",
        description: "PSG College of Technology is one of the premier engineering institutions in India, known for its academic excellence and industry partnerships.",
        facilities: ["Smart Classrooms", "Research Labs", "Sports Complex", "Library", "Hostel"],
        placement: {
            average: 6.5,
            highest: 12
        },
        coordinates: {
            latitude: 11.0168,
            longitude: 76.9558
        },
        contactInfo: {
            phone: "0422-2572177",
            email: "info@psgtech.edu",
            address: "Peelamedu, Coimbatore - 641004"
        },
        admissionProcess: "Based on TNEA counseling and direct admission",
        cutoffMarks: {
            "CSE": 195,
            "ECE": 190,
            "EEE": 185,
            "MECH": 180
        }
    },
    {
        id: 2,
        name: "Coimbatore Institute of Technology",
        location: "Coimbatore",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 45000,
            max: 180000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.cit.edu.in/",
        image: "assets/images/colleges/cit.jpg",
        description: "CIT is a government-aided engineering college known for its strong technical education and research programs.",
        facilities: ["Modern Labs", "Digital Library", "Sports Ground", "Hostel", "WiFi Campus"],
        placement: {
            average: 5.8,
            highest: 10
        },
        coordinates: {
            latitude: 11.0172,
            longitude: 76.9555
        },
        contactInfo: {
            phone: "0422-2574071",
            email: "info@cit.edu.in",
            address: "Civil Aerodrome Post, Coimbatore - 641014"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 190,
            "ECE": 185,
            "EEE": 180,
            "MECH": 175
        }
    },
    {
        id: 3,
        name: "Government College of Technology",
        location: "Coimbatore",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 40000,
            max: 150000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://gct.ac.in/",
        image: "assets/images/colleges/gct.jpg",
        description: "GCT is a premier government engineering institution with a rich heritage and strong academic programs.",
        facilities: ["Research Centers", "Central Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.5,
            highest: 9.5
        },
        coordinates: {
            latitude: 11.0165,
            longitude: 76.9550
        },
        contactInfo: {
            phone: "0422-2432221",
            email: "info@gct.ac.in",
            address: "Thadagam Road, Coimbatore - 641013"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 188,
            "ECE": 183,
            "EEE": 178,
            "MECH": 173
        }
    },
    {
        id: 4,
        name: "Kumaraguru College of Technology",
        location: "Coimbatore",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 55000,
            max: 220000
        },
        courses: ["B.E.", "B.Tech", "M.Tech", "M.E."],
        website: "https://www.kct.ac.in/",
        image: "assets/images/colleges/kct.jpg",
        description: "KCT is known for its innovative teaching methods, industry collaborations, and excellent placement records.",
        facilities: ["Smart Classrooms", "Research Labs", "Sports Complex", "Library", "Hostel"],
        placement: {
            average: 6.2,
            highest: 11.5
        },
        coordinates: {
            latitude: 11.0175,
            longitude: 76.9560
        },
        contactInfo: {
            phone: "0422-2661100",
            email: "info@kct.ac.in",
            address: "Chinnavedampatti, Coimbatore - 641049"
        },
        admissionProcess: "Based on TNEA counseling and direct admission",
        cutoffMarks: {
            "CSE": 192,
            "ECE": 187,
            "EEE": 182,
            "MECH": 177
        }
    },
    {
        id: 5,
        name: "Sri Krishna College of Engineering and Technology",
        location: "Coimbatore",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 50000,
            max: 200000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.skcet.ac.in/",
        image: "assets/images/colleges/skcet.jpg",
        description: "SKCET is known for its quality education, research focus, and strong industry connections.",
        facilities: ["Modern Labs", "Digital Library", "Sports Ground", "Hostel", "WiFi Campus"],
        placement: {
            average: 5.9,
            highest: 10.5
        },
        coordinates: {
            latitude: 11.0169,
            longitude: 76.9557
        },
        contactInfo: {
            phone: "0422-2678000",
            email: "info@skcet.ac.in",
            address: "Kuniamuthur, Coimbatore - 641008"
        },
        admissionProcess: "Based on TNEA counseling and direct admission",
        cutoffMarks: {
            "CSE": 189,
            "ECE": 184,
            "EEE": 179,
            "MECH": 174
        }
    },
    {
        id: 6,
        name: "Indian Institute of Technology Madras",
        location: "Chennai",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 200000,
            max: 500000
        },
        courses: ["B.Tech", "M.Tech", "Ph.D"],
        website: "https://www.iitm.ac.in/",
        image: "assets/images/colleges/iitm.jpg",
        description: "IIT Madras is one of the premier engineering institutions in India, known for its research excellence and academic rigor.",
        facilities: ["Research Centers", "Innovation Hub", "Sports Complex", "Central Library", "Hostel"],
        placement: {
            average: 12.5,
            highest: 45
        },
        coordinates: {
            latitude: 12.9915,
            longitude: 80.2337
        },
        contactInfo: {
            phone: "044-2257 8000",
            email: "info@iitm.ac.in",
            address: "IIT P.O., Chennai - 600036"
        },
        admissionProcess: "Based on JEE Advanced and GATE scores",
        cutoffMarks: {
            "CSE": 98,
            "ECE": 95,
            "EEE": 92,
            "MECH": 90
        }
    },
    {
        id: 7,
        name: "Anna University - College of Engineering, Guindy",
        location: "Chennai",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 50000,
            max: 200000
        },
        courses: ["B.E.", "B.Tech", "M.Tech", "M.E."],
        website: "https://www.annauniv.edu/",
        image: "assets/images/colleges/ceg.jpg",
        description: "CEG is one of the oldest and most prestigious engineering colleges in India, offering quality technical education.",
        facilities: ["Research Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 7.5,
            highest: 15
        },
        coordinates: {
            latitude: 13.0067,
            longitude: 80.2206
        },
        contactInfo: {
            phone: "044-2235 1771",
            email: "info@annauniv.edu",
            address: "Sardar Patel Road, Guindy, Chennai - 600025"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 195,
            "ECE": 190,
            "EEE": 185,
            "MECH": 180
        }
    },
    {
        id: 8,
        name: "Madras Institute of Technology",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 45000,
            max: 180000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.mitindia.edu/",
        image: "assets/images/colleges/mit.jpg",
        description: "MIT is known for its specialized programs in aeronautical, automobile, and electronics engineering.",
        facilities: ["Aerospace Labs", "Automotive Labs", "Digital Library", "Sports Complex", "Hostel"],
        placement: {
            average: 6.8,
            highest: 12
        },
        coordinates: {
            latitude: 12.9516,
            longitude: 80.1462
        },
        contactInfo: {
            phone: "044-2223 2404",
            email: "info@mitindia.edu",
            address: "Chromepet, Chennai - 600044"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 190,
            "ECE": 185,
            "EEE": 180,
            "MECH": 175
        }
    },
    {
        id: 9,
        name: "SRM Institute of Science and Technology",
        location: "Chennai",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 200000,
            max: 400000
        },
        courses: ["B.Tech", "M.Tech", "Ph.D"],
        website: "https://www.srmist.edu.in/",
        image: "assets/images/colleges/srm.jpg",
        description: "SRMIST is a leading private engineering institution known for its modern infrastructure and industry partnerships.",
        facilities: ["Smart Classrooms", "Research Labs", "Sports Complex", "Library", "Hostel"],
        placement: {
            average: 6.5,
            highest: 18
        },
        coordinates: {
            latitude: 12.8233,
            longitude: 80.0434
        },
        contactInfo: {
            phone: "044-2745 5000",
            email: "info@srmist.edu.in",
            address: "SRM Nagar, Kattankulathur, Chennai - 603203"
        },
        admissionProcess: "Based on SRMJEEE and TNEA counseling",
        cutoffMarks: {
            "CSE": 185,
            "ECE": 180,
            "EEE": 175,
            "MECH": 170
        }
    },
    {
        id: 10,
        name: "Sathyabama Institute of Science and Technology",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 180000,
            max: 350000
        },
        courses: ["B.Tech", "M.Tech", "Ph.D"],
        website: "https://www.sathyabama.ac.in/",
        image: "assets/images/colleges/sathyabama.jpg",
        description: "Sathyabama is known for its innovative teaching methods and strong industry connections.",
        facilities: ["Research Centers", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 6.2,
            highest: 15
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2450 3150",
            email: "info@sathyabama.ac.in",
            address: "Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai - 600119"
        },
        admissionProcess: "Based on Sathyabama All India Engineering Examination",
        cutoffMarks: {
            "CSE": 180,
            "ECE": 175,
            "EEE": 170,
            "MECH": 165
        }
    },
    {
        id: 11,
        name: "SSN College of Engineering",
        location: "Chennai",
        naacGrade: "A++",
        nbaAccredited: true,
        feeRange: {
            min: 150000,
            max: 300000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.ssn.edu.in/",
        image: "assets/images/colleges/ssn.jpg",
        description: "SSN College of Engineering is known for its academic excellence and strong industry connections.",
        facilities: ["Smart Classrooms", "Research Labs", "Sports Complex", "Library", "Hostel"],
        placement: {
            average: 6.8,
            highest: 16
        },
        coordinates: {
            latitude: 12.8233,
            longitude: 80.0434
        },
        contactInfo: {
            phone: "044-2746 9700",
            email: "info@ssn.edu.in",
            address: "Old Mahabalipuram Road, Kalavakkam, Chennai - 603110"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 185,
            "ECE": 180,
            "EEE": 175,
            "MECH": 170
        }
    },
    {
        id: 12,
        name: "Chennai Institute of Technology",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 120000,
            max: 250000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.citchennai.edu.in/",
        image: "assets/images/colleges/cit.jpg",
        description: "CIT is known for its quality education and industry-oriented curriculum.",
        facilities: ["Modern Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.5,
            highest: 12
        },
        coordinates: {
            latitude: 13.0067,
            longitude: 80.2206
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@citchennai.edu.in",
            address: "Kundrathur, Chennai - 600069"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 175,
            "ECE": 170,
            "EEE": 165,
            "MECH": 160
        }
    },
    {
        id: 13,
        name: "Rajalakshmi Engineering College",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 130000,
            max: 280000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.rajalakshmi.org/",
        image: "assets/images/colleges/rec.jpg",
        description: "REC is known for its innovative teaching methods and strong placement record.",
        facilities: ["Research Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.8,
            highest: 13
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2717 4444",
            email: "info@rajalakshmi.org",
            address: "Thandalam, Chennai - 602105"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 178,
            "ECE": 173,
            "EEE": 168,
            "MECH": 163
        }
    },
    {
        id: 14,
        name: "Velammal Engineering College",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 140000,
            max: 290000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.velammal.edu.in/",
        image: "assets/images/colleges/vec.jpg",
        description: "VEC is known for its quality education and excellent infrastructure.",
        facilities: ["Smart Classrooms", "Research Labs", "Sports Complex", "Library", "Hostel"],
        placement: {
            average: 6.0,
            highest: 14
        },
        coordinates: {
            latitude: 13.0067,
            longitude: 80.2206
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@velammal.edu.in",
            address: "Ambattur-Red Hills Road, Chennai - 600066"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 180,
            "ECE": 175,
            "EEE": 170,
            "MECH": 165
        }
    },
    {
        id: 15,
        name: "Panimalar Engineering College",
        location: "Chennai",
        naacGrade: "A",
        nbaAccredited: true,
        feeRange: {
            min: 110000,
            max: 240000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.panimalar.ac.in/",
        image: "assets/images/colleges/pec.jpg",
        description: "PEC is known for its industry-oriented curriculum and good placement record.",
        facilities: ["Modern Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.2,
            highest: 11
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@panimalar.ac.in",
            address: "Nazarathpet, Chennai - 602103"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 172,
            "ECE": 167,
            "EEE": 162,
            "MECH": 157
        }
    },
    {
        id: 16,
        name: "Jeppiaar Engineering College",
        location: "Chennai",
        naacGrade: "A",
        nbaAccredited: true,
        feeRange: {
            min: 100000,
            max: 230000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.jeppiaarcollege.org/",
        image: "assets/images/colleges/jec.jpg",
        description: "JEC is known for its quality education and industry-oriented curriculum.",
        facilities: ["Modern Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.0,
            highest: 10
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@jeppiaarcollege.org",
            address: "Old Mahabalipuram Road, Chennai - 600119"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 170,
            "ECE": 165,
            "EEE": 160,
            "MECH": 155
        }
    },
    {
        id: 17,
        name: "St. Joseph's College of Engineering",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 120000,
            max: 250000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.stjosephs.ac.in/",
        image: "assets/images/colleges/sjce.jpg",
        description: "SJCE is known for its academic excellence and strong industry connections.",
        facilities: ["Research Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.5,
            highest: 12
        },
        coordinates: {
            latitude: 13.0067,
            longitude: 80.2206
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@stjosephs.ac.in",
            address: "OMR, Chennai - 600119"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 175,
            "ECE": 170,
            "EEE": 165,
            "MECH": 160
        }
    },
    {
        id: 18,
        name: "Easwari Engineering College",
        location: "Chennai",
        naacGrade: "A",
        nbaAccredited: true,
        feeRange: {
            min: 110000,
            max: 240000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.eec.edu.in/",
        image: "assets/images/colleges/eec.jpg",
        description: "EEC is known for its quality education and good placement record.",
        facilities: ["Modern Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.2,
            highest: 11
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@eec.edu.in",
            address: "Ramapuram, Chennai - 600089"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 172,
            "ECE": 167,
            "EEE": 162,
            "MECH": 157
        }
    },
    {
        id: 19,
        name: "Meenakshi Sundararajan Engineering College",
        location: "Chennai",
        naacGrade: "A",
        nbaAccredited: true,
        feeRange: {
            min: 100000,
            max: 230000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.msec.edu.in/",
        image: "assets/images/colleges/msec.jpg",
        description: "MSEC is known for its industry-oriented curriculum and good placement record.",
        facilities: ["Modern Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.0,
            highest: 10
        },
        coordinates: {
            latitude: 13.0067,
            longitude: 80.2206
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@msec.edu.in",
            address: "Kodambakkam, Chennai - 600024"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 170,
            "ECE": 165,
            "EEE": 160,
            "MECH": 155
        }
    },
    {
        id: 20,
        name: "Sri Sairam Engineering College",
        location: "Chennai",
        naacGrade: "A+",
        nbaAccredited: true,
        feeRange: {
            min: 130000,
            max: 280000
        },
        courses: ["B.E.", "B.Tech", "M.Tech"],
        website: "https://www.sairam.edu.in/",
        image: "assets/images/colleges/ssec.jpg",
        description: "SSEC is known for its academic excellence and strong industry connections.",
        facilities: ["Research Labs", "Digital Library", "Sports Complex", "Hostel", "Industry Labs"],
        placement: {
            average: 5.8,
            highest: 13
        },
        coordinates: {
            latitude: 12.9047,
            longitude: 80.2264
        },
        contactInfo: {
            phone: "044-2345 6789",
            email: "info@sairam.edu.in",
            address: "West Tambaram, Chennai - 600044"
        },
        admissionProcess: "Based on TNEA counseling",
        cutoffMarks: {
            "CSE": 178,
            "ECE": 173,
            "EEE": 168,
            "MECH": 163
        }
    }
];

// Scholarship Data
const scholarships = [
    {
        id: 1,
        name: "Post Matric Scholarship for SC/ST Students",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "SC/ST students pursuing post-matriculation courses; annual family income should not exceed ₹2.5 lakhs."
        },
        benefits: {
            description: "Covers tuition fees, maintenance allowance, and other allowances."
        },
        applicationProcess: "Apply through the Tamil Nadu State Scholarship Portal (TNSSP)",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 2,
        name: "Post Matric Scholarship for BC/MBC/DNC Students",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "BC/MBC/DNC students pursuing post-matriculation courses; annual family income limits apply."
        },
        benefits: {
            description: "Covers tuition fees and maintenance allowance."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 3,
        name: "Free Education Scheme for SC/ST Students",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "SC/ST students admitted to professional courses in government and government-aided institutions."
        },
        benefits: {
            description: "Exemption from tuition and special fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 4,
        name: "Free Education Scheme for BC/MBC/DNC Students",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "BC/MBC/DNC students admitted to professional courses in government and government-aided institutions."
        },
        benefits: {
            description: "Exemption from tuition and special fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 5,
        name: "Dr. Ambedkar Medhavi Scholarship",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Meritorious SC/ST students pursuing professional courses."
        },
        benefits: {
            description: "Financial assistance for tuition and other fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 6,
        name: "EVR Nagammai Scholarship (for Girls)",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Female students from BC/MBC/DNC communities pursuing higher education."
        },
        benefits: {
            description: "Financial assistance for tuition and other fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 7,
        name: "PhD Scholarship (Full-Time Research Scholars)",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Full-time PhD scholars in government and government-aided institutions."
        },
        benefits: {
            description: "Monthly stipend for research activities."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 8,
        name: "Scholarship for Children of Deceased Government Servants",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Children of government servants who died in harness."
        },
        benefits: {
            description: "Financial assistance for education up to the college level."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 9,
        name: "Scholarship for Sons/Daughters of Differently-Abled Persons",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Children of differently-abled parents pursuing higher education."
        },
        benefits: {
            description: "Financial assistance for tuition and other fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 10,
        name: "Chief Minister's Special Scholarship for Differently-Abled Students",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Differently-abled students pursuing higher education."
        },
        benefits: {
            description: "Financial assistance for tuition and other fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    {
        id: 11,
        name: "Farmer's Children Scholarship (State Government Colleges only)",
        category: "Tamil Nadu State Government",
        eligibility: {
            description: "Children of farmers pursuing higher education."
        },
        benefits: {
            description: "Financial assistance for tuition and other fees."
        },
        applicationProcess: "Apply through the TNSSP",
        officialLink: "https://www.ssp.tn.gov.in/"
    },
    // Central Government Scholarships
    {
        id: 12,
        name: "Central Sector Scheme of Scholarship (CSSS)",
        category: "Central Government",
        eligibility: {
            description: "Students with above 80th percentile in Class XII pursuing regular degree courses; annual family income should not exceed ₹8 lakhs."
        },
        benefits: {
            description: "₹10,000 to ₹20,000 per annum."
        },
        applicationProcess: "Apply through the National Scholarship Portal (NSP)",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: 13,
        name: "AICTE Pragati Scholarship for Girls",
        category: "Central Government",
        eligibility: {
            description: "Girl students admitted to AICTE-approved technical courses; annual family income should not exceed ₹8 lakhs."
        },
        benefits: {
            description: "₹50,000 per annum."
        },
        applicationProcess: "Apply through the AICTE Portal",
        officialLink: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati/General-Instructions"
    },
    {
        id: 14,
        name: "AICTE Saksham Scholarship for Differently-Abled Students",
        category: "Central Government",
        eligibility: {
            description: "Differently-abled students admitted to AICTE-approved technical courses; annual family income should not exceed ₹8 lakhs."
        },
        benefits: {
            description: "₹50,000 per annum."
        },
        applicationProcess: "Apply through the AICTE Portal",
        officialLink: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati/General-Instructions"
    },
    {
        id: 15,
        name: "AICTE Swanath Scholarship",
        category: "Central Government",
        eligibility: {
            description: "Orphaned students or wards of armed forces and central paramilitary forces martyred in action; annual family income should not exceed ₹8 lakhs."
        },
        benefits: {
            description: "₹50,000 per annum."
        },
        applicationProcess: "Apply through the AICTE Portal",
        officialLink: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati/General-Instructions"
    },
    {
        id: 16,
        name: "INSPIRE Scholarship",
        category: "Central Government",
        eligibility: {
            description: "Top 1% in Class XII pursuing natural and basic sciences; age group 17–22 years."
        },
        benefits: {
            description: "₹80,000 per annum."
        },
        applicationProcess: "Apply through the INSPIRE Program Portal",
        officialLink: "https://online-inspire.gov.in/"
    },
    {
        id: 17,
        name: "Merit Cum Means Scholarship for Professional and Technical Courses",
        category: "Central Government",
        eligibility: {
            description: "Minority students with at least 50% marks and annual family income below ₹2.5 lakhs."
        },
        benefits: {
            description: "Course fee and maintenance allowance."
        },
        applicationProcess: "Apply through the National Scholarship Portal (NSP)",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: 18,
        name: "Post Matric Scholarship Scheme for Minorities",
        category: "Central Government",
        eligibility: {
            description: "Minority students with at least 50% marks and annual family income below ₹2 lakhs."
        },
        benefits: {
            description: "Admission and tuition fee, maintenance allowance."
        },
        applicationProcess: "Apply through the National Scholarship Portal (NSP)",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: 19,
        name: "Top Class Education Scholarship for SC Students",
        category: "Central Government",
        eligibility: {
            description: "SC students admitted to notified institutions."
        },
        benefits: {
            description: "Full tuition fee, living expenses, books, and computer."
        },
        applicationProcess: "Apply through the National Scholarship Portal (NSP)",
        officialLink: "https://scholarships.gov.in/"
    },
    {
        id: 20,
        name: "ISHAN UDAY – Special Scholarship for North Eastern Region",
        category: "Central Government",
        eligibility: {
            description: "Students with domicile of North Eastern Region pursuing general degree courses."
        },
        benefits: {
            description: "₹5,400 to ₹7,800 per month."
        },
        applicationProcess: "Apply through the National Scholarship Portal (NSP)",
        officialLink: "https://scholarships.gov.in/"
    }
];

// Location Data
const locations = [
    {
        id: "chennai",
        name: "Chennai",
        description: "Capital city with premier institutions",
        colleges: [1, 3, 5, 7], // College IDs
        image: "assets/images/chennai.jpg"
    },
    {
        id: "coimbatore",
        name: "Coimbatore",
        description: "Educational hub with top engineering colleges",
        colleges: [2, 4, 6, 8],
        image: "assets/images/coimbatore.jpg"
    },
    // Add more locations...
];

// Course Data
const courses = [
    {
        id: "be",
        name: "B.E.",
        fullName: "Bachelor of Engineering",
        duration: "4 years",
        specializations: [
            "Computer Science",
            "Mechanical",
            "Electrical",
            "Civil",
            "Electronics"
        ]
    },
    {
        id: "btech",
        name: "B.Tech",
        fullName: "Bachelor of Technology",
        duration: "4 years",
        specializations: [
            "Information Technology",
            "Artificial Intelligence",
            "Robotics",
            "Biotechnology"
        ]
    },
    {
        id: "mtech",
        name: "M.Tech",
        fullName: "Master of Technology",
        duration: "2 years",
        specializations: [
            "Computer Science",
            "Power Systems",
            "Structural Engineering",
            "VLSI Design"
        ]
    }
];

// Export the data
window.appData = {
    colleges,
    scholarships,
    locations,
    courses
};

// Add new colleges
colleges.push(
    // Chennai
    { name: "Indian Institute of Technology Madras (IIT Madras)", location: "Chennai", website: "https://iitm.ac.in/" },
    { name: "Anna University – College of Engineering, Guindy (CEG)", location: "Chennai", website: "https://annauniv.edu/" },
    { name: "Madras Institute of Technology (MIT), Chromepet", location: "Chennai", website: "https://mitindia.edu/" },
    { name: "SRM Institute of Science and Technology (SRMIST)", location: "Chennai", website: "https://srmist.edu.in/" },
    { name: "Sathyabama Institute of Science and Technology (SIST)", location: "Chennai", website: "https://sathyabama.ac.in/" },
    { name: "Saveetha Institute of Medical and Technical Sciences (SIMATS)", location: "Chennai", website: "https://saveetha.ac.in/" },
    { name: "SSN College of Engineering (SSNCE)", location: "Chennai", website: "https://ssn.edu.in/" },
    { name: "Chennai Institute of Technology (CIT)", location: "Chennai", website: "https://citchennai.edu.in/" },
    { name: "Rajalakshmi Engineering College (REC)", location: "Chennai", website: "https://rajalakshmi.org/" },
    { name: "Velammal Engineering College (VEC)", location: "Chennai", website: "https://velammal.edu.in/" },
    { name: "Panimalar Engineering College (PEC)", location: "Chennai", website: "https://panimalar.ac.in/" },
    { name: "Jeppiaar Engineering College (JEC)", location: "Chennai", website: "https://jeppiaarcollege.org/" },
    { name: "St. Joseph's College of Engineering (SJCE)", location: "Chennai", website: "https://stjosephs.ac.in/" },
    { name: "Easwari Engineering College (EEC)", location: "Chennai", website: "https://eec.edu.in/" },
    { name: "Meenakshi Sundararajan Engineering College (MSEC)", location: "Chennai", website: "https://msec.edu.in/" },
    { name: "Sri Sairam Engineering College (SSEC)", location: "Chennai", website: "https://sairam.edu.in/" },
    { name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology (Vel Tech)", location: "Chennai", website: "https://veltech.edu.in/" },
    { name: "KCG College of Technology (KCGCT)", location: "Chennai", website: "https://kcgcollege.ac.in/" },
    { name: "B.S. Abdur Rahman Crescent Institute of Science and Technology (Crescent)", location: "Chennai", website: "https://crescent.education/" },
    { name: "Hindustan Institute of Technology and Science (HITS)", location: "Chennai", website: "https://hindustanuniv.ac.in/" },
    { name: "Sri Venkateswara College of Engineering (SVCE)", location: "Chennai", website: "https://svce.ac.in/" },
    { name: "R.M.K. Engineering College (RMKEC)", location: "Chennai", website: "https://rmkec.ac.in/" },
    { name: "R.M.D. Engineering College (RMDEC)", location: "Chennai", website: "https://rmd.ac.in/" },
    { name: "Prince Shri Venkateshwara Padmavathy Engineering College (PSVPEC)", location: "Chennai", website: "https://princevenkateshwara.com/" },
    { name: "Dhanalakshmi College of Engineering (DCE)", location: "Chennai", website: "https://dce.edu.in/" },
    { name: "Sri Sai Ram Institute of Technology (SSIT)", location: "Chennai", website: "https://sairamit.edu.in/" },
    { name: "Loyola-ICAM College of Engineering and Technology (LICET)", location: "Chennai", website: "https://licet.ac.in/" },
    { name: "Jerusalem College of Engineering (JCE)", location: "Chennai", website: "https://jerusalemengg.ac.in/" },
    { name: "Tagore Engineering College (TEC)", location: "Chennai", website: "https://tagore-engg.edu.in/" },
    { name: "Agni College of Technology (ACT)", location: "Chennai", website: "https://act.edu.in/" },
    { name: "Alpha College of Engineering (ACE)", location: "Chennai", website: "https://alphagroup.edu" },
    { name: "Aalim Muhammed Salegh College of Engineering (AALIMCE)", location: "Chennai", website: "https://aace.edu.in/" },
    { name: "Annai Violet College of Engineering (AVCE)", location: "Chennai", website: "https://annaiviolet.edu.in/" },
    { name: "Asan Memorial College of Engineering and Technology (AMCET)", location: "Chennai", website: "https://amcet.edu.in/" },
    { name: "DMI College of Engineering (DMICE)", location: "Chennai", website: "https://dmice.ac.in/" },
    { name: "GKM College of Engineering and Technology (GKMCET)", location: "Chennai", website: "https://gkmcet.net.in/" },
    { name: "Jaya Engineering College (JEC)", location: "Chennai", website: "https://jec.ac.in/" },
    { name: "Karpaga Vinayaga College of Engineering and Technology (KVCET)", location: "Chennai", website: "https://kvcet.in/" },
    { name: "Kings Engineering College (KEC)", location: "Chennai", website: "https://kingsengg.edu.in/" },
    { name: "Madha Engineering College (MEC)", location: "Chennai", website: "https://madhaengineeringcollege.com/" },
    { name: "Misrimal Navajee Munoth Jain Engineering College (MNMJEC)", location: "Chennai", website: "https://mnmjec.ac.in/" },
    { name: "New Prince Shri Bhavani College of Engineering and Technology (NPSBCET)", location: "Chennai", website: "https://newprince.in/" },
    { name: "P.B. College of Engineering (PBCE)", location: "Chennai", website: "https://pbce.in/" },
    { name: "P.T. Lee Chengalvaraya Naicker College of Engineering and Technology (PTLCE)", location: "Chennai", website: "https://ptlce.edu.in/" },
    { name: "Rajalakshmi Institute of Technology (RIT)", location: "Chennai", website: "https://ritchennai.org/" },
    { name: "S.A. Engineering College (SAEC)", location: "Chennai", website: "https://saec.ac.in/" },
    { name: "S.K.R. Engineering College (SKREC)", location: "Chennai", website: "https://skrec.edu.in/" },
    { name: "Sri Krishna Institute of Technology (SKIT)", location: "Chennai", website: "https://skit.edu.in/" },
    { name: "Sri Venkateswaraa College of Technology (SVCT)", location: "Chennai", website: "https://svct.edu.in/" },
    { name: "Thangavelu Engineering College (TEC)", location: "Chennai", website: "https://thangavelu.org/" },
    // Coimbatore
    { name: "Adithya Institute of Technology (AIT)", location: "Coimbatore", website: "https://adithyatech.edu.in/" },
    { name: "Akshaya College of Engineering and Technology (ACET)", location: "Coimbatore", website: "https://acetcbe.edu.in/" },
    { name: "Amrita School of Engineering (ASE)", location: "Coimbatore", website: "https://amrita.edu/" },
    { name: "Anna University Regional Campus, Coimbatore (AURCC)", location: "Coimbatore", website: "https://aurcc.ac.in/" },
    { name: "Arjun College of Technology (ACT)", location: "Coimbatore", website: "https://arjun.edu.in/" },
    { name: "Coimbatore Institute of Engineering and Technology (CIET)", location: "Coimbatore", website: "https://cietcbe.edu.in/" },
    { name: "Dr. N.G.P. Institute of Technology (DrNGPIT)", location: "Coimbatore", website: "https://drngpit.ac.in/" },
    { name: "EASA College of Engineering and Technology (EASACET)", location: "Coimbatore", website: "https://easacollege.com/" },
    { name: "Hindusthan College of Engineering and Technology (HCET)", location: "Coimbatore", website: "https://hindusthan.net/hicet" },
    { name: "Hindusthan Institute of Technology (HIT)", location: "Coimbatore", website: "https://hindusthan.net/hit" },
    { name: "Info Institute of Engineering (IIE)", location: "Coimbatore", website: "https://infoengg.com/" },
    { name: "JCT College of Engineering and Technology (JCTCET)", location: "Coimbatore", website: "https://jct.ac.in/" },
    { name: "Jansons Institute of Technology (JIT)", location: "Coimbatore", website: "https://jit.ac.in/" },
    { name: "Kalaignar Karunanidhi Institute of Technology (KIT)", location: "Coimbatore", website: "https://kitcbe.com/" },
    { name: "Karpagam College of Engineering (KCE)", location: "Coimbatore", website: "https://kce.ac.in/" },
    { name: "Karpagam Institute of Technology (KIT)", location: "Coimbatore", website: "https://karpagamtech.ac.in/" },
    { name: "Kathir College of Engineering (KCE)", location: "Coimbatore", website: "https://kathir.ac.in/" },
    { name: "KGiSL Institute of Technology (KGiSL-IoT)", location: "Coimbatore", website: "https://kgkite.ac.in/" },
    { name: "KTVR Knowledge Park for Engineering and Technology (KTVR-KPET)", location: "Coimbatore", website: "https://ktvrtech.com/" },
    { name: "KV Institute of Management and Information Studies (KVIMIS)", location: "Coimbatore", website: "https://kvimis.co.in/" },
    { name: "Nehru Institute of Engineering and Technology (NIET)", location: "Coimbatore", website: "https://niet.co.in/" },
    { name: "Nehru Institute of Technology (NIT)", location: "Coimbatore", website: "https://nehrucolleges.com/" },
    { name: "P.A. College of Engineering and Technology (PACET)", location: "Coimbatore", website: "https://pacolleges.org/" },
    { name: "Park College of Engineering and Technology (PCET)", location: "Coimbatore", website: "https://pcet.ac.in/" },
    { name: "Park College of Technology (PCT)", location: "Coimbatore", website: "https://parkcollege.ac.in/" },
    { name: "PPG Institute of Technology (PPGIT)", location: "Coimbatore", website: "https://ppgit.ac.in/" },
    { name: "Pollachi Institute of Engineering and Technology (PIET)", location: "Coimbatore", website: "https://pietcbe.edu.in/" },
    { name: "R.V.S. College of Engineering and Technology (RVSCET)", location: "Coimbatore", website: "https://rvscet.ac.in/" },
    { name: "R.V.S. Technical Campus (RVSTC)", location: "Coimbatore", website: "https://rvstc.ac.in/" },
    { name: "Ranganathan Engineering College (REC)", location: "Coimbatore", website: "https://rec.ac.in/" },
    { name: "Rathinam Technical Campus (RTC)", location: "Coimbatore", website: "https://rathinamcollege.edu.in/" },
    { name: "Sri Eshwar College of Engineering (SECE)", location: "Coimbatore", website: "https://sece.ac.in/" },
    { name: "Sri Ramakrishna Institute of Technology (SRIT)", location: "Coimbatore", website: "https://srit.org/" },
    { name: "Sri Ranganathar Institute of Engineering and Technology (SRIET)", location: "Coimbatore", website: "https://sriet.ac.in/" },
    { name: "Sri Sai Ranganathan Engineering College (SSREC)", location: "Coimbatore", website: "https://ssrec.ac.in/" },
    { name: "Sri Shakthi Institute of Engineering and Technology (SSIET)", location: "Coimbatore", website: "https://srishakthi.ac.in/" },
    { name: "Study World College of Engineering (SWCE)", location: "Coimbatore", website: "https://studyworldindia.com/" },
    { name: "Suguna College of Engineering (SCE)", location: "Coimbatore", website: "https://sugunace.ac.in/" },
    { name: "Tamilnadu College of Engineering (TNCE)", location: "Coimbatore", website: "https://tnce.in/" },
    { name: "United Institute of Technology (UIT)", location: "Coimbatore", website: "https://uit.ac.in/" },
    // Trichy
    { name: "National Institute of Technology (NIT) Trichy", location: "Trichy", website: "https://www.nitt.edu/" },
    { name: "Indian Institute of Information Technology (IIIT) Trichy", location: "Trichy", website: "https://iiitt.ac.in/" },
    { name: "K. Ramakrishnan College of Engineering (KRCE)", location: "Trichy", website: "https://krce.ac.in/" },
    { name: "K. Ramakrishnan College of Technology (KRCT)", location: "Trichy", website: "https://krct.ac.in/" },
    { name: "University College of Engineering, BIT Campus, Anna University", location: "Trichy", website: "https://www.aubit.edu.in/" },
    { name: "SRM TRP Engineering College", location: "Trichy", website: "https://trp.srmtrichy.edu.in/" },
    { name: "M.A.M. College of Engineering and Technology (MAMCET)", location: "Trichy", website: "https://mamcet.com/" },
    { name: "Saranathan College of Engineering", location: "Trichy", website: "https://saranathan.ac.in/" },
    { name: "Kongunadu College of Engineering and Technology", location: "Trichy", website: "https://www.kongunadu.ac.in/" },
    { name: "Indra Ganesan College of Engineering", location: "Trichy", website: "https://www.igceng.com/" },
    // Madurai
    { name: "Thiagarajar College of Engineering (TCE)", location: "Madurai", website: "https://www.tce.edu/" },
    { name: "Velammal College of Engineering and Technology (VCET)", location: "Madurai", website: "https://vcet.ac.in/" },
    { name: "KLN College of Information Technology", location: "Madurai", website: "https://www.klncit.edu.in/" },
    { name: "Sethu Institute of Technology", location: "Madurai", website: "https://sethu.ac.in/" },
    { name: "Anna University – Madurai Regional Campus", location: "Madurai", website: "https://www.autmdu.in/" },
    { name: "Latha Mathavan Engineering College (LMEC)", location: "Madurai", website: "https://www.lathamathavan.edu.in/" },
    { name: "PTR College of Engineering and Technology", location: "Madurai", website: "https://www.ptrengg.ac.in/" },
    { name: "RL Institute of Nautical Sciences", location: "Madurai", website: "https://www.rlinstitutes.com/" },
    { name: "Solamalai College of Engineering", location: "Madurai", website: "https://www.solamalaice.ac.in/" },
    { name: "SACS MAVMM Engineering College", location: "Madurai", website: "https://www.sacsmavmmengg.com/" }
);

colleges.forEach(col => {
    if (!col.naacGrade) col.naacGrade = "A";
    if (!col.feeRange) col.feeRange = { min: 80000, max: 120000 };
    if (typeof col.nbaAccredited === 'undefined') col.nbaAccredited = true;
}); 