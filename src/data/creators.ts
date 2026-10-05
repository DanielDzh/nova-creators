import type { StaticImageData } from "next/image";
import markAvatar from "@/assets/creators/mark/avatar.jpg";
import markPost1 from "@/assets/creators/mark/post-1.jpg";
import markPost2 from "@/assets/creators/mark/post-2.jpg";
import artemAvatar from "@/assets/creators/artem/avatar.jpg";
import artemPost1 from "@/assets/creators/artem/post-1.jpg";
import artemPost2 from "@/assets/creators/artem/post-2.jpg";
import viraAvatar from "@/assets/creators/vira/avatar.jpg";
import viraPost1 from "@/assets/creators/vira/post-1.jpg";
import viraPost2 from "@/assets/creators/vira/post-2.jpg";
import olesiaAvatar from "@/assets/creators/olesia/avatar.jpg";
import olesiaPost1 from "@/assets/creators/olesia/post-1.jpg";
import olesiaPost2 from "@/assets/creators/olesia/post-2.jpg";

export const TELEGRAM_URL = "https://t.me/danone_dz";

export type Post = {
  image: StaticImageData;
  caption: string;
  likes: number;
  location?: string;
};

export type QuickReply = {
  question: string;
  answer: string[];
};

export type Creator = {
  slug: string;
  name: string;
  handle: string;
  niche: string;
  tagline: string;
  bio: string;
  avatar: StaticImageData;
  accent: string;
  followers: string;
  postsCount: number;
  responseTime: string;
  tags: string[];
  posts: Post[];
  greeting: string[];
  quickReplies: QuickReply[];
};

const postsOf = (images: StaticImageData[], items: Omit<Post, "image">[]): Post[] =>
  items.map((item, index) => ({ ...item, image: images[index] }));

export const creators: Creator[] = [
  {
    slug: "mark",
    name: "Марк Левчук",
    handle: "mark.daily",
    niche: "Lifestyle",
    tagline: "Повільні ранки, плівка й міста, в які хочеться повернутися",
    bio: "Колекціоную кав'ярні, вінілові платівки та маленькі радощі буднів. Підкажу, куди сходити на вихідних і як не загубити себе в рутині.",
    avatar: markAvatar,
    accent: "#F5B971",
    followers: "248K",
    postsCount: 612,
    responseTime: "~1 хв",
    tags: ["кав'ярні", "плівка", "міські прогулянки"],
    posts: postsOf(
      [markPost1, markPost2],
      [
        {
          caption: "Флет вайт і нікуди не поспішати. Ідеальний вівторок ☕",
          likes: 18420,
          location: "Львів",
        },
        {
          caption: "Бруківка, захід сонця і 36 кадрів, які я ще не проявив",
          likes: 22310,
          location: "Прага",
        },
      ],
    ),
    greeting: ["Привіт! 👋 Я Марк.", "Щойно повернувся з ранкової прогулянки. Про що поговоримо?"],
    quickReplies: [
      {
        question: "Порадь кав'ярню на вихідні",
        answer: [
          "О, це моя улюблена тема 😄",
          "Шукай місця з великими вікнами й без ноутбуків за кожним столиком. Там найкращі ранки. Свою топ-5 скидаю в Telegram щоп'ятниці.",
        ],
      },
      {
        question: "На що знімаєш плівку?",
        answer: [
          "Olympus mju-II та Portra 400 — класика, яка ніколи не підводить.",
          "Якщо хочеш, розкажу, з чого почати без великих витрат.",
        ],
      },
      {
        question: "Як не вигоріти на роботі?",
        answer: [
          "Мій лайфхак — одна маленька справа «для себе» щодня. Навіть 15 хвилин з кавою без телефону.",
          "У Telegram веду челендж «30 повільних ранків». Приєднуйся 🙌",
        ],
      },
    ],
  },
  {
    slug: "artem",
    name: "Артем Ковальов",
    handle: "artem.builds",
    niche: "Tech & Business",
    tagline: "Будую продукти з AI і чесно розповідаю, що працює, а що ні",
    bio: "Фаундер, ментор і трохи нерд. Розбираю AI-інструменти, продуктові метрики та помилки, які коштували мені грошей, — щоб вони не коштували тобі.",
    avatar: artemAvatar,
    accent: "#7CC4FF",
    followers: "184K",
    postsCount: 438,
    responseTime: "~2 хв",
    tags: ["AI", "стартапи", "продуктивність"],
    posts: postsOf(
      [artemPost1, artemPost2],
      [
        {
          caption: "20 хвилин на сцені, 3 місяці підготовки. Слайди — в Telegram 🎤",
          likes: 12980,
          location: "Web Summit",
        },
        { caption: "Нічний деплой — традиція, яку я не рекомендую 😅", likes: 9874 },
      ],
    ),
    greeting: ["Привіт, я Артем 👨‍💻", "Питай про AI, продукт чи запуск — відповідаю без води."],
    quickReplies: [
      {
        question: "Який AI-інструмент спробувати першим?",
        answer: [
          "Почни з асистента для коду або текстів. Ефект побачиш уже за тиждень.",
          "Головне правило: автоматизуй те, що робиш щодня, а не те, що звучить круто.",
        ],
      },
      {
        question: "Як перевірити ідею стартапу?",
        answer: [
          "Лендінг + 10 розмов із потенційними клієнтами. Не код, не логотип — розмови.",
          "Мій чекліст валідації на 7 днів лежить у Telegram 📋",
        ],
      },
      {
        question: "Скільки ти працюєш на день?",
        answer: [
          "Глибока робота — 4 години. Решта — зустрічі й пошта 😅",
          "Більше не означає краще. Перевірено на власному вигоранні.",
        ],
      },
    ],
  },
  {
    slug: "vira",
    name: "Віра Соколова",
    handle: "vira.mode",
    niche: "Fashion",
    tagline: "Мінімалізм, якісні речі й стиль, що не залежить від трендів",
    bio: "Стилістка та авторка капсульних гардеробів. Вчу одягатися так, щоб збори займали 5 хвилин, а компліменти лунали весь день.",
    avatar: viraAvatar,
    accent: "#FF7A8A",
    followers: "412K",
    postsCount: 905,
    responseTime: "~1 хв",
    tags: ["капсула", "street style", "beauty"],
    posts: postsOf(
      [viraPost1, viraPost2],
      [
        {
          caption: "Пальто кольору кемел — інвестиція на десять сезонів",
          likes: 41230,
          location: "Париж",
        },
        { caption: "Шовк, тиша ательє і сукня, на яку я чекала пів року", likes: 36780 },
      ],
    ),
    greeting: ["Привіт, красуне чи красеню 💋", "Я Віра. Розберемо твій гардероб?"],
    quickReplies: [
      {
        question: "З чого почати капсулу?",
        answer: [
          "З трьох речей: ідеальні штани, біла сорочка й пальто, у якому ти собі подобаєшся.",
          "Решту добираємо під твій кольоротип. Шаблон капсули — у моєму Telegram 🤍",
        ],
      },
      {
        question: "Що зараз у тренді?",
        answer: [
          "Чесно? Якісні тканини та гарна посадка. Тренди міняються щосезону, а це — ні.",
          "Але так, бордовий цієї осені всюди 🍷",
        ],
      },
      {
        question: "Як виглядати дорого без великих витрат?",
        answer: [
          "Монохром, відпарений одяг і доглянуте взуття. Це 80% успіху.",
          "Ще 20% — впевненість. Її теж можна натренувати 😉",
        ],
      },
    ],
  },
  {
    slug: "olesia",
    name: "Олеся Ярема",
    handle: "olesia.wild",
    niche: "Sport & Travel",
    tagline: "Гори, океан і кілометри, після яких хочеться жити голосніше",
    bio: "Трейлраннерка, серферка й авторка маршрутів. Покажу, як почати бігати, куди поїхати з наметом і чому світанок у горах вартий будильника о 4:00.",
    avatar: olesiaAvatar,
    accent: "#9BE15D",
    followers: "326K",
    postsCount: 741,
    responseTime: "~3 хв",
    tags: ["трейлраннінг", "серфінг", "походи"],
    posts: postsOf(
      [olesiaPost1, olesiaPost2],
      [
        {
          caption: "2061 метр над рівнем моря і жодної хмаринки під ногами ⛰️",
          likes: 33410,
          location: "Говерла",
        },
        { caption: "Хвиля перемогла, але завтра реванш 🏄‍♀️", likes: 28976, location: "Португалія" },
      ],
    ),
    greeting: ["Хей! 🏔️ Я Олеся.", "Щойно з пробіжки. Плануєш пригоду?"],
    quickReplies: [
      {
        question: "Як почати бігати з нуля?",
        answer: [
          "Чергуй хвилину бігу й дві хвилини ходьби, три рази на тиждень. Без героїзму.",
          "Мій 8-тижневий план «від дивана до 5 км» — у Telegram 🏃‍♀️",
        ],
      },
      {
        question: "Куди поїхати в гори вперше?",
        answer: [
          "Карпати, маршрут на Петрос — красиво, зрозуміло і не надто складно.",
          "Головне: зручне взуття, дощовик і вихід на світанку 🌄",
        ],
      },
      {
        question: "Що взяти в похід?",
        answer: [
          "Шари одягу, налобний ліхтарик, повербанк і перекус, який любиш.",
          "Повний чекліст на 1–3 дні я закріпила в Telegram ✅",
        ],
      },
    ],
  },
];
