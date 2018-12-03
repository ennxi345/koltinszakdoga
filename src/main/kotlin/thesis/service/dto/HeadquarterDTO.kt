package thesis.service.dto

data class HeadquarterDTO(var id: Long?, var countyId: Long?, var settlement: String?, var zipCode: String?, var address: String?, var phoneNumber: String?, var email: String?)  {

    constructor() : this(null, null, null, null, null, null, null)
}
