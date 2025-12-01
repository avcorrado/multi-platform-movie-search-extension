function createContextMenu() {
  browser.contextMenus.create({
    id: 'searchIMDb',
    title: "Search IMDb for '%s'",
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'searchTrakt',
    title: "Search Trakt for '%s'",
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'searchLetterboxd',
    title: "Search Letterboxd for '%s'",
    contexts: ['selection'],
  });
}

function handleContextMenuClick(info, tab) {
  const query = info.selectionText;

  let url;
  switch (info.menuItemId) {
    case 'searchIMDb':
      url = `https://www.imdb.com/find?s=tt&q=${encodeURIComponent(query)}`;
      break;
    case 'searchTrakt':
      url = `https://trakt.tv/search?query=${encodeURIComponent(query)}`;
      break;
    case 'searchLetterboxd':
      url = `https://letterboxd.com/search/films/${encodeURIComponent(query)}/`;
      break;
  }

  if (url) {
    browser.tabs.create({
      url,
      index: tab.index + 1,
      active: true           
    });
  }
}

browser.contextMenus.onClicked.addListener(handleContextMenuClick);

browser.runtime.onInstalled.addListener(createContextMenu);
