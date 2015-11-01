"use strict";
var router = {
  handle: (RouteLink, callback) => {
    if (location.hash === RouteLink || location === RouteLink) callback();
    router.handlers.push({ link: RouteLink, callback: callback });
  },
  handlers: [],
  links: [],
  makeLink: (Selector, link, newtab, eventType) => router.links.push(() => document.querySelector(Selector).addEventListener((eventType === undefined ? 'click' : eventType), e => router.open(link, newtab))),
  open : (link, newtab) => newtab ? open(link) : location = link,
  setTitle: title => document.title = title,
  setView: (viewHostSelector, view) => document.body.querySelector(viewHostSelector).innerHTML = view,
  fetchView: (viewHostSelector, viewURL, cache, id) => {
      if(localStorage.getItem("RT_" + id) === null || localStorage.getItem("RT_" + id) === undefined) {
        fetch(viewURL).then(res => {
            res.text().then(txt => {
              if(cache === true  && id !== undefined && typeof id === "string" && localStorage.getItem("RT_" + id) === null || localStorage.getItem("RT_" + id) === undefined) localStorage.setItem(("RT_" + id),txt);
              document.body.querySelector(viewHostSelector).innerHTML = txt;
            });
        }).catch(msg => log('warn', 'Could not fetch view -> ' + msg));
      } else if(cache) document.body.querySelector(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id);
  },
  clearCache: () => { for (var i in localStorage) if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i)) },
};
window.addEventListener('hashchange', e => router.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.callback() : null));
window.addEventListener('load', e => {
  Array.from(document.querySelectorAll('[link]')).forEach(el => el.addEventListener('click', e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : router.open(el.getAttribute('link'))));
  router.links.forEach(link => link());
});
