let guides = [];
let publishedGuides = [];
let legacyDrafts = [];
let hasCatalogDraft = false;
let savedCatalogDraft = null;
let publishedCatalogLoaded = false;
const catalogStorageKey = "dayz-guide-catalog-draft";
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
const editorTitle = document.querySelector("#editor-title");
const saveGuideButton = document.querySelector("#save-guide-button");
const deleteAllGuidesButton = document.querySelector("#delete-all-guides-button");
const addGuideButton = document.querySelector("#add-guide-button");
let activeCategory = "all";
let editingGuideId = null;
let coverPreviewUrl = null;

function catalogsMatch(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function renderGuides() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  const visibleGuides = guides
    .map((guide, index) => ({ guide, index }))
    .filter(({ guide }) => {
      const matchesCategory = activeCategory === "all" || guide.category === activeCategory;
      const sectionText = guide.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(" ");
      const searchableText = `${guide.category} ${guide.title} ${guide.summary} ${sectionText}`.toLocaleLowerCase("ru");
      return matchesCategory && searchableText.includes(query);
    });

  grid.replaceChildren(...visibleGuides.map(({ guide, index }) => {
    const card = document.createElement("article");
    card.className = "guide-card";
    const openButton = document.createElement("button");
    openButton.className = "guide-card-open";
    openButton.type = "button";
    openButton.setAttribute("aria-label", `Открыть гайд: ${guide.title}`);

    if (guide.coverImage) {
      const cover = document.createElement("img");
      cover.className = "guide-card-image";
      cover.src = guide.coverImage;
      cover.alt = `Обложка: ${guide.title}`;
      openButton.append(cover);
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
    openButton.append(topLine, title, summary, arrow);
    openButton.addEventListener("click", () => openGuide(guide));

    const actions = document.createElement("div");
    actions.className = "guide-card-actions";
    const editButton = document.createElement("button");
    editButton.className = "guide-edit-button";
    editButton.type = "button";
    editButton.textContent = "Редактировать";
    editButton.setAttribute("aria-label", `Редактировать гайд: ${guide.title}`);
    editButton.disabled = !publishedCatalogLoaded;
    editButton.addEventListener("click", () => editGuide(guide.id));
    const deleteButton = document.createElement("button");
    deleteButton.className = "guide-delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Удалить";
    deleteButton.setAttribute("aria-label", `Удалить гайд: ${guide.title}`);
    deleteButton.disabled = !publishedCatalogLoaded;
    deleteButton.addEventListener("click", () => deleteGuide(guide.id));
    actions.append(editButton, deleteButton);
    card.append(openButton, actions);
    return card;
  }));
  emptyState.hidden = visibleGuides.length > 0;
  emptyState.textContent = guides.length === 0
    ? "Каталог пуст. Добавь новый гайд, чтобы начать."
    : "По этому запросу ничего не нашлось. Попробуй другое слово.";
  document.querySelector("#guide-total").textContent = String(guides.length).padStart(2, "0");
  document.querySelector('[data-category="all"] span').textContent = String(guides.length).padStart(2, "0");
  exportGuidesButton.disabled = !publishedCatalogLoaded || catalogsMatch(guides, publishedGuides);
  addGuideButton.disabled = !publishedCatalogLoaded;
  deleteAllGuidesButton.disabled = !publishedCatalogLoaded;
  deleteAllGuidesButton.hidden = guides.length === 0;
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

function isCatalog(value) {
  return Array.isArray(value)
    && value.every(isGuide)
    && new Set(value.map((guide) => guide.id)).size === value.length;
}

function readLocalGuideChanges() {
  try {
    const savedCatalog = localStorage.getItem(catalogStorageKey);
    if (savedCatalog !== null) {
      savedCatalogDraft = JSON.parse(savedCatalog);
      if (!isCatalog(savedCatalogDraft)) {
        throw new Error("Локальный каталог имеет неверный формат.");
      }
      guides = savedCatalogDraft;
      hasCatalogDraft = true;
      return;
    }

    legacyDrafts = JSON.parse(localStorage.getItem("dayz-guide-drafts") || "[]");
    if (!isCatalog(legacyDrafts)) {
      throw new Error("Сохранённые черновики имеют неверный формат.");
    }
  } catch (error) {
    savedCatalogDraft = null;
    legacyDrafts = [];
    guides = [];
    showAppStatus(`Не удалось загрузить локальные изменения: ${error.message}`);
  }
}

function saveGuideCatalog(updatedGuides) {
  const isDifferentFromPublished = !catalogsMatch(updatedGuides, publishedGuides);
  try {
    if (isDifferentFromPublished) {
      localStorage.setItem(catalogStorageKey, JSON.stringify(updatedGuides));
    } else {
      localStorage.removeItem(catalogStorageKey);
    }
    localStorage.removeItem("dayz-guide-drafts");
  } catch (error) {
    showAppStatus(`Не удалось сохранить каталог в этом браузере: ${error.message}`);
    return false;
  }

  guides = updatedGuides;
  hasCatalogDraft = isDifferentFromPublished;
  savedCatalogDraft = isDifferentFromPublished ? updatedGuides : null;
  renderGuides();
  return true;
}

async function loadCommunityGuides() {
  let communityGuides;
  try {
    const response = await fetch("./guides.json");
    if (!response.ok) {
      throw new Error(`сервер ответил ${response.status}`);
    }
    communityGuides = await response.json();
    if (!isCatalog(communityGuides)) {
      throw new Error("файл guides.json имеет неверный формат");
    }
  } catch (error) {
    showAppStatus(`Не удалось загрузить опубликованные гайды: ${error.message}. Проверь guides.json или открой сайт через GitHub Pages/локальный сервер.`);
    renderGuides();
    return;
  }
  publishedGuides = communityGuides;
  publishedCatalogLoaded = true;

  if (savedCatalogDraft === null) {
    const mergedGuides = new Map(publishedGuides.map((guide) => [guide.id, guide]));
    legacyDrafts.forEach((guide) => mergedGuides.set(guide.id, guide));
    guides = [...mergedGuides.values()];
  } else {
    guides = savedCatalogDraft;
  }

  hasCatalogDraft = !catalogsMatch(guides, publishedGuides);
  try {
    if (hasCatalogDraft) {
      localStorage.setItem(catalogStorageKey, JSON.stringify(guides));
      localStorage.removeItem("dayz-guide-drafts");
      savedCatalogDraft = guides;
      showAppStatus("Есть неопубликованные изменения. Скачай guides.json и загрузи его в GitHub, чтобы обновить сайт для всех.");
    } else {
      localStorage.removeItem(catalogStorageKey);
      localStorage.removeItem("dayz-guide-drafts");
      savedCatalogDraft = null;
      guides = publishedGuides;
    }
  } catch (error) {
    showAppStatus(`Каталог загружен, но локальный черновик не удалось обновить: ${error.message}`);
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

function openNewGuideEditor() {
  editingGuideId = null;
  editorTitle.textContent = "Новый гайд";
  saveGuideButton.textContent = "Сохранить гайд";
  editorForm.reset();
  clearCoverPreview();
  editorSections.replaceChildren();
  addEditorSection();
  editorFeedback.textContent = "";
  editorDialog.showModal();
}

function editGuide(guideId) {
  const guide = guides.find((item) => item.id === guideId);
  if (!guide) {
    showAppStatus("Не удалось найти гайд для редактирования.");
    return;
  }
  editingGuideId = guideId;
  editorTitle.textContent = "Редактировать гайд";
  saveGuideButton.textContent = "Сохранить изменения";
  editorForm.reset();
  editorForm.elements.namedItem("title").value = guide.title;
  editorForm.elements.namedItem("category").value = guide.category;
  editorForm.elements.namedItem("summary").value = guide.summary;
  clearCoverPreview();
  if (guide.coverImage) {
    coverPreview.src = guide.coverImage;
    coverPreview.hidden = false;
  }
  editorSections.replaceChildren();
  guide.sections.forEach((section) => addEditorSection(section));
  editorFeedback.textContent = "";
  editorDialog.showModal();
}

function deleteGuide(guideId) {
  const guide = guides.find((item) => item.id === guideId);
  if (!guide || !window.confirm(`Удалить гайд «${guide.title}»? Изменение пока сохранится только в этом браузере.`)) {
    return;
  }
  if (saveGuideCatalog(guides.filter((item) => item.id !== guideId))) {
    showAppStatus("Гайд удалён из локального каталога. Скачай guides.json и загрузи его в GitHub, чтобы опубликовать изменение.");
  }
}

function deleteAllGuides() {
  if (!guides.length || !window.confirm(`Удалить все ${guides.length} гайдов? Это изменит только локальный каталог до публикации guides.json.`)) {
    return;
  }
  if (saveGuideCatalog([])) {
    showAppStatus("Все гайды удалены из локального каталога. Скачай пустой guides.json и загрузи его в GitHub, чтобы опубликовать удаление.");
  }
}

addGuideButton.addEventListener("click", openNewGuideEditor);
deleteAllGuidesButton.addEventListener("click", deleteAllGuides);
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
  const existingGuide = editingGuideId ? guides.find((guide) => guide.id === editingGuideId) : null;
  const newGuide = {
    ...(existingGuide || {}),
    id: editingGuideId || createGuideId(),
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
    const updatedGuides = editingGuideId
      ? guides.map((guide) => guide.id === editingGuideId ? newGuide : guide)
      : [...guides, newGuide];
    if (!saveGuideCatalog(updatedGuides)) return;
    const wasEditing = Boolean(editingGuideId);
    showAppStatus(wasEditing
      ? "Изменения сохранены в этом браузере. Скачай guides.json и загрузи его в GitHub для публикации."
      : "Гайд сохранён в этом браузере. Скачай guides.json и загрузи его в GitHub для публикации.");
    editorForm.reset();
    clearCoverPreview();
    editorSections.replaceChildren();
    addEditorSection();
    editingGuideId = null;
    editorTitle.textContent = "Новый гайд";
    saveGuideButton.textContent = "Сохранить гайд";
    if (wasEditing) editorDialog.close();
    else editorFeedback.textContent = "Гайд сохранён. Его можно редактировать или удалить из карточки.";
  } catch (error) {
    editorFeedback.textContent = `Не удалось сохранить черновик: ${error.message}`;
  } finally {
    submitButton.disabled = false;
  }
});

exportGuidesButton.addEventListener("click", () => {
  const file = new Blob([`${JSON.stringify(guides, null, 2)}\n`], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "guides.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  showAppStatus("Файл скачан. Загрузи его в корень репозитория GitHub вместо старого guides.json и сохрани изменения. Обложки уже вложены в файл.");
});

readLocalGuideChanges();
renderGuides();
addEditorSection();
loadCommunityGuides();
