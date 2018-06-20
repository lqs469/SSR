let ssr = {
  allRoutes: [],
  routeParent: [],
  hookCallback: {},
  match(hash) {
    hash = hash || '/'
    this.allRoutes.forEach((r, i) => {
      const path = r.getAttribute('path')
      const routeParent = ssr.routeParent[i]
      const routeHTML = r.outerHTML
      const childrenHTML = routeParent.innerHTML

      const matched = this.isMatch(path, hash)
      if (matched) {
        routeParent.innerHTML = childrenHTML.replace(`<!-- ssr${i} -->`, routeHTML)
        this.hookCallback[path] && this.hookCallback[path](matched.props, matched.search)
      } else {
        const rmHTML = routeParent.querySelector(`[ssr-id="${i}"]`)
        if (rmHTML) {
          routeParent.innerHTML = childrenHTML.replace(rmHTML.outerHTML, `<!-- ssr${i} -->`)
        }
      }
    })
  },
  didChange(path, cb) {
    path = path instanceof Array ? path : [path]
    path.forEach(p => {
      ssr.hookCallback[p] = cb
      const matched = this.isMatch(p, location.hash)
      if (matched && cb) {
        cb(matched.props, matched.search)
      }
    })
  },
  isMatch(path, hash) {
    const pathElm = path.replace('#', '').split('/')
    const hashElm = hash
      .replace('#', '')
      .split('?')[0]
      .split('/')
    if (pathElm.length !== hashElm.length) {
      return false
    }

    const props = {}
    let f = true
    pathElm.forEach((p, i) => {
      const h = hashElm[i]
      if (p.indexOf(':') > -1) {
        props[p.replace(':', '')] = h
      } else if (p !== h) {
        return (f = false)
      }
    })

    const parseQueryString = () => {
      const str = location.hash.split('?')[1]
      if (!str) return
      const objURL = {}
      str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
        objURL[$1] = $3
      })
      return objURL
    }

    return f
      ? {
          props,
          search: parseQueryString(),
        }
      : f
  },
}
;(function() {
  const allRoutes = document.querySelectorAll('[path]')
  allRoutes.forEach((r, i) => {
    r.setAttribute('ssr-id', i)
    ssr.allRoutes.push(r)
  })
  ssr.routeParent = [].slice.call(allRoutes).map(r => r.parentNode)
  ssr.match(location.hash)

  onhashchange = () => {
    ssr.match(location.hash)
  }
})()

// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//   module.exports = ssr
// } else {
//   if (typeof define === 'function' && define.amd) {
//     define([], function() {
//       return ssr
//     })
//   } else {
//     window.ssr = ssr
//   }
// }
