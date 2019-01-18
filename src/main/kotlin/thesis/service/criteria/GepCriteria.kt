package thesis.service.criteria

import io.github.jhipster.service.filter.LocalDateFilter
import io.github.jhipster.service.filter.LongFilter
import io.github.jhipster.service.filter.StringFilter

class GepCriteria {
    var id: LongFilter? = null
    var nev: StringFilter? = null
    var telephelyId: LongFilter? = null
    var geptipId: LongFilter? = null
    var markaId: LongFilter? = null
    var mukodesKezdeteK: LocalDateFilter? = null
    var mukodesKezdeteV: LocalDateFilter? = null
}
