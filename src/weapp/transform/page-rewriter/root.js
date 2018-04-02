export default function rewriteRoot (code, isComponent = false) {
  return `<div class="u-w-view${isComponent ? '' : ' u-w-page'}">
    ${code}
</div>`
}
