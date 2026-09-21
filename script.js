document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const faqItems = document.querySelectorAll(".faq-item");
    const revealItems = document.querySelectorAll(".reveal");
    const navLinks = document.querySelectorAll(".site-nav a");
    const year = document.getElementById("year");
    const questionForm = document.getElementById("whatsapp-question-form");
    const questionInput = document.getElementById("whatsapp-question");
    const questionFeedback = document.getElementById("question-feedback");

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

    if (questionForm && questionInput) {
        questionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const question = questionInput.value.trim();
            if (!question) {
                questionForm.classList.add("is-invalid");
                if (questionFeedback) {
                    questionFeedback.textContent = "Escreva sua pergunta para continuar.";
                }
                questionInput.focus();
                return;
            }

            questionForm.classList.remove("is-invalid");
            const message = `Olá! ${question}`;
            const whatsappUrl = `https://wa.me/5511981815390?text=${encodeURIComponent(message)}`;
            window.location.assign(whatsappUrl);
        });

        questionInput.addEventListener("input", function () {
            if (questionInput.value.trim()) {
                questionForm.classList.remove("is-invalid");
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, { threshold: 0.16 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                    const target = link.getAttribute("href");
                    link.classList.toggle("active", target === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
});
