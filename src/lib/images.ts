// scripts/fetch-images.mjs 로 생성됨. 직접 고치지 말고 스크립트를 다시 돌릴 것.
export interface ImageCredit {
  src: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export const IMAGES: Record<string, ImageCredit> = {
  "miyeokguk": {
    "src": "/images/recipes/miyeokguk.jpg",
    "title": "So-gogi-miyeok-guk.jpg",
    "author": "대경라이프",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:So-gogi-miyeok-guk.jpg"
  },
  "sogogi-muguk": {
    "src": "/images/recipes/sogogi-muguk.jpg",
    "title": "Soegogimuguk (beef radish soup).jpg",
    "author": "국립국어원",
    "license": "CC BY-SA 2.0 kr",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Soegogimuguk_(beef_radish_soup).jpg"
  },
  "bugeoguk": {
    "src": "/images/recipes/bugeoguk.jpg",
    "title": "Korean soup-Bugeoguk-01.jpg",
    "author": "Pachinee Buathong",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean_soup-Bugeoguk-01.jpg"
  },
  "kongnamul-guk": {
    "src": "/images/recipes/kongnamul-guk.jpg",
    "title": "Korean soup-Kongnamul guk-01.jpg",
    "author": "by denver935",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean_soup-Kongnamul_guk-01.jpg"
  },
  "siraegi-guk": {
    "src": "/images/recipes/siraegi-guk.jpg",
    "title": "Siraegiguk (dried radish green soup).jpg",
    "author": "국립국어원",
    "license": "CC BY-SA 2.0 kr",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Siraegiguk_(dried_radish_green_soup).jpg"
  },
  "gyeran-guk": {
    "src": "/images/recipes/gyeran-guk.jpg",
    "title": "Egg Soup-Gyeranguk- (6084411125).jpg",
    "author": "Chloe Lim from Seoul, South Korea",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Egg_Soup-Gyeranguk-_(6084411125).jpg"
  },
  "tteokguk": {
    "src": "/images/recipes/tteokguk.jpg",
    "title": "Tteokguk.jpg",
    "author": "soscs",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Tteokguk.jpg"
  },
  "yukgaejang": {
    "src": "/images/recipes/yukgaejang.jpg",
    "title": "Korean.cuisine-Yukgaejang-01.jpg",
    "author": "by LWY at flickr",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Yukgaejang-01.jpg"
  },
  "doenjang-jjigae": {
    "src": "/images/recipes/doenjang-jjigae.jpg",
    "title": "Doenjang-jjigae.jpg",
    "author": "jyleen21",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Doenjang-jjigae.jpg"
  },
  "sundubu-jjigae": {
    "src": "/images/recipes/sundubu-jjigae.jpg",
    "title": "Korean stew-Sundubu jjigae-05.jpg",
    "author": "by titanium22",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean_stew-Sundubu_jjigae-05.jpg"
  },
  "kimchi-jjigae": {
    "src": "/images/recipes/kimchi-jjigae.jpg",
    "title": "Gimchi-jjigae.jpg",
    "author": "chomjong",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Gimchi-jjigae.jpg"
  },
  "dakdoritang": {
    "src": "/images/recipes/dakdoritang.jpg",
    "title": "Daktoritang.jpg",
    "author": "Brücke-Osteuropa",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Daktoritang.jpg"
  },
  "galbijjim": {
    "src": "/images/recipes/galbijjim.jpg",
    "title": "Galbi-jjim 2.jpg",
    "author": "Chun Yip So",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Galbi-jjim_2.jpg"
  },
  "duruchigi": {
    "src": "/images/recipes/duruchigi.jpg",
    "title": "Dwaeji-gogi-duruchigi.jpg",
    "author": "lazy fri13th",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Dwaeji-gogi-duruchigi.jpg"
  },
  "jangjorim": {
    "src": "/images/recipes/jangjorim.jpg",
    "title": "Jangjorim.jpg",
    "author": "Hyeon-Jeong Suk",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Jangjorim.jpg"
  },
  "suyuk": {
    "src": "/images/recipes/suyuk.jpg",
    "title": "Korean cuisine-Suyuk-01.jpg",
    "author": "egg (Hong, Yun Seon)",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Suyuk-01.jpg"
  },
  "bulgogi": {
    "src": "/images/recipes/bulgogi.jpg",
    "title": "Korean.cuisine-Bulgogi-01.jpg",
    "author": "by ayustety",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Bulgogi-01.jpg"
  },
  "japchae": {
    "src": "/images/recipes/japchae.jpg",
    "title": "Japchae 2.jpg",
    "author": "Jordi Sanchez",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Japchae_2.jpg"
  },
  "fish-jorim": {
    "src": "/images/recipes/fish-jorim.jpg",
    "title": "Korean.cuisine-Godeungeo.jorim-01.jpg",
    "author": "by LWY at flickr",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Godeungeo.jorim-01.jpg"
  },
  "gamjatang": {
    "src": "/images/recipes/gamjatang.jpg",
    "title": "Gamja-tang 4.jpg",
    "author": "이문희",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Gamja-tang_4.jpg"
  },
  "janchi-guksu": {
    "src": "/images/recipes/janchi-guksu.jpg",
    "title": "Janchi guksu (noodle soup).jpg",
    "author": "daecheonnet",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Janchi_guksu_(noodle_soup).jpg"
  },
  "sujebi": {
    "src": "/images/recipes/sujebi.jpg",
    "title": "Korean.cuisine-Sujebi-01.jpg",
    "author": "Steve Longus",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Sujebi-01.jpg"
  },
  "eomuk-bokkeum": {
    "src": "/images/recipes/eomuk-bokkeum.jpg",
    "title": "Eomuk-bokkeum.jpg",
    "author": "Eunyoung Lee",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Eomuk-bokkeum.jpg"
  },
  "gaji-namul": {
    "src": "/images/recipes/gaji-namul.jpg",
    "title": "2020-08-16 가지무침 IMG 0149.jpg",
    "author": "Choi Kwang-mo",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:2020-08-16_%EA%B0%80%EC%A7%80%EB%AC%B4%EC%B9%A8_IMG_0149.jpg"
  },
  "hobak-namul": {
    "src": "/images/recipes/hobak-namul.jpg",
    "title": "Saeu-aehobak-bokkeum.jpg",
    "author": "Dr 방원장",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Saeu-aehobak-bokkeum.jpg"
  },
  "gamja-jorim": {
    "src": "/images/recipes/gamja-jorim.jpg",
    "title": "Gamja jorim Korean.jpg",
    "author": "P1898",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Gamja_jorim_Korean.jpg"
  },
  "myeolchi-bokkeum": {
    "src": "/images/recipes/myeolchi-bokkeum.jpg",
    "title": "Myeolchi-bokkeum 2.jpg",
    "author": "Eugene Kim",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Myeolchi-bokkeum_2.jpg"
  },
  "jinmichae-bokkeum": {
    "src": "/images/recipes/jinmichae-bokkeum.jpg",
    "title": "Korean cuisine-Ojingeochae bokkeum-01.jpg",
    "author": "by Joseph Steinberg (Baltimoron in Korea) at Flickr",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Ojingeochae_bokkeum-01.jpg"
  },
  "kongnamul-muchim": {
    "src": "/images/recipes/kongnamul-muchim.jpg",
    "title": "Korean.cuisine-Kongnamul-01.jpg",
    "author": "by karendotcom127",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Kongnamul-01.jpg"
  },
  "sigeumchi-muchim": {
    "src": "/images/recipes/sigeumchi-muchim.jpg",
    "title": "Sigeumchi-namul 2.jpg",
    "author": "Hyeon-Jeong Suk",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sigeumchi-namul_2.jpg"
  },
  "gosari-muchim": {
    "src": "/images/recipes/gosari-muchim.jpg",
    "title": "Gosari.jpg",
    "author": "Hyeon-Jeong Suk",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Gosari.jpg"
  },
  "doraji-muchim": {
    "src": "/images/recipes/doraji-muchim.jpg",
    "title": "Korean.cuisine-Doraji oi muchim-01.jpg",
    "author": "by jetalone (flickr)",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Korean.cuisine-Doraji_oi_muchim-01.jpg"
  },
  "miyeok-julgi-bokkeum": {
    "src": "/images/recipes/miyeok-julgi-bokkeum.jpg",
    "title": "Miyeokjulgibokkeum.jpg",
    "author": "Hyeon-Jeong Suk",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Miyeokjulgibokkeum.jpg"
  },
  "dubu-jorim": {
    "src": "/images/recipes/dubu-jorim.jpg",
    "title": "Dubu Jorim (Braised tofu).jpg",
    "author": "CNEcija12345",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Dubu_Jorim_(Braised_tofu).jpg"
  }
};
