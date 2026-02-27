document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".panel");

    if (!tabs.length || !panels.length) return;

    function activateTab(key) {
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === key;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        panels.forEach(panel => {
            panel.classList.toggle(
                "is-active",
                panel.id === `panel-${key}`
            );
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            activateTab(this.dataset.tab);
        });
    });

});