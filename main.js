/**
 * ====================================================================
 * المنطق التفاعلي والتطبيقي - موقع مطعم قصر الشرق
 * Interactive Logic & App Controller
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. تهيئة البيانات من ملف الإعدادات المركزي
  initRestaurantConfig();

  // 2. تهيئة وتصيير قائمة الطعام التفاعلية
  initInteractiveMenu();

  // 3. تهيئة تبديل الفروع والخرائط
  initBranchesSwitcher();

  // 4. تهيئة نموذج حجز الطاولات
  initReservationSystem();

  // 5. تهيئة التمرير وشريط التنقل والتنقل السلس
  initNavigationAndScroll();
});

/**
 * دمج بيانات الإعدادات المركزية (Config) في عناصر الصفحة
 */
function initRestaurantConfig() {
  if (typeof RESTAURANT_CONFIG === "undefined") return;

  const cfg = RESTAURANT_CONFIG;

  // تحديث أسماء المطعم في النصوص
  document.querySelectorAll(".restaurant-name-target").forEach((el) => {
    el.textContent = cfg.restaurantName;
  });

  document.querySelectorAll(".restaurant-subname-target").forEach((el) => {
    el.textContent = cfg.restaurantSubName;
  });

  // تحديث الخط الساخن
  document.querySelectorAll(".hotline-target").forEach((el) => {
    el.textContent = cfg.hotline;
    if (el.tagName === "A" || el.closest("a")) {
      const link = el.tagName === "A" ? el : el.closest("a");
      link.href = `tel:${cfg.hotline.replace(/\s+/g, "")}`;
    }
  });

  // تحديث روابط الواتساب العائمة
  const whatsappBtns = document.querySelectorAll(".whatsapp-link-target");
  whatsappBtns.forEach((btn) => {
    btn.href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.defaultWhatsappMessage)}`;
  });

  // تحديث الإحصائيات
  const statsContainer = document.getElementById("statsGrid");
  if (statsContainer && cfg.stats) {
    statsContainer.innerHTML = cfg.stats
      .map(
        (st) => `
        <div class="stat-item">
          <div class="stat-value">${st.value}</div>
          <div class="stat-label">${st.label}</div>
        </div>
      `
      )
      .join("");
  }
}

/**
 * سلة / صينية الطلبات السريعة (Quick Order Tray)
 */
const orderCart = {
  items: [],
  addItem(item) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.updateUI();
  },
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },
  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },
  updateUI() {
    const tray = document.getElementById("orderTray");
    const countEl = document.getElementById("trayItemCount");
    const totalEl = document.getElementById("trayTotalAmount");

    if (!tray) return;

    const count = this.getCount();
    const total = this.getTotal();

    if (count > 0) {
      tray.style.display = "flex";
      countEl.textContent = `${count} أطباق مختارة`;
      totalEl.textContent = `${total} ${RESTAURANT_CONFIG.currency || "ج.م"}`;
    } else {
      tray.style.display = "none";
    }
  },
  sendWhatsAppOrder() {
    if (this.items.length === 0) return;

    let msg = `*طلب جديد من موقع ${RESTAURANT_CONFIG.restaurantName}*%0A%0A`;
    this.items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (الكمية: ${item.qty}) - السعر: ${item.price * item.qty} ${RESTAURANT_CONFIG.currency}%0A`;
    });
    msg += `%0A*الإجمالي النهائي:* ${this.getTotal()} ${RESTAURANT_CONFIG.currency}%0A`;
    msg += `أرجو تأكيد الطلب وتحديد أقرب فرع للتوصيل أو الاستلام.`;

    const url = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${msg}`;
    window.open(url, "_blank");
  }
};

/**
 * تهيئة وتصيير قائمة الطعام التفاعلية
 */
function initInteractiveMenu() {
  const tabsContainer = document.getElementById("menuCategoriesTabs");
  const menuGrid = document.getElementById("menuGrid");

  if (!menuGrid || typeof MENU_ITEMS === "undefined") return;

  // 1. تصيير تبويبات التصنيف
  if (tabsContainer && typeof MENU_CATEGORIES !== "undefined") {
    tabsContainer.innerHTML = MENU_CATEGORIES.map(
      (cat, index) => `
      <button class="category-tab ${index === 0 ? "active" : ""}" data-category="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `
    ).join("");

    // إضافة مستمعي الأحداث للتبويبات
    tabsContainer.querySelectorAll(".category-tab").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        tabsContainer.querySelectorAll(".category-tab").forEach((b) => b.classList.remove("active"));
        tabBtn.classList.add("active");
        const catId = tabBtn.getAttribute("data-category");
        renderMenuItems(catId);
      });
    });
  }

  // 2. تصيير بطاقات الأطباق
  function renderMenuItems(category = "all") {
    const filtered = category === "all" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === category);

    menuGrid.innerHTML = filtered
      .map(
        (item) => `
      <article class="menu-card fade-in-up" data-id="${item.id}">
        <div class="menu-card-img-wrapper">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" />
          ${item.tag ? `<span class="menu-card-badge">${item.tag}</span>` : ""}
          ${item.serves ? `<span class="menu-card-serves">👥 ${item.serves}</span>` : ""}
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <div class="menu-card-price">${item.price} <small>${RESTAURANT_CONFIG.currency || "ج.م"}</small></div>
          </div>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-actions">
            <button class="btn-add-order" data-item-id="${item.id}">
              <span>+</span>
              <span>أضف لقائمة الطلب</span>
            </button>
            <a href="#reservation" class="btn btn-outline btn-sm">حجز طاولة</a>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    // مستمعي أزرار الإضافة للطلب
    menuGrid.querySelectorAll(".btn-add-order").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        const found = MENU_ITEMS.find((i) => i.id === itemId);
        if (found) {
          orderCart.addItem(found);
          // تأثير لمس خفيف
          btn.style.transform = "scale(1.08)";
          btn.innerHTML = "<span>✓</span> <span>تمت الإضافة</span>";
          setTimeout(() => {
            btn.style.transform = "scale(1)";
            btn.innerHTML = "<span>+</span> <span>أضف لقائمة الطلب</span>";
          }, 1200);
        }
      });
    });
  }

  // العرض الأولي لكل الأصناف
  renderMenuItems("all");

  // تفعيل زر إرسال الطلب عبر واتساب في الصينية العائمة
  const sendOrderBtn = document.getElementById("btnSendOrderWhatsApp");
  if (sendOrderBtn) {
    sendOrderBtn.addEventListener("click", () => {
      orderCart.sendWhatsAppOrder();
    });
  }
}

/**
 * تهيئة تبديل الفروع (القاهرة والجيزة)
 */
function initBranchesSwitcher() {
  const branchesTabs = document.getElementById("branchesNavTabs");
  const branchDisplay = document.getElementById("branchDetailsDisplay");

  if (!branchesTabs || !branchDisplay || typeof RESTAURANT_CONFIG === "undefined") return;

  const branches = RESTAURANT_CONFIG.branches;

  // تصيير أزرار الفروع
  branchesTabs.innerHTML = branches
    .map(
      (b, idx) => `
      <button class="branch-nav-btn ${idx === 0 ? "active" : ""}" data-branch-id="${b.id}">
        <span>📍</span>
        <span>${b.shortName}</span>
      </button>
    `
    )
    .join("");

  // دالة تحديث بيانات الفرع المعروض
  function showBranch(branchId) {
    const b = branches.find((item) => item.id === branchId) || branches[0];

    branchDisplay.innerHTML = `
      <div class="branch-details-panel fade-in-up">
        <span class="branch-tag-pill">${b.tag}</span>
        <h3 class="branch-name-title">${b.name}</h3>

        <div class="branch-info-list">
          <div class="branch-info-item">
            <div class="branch-info-icon">📍</div>
            <div>
              <div class="branch-info-label">العنوان التفصيلي</div>
              <div class="branch-info-val">${b.address} (${b.area})</div>
            </div>
          </div>

          <div class="branch-info-item">
            <div class="branch-info-icon">📞</div>
            <div>
              <div class="branch-info-label">أرقام الهاتف المباشرة</div>
              <div class="branch-info-val">
                <a href="tel:${b.phone.replace(/\s+/g, "")}">${b.phone}</a> &bull; 
                <a href="tel:${b.mobile.replace(/\s+/g, "")}">${b.mobile}</a>
              </div>
            </div>
          </div>

          <div class="branch-info-item">
            <div class="branch-info-icon">⏰</div>
            <div>
              <div class="branch-info-label">مواعيد العمل واستقبال الضيوف</div>
              <div class="branch-info-val">${b.workingHours}</div>
            </div>
          </div>
        </div>

        <div class="branch-features-tags">
          ${b.features.map((feat) => `<span class="branch-feature-tag">✔ ${feat}</span>`).join("")}
        </div>

        <div class="branch-actions-row">
          <a href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>🗺️</span>
            <span>فتح الاتجاهات في خرائط Google</span>
          </a>
          <a href="tel:${b.mobile.replace(/\s+/g, "")}" class="btn btn-outline">
            <span>📞</span>
            <span>اتصال فوري بالفرع</span>
          </a>
        </div>
      </div>

      <div class="branch-map-panel fade-in-up">
        <iframe 
          title="موقع ${b.name}" 
          src="${b.mapEmbedUrl}" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `;
  }

  // مستمعي النقر للتبديل بين الفروع
  branchesTabs.querySelectorAll(".branch-nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      branchesTabs.querySelectorAll(".branch-nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const bId = btn.getAttribute("data-branch-id");
      showBranch(bId);
    });
  });

  // العرض الأولي للفرع الأول (القاهرة)
  showBranch("cairo");
}

/**
 * تهيئة نموذج حجز الطاولات
 */
function initReservationSystem() {
  const form = document.getElementById("reservationForm");
  const modal = document.getElementById("reservationModal");
  const modalClose = document.getElementById("modalCloseBtn");
  const modalDismiss = document.getElementById("modalDismissBtn");
  const modalSummary = document.getElementById("modalBookingSummary");
  const modalWhatsappBtn = document.getElementById("modalSendWhatsAppBtn");

  if (!form) return;

  // ضبط الحد الأدنى لتاريخ اليوم
  const dateInput = document.getElementById("resDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("resName")?.value || "";
    const phone = document.getElementById("resPhone")?.value || "";
    const branch = document.getElementById("resBranch")?.value || "";
    const guests = document.getElementById("resGuests")?.value || "2";
    const date = document.getElementById("resDate")?.value || "";
    const time = document.getElementById("resTime")?.value || "";
    const seating = document.getElementById("resSeating")?.value || "عائلية";
    const notes = document.getElementById("resNotes")?.value || "لا توجد ملاحظات خاصة";

    // توليد رقم مرجعي للحجز
    const bookingRef = "QS-" + Math.floor(100000 + Math.random() * 900000);

    // تجهيز ملخص الحجز للنافذة
    if (modalSummary) {
      modalSummary.innerHTML = `
        <div><strong>رقم الحجز:</strong> <span style="color:var(--color-gold); font-weight:bold;">${bookingRef}</span></div>
        <div><strong>اسم الضيف:</strong> ${name}</div>
        <div><strong>رقم الجوال:</strong> ${phone}</div>
        <div><strong>الفرع المختار:</strong> ${branch}</div>
        <div><strong>عدد الأفراد:</strong> ${guests} أفراد (${seating})</div>
        <div><strong>الموعد:</strong> ${date} في تمام الساعة ${time}</div>
        ${notes && notes !== "لا توجد ملاحظات خاصة" ? `<div><strong>ملاحظات:</strong> ${notes}</div>` : ""}
      `;
    }

    // إعداد زر واتساب لإرسال تأكيد الحجز إلى المطعم
    if (modalWhatsappBtn) {
      modalWhatsappBtn.onclick = () => {
        const msg = `*طلب تأكيد حجز طاولة جديد*%0A` +
          `رقم الحجز: *${bookingRef}*%0A` +
          `الاسم: ${name}%0A` +
          `رقم الهاتف: ${phone}%0A` +
          `الفرع: ${branch}%0A` +
          `عدد الأفراد: ${guests}%0A` +
          `التاريخ والوقت: ${date} - ${time}%0A` +
          `نوع الجلسة: ${seating}%0A` +
          `ملاحظات: ${notes}`;
        window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${msg}`, "_blank");
      };
    }

    // إظهار المودال
    if (modal) {
      modal.style.display = "flex";
    }

    // تفريغ النموذج
    form.reset();
  });

  // إغلاق المودال
  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalDismiss) modalDismiss.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/**
 * شريط التنقل والتمرير السلس وزر الصعود للأعلى
 */
function initNavigationAndScroll() {
  const header = document.querySelector(".site-header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.querySelector(".nav-links");

  // مراقبة التمرير
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // تثبيت الهيدر بتأثير بلور داكن
    if (header) {
      if (scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // ظهور زر التمرير للأعلى
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  // النقر على زر الصعود للأعلى
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // فتح / إغلاق القائمة في الهاتف
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
      const isOpen = navLinks.classList.contains("mobile-open");
      mobileToggle.textContent = isOpen ? "✕" : "☰";
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        mobileToggle.textContent = "☰";
      });
    });
  }
}
