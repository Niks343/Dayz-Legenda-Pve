const builtInGuides = [
  {
    category: "Старт",
    title: "Первые 10 минут",
    summary: "Что делать сразу после появления на берегу, чтобы не остаться без сил и снаряжения.",
    sections: [
      {
        heading: "Осмотрись и проверь состояние",
        paragraphs: ["Не беги сразу вглубь карты. Проверь индикаторы здоровья, крови, температуры и воды, а затем осмотрись вокруг. В первые минуты важнее понять, где ты и что у тебя уже есть."]
      },
      {
        heading: "Собери базовый набор",
        paragraphs: ["Ищи одежду с хорошей вместимостью, нож или другой инструмент, ёмкость для воды и простую еду. Осматривай дома по пути, но не задерживайся надолго в открытом месте."]
      },
      {
        heading: "Уходи от побережья с планом",
        paragraphs: ["Выбери ориентир и двигайся от поселения к поселению. Не набивай рюкзак всем подряд: свободные руки, вода и запас здоровья полезнее случайного хлама."]
      }
    ]
  },
  {
    category: "Выживание",
    title: "Вода и еда",
    summary: "Как искать припасы, пить безопаснее и не тратить силы на лишние перебежки.",
    sections: [
      {
        heading: "Сначала найди источник",
        paragraphs: ["Проверяй дома, теплицы и другие места с припасами. У колодца можно пополнить запас воды, но не пей из сомнительной ёмкости, если не уверен в её содержимом."]
      },
      {
        heading: "Пей небольшими порциями",
        paragraphs: ["Не жди, пока индикатор опустеет. Делай короткие остановки и следи за состоянием персонажа. Если используешь найденную тару, проверь, чистая ли в ней вода; при сомнениях найди надёжный источник или обработай её подходящим способом."]
      },
      {
        heading: "Еда — это не только консервы",
        paragraphs: ["Ищи продукты в зданиях и используй доступные источники еды по ситуации. Не переедай за один раз, проверяй состояние продуктов и мой руки после разделки сырого мяса, прежде чем есть."]
      }
    ]
  },
  {
    category: "Выживание",
    title: "Тепло и здоровье",
    summary: "Сухая одежда, осторожность с ранами и простые привычки, которые берегут жизнь.",
    sections: [
      {
        heading: "Не игнорируй холод",
        paragraphs: ["Мокрая одежда и долгое пребывание под дождём ускоряют потерю тепла. Найди укрытие, высуши вещи у безопасного источника тепла и старайся носить подходящую одежду."]
      },
      {
        heading: "Обрабатывай раны чистыми средствами",
        paragraphs: ["Для перевязки используй чистую повязку или подходящий медицинский предмет. Не забывай дезинфицировать грязную ткань, если такая возможность есть. После укуса или травмы оцени ситуацию и используй подходящие предметы из инвентаря."]
      },
      {
        heading: "Следи за признаками болезни",
        paragraphs: ["Кашель, чихание и ухудшение состояния — повод остановиться, согреться и проверить, что ты ел и пил. Лекарства помогают только при правильном применении: прочитай описание предмета и не принимай всё подряд."]
      }
    ]
  },
  {
    category: "Тактика",
    title: "Заражённые и шум",
    summary: "Как не собрать за собой полгорода и выбраться, если драка уже началась.",
    sections: [
      {
        heading: "Сначала избегай столкновения",
        paragraphs: ["Заражённые реагируют на шум и движение. Обходи группы, используй укрытия и не бегай рядом с ними без необходимости. Выстрел может привлечь ещё больше внимания."]
      },
      {
        heading: "Если заметили",
        paragraphs: ["Отходи к безопасному укрытию и не загоняй себя в тупик. Не провоцируй группу, если рядом могут быть другие игроки. В ближнем бою держи дистанцию и следи за выносливостью."]
      },
      {
        heading: "Планируй выход",
        paragraphs: ["Перед входом в здание отметь второй путь наружу. После контакта проверь здоровье, одежду и запас сил, а затем смени позицию — задерживаться на шумном месте опасно."]
      }
    ]
  },
  {
    category: "Тактика",
    title: "Перестрелка: выживи и отступи",
    summary: "Что делать при встрече с другим игроком, когда победа не важнее жизни.",
    sections: [
      {
        heading: "Не стой на линии огня",
        paragraphs: ["При звуке выстрела найди укрытие и оцени направление угрозы. Не выглядывай многократно из одной точки. Если противник тебя не видит, уход может быть безопаснее ответного огня."]
      },
      {
        heading: "Проверь снаряжение заранее",
        paragraphs: ["До опасной зоны убедись, что оружие заряжено, боеприпасы подходят, а медицинские предметы доступны. В инвентаре не должно быть лишнего, что мешает быстро двигаться."]
      },
      {
        heading: "После контакта смени позицию",
        paragraphs: ["Не беги сразу к месту, откуда стреляли: там могут ждать. Перевяжись только в укрытии, оцени состояние и отступи другим маршрутом."]
      }
    ]
  },
  {
    category: "Навигация",
    title: "Не теряйся на карте",
    summary: "Ориентиры, дороги и спокойный маршрут вместо бесцельного бега.",
    sections: [
      {
        heading: "Сверяйся с ориентирами",
        paragraphs: ["Используй карту, если она у тебя есть, и сверяй её с табличками, железной дорогой, береговой линией и заметными зданиями. На разных серверах могут быть свои особенности."]
      },
      {
        heading: "Двигайся короткими отрезками",
        paragraphs: ["Выбери следующий понятный ориентир, дойди до него и только потом планируй продолжение. Так проще заметить угрозу и не уйти слишком далеко от воды или укрытия."]
      },
      {
        heading: "Планируй маршрут по риску",
        paragraphs: ["Главные дороги быстрее, но заметнее. Лес и второстепенные тропы дают укрытие, однако в них легче потерять направление. Держи в голове запасной путь и место, где можно переждать."]
      }
    ]
  }
];

let guides = [...builtInGuides];
let drafts = [];
const grid = document.querySelector("#guide-grid");
const searchInput = document.querySelector("#guide-search");
const emptyState = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const dialog = document.querySelector("#guide-dialog");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");
const editorDialog = document.querySelector("#editor-dialog");
const editorForm = document.querySelector("#guide-form");
const editorSections = document.querySelector("#editor-sections");
const editorFeedback = document.querySelector("#editor-feedback");
const appStatus = document.querySelector("#app-status");
const exportGuidesButton = document.querySelector("#export-guides-button");
const coverInput = document.querySelector("#guide-cover");
const coverPreview = document.querySelector("#guide-cover-preview");
let activeCategory = "all";
let coverPreviewUrl = null;

function renderGuides() {
  const allGuides = [...guides, ...drafts].filter((guide, index, list) =>
    !guide.id || list.findIndex((item) => item.id === guide.id) === index
  );
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  const visibleGuides = allGuides
    .map((guide, index) => ({ guide, index }))
    .filter(({ guide }) => {
      const matchesCategory = activeCategory === "all" || guide.category === activeCategory;
      const sectionText = guide.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(" ");
      const searchableText = `${guide.category} ${guide.title} ${guide.summary} ${sectionText}`.toLocaleLowerCase("ru");
      return matchesCategory && searchableText.includes(query);
    });

  grid.replaceChildren(...visibleGuides.map(({ guide, index }) => {
    const card = document.createElement("button");
    card.className = "guide-card";
    card.type = "button";
    card.setAttribute("aria-label", `Открыть гайд: ${guide.title}`);

    if (guide.coverImage) {
      const cover = document.createElement("img");
      cover.className = "guide-card-image";
      cover.src = guide.coverImage;
      cover.alt = `Обложка: ${guide.title}`;
      card.append(cover);
    }

    const topLine = document.createElement("span");
    topLine.className = "card-topline";
    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = guide.category.toLocaleUpperCase("ru");
    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = `0${index + 1}`;
    topLine.append(category, number);

    const title = document.createElement("span");
    title.className = "guide-card-title";
    title.textContent = guide.title;
    const summary = document.createElement("span");
    summary.className = "guide-card-summary";
    summary.textContent = guide.summary;
    const arrow = document.createElement("span");
    arrow.className = "card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    card.append(topLine, title, summary, arrow);
    card.addEventListener("click", () => openGuide(guide));
    return card;
  }));
  emptyState.hidden = visibleGuides.length > 0;
  document.querySelector("#guide-total").textContent = String(allGuides.length).padStart(2, "0");
  document.querySelector('[data-category="all"] span').textContent = String(allGuides.length).padStart(2, "0");
}

function openGuide(guide) {
  dialogCategory.textContent = `ПОЛЕВОЙ ГАЙД · ${guide.category.toLocaleUpperCase("ru")}`;
  dialogTitle.textContent = guide.title;
  const content = [];
  if (guide.coverImage) {
    const cover = document.createElement("img");
    cover.className = "guide-dialog-cover";
    cover.src = guide.coverImage;
    cover.alt = `Иллюстрация к гайду «${guide.title}»`;
    content.push(cover);
  }
  content.push(...guide.sections.flatMap((section) => {
    const heading = document.createElement("h3");
    heading.textContent = section.heading;
    const paragraphs = section.paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    });
    return [heading, ...paragraphs];
  }));
  dialogContent.replaceChildren(...content);
  dialog.showModal();
}

searchInput.addEventListener("input", renderGuides);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    renderGuides();
  });
});

document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
[dialog, editorDialog].forEach((currentDialog) => {
  currentDialog.addEventListener("click", (event) => {
    if (event.target === currentDialog) currentDialog.close();
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !dialog.open && !editorDialog.open && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

function showAppStatus(message) {
  appStatus.textContent = message;
  appStatus.hidden = false;
}

function isGuide(value) {
  return value
    && typeof value.id === "string"
    && typeof value.title === "string"
    && typeof value.summary === "string"
    && (value.coverImage === undefined
      || (typeof value.coverImage === "string"
        && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value.coverImage)))
    && ["Старт", "Выживание", "Тактика", "Навигация"].includes(value.category)
    && Array.isArray(value.sections)
    && value.sections.length > 0
    && value.sections.every((section) =>
      typeof section.heading === "string"
      && Array.isArray(section.paragraphs)
      && section.paragraphs.length > 0
      && section.paragraphs.every((paragraph) => typeof paragraph === "string")
    );
}

function readDrafts() {
  try {
    const savedDrafts = JSON.parse(localStorage.getItem("dayz-guide-drafts") || "[]");
    if (!Array.isArray(savedDrafts) || !savedDrafts.every(isGuide)) {
      throw new Error("Сохранённые черновики имеют неверный формат.");
    }
    drafts = savedDrafts;
  } catch (error) {
    drafts = [];
    showAppStatus(`Не удалось загрузить черновики: ${error.message}`);
  }
}

async function loadCommunityGuides() {
  let communityGuides;
  try {
    const response = await fetch("./guides.json");
    if (!response.ok) {
      throw new Error(`сервер ответил ${response.status}`);
    }
    communityGuides = await response.json();
    if (!Array.isArray(communityGuides) || !communityGuides.every(isGuide)) {
      throw new Error("файл guides.json имеет неверный формат");
    }
  } catch (error) {
    showAppStatus(`Не удалось загрузить опубликованные гайды: ${error.message}. Проверь guides.json или открой сайт через GitHub Pages/локальный сервер.`);
    renderGuides();
    return;
  }
  exportGuidesButton.disabled = false;
  guides = [...builtInGuides, ...communityGuides];

  const publishedIds = new Set(communityGuides.map((guide) => guide.id));
  const remainingDrafts = drafts.filter((guide) => !publishedIds.has(guide.id));
  if (remainingDrafts.length !== drafts.length) {
    try {
      localStorage.setItem("dayz-guide-drafts", JSON.stringify(remainingDrafts));
      drafts = remainingDrafts;
    } catch (error) {
      showAppStatus(`Гайды загружены, но опубликованные черновики не удалось удалить из этого браузера: ${error.message}`);
    }
  }
  renderGuides();
}

function addEditorSection(section = {}) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "editor-section";

  const legend = document.createElement("legend");
  legend.textContent = `Раздел ${editorSections.children.length + 1}`;

  const headingLabel = document.createElement("label");
  headingLabel.className = "editor-field";
  const headingText = document.createElement("span");
  headingText.textContent = "Заголовок раздела";
  const headingInput = document.createElement("input");
  headingInput.name = "section-heading";
  headingInput.type = "text";
  headingInput.maxLength = 100;
  headingInput.required = true;
  headingInput.value = section.heading || "";
  headingLabel.append(headingText, headingInput);

  const contentLabel = document.createElement("label");
  contentLabel.className = "editor-field";
  const contentText = document.createElement("span");
  contentText.textContent = "Текст раздела";
  const contentInput = document.createElement("textarea");
  contentInput.name = "section-content";
  contentInput.rows = 5;
  contentInput.required = true;
  contentInput.placeholder = "Пустая строка между абзацами";
  contentInput.value = section.paragraphs ? section.paragraphs.join("\n\n") : "";
  contentLabel.append(contentText, contentInput);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-section-button";
  removeButton.type = "button";
  removeButton.textContent = "Убрать раздел";
  removeButton.addEventListener("click", () => {
    fieldset.remove();
    updateEditorSectionLabels();
  });
  fieldset.append(legend, headingLabel, contentLabel, removeButton);
  editorSections.append(fieldset);
  updateEditorSectionLabels();
}

function updateEditorSectionLabels() {
  const sections = [...editorSections.querySelectorAll(".editor-section")];
  sections.forEach((section, index) => {
    section.querySelector("legend").textContent = `Раздел ${index + 1}`;
    section.querySelector(".remove-section-button").disabled = sections.length === 1;
  });
}

function clearCoverPreview() {
  if (coverPreviewUrl) {
    URL.revokeObjectURL(coverPreviewUrl);
    coverPreviewUrl = null;
  }
  coverPreview.removeAttribute("src");
  coverPreview.hidden = true;
}

coverInput.addEventListener("change", () => {
  clearCoverPreview();
  const file = coverInput.files[0];
  if (!file) return;
  coverPreviewUrl = URL.createObjectURL(file);
  coverPreview.src = coverPreviewUrl;
  coverPreview.hidden = false;
});

async function compressCoverImage(file) {
  const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!supportedTypes.includes(file.type)) {
    throw new Error("Выбери изображение JPG, PNG или WebP.");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Исходное изображение больше 12 МБ.");
  }

  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const loadedImage = new Image();
      loadedImage.onload = () => resolve(loadedImage);
      loadedImage.onerror = () => reject(new Error("Не удалось открыть выбранное изображение."));
      loadedImage.src = sourceUrl;
    });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Браузер не смог подготовить изображение.");
    }

    for (let maxDimension = 1600; maxDimension >= 640; maxDimension = Math.floor(maxDimension * 0.8)) {
      const scale = Math.min(1, maxDimension / image.naturalWidth, maxDimension / image.naturalHeight);
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      context.fillStyle = "#141411";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error("Не удалось сжать изображение."));
        }, "image/jpeg", 0.78);
      });
      if (blob.size <= 750 * 1024) {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
            else reject(new Error("Не удалось преобразовать изображение в формат для сайта."));
          };
          reader.onerror = () => reject(new Error("Не удалось сохранить подготовленное изображение."));
          reader.readAsDataURL(blob);
        });
      }
    }
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
  throw new Error("Не удалось уменьшить изображение до 750 КБ. Выбери файл поменьше.");
}

function createGuideId() {
  return `community-${window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`;
}

document.querySelector("#add-guide-button").addEventListener("click", () => {
  editorFeedback.textContent = "";
  editorDialog.showModal();
});
document.querySelector("#add-section-button").addEventListener("click", () => addEditorSection());
editorForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(editorForm);
  const sections = [...editorSections.querySelectorAll(".editor-section")].map((section) => ({
    heading: section.querySelector('[name="section-heading"]').value.trim(),
    paragraphs: section.querySelector('[name="section-content"]').value
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  }));
  const newGuide = {
    id: createGuideId(),
    category: formData.get("category"),
    title: formData.get("title").trim(),
    summary: formData.get("summary").trim(),
    sections
  };
  const coverFile = coverInput.files[0];
  const submitButton = editorForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    if (coverFile) {
      editorFeedback.textContent = "Сжимаю изображение перед сохранением…";
      newGuide.coverImage = await compressCoverImage(coverFile);
    }
    const updatedDrafts = [...drafts, newGuide];
    localStorage.setItem("dayz-guide-drafts", JSON.stringify(updatedDrafts));
    drafts = updatedDrafts;
    renderGuides();
    editorFeedback.textContent = "Черновик сохранён. Обложка включена в guides.json; скачай файл и добавь его в репозиторий GitHub для публикации.";
    editorForm.reset();
    clearCoverPreview();
    editorSections.replaceChildren();
    addEditorSection();
  } catch (error) {
    editorFeedback.textContent = `Не удалось сохранить черновик: ${error.message}`;
  } finally {
    submitButton.disabled = false;
  }
});

exportGuidesButton.addEventListener("click", () => {
  const customGuides = drafts.concat(guides.filter((guide) => guide.id));
  const uniqueGuides = [...new Map(customGuides.map((guide) => [guide.id, guide])).values()];
  const file = new Blob([`${JSON.stringify(uniqueGuides, null, 2)}\n`], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "guides.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  editorFeedback.textContent = "Файл скачан. Загрузи его в корень репозитория GitHub вместо старого guides.json и сохрани изменения. Обложки уже вложены в файл.";
});

readDrafts();
addEditorSection();
loadCommunityGuides();
