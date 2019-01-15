package thesis.service.criteria

import io.github.jhipster.service.filter.LocalDateFilter
import io.github.jhipster.service.filter.LongFilter
import io.github.jhipster.service.filter.RangeFilter
import io.github.jhipster.service.filter.StringFilter
import java.io.Serializable

 class TelephelyCriteria() {
    
     var id: LongFilter? = null
     var nev: StringFilter? = null
     var telepules: StringFilter? = null
     var megyeId: LongFilter? = null
     var cim: StringFilter? = null
     var mukodesKezdeteK: LocalDateFilter? = null
     var mukodesKezdeteV: LocalDateFilter? = null
}
