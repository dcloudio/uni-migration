export default function rewriteRefresh (code) {
  return `<refresh class="u-w-view u-w-refresh" onrefresh="$handlePageRefresh" refreshing="{{pageIsRefreshing}}">
    ${code}
</refresh>`
}
