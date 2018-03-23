export default function rewriteRoot (code) {
  return `<div class="u-w-view u-w-root">
    ${code}
</div>`
}
