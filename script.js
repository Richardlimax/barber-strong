document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const faqItems = document.querySelectorAll(".faq-item");
    const revealItems = document.querySelectorAll(".reveal");
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = siteNav.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        siteNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                siteNav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    faqItems.forEach(function (item) {
        const button = item.querySelector(".faq-question");
        if (!button) return;

        button.addEventListener("click", function () {
            const isOpen = item.classList.contains("is-open");
            faqItems.forEach(function (entry) {
                entry.classList.remove("is-open");
                const entryButton = entry.querySelector(".faq-question");
                if (entryButton) {
                    entryButton.setAttribute("aria-expanded", "false");
                }
            });

            if (!isOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }
});