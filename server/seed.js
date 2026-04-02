const mongoose = require("mongoose");
const Place = require("./src/models/Place");
const User = require("./src/models/User");
require("dotenv").config();

const defaultHotels = [
  {
    title: "Qonaq Hotel Алматы",
    address: "Алматы, Алмалы ауданы, Абай даңғылы 52",
    photos: ["room1.jpg", "room2.jpg", "room3.jpg"],
    description:
      "Алматы қаласының орталығында орналасқан заманауи қонақ үй. Толық жиһазданған бөлмелер, кондиционер, room service. Метро бекетіне 5 минут жаяу жүргінші қашықтықта.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo:
      "Ресторан, фитнес-зал, бассейн бар. Аэропорттан трансфер ұйымдастырылады.",
    checkIn: "14:00",
    checkOut: "12:00",
    maxGuests: 2,
    price: 15000,
    category: "hotel",
    rooms: null,
    area: null,
    rentPeriod: "",
  },
  {
    title: "Grand Astana Hotel",
    address: "Астана, Есіл ауданы, Мәңгілік Ел даңғылы 28",
    photos: ["room4.jpg", "room5.jpg", "room6.jpg"],
    description:
      "Астана қаласының іскер ауданында орналасқан 5 жұлдызды қонақ үй. Бәйтерек монументіне жақын. Іскер кездесулер мен отбасылық демалыс үшін қолайлы.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo:
      "Конференц-залдар, SPA орталығы, 3 мейрамхана бар. VIP қызметтер қол жетімді.",
    checkIn: "15:00",
    checkOut: "11:00",
    maxGuests: 4,
    price: 25000,
    category: "hotel",
    rooms: null,
    area: null,
    rentPeriod: "",
  },
  {
    title: "2 бөлмелі пәтер жалға",
    address: "Алматы, Бостандық ауданы, Тимирязев көшесі 42",
    photos: ["room7.jpg", "room1.jpg", "room4.jpg"],
    description:
      "Алматы қаласының орталығында 2 бөлмелі жайлы пәтер. Заманауи жөндеу, толық жиһазданған. Метро, дүкендер, мейрамханалар жақын.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo:
      "Ұзақ мерзімді жалға алу мүмкіндігі бар. Коммуналдық қызметтер бағаға кіреді.",
    checkIn: "14:00",
    checkOut: "12:00",
    maxGuests: 4,
    price: 180000,
    category: "rent",
    rooms: 2,
    area: 65,
    rentPeriod: "monthly",
  },
  {
    title: "1 бөлмелі студия пәтер",
    address: "Астана, Сарыарқа ауданы, Кенесары көшесі 70",
    photos: ["room2.jpg", "room5.jpg", "room7.jpg"],
    description:
      "Астана қаласында заманауи студия пәтер. Жаңа жөндеу, барлық техника бар. Іссапарға немесе студенттерге қолайлы.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo: "Паркинг бар. Қоғамдық көлік аялдамасы 2 минуттық жерде.",
    checkIn: "14:00",
    checkOut: "12:00",
    maxGuests: 2,
    price: 120000,
    category: "rent",
    rooms: 1,
    area: 42,
    rentPeriod: "monthly",
  },
  {
    title: "3 бөлмелі пәтер сатылады",
    address: "Алматы, Медеу ауданы, Достық даңғылы 105",
    photos: ["room3.jpg", "room6.jpg", "room1.jpg"],
    description:
      "Алматы қаласының беделді ауданында 3 бөлмелі кең пәтер сатылады. Жаңа жөндеу, 2 санвузел, балкон. Таулар көрінісі ашылады.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo: "Ипотека мүмкіндігі бар. Құжаттар даяр. Келісім бойынша баға.",
    checkIn: "",
    checkOut: "",
    maxGuests: 0,
    price: 42000000,
    category: "sale",
    rooms: 3,
    area: 95,
    rentPeriod: "",
  },
  {
    title: "2 бөлмелі жаңа пәтер сатылады",
    address: "Астана, Есіл ауданы, Қабанбай батыр даңғылы 11",
    photos: ["room5.jpg", "room3.jpg", "room7.jpg"],
    description:
      "Астана қаласының жаңа тұрғын үй кешенінде 2 бөлмелі пәтер. Жаңа құрылыс, заманауи жоспарлау. Инфрақұрылым дамыған аумақ.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo: "Паркинг орны бағаға кіреді. Балабақша, мектеп, дүкендер жақын.",
    checkIn: "",
    checkOut: "",
    maxGuests: 0,
    price: 32000000,
    category: "sale",
    rooms: 2,
    area: 72,
    rentPeriod: "",
  },
  {
    title: "Күнделікті жалға 1 бөлмелі пәтер",
    address: "Шымкент, Әл-Фараби ауданы, Тәуке хан даңғылы 15",
    photos: ["room4.jpg", "room2.jpg", "room6.jpg"],
    description:
      "Шымкент қаласының орталығында күнделікті жалға берілетін 1 бөлмелі пәтер. Тазалық, жайлылық кепілденеді.",
    perks: ["wifi", "tv", "entrance"],
    extraInfo: "Check-in 24/7. Есептелген төсек-орын, сүлгілер бар.",
    checkIn: "14:00",
    checkOut: "12:00",
    maxGuests: 2,
    price: 8000,
    category: "rent",
    rooms: 1,
    area: 38,
    rentPeriod: "daily",
  },
  {
    title: "Ақтау Resort Hotel",
    address: "Ақтау, 14-шағын аудан, Теңіз жағалауы",
    photos: ["room6.jpg", "room1.jpg", "room5.jpg"],
    description:
      "Каспий теңізінің жағалауында орналасқан курорттық қонақ үй. Жеке жағажай, бассейн, SPA. Теңіз көрінісі бар бөлмелер.",
    perks: ["wifi", "parking", "tv", "entrance"],
    extraInfo: "All-inclusive пакет қол жетімді. Балаларға арналған клуб бар.",
    checkIn: "14:00",
    checkOut: "12:00",
    maxGuests: 3,
    price: 20000,
    category: "hotel",
    rooms: null,
    area: null,
    rentPeriod: "",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB");

    // Check if we have any users, if not create a default admin user
    let adminUser = await User.findOne({ email: "admin@gmail.com" });
    if (!adminUser) {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("1234", 10);

      adminUser = new User({
        name: "Admin User",
        email: "admin@gmail.com",
        password: hashedPassword,
        isAdmin: true,
      });
      await adminUser.save();
      console.log("Created default admin user (admin@gmail.com)");
    } else if (!adminUser.isAdmin) {
      adminUser.isAdmin = true;
      await adminUser.save();
      console.log("Updated existing user to admin");
    }

    // Check if places already exist
    const existingPlaces = await Place.countDocuments();
    if (existingPlaces > 0) {
      // Fix photo extensions from .png to .jpg in existing data
      const result = await Place.updateMany({ photos: { $regex: "\\.png$" } }, [
        {
          $set: {
            photos: {
              $map: {
                input: "$photos",
                as: "p",
                in: {
                  $replaceAll: {
                    input: "$$p",
                    find: ".png",
                    replacement: ".jpg",
                  },
                },
              },
            },
          },
        },
      ]);
      if (result.modifiedCount > 0) {
        console.log(
          `Fixed photo extensions in ${result.modifiedCount} places (.png -> .jpg)`,
        );
      }
      console.log(
        `Database already has ${existingPlaces} places. Skipping seed.`,
      );
      return;
    }

    // Add places with the admin user as owner
    for (const hotel of defaultHotels) {
      const place = new Place({
        ...hotel,
        owner: adminUser._id,
      });
      await place.save();
      console.log(`Added hotel: ${hotel.title}`);
    }

    console.log("✅ Successfully seeded database with default hotels!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedDatabase();
