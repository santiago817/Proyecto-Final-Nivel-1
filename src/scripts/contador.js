export function autoStayCounter() {
  const staysContainer = document.getElementById("stays-container");
  const staysCount = document.getElementById("stays-count");

  if (!staysContainer || !staysCount) return;

  const update = () => {
    const total = Array.from(staysContainer.children).filter(
      (el) => el.offsetParent !== null
    ).length;

    staysCount.textContent = `${total}+ stays`;
  };

  new MutationObserver(update).observe(staysContainer, { childList: true });

  update();
}
