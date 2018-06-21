import ssr from '@lqs469/ssr'

ssr.didChange(['c/:i/:j'], (props, search) => {
  document.getElementById('loca').innerHTML = `path: ${JSON.stringify(props)}<br /> serach:${JSON.stringify(search)}`
})
