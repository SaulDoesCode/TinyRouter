var router = {
  handle(RouteLink, callback) {
    if (location.hash === RouteLink || location === RouteLink) callback();
    router.handlers.push({ link: RouteLink, callback: callback });
  },
  handlers: [],
  links: [],
  makeLink: (Selector, link, newtab, eventType) => router.links.push(() => document.querySelector(Selector).addEventListener((eventType === undefined ? 'click' : eventType), e => router.open(link, newtab))),
  open : (link, newtab) => newtab ? open(link) : location = link,
  setTitle: title => document.title = title,
  setView: (viewHostSelector, view) => document.body.querySelector(viewHostSelector).innerHTML = view,
  fetchView(viewHostSelector, viewURL, cache, id) {
    let viewHost = document.body.querySelector(viewHostSelector);
    if (id !== undefined && typeof id === "string" && cache === true) {
      if (localStorage.getItem("RT_" + id) === null || localStorage.getItem("RT_" + id) === undefined) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = e => {
          if (req.readyState === 4 && req.status === 200) {
            localStorage.setItem(("RT_" + id),req.response);
            viewHost.innerHTML = req.response;
          }
        }
        req.open('GET', viewURL);
        req.send();
      } else {
        viewHost.innerHTML = localStorage.getItem("RT_" + id);
      }
    } else {
      let req = new XMLHttpRequest();
      req.onreadystatechange = e => {
        if (req.readyState === 4 && req.status === 200) viewHost.innerHTML = req.response;
      }
      req.open('GET', viewURL);
      req.send();
    }
  },
  clearCache: () => { for (let i in localStorage) if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i)) },
};
window.addEventListener('hashchange', e => router.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.callback() : null));
window.addEventListener('load', e => {
  Array.from(document.querySelectorAll('[link]')).forEach(el => el.addEventListener('click', e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : router.open(el.getAttribute('link'))));
  router.links.forEach(link => link());
});
