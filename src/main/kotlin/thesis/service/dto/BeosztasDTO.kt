package thesis.service.dto

data class BeosztasDTO(var id: Long?, var beosztasNev: String?) {
    constructor() : this(null, null)
}
