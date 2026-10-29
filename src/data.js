// Enteks Prefabrik — site verisi
// İçerik buradan düzenlenir; sayfalar `npm run build` ile yeniden üretilir.

export const company = {
  name: "Enteks Prefabrik",
  phone: "05456412909",
  phoneDisplay: "0545 641 29 09",
  phoneIntl: "+905456412909",
  whatsapp: "905456412909",
  instagram: "https://www.instagram.com/enteksprefabrik33/",
  tiktok: "https://www.tiktok.com/@enteksprefabrik",
  city: "Mersin",
  base: "Mersin",
};

// Üç ana ürün. `slug` URL'de kullanılır.
export const services = [
  {
    slug: "prefabrik-ev",
    name: "Prefabrik ev",
    plural: "prefabrik evler",
    short: "Fabrikada hazırlanan panellerle arsanızda kısa sürede kurulan, ekonomik ve taşınabilir ev.",
    intro:
      "Prefabrik evde duvar, çatı ve döşeme panelleri atölyede ölçüsüne göre hazırlanır, arsanızda birleştirilir. Şantiyede geçen süre kısalır, maliyet baştan bellidir.",
    points: [
      "Sandviç panel duvarlarla ısı ve ses yalıtımı",
      "Bağ evi, yazlık, şantiye ve ek bina için uygun",
      "Gerektiğinde sökülüp başka bir yere taşınabilir",
      "Plan, pencere yeri ve iç bölmeler isteğe göre değişir",
    ],
    uses: ["bağ evi", "yazlık", "şantiye binası", "ek konut", "bahçe evi"],
  },
  {
    slug: "celik-ev",
    name: "Çelik ev",
    plural: "çelik evler",
    short: "Galvanizli hafif çelik taşıyıcı sistemle kalıcı konut konforunda, hafif ve dayanıklı ev.",
    intro:
      "Çelik evde taşıyıcı iskelet galvaniz kaplı hafif çelik profillerden kurulur. Yapı hafif olduğu için deprem anında daha az yük taşır; iç ve dış kaplama betonarme bir evin görünümünü verebilir.",
    points: [
      "Galvaniz profiller paslanmaya karşı korunur",
      "Hafif yapı, deprem yükünü azaltır",
      "Tek katlı, dubleks ve geniş planlara uygun",
      "Kalıcı oturum için ısı, su ve ses yalıtımıyla bitirilir",
    ],
    uses: ["kalıcı konut", "dubleks villa", "köy evi", "müstakil ev", "işyeri"],
  },
  {
    slug: "ytong-ev",
    name: "Ytong ev",
    plural: "Ytong evler",
    short: "Hafif ve ısı yalıtımı yüksek Ytong (gazbeton) bloklarla örülen, kalıcı ve sağlam ev.",
    intro:
      "Ytong evde duvarlar gazbeton bloklarla örülür. Gazbeton hafiftir, ısıyı iyi yalıtır ve yanmaz; bu sayede ev yazın serin, kışın sıcak kalır. Sıva ve boyayla bitirildiğinde klasik bir müstakil evden farksız görünür.",
    points: [
      "Gazbeton duvarlar ısı yalıtımında güçlüdür",
      "Yanmaz malzeme, yangına karşı güvenli",
      "Hafif duvarlar binaya daha az yük bindirir",
      "Tek katlı, dubleks ve villa tipi planlara uygun",
    ],
    uses: ["kalıcı konut", "villa", "müstakil ev", "yazlık", "köy evi"],
  },
];

// Arazi/iklim tipine göre teknik öneriler
export const terrains = {
  sahil: {
    label: "sahil",
    advice:
      "Denize yakın arsalarda nem ve tuzlu hava metal yüzeyleri zorlar. Galvaniz kaplamalı profil, dış cephede nem geçirmeyen kaplama ve havalandırmalı çatı arası öneriyoruz.",
    heat: "Yaz sıcağı için çatıda kalın yalıtım ve güneş alan cephede saçak işe yarar.",
  },
  ova: {
    label: "ova",
    advice:
      "Çukurova'nın sıcak ve nemli yazlarında asıl iş çatı ve cephe yalıtımındadır. Yalıtım kalınlığını ve pencere yönünü buna göre seçiyoruz.",
    heat: "Kuzey–güney yönlü pencereler ve açık renkli çatı, klima yükünü hafifletir.",
  },
  yayla: {
    label: "yayla",
    advice:
      "Yüksek kesimlerde kar yükü ve soğuk belirleyicidir. Çatı eğimini ve taşıyıcıyı kar yüküne göre hesaplıyor, duvar ve çatı yalıtımını kalın tutuyoruz.",
    heat: "Kışın ısı kaybını azaltmak için çift cam ve yalıtımlı döşeme öneriyoruz.",
  },
  ic: {
    label: "iç kesim",
    advice:
      "İç kesimlerde yazlar sıcak, kışlar soğuk geçer. Dört mevsime uygun yalıtım ve sağlam zemin hazırlığı önemlidir.",
    heat: "Gece–gündüz sıcaklık farkı için yalıtımlı döşeme ve iyi contalı doğrama öneriyoruz.",
  },
};

// Mersin'in 13 ilçesi
export const districts = [
  {
    slug: "tarsus",
    name: "Tarsus",
    terrain: ["ova", "yayla"],
    home: true,
    about:
      "Tarsus, Çukurova ovasının batı ucunda, narenciye bahçeleri ve verimli tarım arazileriyle bilinen köklü bir ilçe. Mersin'de en çok çalıştığımız ilçelerin başında geliyor.",
    places: ["Gülek", "Yenice", "Kulak", "Kaburgediği", "Berdan Barajı çevresi"],
    demand:
      "Tarsus'ta en çok bahçe ve tarla içine bağ evi, köylerde kalıcı konut ve ova arazilerinde ek bina olarak kuruyoruz.",
    neighbors: ["yenisehir", "akdeniz", "toroslar", "camliyayla"],
  },
  {
    slug: "akdeniz",
    name: "Akdeniz",
    terrain: ["ova", "sahil"],
    about:
      "Akdeniz, Mersin'in doğu yakasında liman ve sanayi bölgelerine komşu, ovaya açılan bir ilçe. Kırsal mahallelerinde tarım arazileri hâlâ geniş yer tutar.",
    places: ["Karaduvar", "Homurlu", "Kazanlı"],
    demand:
      "Akdeniz'de sera ve tarla başına ek bina, işyeri ofisi ve kırsal mahallelerde müstakil ev talebi öne çıkıyor.",
    neighbors: ["tarsus", "toroslar", "yenisehir"],
  },
  {
    slug: "yenisehir",
    name: "Yenişehir",
    terrain: ["sahil", "ova"],
    about:
      "Yenişehir, kent merkezinin modern yüzü; kuzeyindeki kırsal mahallelerde ise bahçeli ve arsalı yaşam sürüyor.",
    places: ["Çiftlikköy", "Değirmençay"],
    demand:
      "Yenişehir'in kuzeyindeki arsalarda bahçe evi ve kalıcı müstakil çelik ev soruluyor.",
    neighbors: ["mezitli", "toroslar", "akdeniz"],
  },
  {
    slug: "toroslar",
    name: "Toroslar",
    terrain: ["ova", "yayla"],
    about:
      "Toroslar, kent merkezinden Toros Dağları'na doğru uzanan geniş bir ilçe. Gözne gibi yayla mahalleleri yazın serinlemek isteyenlerin tercihi.",
    places: ["Gözne", "Arslanköy", "Musalı"],
    demand:
      "Toroslar'da yayla evi olarak prefabrik, kalıcı oturum için Ytong ve çelik ev tercih ediliyor.",
    neighbors: ["yenisehir", "akdeniz", "tarsus", "mezitli"],
  },
  {
    slug: "mezitli",
    name: "Mezitli",
    terrain: ["sahil", "yayla"],
    about:
      "Mezitli, sahil şeridinden Fındıkpınarı yaylasına kadar farklı iklimleri bir arada barındırır.",
    places: ["Fındıkpınarı", "Tece", "Kuyuluk", "Davultepe"],
    demand:
      "Mezitli'de yaylada yazlık ev, sahile yakın bahçelerde ise misafir evi kuruyoruz.",
    neighbors: ["yenisehir", "erdemli", "toroslar"],
  },
  {
    slug: "erdemli",
    name: "Erdemli",
    terrain: ["sahil", "yayla"],
    about:
      "Erdemli, Kızkalesi ve Limonlu sahilleriyle yazlıkçıların, limon ve sera tarımıyla da üreticilerin ilçesi.",
    places: ["Kızkalesi", "Limonlu", "Ayaş", "Arpaçbahşiş", "Kocahasanlı"],
    demand:
      "Erdemli'de narenciye bahçesine bağ evi, sahile yakın yazlık ve köylerde kalıcı çelik ev talebi yüksek.",
    neighbors: ["mezitli", "silifke"],
  },
  {
    slug: "silifke",
    name: "Silifke",
    terrain: ["sahil", "ic"],
    about:
      "Silifke, Göksu Deltası'nın verimli toprakları, Taşucu sahili ve iç kesimdeki köyleriyle geniş bir ilçe.",
    places: ["Taşucu", "Atakent", "Narlıkuyu", "Yeşilovacık"],
    demand:
      "Silifke'de tarım arazisine ek bina, sahilde yazlık ve köylerde kalıcı ev için çalışıyoruz.",
    neighbors: ["erdemli", "mut", "gulnar"],
  },
  {
    slug: "mut",
    name: "Mut",
    terrain: ["ic", "yayla"],
    about:
      "Mut, Göksu vadisinde kayısı ve zeytin bahçeleriyle bilinen, dört mevsimi belirgin yaşayan bir iç ilçe.",
    places: ["Göksu vadisi", "Kırobası"],
    demand:
      "Mut'ta bahçe başında bağ evi ve köylerde kışa dayanıklı kalıcı çelik ev isteniyor.",
    neighbors: ["silifke", "gulnar"],
  },
  {
    slug: "gulnar",
    name: "Gülnar",
    terrain: ["yayla", "ic"],
    about:
      "Gülnar, dağlık arazisi, yüksek köyleri ve serin yazlarıyla Mersin'in iç kesimdeki ilçelerinden.",
    places: ["Köseçobanlı", "Zeyne", "Kuskan"],
    demand:
      "Gülnar'da kar yüküne uygun çatılı kalıcı ev ve yayla evi kuruyoruz.",
    neighbors: ["silifke", "mut", "aydincik"],
  },
  {
    slug: "aydincik",
    name: "Aydıncık",
    terrain: ["sahil"],
    about:
      "Aydıncık, koyları ve sakin sahiliyle batı kıyısında küçük bir ilçe.",
    places: ["Gilindire Mağarası çevresi"],
    demand:
      "Aydıncık'ta denize yakın arsalarda yazlık ve misafir evi talebi öne çıkıyor.",
    neighbors: ["gulnar", "bozyazi"],
  },
  {
    slug: "bozyazi",
    name: "Bozyazı",
    terrain: ["sahil", "yayla"],
    about:
      "Bozyazı, sahildeki seralarla arkasındaki yaylaları birleştiren bir ilçe.",
    places: ["Tekmen"],
    demand:
      "Bozyazı'da sera başına ek bina ve yaylada yazlık ev kuruyoruz.",
    neighbors: ["aydincik", "anamur"],
  },
  {
    slug: "anamur",
    name: "Anamur",
    terrain: ["sahil", "yayla"],
    about:
      "Anamur, muz seraları, uzun kumsalı ve Abanoz yaylasıyla Mersin'in batı ucundaki ilçesi.",
    places: ["Abanoz yaylası", "İskele", "Bozdoğan", "Çarıklar"],
    demand:
      "Anamur'da seraya bitişik ek bina, sahil yazlığı ve yayla evi en sık istenenler.",
    neighbors: ["bozyazi"],
  },
  {
    slug: "camliyayla",
    name: "Çamlıyayla",
    terrain: ["yayla"],
    about:
      "Çamlıyayla, Tarsus'un kuzeyinde, çam ormanları ve Namrun Kalesi'yle bilinen yüksek bir yayla ilçesi.",
    places: ["Namrun", "Sebil", "Darıpınarı", "Cehennemdere çevresi"],
    demand:
      "Çamlıyayla'da yazlık yayla evi ve kışa da uygun kalıcı çelik ev kuruyoruz.",
    neighbors: ["tarsus", "toroslar"],
  },
];

// Tarsus mahalleleri (kaynak: Tarsus mahalle listesi; belde birleşmeleri eklendi)
const tarsusRaw = `82Evler Mahallesi, Akarsu, Akçakocalı, Akgedik, Akşemsettin Mahallesi, Aladağlı, Aliağa, Aliefendioğlu, Alifakı, Altaylılar Mahallesi, Anıt Mahallesi, Atalar Mahallesi, Bağcılar Mahallesi, Bağlar Mahallesi, Bağlarbaşı, Baharlı, Bahçe Mahallesi, Bahşiş, Barbaros Mahallesi, Belenköy, Beydeğirmeni Mahallesi, Beylice, Bolatlı, Boztepe, Böğrüeğri, Caminur Mahallesi, Cırbıklar, Cinköy, Cumhuriyet Mahallesi, Çağbaşı, Çağlayan Mahallesi, Çakırlı, Çamtepe, Çavdarlı, Çayboyu, Çiçekli, Çiriştepe, Dadalı, Dedeler, Dorak, Duatepe Mahallesi, Ergenekon Mahallesi, Eskiömerli Mahallesi, Evci, Fahrettinpaşa Mahallesi, Fatih Mahallesi, Ferahimşalvuz Mahallesi, Fevziçakmak Mahallesi, Gaziler Mahallesi, Gazipaşa Mahallesi, Girne Mahallesi, Gözlükule Mahallesi, Gülek, Gürlü, Hacıhamzalı, Halitağa, Hürriyet Mahallesi, İhsaniye, İncirgediği, İncirlikuyu, İsmetpaşa Mahallesi, Kaburgediği, Karaçerçili, Karadiken, Karadirlik, Kavaklı Mahallesi, Kayadibi, Kefeli, Kelahmet, Kemalpaşa Mahallesi, Kerimler, Kırıt, Kırklarsırtı Mahallesi, Kızılçukur, Kızılmurat Mahallesi, Köselerli, Kulak, Kurbanlı, Mahmutağa, Mantaş, Merkez Mahallesi, Meşelik, Mithatpaşa Mahallesi, Muratlı, Nacarlı, Nemiroğlu, Öğretmenler Mahallesi, Özbek, Pirömerli, Reşadiye Mahallesi, Sağlıklı, Sarıibrahimli, Sarıveli, Sayköy, Sıraköy, Simithacılı, Sucular, Şahin Mahallesi, Şehitishak Mahallesi, Şehitkerim Mahallesi, Şehitlertepesi Mahallesi, Şehitmustafa Mahallesi, Taşcılı, Taşkuyu, Taşobası, Tekke Mahallesi, Tepeköy, Tepetaşpınarı, Topaklı, Tozkoparan Mahallesi, Ulaş, Verimli, Yaramış, Yarbayşemsettin Mahallesi, Yenice, Yenimahalle Mahallesi, Yeniömerli Mahallesi, Yeşil Mahallesi, Yeşilevler Mahallesi, Yeşilyurt Mahallesi, Yiğitbaşı Mahallesi, Yunacık Mahallesi, Yunusemre Mahallesi`;

// Yüksek kesimde bilinen mahalleler
const tarsusYayla = new Set(["Gülek"]);

export const tarsusNeighborhoods = tarsusRaw.split(",").map((s) => {
  const raw = s.trim();
  const urban = /Mahallesi$/.test(raw);
  const name = raw.replace(/\s*Mahallesi$/, "");
  return {
    name,
    urban,
    terrain: tarsusYayla.has(name) ? "yayla" : "ova",
  };
});

export const models = [
  {
    slug: "1-1-prefabrik-ev",
    name: "1+1 ev",
    area: "35–45 m²",
    rooms: "1 oda, 1 salon, mutfak, banyo",
    fit: "Bağ evi, hobi bahçesi, tek kişi ya da çift için ideal başlangıç.",
    services: ["prefabrik-ev", "ytong-ev"],
  },
  {
    slug: "2-1-prefabrik-ev",
    name: "2+1 ev",
    area: "60–75 m²",
    rooms: "2 oda, 1 salon, mutfak, banyo",
    fit: "Küçük aileler ve yazlık kullanım için en çok tercih edilen plan.",
    services: ["prefabrik-ev", "celik-ev", "ytong-ev"],
  },
  {
    slug: "3-1-celik-ev",
    name: "3+1 ev",
    area: "85–110 m²",
    rooms: "3 oda, 1 salon, mutfak, banyo, isteğe göre ebeveyn banyosu",
    fit: "Kalıcı oturum için geniş aile evi.",
    services: ["celik-ev", "ytong-ev", "prefabrik-ev"],
  },
  {
    slug: "dubleks-celik-ev",
    name: "Dubleks çelik ev",
    area: "120 m² ve üzeri",
    rooms: "İki kat, 3–4 oda, iki banyo",
    fit: "Arsayı verimli kullanmak ve villa konforu isteyenler için.",
    services: ["celik-ev", "ytong-ev"],
  },
  {
    slug: "bag-evi",
    name: "Bağ evi",
    area: "20–40 m²",
    rooms: "Açık plan yaşam alanı, mutfak köşesi, banyo",
    fit: "Bahçe, tarla ve narenciye arazisinde dinlenme evi.",
    services: ["prefabrik-ev"],
  },
  {
    slug: "santiye-ofis",
    name: "Şantiye ve ofis binası",
    area: "İhtiyaca göre",
    rooms: "Ofis, yemekhane, yatakhane, WC modülleri",
    fit: "İnşaat sahası, tesis ve işletmeler için hızlı kurulan çalışma alanı.",
    services: ["prefabrik-ev"],
  },
];

export const faqs = [
  {
    q: "Fiyatlar neye göre belirleniyor?",
    a: "Fiyat; evin metrekaresine, plan tipine, seçilen yalıtım ve kaplama malzemesine, arsanın konumuna ve zemin durumuna göre değişir. Ücretsiz keşfin ardından kalem kalem yazılı teklif veriyoruz.",
  },
  {
    q: "Kurulum ne kadar sürer?",
    a: "Süre modele ve zemin hazırlığına bağlıdır. Prefabrik evler çok kısa sürede kurulur; çelik ve Ytong evlerde süreyi kaba inşaat ve ince işler belirler. Kesin takvimi teklifle birlikte yazıyoruz.",
  },
  {
    q: "Prefabrik ya da çelik ev için ruhsat gerekir mi?",
    a: "Kalıcı yapılarda imar mevzuatı ve belediyenin izinleri geçerlidir; arsanın imar durumu belirleyicidir. Başlamadan önce arsanızın durumunu sizinle birlikte kontrol ediyoruz.",
  },
  {
    q: "Zemin için ne gerekiyor?",
    a: "Ev, düz ve sağlam bir zemin üzerine kurulur. Modele göre radye beton ya da çelik ayaklı zemin hazırlanır. Keşifte arsanızı inceleyip en uygun çözümü öneriyoruz.",
  },
  {
    q: "Planı ve iç düzeni değiştirebilir miyim?",
    a: "Evet. Oda sayısı, pencere yerleri, mutfak ve banyo yerleşimi ile dış cephe rengi isteğinize göre değişir.",
  },
  {
    q: "Mersin'in hangi ilçelerine hizmet veriyorsunuz?",
    a: "Mersin genelinde; Tarsus başta olmak üzere Akdeniz, Anamur, Aydıncık, Bozyazı, Çamlıyayla, Erdemli, Gülnar, Mezitli, Mut, Silifke, Toroslar ve Yenişehir dahil Mersin'in tüm ilçelerine gidiyoruz.",
  },
];
