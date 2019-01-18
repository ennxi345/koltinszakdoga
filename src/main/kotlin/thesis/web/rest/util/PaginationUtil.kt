package thesis.web.rest.util

import org.springframework.data.domain.Page
import org.springframework.http.HttpHeaders
import org.springframework.web.util.UriComponentsBuilder


class PaginationUtil() {

    companion object {
        fun generatePaginationHttpHeaders(page: Page<*>, baseUrl: String): HttpHeaders {

            val headers = HttpHeaders()
            headers.add("X-Total-Count", "" + java.lang.Long.toString(page.getTotalElements()))
            var link = ""
            if (page.getNumber() + 1 < page.getTotalPages()) {
                link = "<" + generateUri(baseUrl, page.getNumber() + 1, page.getSize()) + ">; rel=\"next\","
            }
            // prev link
            if (page.getNumber() > 0) {
                link += "<" + generateUri(baseUrl, page.getNumber() - 1, page.getSize()) + ">; rel=\"prev\","
            }
            // last and first link
            var lastPage = 0
            if (page.getTotalPages() > 0) {
                lastPage = page.getTotalPages() - 1
            }
            link += "<" + generateUri(baseUrl, lastPage, page.getSize()) + ">; rel=\"last\","
            link += "<" + generateUri(baseUrl, 0, page.getSize()) + ">; rel=\"first\""
            headers.add(HttpHeaders.LINK, link)
            return headers
        }

        private fun generateUri(baseUrl: String, page: Int, size: Int): String {
            return UriComponentsBuilder.fromUriString(baseUrl).queryParam("page", page).queryParam("size", size).toUriString()
        }
    }
}
