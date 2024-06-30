const useOpenLinkInNewTab = () => {
  const handleOpenLink = (link) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
  };

  return [handleOpenLink];
};

export default useOpenLinkInNewTab;
