package thesis.service.dto

import org.springframework.data.annotation.ReadOnlyProperty
import java.io.Serializable
import java.time.Instant

abstract class AbstractAuditingDTO {

    private var id: Long? = null

    private var version: Long? = null

    @ReadOnlyProperty
    var createdBy: String? = null

    @ReadOnlyProperty
    var createdDate = Instant.now()

    var lastModifiedBy: String? = null

    var lastModifiedDate = Instant.now()

    companion object {

        private const val serialVersionUID = 1L
    }
}
