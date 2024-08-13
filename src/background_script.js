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

function handleContextMenuClick(info) {
  const query = info.selectionText;

  switch (info.menuItemId) {
    case 'searchIMDb':
      browser.tabs.create({
        url: `https://www.imdb.com/find?s=tt&q=${encodeURIComponent(query)}`,
      });
      break;

    case 'searchTrakt':
      browser.tabs.create({
        url: `https://trakt.tv/search?query=${encodeURIComponent(query)}`,
      });
      break;

    case 'searchLetterboxd':
      browser.tabs.create({
        url: `https://letterboxd.com/search/films/${encodeURIComponent(query)}/`,
      });
      break;
  }
}

browser.runtime.onInstalled.addListener(createContextMenu);
browser.contextMenus.onClicked.addListener(handleContextMenuClick);
