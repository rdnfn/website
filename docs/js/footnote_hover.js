/* A script to show footnote content in a popup when hovering over footnote references */

document.addEventListener("DOMContentLoaded", function () {
    var popup = document.createElement("div");
    popup.className = "footnote-popup";
    document.body.appendChild(popup);
    var hideTimer;

    function hide() {
        hideTimer = setTimeout(function () { popup.style.display = "none"; }, 200);
    }

    popup.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    popup.addEventListener("mouseleave", hide);

    document.querySelectorAll("a.footnote-ref").forEach(function (ref) {
        ref.addEventListener("mouseenter", function () {
            var note = document.getElementById(decodeURIComponent(ref.getAttribute("href").substr(1)));
            if (!note) return;
            clearTimeout(hideTimer);
            popup.innerHTML = note.innerHTML;
            popup.querySelectorAll(".footnote-backref").forEach(function (a) { a.remove(); });
            popup.style.display = "block";
            var rect = ref.getBoundingClientRect();
            var left = Math.min(rect.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - popup.offsetWidth - 8);
            popup.style.left = Math.max(window.scrollX + 8, left) + "px";
            popup.style.top = (rect.bottom + window.scrollY + 4) + "px";
        });
        ref.addEventListener("mouseleave", hide);
    });
});
