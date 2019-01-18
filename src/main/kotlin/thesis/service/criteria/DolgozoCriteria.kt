package thesis.service.criteria

import io.github.jhipster.service.filter.LocalDateFilter
import io.github.jhipster.service.filter.LongFilter
import io.github.jhipster.service.filter.StringFilter

class DolgozoCriteria {

        var id: LongFilter? = null
        var vezetekNev: StringFilter? = null
        var keresztNev: StringFilter? = null
        var beosztasId: LongFilter? = null
        var telephelyId: LongFilter? = null
        var munkaViszonyKezdeteK: LocalDateFilter? = null
        var munkaViszonyKezdeteV: LocalDateFilter? = null
}
